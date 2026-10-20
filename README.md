# ExamPrep (working name)

German exam practice in the real telc format, with instant per-question
feedback. Inspired by the teardown in [`docs/viobean-teardown.md`](docs/viobean-teardown.md);
all content here is original.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # grading + content consistency tests
npm run typecheck  # route types + tsc
npm run lint
```

## How it's put together

Built with Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS 4.

| Path | What it does |
| --- | --- |
| `src/lib/exam/types.ts` | Content model: section → units (Teile) → contexts + questions. |
| `src/lib/exam/content/` | Exercises. One file per exam; `telc-b1.ts` has samples for 4 sections. |
| `src/lib/exam/catalog.ts` | Looks up exams and sections. Server-only. |
| `src/lib/exam/grade.ts` | `toPublicSection` (removes answers before sending to the browser), `gradeSection`, input validation. |
| `src/lib/exam/actions.ts` | Server Actions: `gradeAnswers` and an `evaluateWriting` stub. |
| `src/app/practice/[cert]/[section]/` | Practice page, pre-rendered for every section in the catalog. |
| `src/components/player/` | `ExercisePlayer` (multiple choice, Richtig/Falsch, word-bank gaps, inline gap chips), `AudioPlayer`, `WritingPlayer`. |

**Answers stay on the server.** Clients receive sections without `solution`
or `explanation` and grade through a Server Action. Viobean ships its answer
keys to the browser; we don't.

### Writing content

Add a `Section` to a file in `src/lib/exam/content/` and register it in
`catalog.ts`. The format works like this:

- In a `text` context, write gaps as `__(21)__`. Each gap number must match a
  question's `order`.
- Questions use `choices` for a, b, c or +/– answers.
- For word-bank tasks, leave each question's `choices` empty and put the words
  in `unit.bank`.
- For listening, an `audio` context takes a `mediaUrl`. Until a recording
  exists, a `transcript` is read aloud by the browser's German voice.

`npm test` checks every section: solutions must be valid choices, gap numbers
must match questions, and each bank word can be used only once.

## Not built yet

- AI writing and speaking evaluation (`evaluateWriting` returns "not configured").
- Accounts, credits and payments.
- Translations, more exams (A1, A2, B2, Goethe), real audio recordings.
