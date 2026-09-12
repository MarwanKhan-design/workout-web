import { Icon } from "./ui";
import { Logo } from "./Navbar";

const columns = [
  {
    title: "Product",
    links: ["Session player", "Workout library", "Progress analytics", "Adaptive engine", "Apple Watch app", "What's new"],
  },
  {
    title: "Train",
    links: ["Strength programmes", "HIIT & conditioning", "Mobility & recovery", "Running plans", "Home workouts", "Coaches"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Press kit", "Science & method", "Partners", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help centre", "Community", "Beginner guide", "API docs", "Status", "Changelog"],
  },
];

const socials = [
  { name: "Instagram", d: "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0-2.2c2 0 2.2 0 3 .05 1.9.09 2.8 1 2.9 2.9.04.8.05 1 .05 3s0 2.2-.05 3c-.1 1.9-1 2.8-2.9 2.9-.8.04-1 .05-3 .05s-2.2 0-3-.05c-1.9-.1-2.8-1-2.9-2.9C6.01 14.2 6 14 6 12s0-2.2.05-3c.1-1.9 1-2.8 2.9-2.9.8-.04 1-.05 3-.05Zm5.5 1.3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" },
  { name: "YouTube", d: "M21.5 8.2a2.5 2.5 0 0 0-1.8-1.8C18.1 6 12 6 12 6s-6.1 0-7.7.4A2.5 2.5 0 0 0 2.5 8.2 26 26 0 0 0 2.1 12c0 1.3.1 2.6.4 3.8a2.5 2.5 0 0 0 1.8 1.8C5.9 18 12 18 12 18s6.1 0 7.7-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10.2 14.6V9.4l4.6 2.6-4.6 2.6Z" },
  { name: "X", d: "M17.5 4h2.8l-6.1 7 7.2 9h-5.6l-4.4-5.7L6.3 20H3.5l6.5-7.4L3.1 4h5.8l4 5.3L17.5 4Zm-1 14.2h1.6L8.6 5.7H6.9l9.6 12.5Z" },
  { name: "Strava", d: "M12.5 3 6 16h3.9l2.6-5.3 2.6 5.3H19L12.5 3Zm2.6 13-1.5 3-1.5-3H9.4l3.7 7.3L16.8 16h-1.7Z" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 pt-16 pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-volt-300/8 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/45">
              Workout Web is the training app for people who want the habit to stick. Beautiful
              sessions, honest data, and a plan that adapts to the life you actually have.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { top: "Download on the", bottom: "App Store" },
                { top: "Get it on", bottom: "Google Play" },
              ].map((badge) => (
                <a
                  key={badge.bottom}
                  href="#cta"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-all duration-400 hover:-translate-y-0.5 hover:border-volt-300/30 hover:bg-white/[0.07]"
                >
                  <Icon
                    name="bolt"
                    className="h-4 w-4 text-volt-300 transition-transform duration-400 group-hover:scale-110"
                  />
                  <span className="leading-tight">
                    <span className="block text-[0.6rem] tracking-[0.1em] text-white/40 uppercase">
                      {badge.top}
                    </span>
                    <span className="block text-[0.85rem] font-semibold text-white">
                      {badge.bottom}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-7 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#top"
                  aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-all duration-400 hover:-translate-y-1 hover:border-volt-300/35 hover:bg-volt-300/10 hover:text-volt-300"
                >
                  <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="currentColor" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.78rem] font-semibold tracking-[0.16em] text-white/85 uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="group inline-flex items-center text-[0.875rem] text-white/45 transition-colors duration-300 hover:text-white"
                      >
                        <span className="mr-0 h-px w-0 bg-volt-300 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-7 sm:flex-row">
          <p className="text-[0.8rem] text-white/35">
            © {new Date().getFullYear()} Workout Web Labs. Train hard, recover harder.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] text-white/35">
            {["Privacy", "Terms", "Security", "Accessibility", "Cookies"].map((l) => (
              <a key={l} href="#top" className="transition-colors hover:text-white/75">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[0.8rem] text-white/35">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-volt-300" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-volt-300" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
