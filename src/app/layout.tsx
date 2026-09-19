import "./globals.css";
import { Inter, Inter_Tight } from "next/font/google";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barhtafit.com"),

  title: {
    default: "BarhtaFit — Plan, log, and track your training.",
    template: "%s | BarhtaFit",
  },

  description:
    "BarhtaFit helps you create workouts, log sessions, and track your progress over time.",

  applicationName: "BarhtaFit",

  openGraph: {
    title: "BarhtaFit — Plan, log, and track your training.",
    description:
      "Create workouts, log sessions, and track your progress with BarhtaFit.",
    url: "https://www.barhtafit.com",
    siteName: "BarhtaFit",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${interTight.variable} font-sans bg-ink-950 text-white min-h-screen antialiased selection:bg-volt-300 selection:text-ink-950`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
