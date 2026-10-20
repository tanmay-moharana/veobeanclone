import "server-only";

import { telcB1Sections } from "./content/telc-b1";
import type { Section } from "./types";

export type Cert = { slug: string; name: string; sections: Section[] };

export const certs: Cert[] = [{ slug: "telc-b1", name: "telc Deutsch B1", sections: telcB1Sections }];

export function getCert(certSlug: string): Cert | undefined {
  return certs.find((c) => c.slug === certSlug);
}

export function getSection(certSlug: string, sectionSlug: string): Section | undefined {
  return getCert(certSlug)?.sections.find((s) => s.sectionSlug === sectionSlug);
}
