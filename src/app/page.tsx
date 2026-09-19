import Benefits from "@/components/Benefits";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import ScrollProgress from "@/components/ScrollProgress";
import Showcase from "@/components/Showcase";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarhtaFit — Plan, log, and track your training.",
  description:
    "BarhtaFit helps you create workouts, log sessions, and track your progress over time.",
  alternates: {
    canonical: "/",
  },
};

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-white antialiased">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-volt-300 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <div aria-hidden className="noise-overlay" />
      <ScrollProgress />

      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Showcase />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
