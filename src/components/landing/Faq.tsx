import { ChevronDown } from "lucide-react";

import { APP_NAME } from "@/lib/config";

import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    q: "What level of German do I need to start?",
    a: "The current tasks are written for telc Deutsch B1. If you're working towards B1, start with Sprachbausteine or Leseverstehen: the explanations will show you which grammar points to focus on.",
  },
  {
    q: "Which exams can I practice?",
    a: "telc Deutsch B1 right now: Leseverstehen, Sprachbausteine, Hörverstehen and Schreiben. A1, A2 and B2 are next.",
  },
  {
    q: `Is ${APP_NAME} affiliated with telc or the Goethe-Institut?`,
    a: "No. We're an independent practice tool. Our tasks follow the published exam formats, but they are our own and are not official exam papers.",
  },
  {
    q: "How are my answers checked?",
    a: "When you press “Check answers”, your answers are scored on our server and you get back the correct answers with an explanation for each one. The answers are never sent to your browser before you check.",
  },
  {
    q: "Do I need an account?",
    a: "Not for practice. Open any section and start. Accounts will come with progress tracking and AI feedback.",
  },
  {
    q: "Is there feedback on writing and speaking?",
    a: "You can practice writing tasks today with a live word count. AI feedback on your writing and an AI speaking partner are in development.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-surface py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-background">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="-mt-1 pb-5 leading-7 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
