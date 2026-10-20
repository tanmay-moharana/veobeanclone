"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { annualDiscountPercent, plans, type BillingPeriod } from "@/lib/pricing";

import { SectionHeading } from "./SectionHeading";

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading eyebrow="Pricing" title="Start free. Upgrade when you're close." text="Practice is free today. Paid plans will add AI feedback once it launches." />

        <div role="radiogroup" aria-label="Billing period" className="mx-auto mt-10 flex w-fit rounded-xl border border-border bg-surface p-1">
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={period === p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${period === p ? "bg-primary text-white shadow" : "text-muted hover:text-foreground"}`}
            >
              {p === "monthly" ? "Monthly" : (
                <>
                  Annual <span className={period === p ? "text-white/80" : "text-success"}>−{annualDiscountPercent}%</span>
                </>
              )}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const dark = plan.highlighted;
            const price = plan.price[period];
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-3xl p-8 ${dark ? "bg-gradient-to-br from-violet-700 to-fuchsia-600 text-white shadow-xl" : "border border-border bg-surface"}`}
              >
                {!plan.available && (
                  <span className="absolute -top-3 left-8 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
                    Coming soon
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className={`mt-1 text-sm ${dark ? "text-white/75" : "text-muted"}`}>{plan.tagline}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">{price === 0 ? "€0" : eur.format(price)}</span>
                  {price > 0 && <span className={dark ? "text-white/75" : "text-muted"}>/month</span>}
                </p>
                <p className={`mt-1 h-5 text-xs ${dark ? "text-white/70" : "text-muted"}`}>
                  {price > 0 && period === "annual" ? `Billed ${eur.format(price * 12)} per year` : price > 0 ? "Billed monthly" : ""}
                </p>
                <ul className="mt-7 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-white" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  {plan.available ? (
                    <Link
                      href="/practice"
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-strong"
                    >
                      Start practicing <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <span className="flex cursor-not-allowed items-center justify-center rounded-xl bg-white/90 px-5 py-3 font-semibold text-violet-700">
                      Available soon
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted">Prices are provisional and may change before launch.</p>
      </div>
    </section>
  );
}
