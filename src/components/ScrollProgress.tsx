'use client'

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "./ui";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      setProgress(p);
      setShowTop(doc.scrollTop > 900);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-volt-300 via-aqua-400 to-iris-400 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "glass-strong fixed right-4 bottom-5 z-50 grid h-11 w-11 place-items-center rounded-full text-white/70 transition-all duration-500 hover:-translate-y-1 hover:text-volt-300 sm:right-6 sm:bottom-7",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <Icon name="arrow" className="h-4 w-4 -rotate-90" />
      </button>
    </>
  );
}
