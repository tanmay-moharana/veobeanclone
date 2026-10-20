import Link from "next/link";

import { certs } from "@/lib/exam/catalog";
import type { Skill } from "@/lib/exam/types";

const skillLabels: Record<Skill, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">German exam practice</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Practice every section in the real telc format and get instant feedback on each answer.
      </p>

      {certs.map((cert) => (
        <section key={cert.slug} className="mt-12">
          <h2 className="text-2xl font-bold">{cert.name}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {cert.sections.map((s) => (
              <Link
                key={s.sectionSlug}
                href={`/practice/${cert.slug}/${s.sectionSlug}`}
                className="group rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{skillLabels[s.skill]}</p>
                <h3 className="mt-1 text-lg font-semibold group-hover:text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
