import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { APP_NAME } from "@/lib/config";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: { default: `${APP_NAME} — German exam practice`, template: `%s · ${APP_NAME}` },
  description: "Practice telc German exams in the real format, with instant feedback.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
            <Link href="/" className="text-lg font-bold text-primary">
              {APP_NAME}
            </Link>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
