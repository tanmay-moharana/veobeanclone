"use client";

import { useState, useTransition } from "react";

import { gradeAnswers } from "@/lib/exam/actions";
import type { Answers, Choice, GradeResult, PublicQuestion, PublicSection, PublicUnit, QuestionResult } from "@/lib/exam/types";

import { AudioPlayer } from "./AudioPlayer";
import { GapText, type GapState } from "./GapText";

export function ExercisePlayer({ section }: { section: PublicSection }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const total = section.units.reduce((n, u) => n + u.questions.length, 0);
  const answered = Object.keys(answers).length;

  function choose(qid: string, label: string) {
    if (result) return;
    setAnswers((prev) => {
      const next = { ...prev };
      if (label) next[qid] = label;
      else delete next[qid];
      return next;
    });
  }

  function check() {
    setError(null);
    startTransition(async () => {
      try {
        setResult(await gradeAnswers(section.certSlug, section.sectionSlug, answers));
      } catch {
        setError("Could not check your answers. Please try again.");
      }
    });
  }

  function reset() {
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-10">
      {section.units.map((unit) => (
        <UnitView key={unit.teilNumber} unit={unit} answers={answers} result={result} onChoose={choose} />
      ))}

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface/95 p-4 shadow-lg backdrop-blur">
        {result ? (
          <>
            <p className="font-semibold">
              Score: {result.score} / {result.total}
              <span className="ml-2 text-sm font-normal text-muted">({Math.round((result.score / result.total) * 100)}%)</span>
            </p>
            <button type="button" onClick={reset} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-background">
              Try again
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted">
              {answered} of {total} answered
              {error && <span className="ml-2 text-danger">{error}</span>}
            </p>
            <button
              type="button"
              onClick={check}
              disabled={pending || answered === 0}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Checking…" : "Check answers"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function UnitView({
  unit,
  answers,
  result,
  onChoose,
}: {
  unit: PublicUnit;
  answers: Answers;
  result: GradeResult | null;
  onChoose: (qid: string, label: string) => void;
}) {
  const choicesFor = (q: PublicQuestion): Choice[] => (q.choices.length ? q.choices : (unit.bank ?? []));

  const gaps: Record<number, GapState> = {};
  for (const q of unit.questions) {
    const label = answers[q.qid];
    const r = result?.results[q.qid];
    gaps[q.order] = {
      text: choicesFor(q).find((c) => c.label === label)?.text ?? null,
      status: r ? (r.correct ? "correct" : "wrong") : label ? "filled" : "empty",
    };
  }

  const usedBankLabels = new Set(unit.bank ? unit.questions.map((q) => answers[q.qid]).filter(Boolean) : []);

  return (
    <section className="space-y-5">
      <header>
        <h2 className="text-xl font-bold">Teil {unit.teilNumber}</h2>
        <p className="mt-1 text-sm italic text-muted">{unit.instructions}</p>
      </header>

      {unit.contexts.map((ctx, i) =>
        ctx.kind === "audio" ? (
          <AudioPlayer key={i} label={ctx.label} mediaUrl={ctx.mediaUrl} transcript={ctx.transcript} revealTranscript={!!result} />
        ) : (
          <div key={i} className="rounded-xl border border-border bg-surface p-5">
            {ctx.label && <h3 className="mb-3 font-semibold">{ctx.label}</h3>}
            <GapText content={ctx.content} gaps={gaps} />
          </div>
        ),
      )}

      {unit.bank && (
        <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-surface p-4">
          {unit.bank.map((c) => (
            <span
              key={c.label}
              className={`rounded-md border border-border px-2 py-1 text-sm ${usedBankLabels.has(c.label) ? "text-muted line-through" : ""}`}
            >
              <b className="mr-1">{c.label}</b>
              {c.text}
            </span>
          ))}
        </div>
      )}

      <ol className="space-y-3">
        {unit.questions.map((q) => (
          <QuestionView
            key={q.qid}
            question={q}
            choices={choicesFor(q)}
            selected={answers[q.qid]}
            result={result?.results[q.qid]}
            bankMode={!q.choices.length}
            disabledLabels={usedBankLabels}
            onChoose={(label) => onChoose(q.qid, label)}
          />
        ))}
      </ol>
    </section>
  );
}

function QuestionView({
  question,
  choices,
  selected,
  result,
  bankMode,
  disabledLabels,
  onChoose,
}: {
  question: PublicQuestion;
  choices: Choice[];
  selected?: string;
  result?: QuestionResult;
  bankMode: boolean;
  disabledLabels: Set<string>;
  onChoose: (label: string) => void;
}) {
  const locked = !!result;
  const name = `q-${question.qid}`;

  return (
    <li className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary-soft px-1.5 text-xs font-bold text-primary">
          {question.order}
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          {question.prompt && <p className="font-medium">{question.prompt}</p>}

          {bankMode ? (
            <select
              aria-label={`Gap ${question.order}`}
              value={selected ?? ""}
              disabled={locked}
              onChange={(e) => onChoose(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 sm:w-64"
            >
              <option value="">Choose a word…</option>
              {choices.map((c) => (
                <option key={c.label} value={c.label} disabled={c.label !== selected && disabledLabels.has(c.label)}>
                  {c.label}) {c.text}
                </option>
              ))}
            </select>
          ) : (
            <div role="radiogroup" className={choices.length <= 2 ? "flex flex-wrap gap-2" : "space-y-2"}>
              {choices.map((c) => {
                const isSelected = selected === c.label;
                const isSolution = result?.solution === c.label;
                const tone = result
                  ? isSolution
                    ? "border-success bg-success-soft"
                    : isSelected
                      ? "border-danger bg-danger-soft"
                      : "border-border opacity-60"
                  : isSelected
                    ? "border-primary bg-primary-soft"
                    : "border-border hover:border-primary/50";
                return (
                  <label
                    key={c.label}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-primary ${tone} ${locked ? "cursor-default" : ""}`}
                  >
                    <input
                      type="radio"
                      name={name}
                      value={c.label}
                      checked={isSelected}
                      disabled={locked}
                      onChange={() => onChoose(c.label)}
                      className="sr-only"
                    />
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold">
                      {c.label}
                    </span>
                    <span>{c.text}</span>
                  </label>
                );
              })}
            </div>
          )}

          {result && <Feedback result={result} choices={choices} />}
        </div>
      </div>
    </li>
  );
}

function Feedback({ result, choices }: { result: QuestionResult; choices: Choice[] }) {
  const solutionText = choices.find((c) => c.label === result.solution)?.text;
  return (
    <div
      className={`rounded-lg border-l-4 p-3 text-sm ${result.correct ? "border-success bg-success-soft" : "border-danger bg-danger-soft"}`}
    >
      <p className="font-semibold">
        {result.correct ? "Correct!" : result.given ? "Not quite." : "Not answered."}
        {!result.correct && (
          <span className="font-normal">
            {" "}
            The answer is <b>{result.solution}</b>
            {solutionText && <> ({solutionText})</>}.
          </span>
        )}
      </p>
      {result.explanation && <p className="mt-1">{result.explanation}</p>}
    </div>
  );
}
