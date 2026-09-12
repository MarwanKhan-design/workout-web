export type Workout = {
  id: string;
  title: string;
  coach: string;
  category: "Strength" | "HIIT" | "Mobility" | "Cardio";
  minutes: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  kcal: number;
  rating: number;
  image: string;
  accent: string;
};

export const workouts: Workout[] = [
  {
    id: "w1",
    title: "Push Power — Chest & Shoulders",
    coach: "Maya Okafor",
    category: "Strength",
    minutes: 42,
    level: "Intermediate",
    kcal: 410,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/14623669/pexels-photo-14623669.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-volt-300/70 to-aqua-400/40",
  },
  {
    id: "w2",
    title: "Metcon 20 — Kettlebell Burner",
    coach: "Andre Silva",
    category: "HIIT",
    minutes: 20,
    level: "Advanced",
    kcal: 320,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4720230/pexels-photo-4720230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-orange-300/60 to-rose-400/40",
  },
  {
    id: "w3",
    title: "Deep Hip Reset Flow",
    coach: "Lena Hart",
    category: "Mobility",
    minutes: 18,
    level: "Beginner",
    kcal: 120,
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/8436465/pexels-photo-8436465.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-iris-300/60 to-aqua-300/40",
  },
  {
    id: "w4",
    title: "Zone 2 Engine Builder",
    coach: "Coach Rivera",
    category: "Cardio",
    minutes: 45,
    level: "Intermediate",
    kcal: 480,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/31000554/pexels-photo-31000554.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-sky-300/60 to-iris-300/40",
  },
  {
    id: "w5",
    title: "Heavy Pull — Back & Biceps",
    coach: "Maya Okafor",
    category: "Strength",
    minutes: 50,
    level: "Advanced",
    kcal: 520,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/6796971/pexels-photo-6796971.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-volt-300/60 to-emerald-300/40",
  },
  {
    id: "w6",
    title: "Sunrise Mobility 10",
    coach: "Lena Hart",
    category: "Mobility",
    minutes: 10,
    level: "Beginner",
    kcal: 70,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/16131201/pexels-photo-16131201.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-amber-200/60 to-volt-300/40",
  },
  {
    id: "w7",
    title: "Sprint Intervals — Track 8x400",
    coach: "Coach Rivera",
    category: "Cardio",
    minutes: 32,
    level: "Advanced",
    kcal: 430,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4065511/pexels-photo-4065511.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-cyan-300/60 to-iris-400/40",
  },
  {
    id: "w8",
    title: "Core Ladder — 12 Minute Finisher",
    coach: "Andre Silva",
    category: "HIIT",
    minutes: 12,
    level: "Intermediate",
    kcal: 180,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/7664140/pexels-photo-7664140.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
    accent: "from-rose-300/60 to-orange-300/40",
  },
];

export const categories = ["All", "Strength", "HIIT", "Mobility", "Cardio"] as const;

export const testimonials = [
  {
    quote:
      "I've started and quit six fitness apps. Workout Web is the first one that made showing up feel easy — the session opens, the weights are already there, I just lift.",
    name: "Priya Raman",
    role: "Product designer · 214-day streak",
    avatar:
      "https://images.pexels.com/photos/20085710/pexels-photo-20085710.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=220&w=220",
    stat: "+31% squat 1RM",
  },
  {
    quote:
      "The progress view is what hooked me. Seeing volume, streaks and PRs in one clean dashboard turned training into something I actually look forward to checking.",
    name: "Marcus Webb",
    role: "Firefighter · Strength track",
    avatar:
      "https://images.pexels.com/photos/17782869/pexels-photo-17782869.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=220&w=220",
    stat: "18 PRs this year",
  },
  {
    quote:
      "As a coach I run 40 clients through Workout Web. Programming takes minutes, and every athlete gets an interface that's impossible to misread mid-set.",
    name: "Maya Okafor",
    role: "S&C coach · Team of 40",
    avatar:
      "https://images.pexels.com/photos/8436400/pexels-photo-8436400.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=220&w=220",
    stat: "40 athletes managed",
  },
  {
    quote:
      "Twenty-minute sessions that adapt when I'm wrecked from a night shift. It never guilt-trips me, it just reshapes the plan and keeps the streak alive.",
    name: "Jonah Keller",
    role: "ICU nurse · Hybrid plan",
    avatar:
      "https://images.pexels.com/photos/28455391/pexels-photo-28455391.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=220&w=220",
    stat: "3.4 sessions / week",
  },
  {
    quote:
      "The auto-progression is scarily good. It nudged my bench up 2.5kg exactly when I was ready — no spreadsheet, no second-guessing.",
    name: "Elena Duarte",
    role: "Founder · Powerbuilding",
    avatar:
      "https://images.pexels.com/photos/14236897/pexels-photo-14236897.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=220&w=220",
    stat: "+12.5kg bench",
  },
  {
    quote:
      "Beautiful, fast, and it works offline in my basement gym. That combination basically doesn't exist anywhere else.",
    name: "Theo Lindqvist",
    role: "Engineer · Home gym",
    avatar:
      "https://images.pexels.com/photos/10501522/pexels-photo-10501522.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=220&w=220",
    stat: "126 home sessions",
  },
];

export const faqs = [
  {
    q: "Do I need a gym or equipment to use Workout Web?",
    a: "No. Every program has a full-gym, home-minimal and bodyweight variant. Tell us what you have — a pair of dumbbells, a pull-up bar, or nothing at all — and the library filters instantly so every session you see is one you can actually do today.",
  },
  {
    q: "How does the app know how much weight I should lift?",
    a: "Workout Web learns from every logged set. It watches your reps in reserve, bar speed feedback and session ratings, then proposes the next load automatically. You can always override it — one tap, and the model adapts to your preference.",
  },
  {
    q: "Can I follow my own program instead of a preset one?",
    a: "Absolutely. Build custom sessions with the drag-and-drop planner, duplicate weeks, set progression rules, or import a spreadsheet. Coaches on the Team plan can push programs to every athlete at once.",
  },
  {
    q: "Does it sync with my watch and other health apps?",
    a: "Yes. Two-way sync with Apple Health, Google Fit, Garmin, Whoop and Strava. Heart rate streams live into the session player, and completed workouts land in your health record within seconds.",
  },
  {
    q: "What happens if I miss a week?",
    a: "Nothing bad. Streak Shields cover planned rest and life-happens weeks, and the planner reflows your remaining sessions so you return to a realistic plan instead of a backlog of guilt.",
  },
  {
    q: "Is there a free plan, and can I cancel anytime?",
    a: "There's a generous free tier with the full library preview and unlimited logging for three sessions a week. Paid plans are month-to-month, cancel in two clicks, and every new account starts with a 14-day Pro trial — no card required.",
  },
];

export const pricing = [
  {
    name: "Starter",
    tagline: "For getting the habit locked in.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    highlight: false,
    features: [
      "3 guided sessions per week",
      "Unlimited manual workout logging",
      "Core progress dashboard",
      "Apple Health & Google Fit sync",
      "Community challenges",
    ],
  },
  {
    name: "Pro",
    tagline: "For people training with real intent.",
    monthly: 14,
    yearly: 9,
    cta: "Start 14-day trial",
    highlight: true,
    features: [
      "Everything in Starter",
      "Full 1,800+ workout library",
      "Adaptive auto-progression engine",
      "Advanced analytics, PRs & volume trends",
      "Offline session player + downloads",
      "Form-check video feedback",
      "Streak Shields & recovery planning",
    ],
  },
  {
    name: "Team",
    tagline: "For coaches, studios and squads.",
    monthly: 39,
    yearly: 29,
    cta: "Talk to us",
    highlight: false,
    features: [
      "Everything in Pro",
      "Up to 50 athlete seats",
      "Program builder & bulk assignment",
      "Client compliance dashboard",
      "White-label branding",
      "Priority support & onboarding",
    ],
  },
];
