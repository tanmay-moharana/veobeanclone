import Link from "next/link";

import { APP_NAME } from "@/lib/config";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "telc B1 practice",
    links: [
      { href: "/practice/telc-b1/leseverstehen", label: "Leseverstehen" },
      { href: "/practice/telc-b1/sprachbausteine", label: "Sprachbausteine" },
      { href: "/practice/telc-b1/hoerverstehen", label: "Hörverstehen" },
      { href: "/practice/telc-b1/schreiben", label: "Schreiben" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#1a1622] text-white/70">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold text-white">{APP_NAME}</p>
          <p className="mt-3 max-w-sm text-sm leading-6">
            German exam practice in the real format, with an explanation for every answer.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-6 text-xs leading-5 text-white/50">
          {APP_NAME} is an independent practice tool and is not affiliated with or endorsed by telc gGmbH or the
          Goethe-Institut. Exam names are used only to describe the formats we practice.
        </p>
      </div>
    </footer>
  );
}
