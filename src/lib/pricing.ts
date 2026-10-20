// Placeholder plans for the landing page. Prices are not final, and nothing is
// charged yet: paid plans show "Coming soon" until payments are wired up.

export type BillingPeriod = "monthly" | "annual";

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Price per month in EUR for each billing period. */
  price: Record<BillingPeriod, number>;
  features: string[];
  available: boolean;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Everything you need to start",
    price: { monthly: 0, annual: 0 },
    features: ["All telc B1 practice sections", "Instant answer checking", "Explanation for every answer", "Writing tasks with word count"],
    available: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For your final weeks before the exam",
    price: { monthly: 9.99, annual: 5.99 },
    features: ["Everything in Free", "AI feedback on your writing", "AI speaking partner", "Progress tracking across sections", "A1, A2 and B2 practice"],
    available: false,
    highlighted: true,
  },
];

export const annualDiscountPercent = 40;
