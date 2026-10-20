# Viobean teardown (https://viobean.com)

Captured 2026-10-20 with REA 6.7.0 (`analyze-web-bundle`, Evidence
`ev_ffdfa3c1207d5a633add8d831ec6d340363f6fa61590dee23a5c46fc8cddae03`) plus a
headless Chromium session for screenshots and network logs. Only public,
logged-out pages were examined. Nothing behind login (dashboard, AI speaking,
AI writing evaluation, checkout) was observed.

Legend: **Observed** = seen directly in shipped code, HTML or network traffic.
**Inferred** = reasoned from observations, not directly seen.

## What the product is

AI-assisted prep for German language exams (telc A1/A2/B1/B2, Goethe A1/B1,
DTZ, TestDaF), with web plus iOS/Android apps. It covers all four exam skills
(Reading, Listening, Writing, Speaking) plus Grammar (Sprachbausteine). AI
explanations come in 30 languages. Pricing is freemium:

| Plan    | Price (3-month billing) | Writing/Speaking credits |
| ------- | ----------------------- | ------------------------ |
| Free    | $0                      | 3 / month                |
| Pro     | $9.99/mo ($29.98)       | 20 / month               |
| Pro Max | $16.66/mo ($49.98)      | 200 / month              |

1 credit = 1 AI-graded writing or speaking session. Reading, listening, grammar
and explanations are unlimited on paid plans. Monthly and annual (save 50%)
toggles also exist.

## Stack (observed)

- **Framework:** Next.js App Router with React Server Components (RSC). It
  uses Turbopack chunks, `self.__next_f.push` RSC payloads and `?_rsc=`
  prefetches. Source maps return 404.
- **Fonts:** Inter (self-hosted as "InterVB") and JetBrains Mono.
- **i18n:** locale-prefixed routes `/de /fr /ru /uk /es /vi /tr /ar /id /uz`,
  with English at the root and hreflang in the sitemap.
- **Storage:** Supabase. Listening audio is public objects at
  `…supabase.co/storage/v1/object/public/gep-assets/practices/<uuid>/hoerverstehen-teilN.mp3`.
- **Analytics and monitoring:**
  - PostHog, proxied at `/ph`, with autocapture enabled and session recording off.
  - Umami at `u.viobean.com/api/send`.
  - Sentry, tunnelled through `/monitoring`. A logged-out POST to it returns 307
    and redirects to `/login`, so the tunnel appears to sit behind auth
    middleware and drop anonymous error reports (inferred).
- **Payments:** Stripe. The bundle has a subscription selector that checks
  `PAST_DUE` or `UNPAID` with `source ?? "stripe"`, which implies app-store
  subscription sources too (inferred).
- **API client:**
  - Fetches a CSRF token from `GET /api/csrf` and sends it as the
    `x-csrf-token` header (also a `csrf_token` cookie).
  - Request timeouts are DEFAULT 30s, LONG 120s and AI 300s.
  - It retries on 502/503/504.
- **Public endpoints seen in the bundle:** `/api/waitlist`,
  `/api/partner-inquiry`, `/api/partner/visit`, `/api/partner/claim`,
  `/api/referral/visit` (`?invite=` and `?via=` query parameters).
- **SEO:**
  - About 110 English URLs in the sitemap: exam pages, per-section pages,
    free practice pages, ~50 programmatic "telc-b1-exam-<city>" pages and
    immigration/citizenship articles.
  - `robots.txt` allows `/practice/*/free` and disallows the rest of
    `/practice/`.

## Core feature: practice sections (observed)

Free practice pages (`/practice/<cert>/<section>/free`) are fully
server-rendered. The whole exercise, **including the answer key**, ships in the
RSC payload, and grading happens client-side with no network call. Data shape:

```ts
type Section = {
  certSlug: "telc-b1"; sectionSlug: "sprachbausteine" | "leseverstehen" | "hoerverstehen" | "schreiben" | "sprechen";
  level: "A1" | "A2" | "B1" | "B2";
  skill: "reading" | "listening" | "writing" | "speaking";
  mode: "interactive" | "prompt";            // MCQ vs. free production
  units: Array<{
    teilNumber: string; instructions: string | null; estimatedTimeSec: number | null;
    contexts: Array<{ order: number; kind: "text" | "audio" | "opinion_card" | string;
                      label: string; content: string | null; mediaUrl: string | null; display: unknown }>;
    questions: Array<{ qid: string /* "t1-q21" */; order: number; prompt: string | null;
                       solution: string /* "a" | "+" | "-" | "" */;
                       choices: Array<{ label: string; text: string; meta: unknown }>;
                       grading: unknown; textNumber: number | null; signNumber: number | null; card: unknown }>;
    task?: { instructions: string | null; bulletPoints: string[]; footerNote: string | null; cards: unknown[]; theme: unknown };
  }>;
  questionCount: number;
};
```

- **Reading and grammar:** a passage (`kind: "text"`) with gap markers
  `__(21)__`, plus multiple-choice or word-bank questions.
- **Listening:** `kind: "audio"` with an MP3 `mediaUrl`, plus Richtig/Falsch
  (`+`/`-`) or multiple-choice questions.
- **Writing:** an email context plus a task with 4 *Leitpunkte*
  (`bulletPoints`). It is graded by AI on Task Completion, Communication and
  Grammar, using credits.
- **Speaking:** three parts (introduce yourself 3 min, discuss a topic using
  opinion cards 6 min, plan together 5 min). An AI partner holds the
  conversation and scores pronunciation, grammar, fluency and task completion.
  The real-time transport sits behind login and was not observed.

## Landing page structure

The page runs top to bottom:

1. **Nav:** Features, Speaking, How It Works, Pricing, Partner, plus a language
   switcher, Log in and a "Get Started" CTA.
2. **Hero:** purple gradient with floating level chips (A1, A2, B1, B2), a
   flag strip, "Start Practicing Free" and "See How It Works" buttons, and
   app-store badges.
3. **Feature strip:** Real Exam Format, All 4 Exam Skills, Explanations in 30
   Languages, Real-Time Speaking.
4. **Social proof:** a "Passed with Viobean" certificate carousel and a
   testimonial carousel.
5. **"Learn Smarter, Not Harder":** a 4-card feature grid.
6. **AI Speaking:** dark section with a video demo.
7. **AI Writing evaluation:** demo video plus a 3-point checklist.
8. **"How It Works":**
   1. Exam-date picker that builds a daily plan.
   2. Skill tabs with a sample question.
   3. A wrong-answer explanation in your language: why it's wrong, why the
      right answer is right, the grammar rule and a tip.
   4. A mastery dashboard with per-skill bars and weak grammar patterns.
9. **Pricing:** 3 tiers with a Monthly / 3 Months / Annual toggle.
10. **FAQ:** 12-item accordion.
11. **Final CTA and footer:** a gradient CTA, then a dark footer with Product,
    Exams, Cities, Resources, Legal and Contact columns.

**Design tokens (observed):**

- Body background `rgb(250,246,240)` (warm off-white), text `rgb(45,40,51)`.
- Primary violet roughly `#7c3aed` to `#9333ea` gradient, yellow accent for
  "AI" and "Pass faster".
- Rounded cards (about 16px radius) with soft shadows.

## Notes for building our own version

- **Content:** don't copy Viobean's exercises, audio, copy, testimonials or
  branding. Write original exam-style content in the same formats instead.
  The telc/Goethe exam *formats* are public, but the specific items are
  Viobean's or the exam bodies' content.
- **Answer keys:** if grading should be gated (e.g. explanations for signed-in
  users only), keep `solution` and explanations server-side and grade through
  an API. Viobean ships answer keys to the browser on free pages.
- **Reusable ideas:** the unit/context/question schema above is a clean way to
  model all telc sections generically, and is worth reusing in our own design.
- **Not yet investigated (needs a logged-in session):**
  - speaking transport (WebRTC or WebSocket, and which speech-to-text,
    text-to-speech and LLM vendors);
  - the writing-evaluation response format;
  - the dashboard and spaced-repetition logic;
  - the auth provider (Supabase Auth is likely, but this is inferred).
