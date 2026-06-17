// =============================================================================
// Housing Works — synthetic data + canned fallback for the Workshop Harness.
// See docs/projects/housing-works.md §4. All people/needs/outcomes here are
// illustrative stand-ins for private Housing Works data (honesty: §9).
// =============================================================================

/** Flip to true ONLY once /api/ask → OpenRouter is wired (portfolio Phase 4). */
export const HARNESS_LIVE = false;

export const STRATEGIC_PRIORITIES = [
  "Retail revenue",
  "Staff retention",
  "Equity & inclusion",
  "Hybrid flexibility",
] as const;

export type Trustee = { name: string; skills: string };

export const TRUSTEE_BENCH: Trustee[] = [
  { name: "Maria Alvarez", skills: "Visual merchandising, retail operations" },
  { name: "David Chen", skills: "Digital marketing, social drop events" },
  { name: "Renée Thompson", skills: "Nonprofit finance, career coaching" },
  { name: "Marcus Webb", skills: "Brand strategy, mission storytelling" },
];

export type StaffNeed = { id: string; label: string; detail: string };

export const STAFF_NEEDS: StaffNeed[] = [
  {
    id: "merchandising",
    label: "Weak visual merchandising",
    detail:
      "Gramercy + 2 stores report inconsistent displays hurting sell-through.",
  },
  {
    id: "promotion",
    label: "Unclear promotion paths",
    detail: "New retail hires can't see the next role or how to reach it.",
  },
  {
    id: "digital",
    label: "Thin digital skills",
    detail: "Staff want to run Instagram drop events but lack the know-how.",
  },
];

export type AgendaBlock = { block: string; minutes: number; content: string };
export type Workshop = {
  title: string;
  trustee: string;
  objective: string;
  agenda: AgendaBlock[];
  badge: string;
  kpi: string;
};
export type SessionCapture = {
  transcript: { speaker: string; line: string }[];
  summary: string;
  tags: string[];
};

// ---- Canned fallback outputs (used while HARNESS_LIVE === false) -------------
export const CANNED_WORKSHOP: Record<string, Workshop> = {
  merchandising: {
    title: "Displays That Sell: A Visual Merchandising Clinic",
    trustee: "Maria Alvarez",
    objective:
      "Equip store leads to build consistent, high-converting displays across all three sites.",
    agenda: [
      {
        block: "Intro",
        minutes: 5,
        content:
          "Maria frames why consistent merchandising lifts sell-through and ties it to this quarter's retail revenue goal.",
      },
      {
        block: "Core Discussion",
        minutes: 15,
        content:
          "Walk real photos of the Gramercy floor and diagnose what's pulling the eye — and what isn't.",
      },
      {
        block: "Sprint",
        minutes: 15,
        content:
          "Teams restyle one display section using a shared three-rule checklist, then compare before and after.",
      },
      {
        block: "Q&A",
        minutes: 10,
        content:
          "Open troubleshooting on tricky fixtures, donated-stock variety, and holding standards week to week.",
      },
    ],
    badge: "Visual Merchandising I",
    kpi: "Sell-through rate",
  },
  promotion: {
    title: "From Here to Next: Mapping Your Retail Career",
    trustee: "Renée Thompson",
    objective:
      "Give new retail hires a clear view of the next role and the concrete steps to reach it.",
    agenda: [
      {
        block: "Intro",
        minutes: 5,
        content:
          "Renée shares her own nonprofit career path and names the roles a store hire can grow into.",
      },
      {
        block: "Core Discussion",
        minutes: 15,
        content:
          "The group maps the real ladder from associate to store lead and the skills each rung needs.",
      },
      {
        block: "Sprint",
        minutes: 15,
        content:
          "Each person drafts a one-page next-role plan with two skills to build this quarter.",
      },
      {
        block: "Q&A",
        minutes: 10,
        content:
          "Coaching on raises, lateral moves, and how to ask a manager for a growth conversation.",
      },
    ],
    badge: "Career Pathway Navigator",
    kpi: "Staff retention rate",
  },
  digital: {
    title: "Run the Drop: Instagram Events for Thrift Retail",
    trustee: "David Chen",
    objective:
      "Teach store staff to plan and run a simple Instagram drop event that pulls foot traffic.",
    agenda: [
      {
        block: "Intro",
        minutes: 5,
        content:
          "David shows two thrift drop campaigns and what made them convert to in-store visits.",
      },
      {
        block: "Core Discussion",
        minutes: 15,
        content:
          "Break down the anatomy of a drop post — hook, hero item, timing, and call to action.",
      },
      {
        block: "Sprint",
        minutes: 15,
        content:
          "Pairs build a real drop post for next week's standout donated piece, captions included.",
      },
      {
        block: "Q&A",
        minutes: 10,
        content:
          "Questions on scheduling tools, replying to comments, and staying on-brand and on-mission.",
      },
    ],
    badge: "Social Drop Producer",
    kpi: "Retail revenue growth",
  },
};

export const CANNED_SESSION: Record<string, SessionCapture> = {
  merchandising: {
    transcript: [
      { speaker: "Maria", line: "Front table at Gramercy — what's the first thing your eye lands on?" },
      { speaker: "Jordan", line: "Honestly, nothing. It's all one height, so it reads flat." },
      { speaker: "Maria", line: "Right. Pick one hero piece, raise it, let everything else support it." },
      { speaker: "Priya", line: "So we style around a single anchor instead of filling every inch?" },
      { speaker: "Maria", line: "Exactly. Give the good pieces room to breathe — negative space sells too." },
    ],
    summary:
      "Maria led store leads through a hands-on merchandising clinic, diagnosing the Gramercy floor and teaching a three-rule approach: anchor each display with one hero piece, vary height, and use negative space. Teams restyled a section live and left with a shared checklist for consistent standards.",
    tags: ["merchandising", "retail", "sell-through", "store-ops", "training"],
  },
  promotion: {
    transcript: [
      { speaker: "Renée", line: "Where do you see yourself a year from now — even if it's fuzzy?" },
      { speaker: "Sam", line: "I like the floor, but I don't know what's above associate." },
      { speaker: "Renée", line: "There's lead, then assistant manager — each a skill set, not just seniority." },
      { speaker: "Alex", line: "So if I learn scheduling and inventory, I'm building toward lead?" },
      { speaker: "Renée", line: "Yes. Write those two down — that's your plan for this quarter." },
    ],
    summary:
      "Renée coached new retail hires through their options, mapping the ladder from associate to store lead and the skills each rung requires. Each participant left with a one-page next-role plan naming two concrete skills to build this quarter, turning a vague path into clear, reachable steps.",
    tags: ["career-clarity", "retention", "coaching", "promotion", "retail"],
  },
  digital: {
    transcript: [
      { speaker: "David", line: "What makes you stop scrolling? That instinct is your whole strategy." },
      { speaker: "Mia", line: "A good photo, and feeling like I'll miss out if I wait." },
      { speaker: "David", line: "Exactly — hook plus urgency. Now pick next week's hero item." },
      { speaker: "Leo", line: "The vintage denim jacket. Tease it Thursday, drop it Saturday." },
      { speaker: "David", line: "Perfect. Write the caption now, while the idea's hot." },
    ],
    summary:
      "David walked store staff through running an Instagram drop event, breaking down the hook, hero item, timing, and call to action. Pairs built a real drop post for next week's standout donation, captions included, and left able to plan a simple campaign that turns followers into foot traffic.",
    tags: ["social-media", "instagram", "drop-event", "retail-revenue", "digital-skills"],
  },
};

// ---- Honesty microcopy (exact strings, §9) ----------------------------------
export const HARNESS_BADGE_LIVE = "PROTOTYPE — working AI · synthetic data";
export const HARNESS_BADGE_FALLBACK = "DEMO — simulated output · live AI coming soon";
export const HARNESS_FOOTNOTE_LIVE =
  "Matching and generation are real model output. Trustees, staff needs, and outcomes are illustrative stand-ins for private Housing Works data.";
// Fallback footnote — must NOT claim real model output while simulated.
export const HARNESS_FOOTNOTE_FALLBACK =
  "This is a canned example, not live model output. Trustees, staff needs, and outcomes are illustrative stand-ins for private Housing Works data.";
export const POSTER_FOOTNOTE =
  "A recreation of the participatory poster survey run at The New School, spring 2025. Real study results shown; your response is illustrative and not stored.";
