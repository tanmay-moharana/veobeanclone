import Link from "next/link";

import { APP_NAME } from "@/lib/config";

const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          {APP_NAME}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/practice"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-strong"
        >
          Start practicing
        </Link>
      </div>
    </header>
  );
}
