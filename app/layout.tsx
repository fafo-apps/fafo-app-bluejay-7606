import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alhamdulillah Blog",
  description: "Reflections praising Allah — the Most Merciful, the Most Generous.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <nav className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
            <Link href="/" className="text-sm font-semibold tracking-wide text-emerald-700">
              Alhamdulillah
            </Link>
            <div className="text-xs text-zinc-500">Praise • Mercy • Gratitude</div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
