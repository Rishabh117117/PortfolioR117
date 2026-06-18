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

// ---- Gen Z poster deck (real posters + real responses) ----------------------
// The six provocative stat posters run across The New School campus, spring 2025.
// Stats are the on-poster headlines; responses are verbatim (lightly trimmed)
// from the campus poster transcript — clean, representative entries only.
export type PosterCard = {
  id: string;
  img: string; // file in /images/housing-works/
  stat: string;
  statText: string;
  question: string;
  response: string;
};

export const POSTER_DECK: PosterCard[] = [
  {
    id: "misunderstood",
    img: "deck-1.jpg",
    stat: "46%",
    statText: "of Gen Z feel misunderstood by Gen X’s old-school mindset",
    question:
      "What challenges do you face working with older generations, like Gen X?",
    response:
      "Dealing with Gen X’s commitment to tradition instead of ways that are different — and arguably healthier.",
  },
  {
    id: "volunteer",
    img: "deck-2.jpg",
    stat: "56%",
    statText: "volunteer for meaning",
    question: "What core values drive you to volunteer, and where?",
    response: "The organizations have the same values as mine: help others.",
  },
  {
    id: "workforce",
    img: "deck-3.jpg",
    stat: "30%",
    statText: "of the workforce will be Gen Z by 2030",
    question: "What core values drive your decisions when choosing where to work?",
    response: "Work-life balance — space to grow without trading your health or peace.",
  },
  {
    id: "participate",
    img: "deck-4.jpg",
    stat: "3 in 10",
    statText: "U.S. employees actively participate in workplace activities",
    question: "What makes you proactively engage in workplace activities?",
    response: "I should be able to relate to it — and it should involve something fun.",
  },
  {
    id: "salary",
    img: "deck-5.jpg",
    stat: "$48K / $57K",
    statText: "average nonprofit vs for-profit salary",
    question: "Which type of organization would you choose to work for, and why?",
    response: "Non-profit, because they create stronger communities.",
  },
  {
    id: "hybrid",
    img: "deck-6.jpg",
    stat: "72%",
    statText: "of Gen Z prefer hybrid (vs 16% remote · 12% in-person)",
    question: "How do you prefer to work — online, in person, or a mix?",
    response: "Hybrid work for life: no micromanagement = freedom to work.",
  },
];

// ---- Bridges & Barriers, told in the order the session ran (report pp.7,13) ----
// gather → map barriers on a four-level tree → identify the bridges → plot every
// fix on an effort × engagement graph → read off what will work.
// `fit: contain` shows a chart in full inside its frame; `cover` fills for photos.
export type BridgeStep = {
  img: string;
  title: string;
  text: string;
  alt: string;
  fit: "cover" | "contain";
};

export const BRIDGES_STEPS: BridgeStep[] = [
  {
    img: "bridges-room.jpg",
    title: "Six students, sixty minutes",
    text: "A diverse Gen Z group — architecture, design, economics, drama; none from the nonprofit world.",
    alt: "The workshop in session.",
    fit: "cover",
  },
  {
    img: "bridges-tree-clean.jpg",
    title: "A four-level tree",
    text: "The frame: volunteers at the roots, staff on the trunk, managers on the branches, leaders in the canopy.",
    alt: "The blank four-level tree framework before the exercise.",
    fit: "contain",
  },
  {
    img: "bridges-tree.jpg",
    title: "First, the barriers",
    text: "What blocks younger staff, mapped onto the tree level by level.",
    alt: "The four-level tree diagram with notes attached.",
    fit: "contain",
  },
  {
    img: "bridges-table.jpg",
    title: "Then, the bridges",
    text: "For each barrier, the enabler that could carry staff over it.",
    alt: "Participants working around the table.",
    fit: "cover",
  },
  {
    img: "bridges-place.jpg",
    title: "Onto the final graph",
    text: "Every bridge plotted on an effort-versus-engagement matrix.",
    alt: "A participant placing notes on the effort-versus-engagement matrix.",
    fit: "cover",
  },
  {
    img: "bridges-matrix.jpg",
    title: "What will work",
    text: "The payoff: high-impact, low-effort fixes rise to the top.",
    alt: "The effort-versus-engagement matrix covered in sticky notes.",
    fit: "contain",
  },
];
