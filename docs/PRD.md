# Product Requirements Document

Status: **Draft for scope confirmation.** Sections 6–8 (features, non-goals,
MVP) need sign-off before the remaining docs are written. Anything marked
`OPEN:` is undecided; anything under §11 is a working guess.

Doc set: this is a multi-platform product with accounts, AI evaluation and
personal data, so it gets the full set: PRD, DESIGN_SYSTEM, UX_FLOWS,
ARCHITECTURE, DATABASE, API, SECURITY, CODE_STYLE, TESTING, plus AGENTS.md at
the repo root.

## 1. Product Overview
Product Name: ExamPrep (working name). `OPEN:` final name.
One-Line Description: Practice German exams in the real telc/DTZ format, with
instant grading, explanations in English or German, and AI feedback on writing
and speaking.
Product Type: Exam-prep app (consumer).
Primary Platform: Web, iOS and Android, built with Flutter. The existing
Next.js app in this repo stays as the reference implementation and backend
until ARCHITECTURE.md decides otherwise (see §10 and §12).

## 2. Problem
What problem are we solving? Learners preparing for a German exam need to
practise in the exact exam format and understand *why* an answer is right.
Writing and speaking are hardest to practise alone because they need a
grader.
Why does this problem matter? The certificate gates residence, citizenship,
jobs and study places. Failing costs the exam fee and months of delay.
How are users solving this today? Printed Modelltests (answers but no
explanations), courses and tutors (expensive, scheduled), and apps such as
Viobean (see `docs/viobean-teardown.md`), which ship answer keys to the
browser and explain in many languages.

## 3. Goal
Primary Goal: The primary learner (the product owner) passes their target exam,
using this app as the main practice tool.
Secondary Goals:
- Cover every written and oral section of telc A2, B1, B2 and DTZ in the real format.
- Give feedback on writing and speaking close enough to the official rating
  criteria that a practice score predicts the real one.
- Keep answer keys and learner data protected and GDPR-compliant from day one,
  so the app can open to other learners later without a rewrite.

## 4. Target Users
### User Type 1 — The owner-learner (primary)
Name: Owner-learner
Description: The product owner, preparing for a German exam and using the app
daily. Reads explanations in English and wants German as well, to learn the
grammar terms used in class.
Needs:
- Real-format tasks for every section, at the level they are working towards.
- An explanation for every answer, switchable between English and German.
- Honest feedback on written texts and spoken answers, scored against the exam criteria.
- A view of which sections and grammar points are still weak.
Pain Points:
- Model tests give answers without reasons.
- No one is available to grade writing and speaking on demand.

### User Type 2 — Other exam candidates (secondary, later)
Name: Candidate
Description: Adults in Germany preparing for telc A2–B2 or DTZ (immigration,
citizenship, work). Mostly on phones.
Needs: Same as above, plus a free way to try the app before paying.
`OPEN:` Are other learners in scope for the MVP launch, or only after the owner
has used it? This decides whether payments are needed now (§6 F9).

## 5. User Stories
- As a learner, I want to pick an exam, level and section and answer in the real format, so that nothing on exam day looks new.
- As a learner, I want my answers graded with the correct answer and a reason for each question, so that I learn from mistakes.
- As a learner, I want to toggle an explanation between English and German, so that I understand it and also learn the German terms.
- As a learner, I want to submit a written text and get scores and corrections on the exam's criteria, so that I know whether it would pass.
- As a learner, I want to do the speaking parts with an AI partner and get scores, so that I can practise without a partner.
- As a learner, I want to see my scores over time per section, so that I know where to focus.
- As a learner, I want to download or delete my data and recordings, so that I stay in control of personal data.
- As a signed-out visitor, I want to try a section without an account, so that I can judge the app first.

## 6. Core Features

### F1 — Exam catalog and practice player
Purpose: Practise any section of telc A2, B1, B2 and DTZ in the real format.
User Flow: Choose exam → choose section → answer all Teile → "Check answers" → see score and per-question feedback → retry.
Inputs: Choice per question (a/b/c, richtig/falsch, word-bank letter).
Outputs: Score, per-question correct/incorrect, gaps marked in the text.
Acceptance Criteria:
- Every section of each exam's published format has at least one complete practice set (§11 for set counts). The section list per exam is confirmed against the official model test before content is written.
- All existing task types work on web, iOS and Android: multiple choice, richtig/falsch, word-bank gaps, inline gap chips, audio.
- Listening tasks play real recordings. Browser text-to-speech is a development fallback only and is not shipped in production.
- Content consistency tests (valid solutions, gap numbers match questions, bank words used once) pass for every set.
Edge Cases:
- Submitting with unanswered questions: they are graded as unanswered, not wrong-by-default silently.
- Audio fails to load: show an error with retry; questions stay answerable.
- Leaving mid-section: answers are kept for the session (`OPEN:` also across devices for signed-in users?).
- Unknown exam or section URL returns a real 404 (today it returns 200; see evaluation).

### F2 — Gated answer keys
Purpose: Answers and explanations are only revealed to signed-in learners, and only for what they attempted.
User Flow: Signed-out: answer → check → score and correct/incorrect per question → prompt to sign in to see answers and explanations. Signed-in: full feedback.
Acceptance Criteria:
- No solution or explanation is sent to any client before grading.
- Grading returns solutions and explanations only for questions the learner answered. A request with one answer cannot reveal the whole key (today it can).
- Signed-out grading returns score and per-question correct/incorrect only.
- Grading is rate-limited per user and per IP.
Edge Cases: Replayed or scripted grading requests; a signed-out user signs in after checking (show the full feedback without re-answering).
`OPEN:` "Gated" was confirmed, but not by what: account only (assumed), or also by plan?

### F3 — Explanations in English with a German toggle
Purpose: Understand every answer, and learn the German terms for it.
User Flow: After grading, each explanation shows in English, with an EN/DE toggle on the explanation. The last choice is remembered.
Acceptance Criteria:
- Every question in shipped content has an explanation in both English and German. A test fails the build if either is missing.
- The toggle works per explanation and as a global preference.
- The app interface stays in English.
Edge Cases: German explanation missing in draft content (blocked by test, never shown blank).

### F4 — Accounts and authentication
Purpose: Unlock answer keys, progress and AI feedback; tie data to a person for GDPR rights.
Acceptance Criteria:
- Sign up, sign in, sign out and password reset (or magic link) work on all three platforms with one shared account.
- Sign-up records consent to the privacy policy, and separate consent for storing voice recordings (F7).
- `OPEN:` auth provider and methods (email + password, magic link, Apple/Google sign-in). App stores require Sign in with Apple if any third-party login is offered on iOS.
Edge Cases: Expired session mid-practice (answers kept, re-auth prompt); deleted account.

### F5 — Progress tracking
Purpose: Show where the learner stands per exam and section.
Acceptance Criteria:
- Every graded attempt (objective, writing and speaking) is stored with date, score and section.
- A progress screen shows the latest and best score per section and a trend over time.
- Weak grammar points are listed, based on tags on wrong answers. Every question gets a grammar/skill tag in content.
Edge Cases: No attempts yet (empty state that suggests a first section).

### F6 — AI writing evaluation (Claude)
Purpose: Score a written task the way an examiner would, and show how to improve it.
User Flow: Read task and Leitpunkte → write → submit → wait (progress state) → scores per criterion, corrected text with marked errors, explanation per error (EN/DE toggle), and an estimated pass/fail.
Acceptance Criteria:
- Scores use each exam's own writing criteria (for telc B1: task completion, communication, form/grammar). The rubric per exam is stored with the content, not hard-coded in the prompt.
- Response arrives within an agreed time (`OPEN:` target, e.g. 60 s) with a visible progress state, and a clear error with retry on failure. A failed evaluation does not use up any allowance.
- Output is structured (scores, errors with positions, summary), validated server-side before display.
- Learner text is sent to Claude only from the server; the API key never reaches a client.
- An evaluation set of sample texts with human-assigned scores exists, and AI scores are checked against it before launch (`OPEN:` agreement threshold).
Edge Cases: Empty text, text far below or above the word target, text in the wrong language, off-topic text, prompt-injection attempts inside the text.

### F7 — AI speaking partner (Claude)
Purpose: Practise the oral exam parts with an AI partner and get scored.
User Flow: Choose speaking part → see task (e.g. opinion cards, planning task) → speak with the AI partner in turns → end → scores per criterion with transcript and corrections.
Acceptance Criteria:
- Covers every part of each exam's oral test (for telc B1: introduce yourself, discuss a topic, plan something together).
- Scores use the exam's oral criteria (e.g. pronunciation, fluency, grammar, task completion).
- Recordings are only stored with explicit consent, and are deleted after scoring by default (§10, F10).
- Microphone permission denied or unavailable is handled with a clear message on every platform.
- `OPEN:` speech-to-text and text-to-speech vendor. Claude runs the conversation and the scoring; confirm in ARCHITECTURE.md whether audio needs a separate speech vendor, and that vendor's EU data handling.
- `OPEN:` turn-based (record, send, reply) or real-time conversation. Turn-based is assumed for the MVP (§11).
Edge Cases: Silence, background noise, the learner answering in English, connection drop mid-session (partial attempt not scored, allowance not used).

### F8 — Mock exam mode (Nice to Have)
Purpose: Take a full exam under real timing.
Acceptance Criteria: All sections in exam order, with the official time per part, a visible timer, auto-submit at time-out, and one combined result with the exam's pass mark.

### F9 — Plans, credits and payments
Purpose: Pay for AI evaluation, which has a real cost per use.
`OPEN:` credits (1 credit = 1 AI writing or speaking session, as Viobean does) or a flat subscription with a fair-use cap. Your answer confirmed Claude but not this.
`OPEN:` needed at MVP only if other learners use the app (§4). For the owner-learner alone, a per-user monthly usage cap with no payments is enough.
Acceptance Criteria (if in MVP): purchase on web and in the iOS/Android apps (app-store billing rules apply to in-app digital purchases); allowance shown before each AI session; allowance only used on a successful evaluation.

### F10 — Privacy controls (GDPR)
Purpose: Meet GDPR for EU learners, including voice data.
Acceptance Criteria:
- Privacy policy and Impressum pages exist before any public launch.
- Learner can export all their data (attempts, texts, transcripts, recordings) as a download.
- Learner can delete their account; all personal data, texts and recordings are removed within a stated period (`OPEN:` e.g. 30 days, including backups).
- Voice recordings: off by default; stored only with explicit opt-in; deleted after scoring unless the learner keeps them; never used to train models.
- Every processor (hosting, auth, Anthropic, speech vendor, analytics, email, payments) is listed in the privacy policy with a data processing agreement in place.
- Personal data is hosted in the EU (`OPEN:` confirm hosting region and whether Claude inference can be kept in the EU).
- Analytics run only after consent, or are cookieless and collect no personal data.
Edge Cases: Deletion request while an AI evaluation is running; export of a very large recording history.

## 7. Non-Goals
Intentionally NOT part of this version:
- Interface translations. The app stays in English, and explanations come only in English and German, not Viobean's 30 languages.
- Goethe-Zertifikat, telc A1, TestDaF and other exams (`OPEN:` confirm that "all" meant telc A2, B1, B2 and DTZ).
- Programmatic SEO pages (city pages, articles), referral and partner programmes, testimonials and certificate carousels.
- Exam-date study plans and spaced repetition (Future).
- Teacher or school accounts, group classes, sharing results with others.
- Offline mode.
- Copying any Viobean or official exam content: all tasks, audio and explanations are original.

## 8. MVP Scope
Must Have:
- F1 Practice player for every section of telc A2, B1, B2 and DTZ, on web, iOS and Android.
- F2 Gated answer keys (fixes the full-key leak found in the evaluation).
- F3 English explanations with a German toggle.
- F4 Accounts.
- F5 Progress tracking.
- F6 AI writing evaluation.
- F7 AI speaking partner (turn-based).
- F10 Privacy controls.
Nice to Have:
- F8 Mock exam mode.
- F9 Credits and payments (Must Have only if other learners use the MVP).
Future:
- Study plan built from the exam date; spaced repetition of weak grammar points.
- Real-time speaking conversation.
- More exams (Goethe, telc A1) and more explanation languages.

Recommended build order inside the MVP (each step is usable on its own):
1. Gated grading fix (F2) and EN/DE explanations (F3) on today's telc B1 content.
2. Flutter client for the existing B1 practice flow on web, iOS and Android (F1).
3. Accounts and progress (F4, F5) with privacy controls (F10).
4. AI writing evaluation (F6), then speaking (F7).
5. Content for DTZ, A2 and B2. This is the largest single piece of work (§10).

## 9. Success Metrics
Primary Metrics:
- The owner-learner passes their target exam.
- AI writing and speaking scores agree with human-scored samples within the agreed threshold (F6, F7).
Secondary Metrics:
- Practice sessions per week, and sections completed per week.
- Score trend per section over the four weeks before the exam.
- Share of AI evaluations that fail or time out (target under 2%).
- AI cost per evaluation, and per active learner per month.

## 10. Constraints
Technical: Flutter for web, iOS and Android. Claude for AI evaluation. The
existing Next.js 16 app holds the content model, grading and content tests;
`OPEN:` whether it stays as the backend and marketing site behind the Flutter
apps, or is replaced (decided in ARCHITECTURE.md). Answer keys and the Claude
API key stay server-side.
Business: `OPEN:` budget. AI evaluation has a per-use cost that needs a cap
whether or not payments exist. App Store and Play Store accounts and review are
needed for iOS and Android.
Design: The existing tokens in `src/app/globals.css` (warm off-white, violet
primary, light and dark modes) are the starting point for DESIGN_SYSTEM.md. The
brand must not copy Viobean's.
Compliance: GDPR (EU learners, voice data); privacy policy and Impressum
(German law) before public launch; app-store privacy labels. The app is
independent of telc and the Goethe-Institut and says so.
Content: Four exams × every section, plus explanations in two languages and
recorded audio, is the largest effort in the MVP. `OPEN:` content source.
Timeline: `OPEN:` target date (and the owner's exam date, which bounds it).
Team: `OPEN:` team size. Assumed one developer working with AI coding agents.

## 11. Assumptions
- "All" exams means telc Deutsch A2, B1, B2 and DTZ (the exams named in the question). telc A1, Goethe and TestDaF are out.
- Answer keys are gated by account (signed in), not by plan. AI evaluation is what plans or caps limit.
- Content is written with AI assistance and reviewed by a person against the official model tests' format, then checked by the content tests. Nothing is copied.
- At launch: 2 complete practice sets per section per exam (`OPEN:` confirm).
- Listening audio is recorded or generated with a high-quality German voice before launch, not browser text-to-speech.
- Speaking in the MVP is turn-based (record → send → reply), not real-time.
- Voice recordings are deleted after scoring unless the learner opts in to keep them.
- The interface is English-only; only explanations switch to German.
- One developer working with AI coding agents; no fixed deadline yet.
- Until payments exist, AI evaluation is limited by a per-user monthly cap to bound cost.

## 12. Open Questions
Decisions (needed before the other docs):
1. Is the MVP for the owner-learner only, or open to other learners at launch? (Decides payments, onboarding, legal pages, app-store release.)
2. Credits or flat subscription for AI evaluation, and at what price? (Your answer confirmed Claude but not the billing model.)
3. Are answer keys gated by account only, or also by plan?
4. Does "all exams" mean telc A2, B1, B2 and DTZ? Is any of telc A1, Goethe or TestDaF wanted?
5. Flutter for web too, replacing the Next.js pages? Or Next.js stays for the marketing site and backend, with Flutter for the app on all three platforms?
6. Where does content come from (in-house, AI-assisted with review, licensed), and how many sets per section at launch?
7. Timeline, budget and team size. When is your own exam?
8. Speaking: is turn-based acceptable for the MVP, or is real-time conversation required?

Technical (answered in ARCHITECTURE.md / SECURITY.md):
- Speech-to-text and text-to-speech vendor for F7, and its EU data handling.
- Whether Claude inference can be kept in the EU, or what the DPA covers otherwise.
- Auth provider and sign-in methods.
- Hosting and database region.
- Response-time target and agreement threshold for AI evaluation.
- Data deletion period, including backups.

## 13. Definition of Done
- [ ] Requirements are implemented
- [ ] Critical user flows work on web, iOS and Android
- [ ] Tests pass, including content consistency and AI evaluation agreement checks
- [ ] Build succeeds for all three platforms
- [ ] Security requirements are satisfied (no answer key or API key reaches a client before grading)
- [ ] GDPR controls (export, deletion, consent) work end to end
- [ ] Documentation is updated
