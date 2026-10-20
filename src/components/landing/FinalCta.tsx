import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-600 py-20 text-center text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
      />
      <div className="relative mx-auto max-w-3xl px-4">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Practice today. <span className="text-amber-300">Pass with confidence.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
          One section takes about ten minutes. Start with the one you&apos;re least sure about.
        </p>
        <Link
          href="/practice"
          className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-violet-700 shadow-lg hover:bg-violet-50"
        >
          Start practicing free <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
