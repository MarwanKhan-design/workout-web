import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

/* ---------------------------------- Button --------------------------------- */

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 will-change-transform",
        size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "bg-volt-300 text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] hover:-translate-y-0.5 hover:bg-volt-200 hover:shadow-[0_18px_44px_-12px_rgba(214,255,102,0.75)] active:translate-y-0",
        variant === "outline" &&
          "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10",
        variant === "ghost" && "text-white/70 hover:text-white",
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <span className="shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-30" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

/* ----------------------------------- Chip ---------------------------------- */

export function Pill({
  children,
  className,
  icon,
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.14em] text-white/70 uppercase backdrop-blur-md",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* ------------------------------ Section heading ----------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-volt-300 uppercase">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-volt-300/80" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="mt-4 text-[2rem] leading-[1.08] font-semibold text-balance text-white sm:text-4xl lg:text-[2.9rem]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p
            className={cn(
              "mt-5 text-[1.02rem] leading-relaxed text-pretty text-white/55",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* --------------------------------- Ambient --------------------------------- */

export function Orb({
  className,
  color = "rgba(214,255,102,0.22)",
  delay = "0s",
}: {
  className?: string;
  color?: string;
  delay?: string;
}) {
  return (
    <div
      aria-hidden
      style={{ background: `radial-gradient(circle, ${color} 0%, transparent 68%)`, animationDelay: delay }}
      className={cn("animate-orb pointer-events-none absolute rounded-full blur-[90px]", className)}
    />
  );
}

/* ---------------------------------- Icons ---------------------------------- */

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const paths = {
  play: <path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" stroke="none" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 9-12h-6.5L13 2Z" />,
  dumbbell: (
    <>
      <path d="M6.5 6.5v11M3 9v5M17.5 6.5v11M21 9v5M6.5 12h11" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 19V9.5M12 19V5M17 19v-6" />
    </>
  ),
  flame: (
    <path d="M12 2.5s5.5 4.2 5.5 9.2a5.5 5.5 0 1 1-11 0c0-1.8 1-3.4 2-4.4.2 1.6 1.1 2.6 2 2.6 1.3 0 1.6-2.6 1.5-7.4Z" />
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 7.5 3.1C19.5 15.4 12 20 12 20Z" />
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 10v4l2.5 1.5M9.5 2.5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8.5 3v4M15.5 3v4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.8 20a6.4 6.4 0 0 1 12.4 0" />
      <path d="M16.5 5.4a3.5 3.5 0 0 1 0 6.4M18 20a6.5 6.5 0 0 0-2-4.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.1 7 9.3 4.1-1.2 7-5 7-9.3V5.8L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  watch: (
    <>
      <rect x="7" y="6" width="10" height="12" rx="3.2" />
      <path d="M9.5 6V3.5h5V6M9.5 18v2.5h5V18M12 10v2.5l1.6 1" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4.5 12 7.5 4 7.5-4M4.5 16.5 12 20.5l7.5-4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  star: (
    <path
      d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  quote: (
    <path
      d="M9.5 6C6.5 7.4 5 9.9 5 13.4V18h5.6v-5.6H8.2c0-2 .9-3.4 2.6-4.3L9.5 6Zm8.4 0c-3 1.4-4.5 3.9-4.5 7.4V18H19v-5.6h-2.4c0-2 .9-3.4 2.6-4.3L17.9 6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5v1.5A3.5 3.5 0 0 0 7.5 11M17 6h2.5v1.5A3.5 3.5 0 0 1 16.5 11M9.5 20h5M12 14v6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 9.5h16.8M3.6 14.5h16.8M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
} as const;
