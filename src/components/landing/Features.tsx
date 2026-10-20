import { Award, BookOpen, Headphones, Lightbulb, PenLine, Puzzle, Target, TrendingUp } from "lucide-react";

import { SectionHeading } from "./SectionHeading";

const strip = [
  { icon: BookOpen, title: "Leseverstehen", text: "Articles and ads" },
  { icon: Puzzle, title: "Sprachbausteine", text: "Gaps and word banks" },
  { icon: Headphones, title: "Hörverstehen", text: "Richtig oder falsch" },
  { icon: PenLine, title: "Schreiben", text: "Emails with Leitpunkte" },
];

const features = [
  {
    icon: Award,
    tone: "from-amber-400 to-orange-500",
    title: "The real exam format",
    text: "Every task follows the telc structure: same Teile, same question numbering, same instructions in German. Nothing on exam day should look new.",
  },
  {
    icon: Lightbulb,
    tone: "from-violet-500 to-purple-600",
    title: "An explanation for every answer",
    text: "Right or wrong, you see the grammar rule or the line in the text behind the answer. You learn why it's right, not just whether it is.",
  },
  {
    icon: Target,
    tone: "from-sky-400 to-blue-600",
    title: "Practice one section at a time",
    text: "Short on time? Pick a single section such as Sprachbausteine or Hörverstehen and finish a full set in about ten minutes.",
  },
  {
    icon: TrendingUp,
    tone: "from-rose-400 to-pink-600",
    title: "Know where you stand",
    text: "Your score appears the moment you check, with every gap marked in the text so you can see your mistakes in context.",
  },
];

export function FeatureStrip() {
  return (
    <div className="border-b border-border bg-surface">
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
        {strip.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block text-xs text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          eyebrow="Why practice here"
          title="Understand the answer, then remember it"
          text="Exam prep works best when every mistake teaches you something. Each task is built to do that."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map(({ icon: Icon, tone, title, text }) => (
            <article key={title} className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
              <span className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow ${tone}`}>
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
