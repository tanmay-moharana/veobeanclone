import { describe, expect, it } from "vitest";

import { telcB1Sections } from "./content/telc-b1";
import { gradeSection, parseAnswers, toPublicSection } from "./grade";
import type { Section } from "./types";

const section: Section = {
  certSlug: "test",
  sectionSlug: "s",
  title: "T",
  level: "B1",
  skill: "reading",
  mode: "interactive",
  description: "",
  units: [
    {
      teilNumber: 1,
      instructions: "",
      contexts: [],
      questions: [
        { qid: "q1", order: 1, choices: [{ label: "a", text: "x" }, { label: "b", text: "y" }], solution: "a", explanation: "because" },
        { qid: "q2", order: 2, choices: [{ label: "a", text: "x" }, { label: "b", text: "y" }], solution: "b" },
      ],
    },
  ],
};

describe("toPublicSection", () => {
  it("strips solutions and explanations", () => {
    const json = JSON.stringify(toPublicSection(section));
    expect(json).not.toContain("solution");
    expect(json).not.toContain("because");
  });

  it("strips solutions from all shipped content", () => {
    for (const s of telcB1Sections) {
      expect(JSON.stringify(toPublicSection(s))).not.toMatch(/"(solution|explanation)"/);
    }
  });
});

describe("gradeSection", () => {
  it("scores correct, wrong and missing answers", () => {
    const r = gradeSection(section, { q1: "a" });
    expect(r).toMatchObject({ score: 1, total: 2 });
    expect(r.results.q1).toMatchObject({ correct: true, given: "a", explanation: "because" });
    expect(r.results.q2).toMatchObject({ correct: false, given: null, solution: "b" });
  });

  it("ignores inherited properties on the answers object", () => {
    const answers = Object.create({ q1: "a" });
    expect(gradeSection(section, answers).results.q1.given).toBeNull();
  });
});

describe("parseAnswers", () => {
  it("accepts a flat string record", () => {
    expect(parseAnswers({ q1: "a" })).toEqual({ q1: "a" });
  });

  it.each([null, "a", ["a"], { q1: 1 }, { q1: "x".repeat(17) }])("rejects %j", (input) => {
    expect(parseAnswers(input)).toBeNull();
  });

  it("rejects too many entries", () => {
    expect(parseAnswers(Object.fromEntries(Array.from({ length: 3 }, (_, i) => [`q${i}`, "a"])), 2)).toBeNull();
  });
});

describe("telc B1 content", () => {
  for (const s of telcB1Sections) {
    describe(s.sectionSlug, () => {
      for (const unit of s.units) {
        it(`Teil ${unit.teilNumber} is internally consistent`, () => {
          const qids = unit.questions.map((q) => q.qid);
          expect(new Set(qids).size).toBe(qids.length);

          for (const q of unit.questions) {
            const labels = (q.choices.length ? q.choices : (unit.bank ?? [])).map((c) => c.label);
            expect(labels, `${q.qid} solution`).toContain(q.solution);
          }

          if (unit.bank) {
            const solutions = unit.questions.map((q) => q.solution);
            expect(new Set(solutions).size, "bank words are used once").toBe(solutions.length);
          }

          const gapOrders = unit.contexts
            .flatMap((c) => ("content" in c ? [...c.content.matchAll(/__\((\d+)\)__/g)] : []))
            .map((m) => Number(m[1]));
          if (gapOrders.length) {
            expect(gapOrders.sort((a, b) => a - b)).toEqual(unit.questions.map((q) => q.order).sort((a, b) => a - b));
          }
        });
      }
    });
  }
});
