import { ArrowRight, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-600 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium">
            telc B1 available now · more levels coming
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Practice the German exam <span className="text-amber-300">the way it&apos;s really set</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
            Work through reading, grammar, listening and writing tasks in the real telc format. Check your answers
            instantly and learn why each one is right.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-violet-700 shadow-lg hover:bg-violet-50"
            >
              Start practicing free <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold hover:bg-white/20"
            >
              See how it works
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/70">No account needed. Pick a section and start.</p>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

/** Static preview of the exercise player's feedback state. */
function HeroCard() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md text-foreground lg:mx-0 lg:justify-self-end">
      <div className="absolute -inset-4 -z-0 rounded-3xl bg-white/10 blur-2xl" />
      <div className="relative rounded-2xl bg-surface p-5 shadow-2xl sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Sprachbausteine · Teil 1</p>
        <p className="mt-3 leading-8">
          Seit zwei Wochen wohne ich in Hamburg, und es gefällt{" "}
          <span className="rounded-md border border-danger/40 bg-danger-soft px-1.5 font-medium text-danger">
            <span className="mr-1 text-xs opacity-70">22</span>mich
          </span>{" "}
          hier sehr gut.
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-3 rounded-lg border border-danger bg-danger-soft px-3 py-2">
            <XCircle className="size-4 text-danger" /> <b>a</b> mich
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-success bg-success-soft px-3 py-2">
            <CheckCircle2 className="size-4 text-success" /> <b>b</b> mir
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 opacity-60">
            <span className="size-4" /> <b>c</b> ich
          </div>
        </div>
        <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3 text-sm text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="flex items-center gap-1.5 font-semibold">
            <Lightbulb className="size-4" /> Why &ldquo;mir&rdquo;?
          </p>
          <p className="mt-1">
            <i>gefallen</i> takes the dative: &ldquo;Es gefällt <b>mir</b>.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
