import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ExercisePlayer } from "@/components/player/ExercisePlayer";
import { WritingPlayer } from "@/components/player/WritingPlayer";
import { certs, getCert, getSection } from "@/lib/exam/catalog";
import { toPublicSection } from "@/lib/exam/grade";

export function generateStaticParams() {
  return certs.flatMap((c) => c.sections.map((s) => ({ cert: c.slug, section: s.sectionSlug })));
}

export async function generateMetadata(props: PageProps<"/practice/[cert]/[section]">): Promise<Metadata> {
  const { cert, section } = await props.params;
  const s = getSection(cert, section);
  return s ? { title: `${getCert(cert)?.name} – ${s.title}`, description: s.description } : {};
}

export default async function PracticePage(props: PageProps<"/practice/[cert]/[section]">) {
  const { cert: certSlug, section: sectionSlug } = await props.params;
  const cert = getCert(certSlug);
  const section = getSection(certSlug, sectionSlug);
  if (!cert || !section) notFound();

  const publicSection = toPublicSection(section);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/practice" className="hover:text-primary">
          Practice
        </Link>
        {" / "}
        <span>{cert.name}</span>
        {" / "}
        <span className="text-foreground">{section.title}</span>
      </nav>
      <p className="mb-2 inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
        {cert.name} · {section.level}
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{section.title}</h1>
      <p className="mt-3 text-muted">{section.description}</p>

      <div className="mt-8">
        {section.mode === "interactive" ? (
          <ExercisePlayer section={publicSection} />
        ) : (
          <WritingPlayer section={publicSection} />
        )}
      </div>
    </main>
  );
}
