"use client";

import { useState, useTransition } from "react";

import { evaluateWriting, type WritingFeedback } from "@/lib/exam/actions";
import type { PublicSection } from "@/lib/exam/types";

export function WritingPlayer({ section }: { section: PublicSection }) {
  const unit = section.units[0];
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minWords = unit.task?.minWords ?? 0;

  function submit() {
    setError(null);
    startTransition(async () => {
      try {
        setFeedback(await evaluateWriting(section.certSlug, section.sectionSlug, text));
      } catch {
        setError("Could not submit your text. Please try again.");
      }
    });
  }

  return (
    <section className="space-y-5">
      <p className="text-sm italic text-muted">{unit.instructions}</p>

      {unit.contexts.map(
        (ctx, i) =>
          ctx.kind !== "audio" && (
            <div key={i} className="rounded-xl border border-border bg-surface p-5">
              {ctx.label && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{ctx.label}</p>}
              <p className="whitespace-pre-line leading-7">{ctx.content}</p>
            </div>
          ),
      )}

      {unit.task && (
        <div className="rounded-xl border border-primary/30 bg-primary-soft p-5">
          <p className="font-medium">{unit.task.instructions}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {unit.task.bulletPoints.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-border bg-surface p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Lieber Paul, …"
          aria-label="Your answer"
          className="w-full resize-y rounded-lg border border-border bg-background p-3 leading-7 outline-none focus:border-primary"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className={`text-sm ${wordCount >= minWords ? "text-success" : "text-muted"}`}>
            {wordCount} words{minWords ? ` (aim for ${minWords}+)` : ""}
          </span>
          <button
            type="button"
            onClick={submit}
            disabled={pending || wordCount === 0}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Submitting…" : "Submit for feedback"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        {feedback && (
          <p className="mt-3 rounded-lg bg-background p-3 text-sm text-muted">
            {feedback.message} Your text has {feedback.wordCount} words.
          </p>
        )}
      </div>
    </section>
  );
}
