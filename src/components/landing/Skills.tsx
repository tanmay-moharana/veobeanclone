import { ArrowRight, Check, Clock, Mic } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "./SectionHeading";

const leitpunkte = ["Ob Sie beim Umzug helfen können", "Glückwunsch zur neuen Wohnung", "Ein Tipp für den Umzug", "Ihre Erfahrungen mit Umzügen"];

const speakingParts = [
  { title: "Sich vorstellen", minutes: 3 },
  { title: "Über ein Thema sprechen", minutes: 6 },
  { title: "Gemeinsam etwas planen", minutes: 5 },
];

export function Skills() {
  return (
    <section className="bg-[#1a1622] py-20 text-white sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          invert
          eyebrow="Writing & speaking"
          title="Practice the parts you can't tick a box for"
          text="Writing tasks are ready to practice today. AI feedback on your writing, and a speaking partner for the oral exam, are next."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-300">Schreiben · available now</p>
            <h3 className="mt-2 text-2xl font-semibold">Answer a real-format email</h3>
            <p className="mt-3 leading-7 text-white/70">
              Read the prompt, cover all four Leitpunkte and watch your word count as you write.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {leitpunkte.map((l) => (
                <li key={l} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link
                href="/practice/telc-b1/schreiben"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-strong"
              >
                Try a writing task <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">Sprechen · coming soon</p>
            <h3 className="mt-2 text-2xl font-semibold">An AI partner for the oral exam</h3>
            <p className="mt-3 leading-7 text-white/70">
              All three parts of the speaking exam, with a partner who listens and responds instead of following a script.
            </p>
            <ol className="mt-6 space-y-3">
              {speakingParts.map((p, i) => (
                <li key={p.title} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-violet-500/20 text-sm font-semibold text-violet-200">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-medium">{p.title}</span>
                  <span className="flex items-center gap-1 text-xs text-white/60">
                    <Clock className="size-3.5" /> {p.minutes} min
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-auto flex items-center gap-2 pt-8 text-sm text-white/60">
              <Mic className="size-4" /> We&apos;re building this now.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
