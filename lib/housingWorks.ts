// =============================================================================
// Housing Works — data for the page's poster survey deck + Bridges & Barriers
// gallery. (The old Workshop Harness synthetic data moved to lib/hwWorkshops.ts
// when the harness became the working Trustee Workshops prototype, HW-PROTO-1.)
// =============================================================================

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
  insight: string; // what this poster's answers actually told us — shown on the card
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
    insight:
      "The friction is about ways of working, not willingness to work.",
  },
  {
    id: "volunteer",
    img: "deck-2.jpg",
    stat: "56%",
    statText: "volunteer for meaning",
    question: "What core values drive you to volunteer, and where?",
    response: "The organizations have the same values as mine: help others.",
    insight:
      "Values fit decides where people give their time. The mission itself recruits.",
  },
  {
    id: "workforce",
    img: "deck-3.jpg",
    stat: "30%",
    statText: "of the workforce will be Gen Z by 2030",
    question: "What core values drive your decisions when choosing where to work?",
    response: "Work-life balance — space to grow without trading your health or peace.",
    insight:
      "Balance and room to grow came up before pay ever did.",
  },
  {
    id: "participate",
    img: "deck-4.jpg",
    stat: "3 in 10",
    statText: "U.S. employees actively participate in workplace activities",
    question: "What makes you proactively engage in workplace activities?",
    response: "I should be able to relate to it — and it should involve something fun.",
    insight:
      "Engagement follows relatability: make it theirs, and make it fun.",
  },
  {
    id: "salary",
    img: "deck-5.jpg",
    stat: "$48K / $57K",
    statText: "average nonprofit vs for-profit salary",
    question: "Which type of organization would you choose to work for, and why?",
    response: "Non-profit, because they create stronger communities.",
    insight:
      "Many choose the nonprofit anyway, for community. Pay isn't the whole story.",
  },
  {
    id: "hybrid",
    img: "deck-6.jpg",
    stat: "72%",
    statText: "of Gen Z prefer hybrid (vs 16% remote · 12% in-person)",
    question: "How do you prefer to work — online, in person, or a mix?",
    response: "Hybrid work for life: no micromanagement = freedom to work.",
    insight:
      "The loud 72% settled into 52 hybrid, 23 remote, 6 in person once people wrote down what they really wanted.",
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
    text: "A diverse Gen Z group: architecture, design, economics, drama; none from the nonprofit world.",
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
