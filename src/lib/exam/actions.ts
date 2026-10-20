"use server";

import { getSection } from "@/lib/exam/catalog";
import { gradeSection, parseAnswers } from "@/lib/exam/grade";
import type { GradeResult } from "@/lib/exam/types";

// Server Actions are reachable by direct POST, so every argument is treated as untrusted.

export async function gradeAnswers(certSlug: string, sectionSlug: string, answers: unknown): Promise<GradeResult> {
  const section = typeof certSlug === "string" && typeof sectionSlug === "string" ? getSection(certSlug, sectionSlug) : undefined;
  if (!section || section.mode !== "interactive") throw new Error("Unknown section");

  const parsed = parseAnswers(answers);
  if (!parsed) throw new Error("Invalid answers");

  return gradeSection(section, parsed);
}

export type WritingFeedback = { status: "unavailable"; wordCount: number; message: string };

export async function evaluateWriting(certSlug: string, sectionSlug: string, text: unknown): Promise<WritingFeedback> {
  const section = typeof certSlug === "string" && typeof sectionSlug === "string" ? getSection(certSlug, sectionSlug) : undefined;
  if (!section || section.mode !== "prompt") throw new Error("Unknown section");
  if (typeof text !== "string" || text.length > 10_000) throw new Error("Invalid text");

  // TODO: send the task, Leitpunkte and text to an LLM and score Task Completion,
  // Communication and Grammar. Requires auth + credit accounting first.
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  return { status: "unavailable", wordCount, message: "AI evaluation is not configured yet." };
}
