import { Fragment } from "react";

export type GapState = { text: string | null; status: "empty" | "filled" | "correct" | "wrong" };

const GAP = /__\((\d+)\)__/g;

const gapStyles: Record<GapState["status"], string> = {
  empty: "border-dashed border-primary/40 text-primary",
  filled: "border-primary/40 bg-primary-soft text-primary",
  correct: "border-success/40 bg-success-soft text-success",
  wrong: "border-danger/40 bg-danger-soft text-danger",
};

/** Renders a passage, replacing `__(n)__` markers with numbered gap chips. */
export function GapText({ content, gaps }: { content: string; gaps: Record<number, GapState> }) {
  return (
    <div className="whitespace-pre-line leading-8">
      {content.split(GAP).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const order = Number(part);
        const gap = gaps[order] ?? { text: null, status: "empty" };
        return (
          <span
            key={i}
            className={`mx-0.5 inline-flex items-baseline gap-1 rounded-md border px-1.5 py-0 font-medium ${gapStyles[gap.status]}`}
          >
            <span className="text-xs opacity-70">{order}</span>
            <span>{gap.text ?? "  "}</span>
          </span>
        );
      })}
    </div>
  );
}
