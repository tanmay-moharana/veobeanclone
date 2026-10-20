import type { Answers, GradeResult, PublicSection, QuestionResult, Section } from "./types";

export function toPublicSection(section: Section): PublicSection {
  return {
    ...section,
    units: section.units.map((unit) => ({
      ...unit,
      questions: unit.questions.map(({ qid, order, prompt, choices }) => ({ qid, order, prompt, choices })),
    })),
  };
}

export function gradeSection(section: Section, answers: Answers): GradeResult {
  const results: Record<string, QuestionResult> = {};
  let score = 0;
  let total = 0;

  for (const unit of section.units) {
    for (const q of unit.questions) {
      total += 1;
      const given = Object.hasOwn(answers, q.qid) ? answers[q.qid] : null;
      const correct = given === q.solution;
      if (correct) score += 1;
      results[q.qid] = { qid: q.qid, given, correct, solution: q.solution, explanation: q.explanation };
    }
  }

  return { score, total, results };
}

/** Narrows untrusted input (e.g. a Server Action argument) to `Answers`. */
export function parseAnswers(input: unknown, maxEntries = 200): Answers | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return null;
  const entries = Object.entries(input);
  if (entries.length > maxEntries) return null;
  const answers: Answers = {};
  for (const [key, value] of entries) {
    if (typeof value !== "string" || key.length > 64 || value.length > 16) return null;
    answers[key] = value;
  }
  return answers;
}
