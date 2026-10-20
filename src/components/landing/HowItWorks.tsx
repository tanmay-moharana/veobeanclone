import { ListChecks, MousePointerClick, RotateCcw, Sparkles } from "lucide-react";

import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a section",
    text: "Choose Leseverstehen, Sprachbausteine, Hörverstehen or Schreiben. No sign-up needed.",
  },
  {
    icon: ListChecks,
    title: "Answer like on exam day",
    text: "Fill the gaps, choose a, b or c, or decide richtig or falsch. Your answers appear right in the text.",
  },
  {
    icon: Sparkles,
    title: "Check and understand",
    text: "See your score, the correct answers and a short explanation of the rule behind each one.",
  },
  {
    icon: RotateCcw,
    title: "Go again",
    text: "Reset and retry until the patterns stick, then move on to the next section.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-surface py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading eyebrow="How it works" title="Ten minutes, one section, real progress" />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative rounded-2xl border border-border bg-background p-6">
              <span className="bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-4xl font-bold text-transparent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className="absolute top-6 right-6 size-6 text-primary/60" />
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
