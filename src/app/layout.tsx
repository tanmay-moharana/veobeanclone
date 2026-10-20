import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
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
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
