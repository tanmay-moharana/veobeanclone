// Exam content model. Mirrors the unit/context/question shape described in
// docs/viobean-teardown.md, with one difference: solutions and explanations
// stay on the server. Clients only ever receive a `PublicSection`.

export type Level = "A1" | "A2" | "B1" | "B2";
export type Skill = "reading" | "listening" | "writing" | "speaking";

/** "interactive" sections have gradable questions; "prompt" sections are free production. */
export type SectionMode = "interactive" | "prompt";

export type Choice = { label: string; text: string };

export type Context =
  | { kind: "text"; label?: string; content: string }
  | { kind: "audio"; label?: string; mediaUrl?: string; transcript?: string }
  | { kind: "opinion_card"; label: string; content: string };

export type Question = {
  /** Stable within a section, e.g. "t1-q21". */
  qid: string;
  /** Number shown to the learner; matches `__(n)__` gap markers in text contexts. */
  order: number;
  prompt?: string;
  /** Empty when the unit uses a shared word bank. */
  choices: Choice[];
  /** Label of the correct choice. Server-only. */
  solution: string;
  /** Why the solution is right. Server-only, returned after grading. */
  explanation?: string;
};

export type WritingTask = {
  instructions: string;
  bulletPoints: string[];
  minWords?: number;
};

export type Unit = {
  teilNumber: number;
  instructions: string;
  estimatedTimeSec?: number;
  contexts: Context[];
  questions: Question[];
  /** Shared choices for word-bank tasks; each label may be used once. */
  bank?: Choice[];
  task?: WritingTask;
};

export type Section = {
  certSlug: string;
  sectionSlug: string;
  title: string;
  level: Level;
  skill: Skill;
  mode: SectionMode;
  description: string;
  units: Unit[];
};

export type PublicQuestion = Omit<Question, "solution" | "explanation">;
export type PublicUnit = Omit<Unit, "questions"> & { questions: PublicQuestion[] };
export type PublicSection = Omit<Section, "units"> & { units: PublicUnit[] };

export type Answers = Record<string, string>;

export type QuestionResult = {
  qid: string;
  given: string | null;
  correct: boolean;
  solution: string;
  explanation?: string;
};

export type GradeResult = {
  score: number;
  total: number;
  results: Record<string, QuestionResult>;
};
