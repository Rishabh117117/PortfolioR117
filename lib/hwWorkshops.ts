/* =========================================================================
   Trustee Workshops — data + matching math for the working prototype on
   /work/housing-works (and /work/housing-works/prototype).

   HONESTY: trustees, staff needs, sessions, and every figure are ILLUSTRATIVE
   stand-ins for private Housing Works data — realistic in shape, invented in
   content. The app surfaces this label on-product. The matching score is a
   real, explainable computation over these stand-ins (skill fit × strategic
   fit × trustee load), not model output.
   ========================================================================= */

export type HwTrustee = {
  id: string;
  name: string;
  role: string; // one-line background
  skills: string[]; // tags the matcher scores on
  skillLine: string; // display line
  priorities: string[]; // strategic priorities they map to naturally
  load: number; // sessions already led this quarter
};

export type HwNeed = {
  id: string;
  label: string;
  detail: string;
  dept: string;
  votes: number; // staff upvotes from the pulse survey (illustrative)
  skills: string[]; // what would address it
  priority: string; // the strategic priority it serves
};

export type HwAgendaBlock = { block: string; minutes: number; content: string };

export type HwTemplate = {
  needId: string;
  title: string;
  objective: string;
  agenda: HwAgendaBlock[]; // always 4 blocks · 5/15/15/10
  badge: string;
  kpi: string;
};

export type HwTurn = { speaker: string; line: string };
export type HwCapture = { transcript: HwTurn[]; summary: string; insight: string; tags: string[] };

export type HwArchived = {
  id: string;
  when: string; // quarter · week label (static — no live dates)
  title: string;
  trustee: string;
  needLabel: string;
  attendees: number;
  rating: number; // /5 post-session pulse
  summary: string;
  tags: string[];
  badge: string;
  duration: string; // e.g. "45 min"
  insight: string; // the one-sentence takeaway, shown highlighted when expanded
  transcript?: HwTurn[]; // absent only for legacy/defensive entries
};

export const HW_PROJECT = {
  name: "Housing Works · People team",
  meta: "Trustee-led workshops · FY25",
  url: "workshops.housingworks.internal/people",
};

export const HW_HONESTY =
  "Concept prototype · illustrative data — trustees, needs, and sessions are invented stand-ins for private Housing Works data";

export const HW_PRIORITIES = [
  "Retail revenue",
  "Staff retention",
  "Equity & inclusion",
  "Hybrid flexibility",
] as const;

/* Per-session program cost (materials + refreshments; trustee time is
   volunteered) — the page's "$2,700/yr for all three frameworks" hook. */
export const HW_SESSION_COST = 45;
export const HW_YEAR_BUDGET = 900; // this framework's slice

export const HW_TRUSTEES: HwTrustee[] = [
  {
    id: "maria",
    name: "Maria Alvarez",
    role: "Retail merchandising director (ret.)",
    skills: ["merchandising", "store-design", "retail-ops"],
    skillLine: "Visual merchandising · retail operations",
    priorities: ["Retail revenue"],
    load: 1,
  },
  {
    id: "david",
    name: "David Chen",
    role: "Digital marketing lead",
    skills: ["digital-marketing", "social-media", "events"],
    skillLine: "Digital marketing · social drop events",
    priorities: ["Retail revenue"],
    load: 0,
  },
  {
    id: "renee",
    name: "Renée Thompson",
    role: "Nonprofit CFO · career coach",
    skills: ["finance", "career-coaching", "management"],
    skillLine: "Nonprofit finance · career coaching",
    priorities: ["Staff retention"],
    load: 2,
  },
  {
    id: "marcus",
    name: "Marcus Webb",
    role: "Brand strategist",
    skills: ["brand", "storytelling", "mission-comms"],
    skillLine: "Brand strategy · mission storytelling",
    priorities: ["Staff retention", "Equity & inclusion"],
    load: 1,
  },
];

export const HW_NEEDS: HwNeed[] = [
  {
    id: "merchandising",
    label: "Weak visual merchandising",
    detail: "Gramercy + 2 stores report inconsistent displays hurting sell-through.",
    dept: "Retail · 3 stores",
    votes: 12,
    skills: ["merchandising", "store-design"],
    priority: "Retail revenue",
  },
  {
    id: "promotion",
    label: "Unclear promotion paths",
    detail: "New retail hires can't see the next role or how to reach it.",
    dept: "Retail · all stores",
    votes: 9,
    skills: ["career-coaching", "management"],
    priority: "Staff retention",
  },
  {
    id: "digital",
    label: "Thin digital skills",
    detail: "Staff want to run Instagram drop events but lack the know-how.",
    dept: "Retail · marketing",
    votes: 8,
    skills: ["digital-marketing", "social-media"],
    priority: "Retail revenue",
  },
  {
    id: "intake",
    label: "Donation intake bottlenecks",
    detail: "Back-of-house piles up on weekends; floor restocks lag behind.",
    dept: "Operations",
    votes: 7,
    skills: ["retail-ops", "merchandising"],
    priority: "Retail revenue",
  },
  {
    id: "storytelling",
    label: "Mission storytelling on the floor",
    detail: "Staff can't tell shoppers where the money goes — the best sales tool sits unused.",
    dept: "Retail · frontline",
    votes: 6,
    skills: ["storytelling", "mission-comms"],
    priority: "Staff retention",
  },
  {
    id: "budgets",
    label: "Budget basics for store leads",
    detail: "New leads inherit P&L responsibility with no finance grounding.",
    dept: "Retail · management",
    votes: 5,
    skills: ["finance", "management"],
    priority: "Staff retention",
  },
];

/* ------------------------- workshop templates ------------------------- */

export const HW_TEMPLATES: Record<string, HwTemplate> = {
  merchandising: {
    needId: "merchandising",
    title: "Displays That Sell: A Visual Merchandising Clinic",
    objective: "Equip store leads to build consistent, high-converting displays across all three sites.",
    agenda: [
      { block: "Intro", minutes: 5, content: "Maria frames why consistent merchandising lifts sell-through and ties it to this quarter's retail revenue goal." },
      { block: "Core Discussion", minutes: 15, content: "Walk real photos of the Gramercy floor and diagnose what's pulling the eye — and what isn't." },
      { block: "Sprint", minutes: 15, content: "Teams restyle one display section using a shared three-rule checklist, then compare before and after." },
      { block: "Q&A", minutes: 10, content: "Open troubleshooting on tricky fixtures, donated-stock variety, and holding standards week to week." },
    ],
    badge: "Visual Merchandising I",
    kpi: "Sell-through rate",
  },
  promotion: {
    needId: "promotion",
    title: "From Here to Next: Mapping Your Retail Career",
    objective: "Give new retail hires a clear view of the next role and the concrete steps to reach it.",
    agenda: [
      { block: "Intro", minutes: 5, content: "Renée shares her own nonprofit career path and names the roles a store hire can grow into." },
      { block: "Core Discussion", minutes: 15, content: "The group maps the real ladder from associate to store lead and the skills each rung needs." },
      { block: "Sprint", minutes: 15, content: "Each person drafts a one-page next-role plan with two skills to build this quarter." },
      { block: "Q&A", minutes: 10, content: "Coaching on raises, lateral moves, and how to ask a manager for a growth conversation." },
    ],
    badge: "Career Pathway Navigator",
    kpi: "Staff retention rate",
  },
  digital: {
    needId: "digital",
    title: "Run the Drop: Instagram Events for Thrift Retail",
    objective: "Teach store staff to plan and run a simple Instagram drop event that pulls foot traffic.",
    agenda: [
      { block: "Intro", minutes: 5, content: "David shows two thrift drop campaigns and what made them convert to in-store visits." },
      { block: "Core Discussion", minutes: 15, content: "Break down the anatomy of a drop post — hook, hero item, timing, and call to action." },
      { block: "Sprint", minutes: 15, content: "Pairs build a real drop post for next week's standout donated piece, captions included." },
      { block: "Q&A", minutes: 10, content: "Questions on scheduling tools, replying to comments, and staying on-brand and on-mission." },
    ],
    badge: "Social Drop Producer",
    kpi: "Retail revenue growth",
  },
  intake: {
    needId: "intake",
    title: "Clear the Back Room: Intake That Keeps Up",
    objective: "Give ops staff a triage system so weekend donations reach the floor before they pile up.",
    agenda: [
      { block: "Intro", minutes: 5, content: "Maria connects intake speed to floor freshness — the fastest lever on weekend revenue." },
      { block: "Core Discussion", minutes: 15, content: "Map the current weekend pileup step by step and mark where donations actually stall." },
      { block: "Sprint", minutes: 15, content: "Design a two-bin triage rule and a restock trigger for one store, ready to pilot Saturday." },
      { block: "Q&A", minutes: 10, content: "Volunteer scheduling, donation surges after holidays, and safe-lifting basics." },
    ],
    badge: "Intake Flow I",
    kpi: "Donation time-to-floor",
  },
  storytelling: {
    needId: "storytelling",
    title: "Where the Money Goes: Telling It on the Floor",
    objective: "Give every frontline person a 20-second mission story they're comfortable telling.",
    agenda: [
      { block: "Intro", minutes: 5, content: "Marcus tells the two-sentence version of where a $10 purchase actually goes." },
      { block: "Core Discussion", minutes: 15, content: "What shoppers really ask at the register — and where the awkward silences happen." },
      { block: "Sprint", minutes: 15, content: "Everyone drafts and rehearses their own 20-second version, in their own words." },
      { block: "Q&A", minutes: 10, content: "Handling hard questions, sensitive topics, and keeping the story honest." },
    ],
    badge: "Mission Voice",
    kpi: "Engagement + conversion",
  },
  budgets: {
    needId: "budgets",
    title: "Read the Store Numbers: P&L Basics for Leads",
    objective: "Make a store P&L readable for every new lead, so budget talk stops being a black box.",
    agenda: [
      { block: "Intro", minutes: 5, content: "Renée puts one real (anonymized) store P&L on the wall and demystifies each line." },
      { block: "Core Discussion", minutes: 15, content: "Walk a month together: where money comes in, where it quietly leaks." },
      { block: "Sprint", minutes: 15, content: "Each lead finds the one line on their own sheet they could move this quarter." },
      { block: "Q&A", minutes: 10, content: "Donated-stock accounting quirks, seasonal swings, and what to flag upward." },
    ],
    badge: "Store Numbers I",
    kpi: "Shrink + margin awareness",
  },
};

/* --------------------------- session captures -------------------------- */

export const HW_CAPTURES: Record<string, HwCapture> = {
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
    insight:
      "One hero piece with room to breathe outsells a table packed edge to edge.",
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
    insight:
      "A vague future becomes a plan the moment someone names two skills and a timeframe.",
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
    insight:
      "A hook plus real urgency turns a drop post into foot traffic — a nice photo alone won't.",
    tags: ["social-media", "instagram", "drop-event", "retail-revenue", "digital-skills"],
  },
  intake: {
    transcript: [
      { speaker: "Maria", line: "Walk me through Saturday morning. A van pulls up — then what?" },
      { speaker: "Dre", line: "Everything goes to the same back table. By noon you can't move." },
      { speaker: "Maria", line: "So the sort happens twice. Two bins at the door: floor-ready and process." },
      { speaker: "Kim", line: "And floor-ready skips the table entirely? That's half the pile gone." },
      { speaker: "Maria", line: "Right. Then a simple trigger: when a rack hits ten gaps, someone restocks." },
    ],
    summary:
      "Maria worked the ops team through their weekend intake jam, splitting the sort into a two-bin door triage — floor-ready versus needs-processing — plus a ten-gap restock trigger. The team left with a one-store pilot plan for Saturday and a shared definition of 'floor-ready' to keep it honest.",
    insight:
      "Sorting once at the door beats sorting twice at the table, every Saturday.",
    tags: ["intake", "store-ops", "process", "time-to-floor", "pilot"],
  },
  storytelling: {
    transcript: [
      { speaker: "Marcus", line: "A shopper asks where the money goes. What do you say — right now?" },
      { speaker: "Tasha", line: "Um… services? I honestly keep it vague so I don't get it wrong." },
      { speaker: "Marcus", line: "Vague kills it. Try: 'This store funds HIV and homelessness services — your $10 is real care.'" },
      { speaker: "Rob", line: "That's two sentences. I could actually say that at the register." },
      { speaker: "Marcus", line: "Now make it yours. Say it like you, not like a brochure." },
    ],
    summary:
      "Marcus turned the mission into a tool every frontline person can hold: a 20-second, two-sentence story of where the money goes. The group surfaced the questions shoppers actually ask, drafted personal versions, and rehearsed them aloud — replacing vague answers with confident, honest ones.",
    insight:
      "Two honest sentences beat a vague answer every time a shopper asks where the money goes.",
    tags: ["mission", "storytelling", "frontline", "engagement", "training"],
  },
  budgets: {
    transcript: [
      { speaker: "Renée", line: "This is a real store month, names removed. Where does the money come in?" },
      { speaker: "Ana", line: "Sales, obviously — but I didn't realize how big weekend spikes are." },
      { speaker: "Renée", line: "Now find the quiet leak. Look at supplies and shrink lines." },
      { speaker: "Ben", line: "Shrink is bigger than our whole supplies budget. That's fixable." },
      { speaker: "Renée", line: "That's your line, then. One number, one quarter — watch what happens." },
    ],
    summary:
      "Renée demystified a store P&L line by line for new leads — where money comes in, where it quietly leaks. Each lead picked one number on their own sheet to move this quarter, most landing on shrink, and left knowing how to flag budget issues upward without the jargon.",
    insight:
      "Watching one leaking line for a quarter teaches more than trying to read the whole P&L at once.",
    tags: ["finance", "p-and-l", "store-leads", "shrink", "management"],
  },
};

/* ----------------------------- archive seed ---------------------------- */

export const HW_ARCHIVE_SEED: HwArchived[] = [
  {
    id: "seed-mission",
    when: "Q2 · wk 1",
    title: "The Mission in Two Minutes",
    trustee: "Marcus Webb",
    needLabel: "Donor tour storytelling",
    attendees: 7,
    rating: 4.6,
    summary:
      "Marcus rebuilt the standard donor-tour talk track into a two-minute arc — one client story, one number, one ask — and had development staff deliver it back live. The room agreed to retire the fact-sheet script.",
    tags: ["storytelling", "donors", "mission", "development"],
    badge: "Mission Voice",
    duration: "45 min",
    insight:
      "One client story lands harder than four fact bullets — donors remember people, not statistics.",
    transcript: [
      { speaker: "Marcus", line: "Your donor tour script has four fact bullets before it has one story. Why?" },
      { speaker: "Naomi", line: "Because facts feel safe — I'm worried I'll forget a number if I don't read it." },
      { speaker: "Marcus", line: "Numbers matter, but pick one. Lead with a person, land on that single number." },
      { speaker: "Chris", line: "So: one story, one number, one ask — in that order, every time?" },
      { speaker: "Marcus", line: "Every time. Now stand up and give me the two-minute version, live." },
    ],
  },
  {
    id: "seed-photo",
    when: "Q1 · wk 8",
    title: "One Photo, One Post",
    trustee: "David Chen",
    needLabel: "Store phone photography",
    attendees: 11,
    rating: 4.8,
    summary:
      "David taught floor staff to shoot donated pieces on a store phone — window light, one clean backdrop, no editing apps — and post same-day. Three stores started a shared photo corner the following week.",
    tags: ["social-media", "photography", "retail", "digital-skills"],
    badge: "Social Drop Producer",
    duration: "45 min",
    insight: "Good window light and a same-day post beat a filtered photo a week late.",
    transcript: [
      { speaker: "David", line: "Find me the best light in this store, right now, without leaving the room." },
      { speaker: "Wendy", line: "By the front window — but there's a mannequin in the way." },
      { speaker: "David", line: "Move the mannequin. One clean backdrop beats a busy one every time." },
      { speaker: "Theo", line: "What about editing apps? Everyone uses filters." },
      { speaker: "David", line: "Skip them. Real light and same-day posting beat a filtered photo a week late." },
    ],
  },
  {
    id: "seed-interview",
    when: "Q1 · wk 5",
    title: "Interview Like You Mean It",
    trustee: "Renée Thompson",
    needLabel: "Hiring-panel confidence",
    attendees: 6,
    rating: 4.5,
    summary:
      "Renée coached store managers on structured interviewing: three signal questions, consistent scoring, and how to sell a mission job honestly against private-sector pay. Panels now share one rubric.",
    tags: ["hiring", "management", "retention", "coaching"],
    badge: "People Manager I",
    duration: "45 min",
    insight:
      "Three consistent, story-based questions on one shared rubric beat gut-feeling interviews.",
    transcript: [
      { speaker: "Renée", line: "Tell me the last interview question you asked that actually told you something." },
      { speaker: "Grace", line: "Honestly? I mostly ask if they're a team player. Everyone says yes." },
      { speaker: "Renée", line: "Right — so ask for a story instead: 'Tell me about a time you disagreed with a manager.'" },
      { speaker: "Felix", line: "And we all score it the same way, so it's not just gut feeling?" },
      { speaker: "Renée", line: "Exactly — same three questions, same rubric, every panel. Consistency is what makes it fair." },
    ],
  },
  {
    id: "seed-displays",
    when: "Q1 · wk 3",
    title: "Displays That Sell — Gramercy pilot",
    trustee: "Maria Alvarez",
    needLabel: "Visual merchandising (pilot)",
    attendees: 9,
    rating: 4.7,
    summary:
      "The pilot clinic that started the program: Maria's hero-piece / height / negative-space rules, applied live to the Gramercy front table. Sell-through on restyled sections was tracked for four weeks after.",
    tags: ["merchandising", "pilot", "retail", "sell-through"],
    badge: "Visual Merchandising I",
    duration: "45 min",
    insight: "The whole pilot rode on one rule: raise one hero piece and give it room to breathe.",
    transcript: [
      { speaker: "Maria", line: "This is the first time we're trying this, so bear with me — what do you see on this table?" },
      { speaker: "Dana", line: "Just stuff. A lot of stuff, all the same height." },
      { speaker: "Maria", line: "That's the tell. Pick one piece, raise it, and give everything else room to breathe." },
      { speaker: "Yusuf", line: "We restyled it — can we track whether it actually sells better?" },
      { speaker: "Maria", line: "Four weeks, same table. If sell-through moves, this becomes the whole program." },
    ],
  },
];

/* ------------------------------ matching ------------------------------- */

export type HwMatch = {
  trustee: HwTrustee;
  score: number; // 0–100
  skillPts: number; // of 55
  priorityPts: number; // of 25
  loadPts: number; // of 20
  overlap: string[]; // matched skill tags
  why: string;
};

/** Explainable match scoring: skill fit (55) + strategic fit (25) + load (20). */
export function matchTrustees(need: HwNeed, extraLoad: Record<string, number> = {}): HwMatch[] {
  return HW_TRUSTEES.map((t) => {
    const overlap = need.skills.filter((s) => t.skills.includes(s));
    const skillPts = Math.round((overlap.length / need.skills.length) * 55);
    const priorityPts = t.priorities.includes(need.priority) ? 25 : 10;
    const load = t.load + (extraLoad[t.id] || 0);
    const loadPts = Math.round(Math.max(0, 1 - load / 3) * 20);
    const score = skillPts + priorityPts + loadPts;
    const why =
      overlap.length > 0
        ? `Covers ${overlap.join(" + ")}; ${
            t.priorities.includes(need.priority)
              ? `already aligned to ${need.priority.toLowerCase()}`
              : `stretch on ${need.priority.toLowerCase()}`
          }; ${load === 0 ? "fresh this quarter" : `${load} session${load > 1 ? "s" : ""} this quarter`}.`
        : `No direct skill overlap — would need outside prep. ${
            load === 0 ? "Has capacity, but wrong bench." : "Better saved for their own lane."
          }`;
    return { trustee: t, score, skillPts, priorityPts, loadPts, overlap, why };
  }).sort((a, b) => b.score - a.score);
}

/* --------------------- assistant grounding context --------------------- */

export function hwAssistantContext(
  archive: HwArchived[],
  queued: { title: string; trustee: string; needLabel: string }[],
  openNeeds: HwNeed[],
): string {
  const stats = `Program: ${archive.length} sessions run · ${archive.length} badges issued · $${
    archive.length * HW_SESSION_COST
  } of $${HW_YEAR_BUDGET}/yr used · avg rating ${
    archive.length
      ? (archive.reduce((s, a) => s + a.rating, 0) / archive.length).toFixed(1)
      : "—"
  }/5.`;
  const bench = HW_TRUSTEES.map(
    (t) => `- ${t.name} (${t.role}): ${t.skillLine}; ${t.load} session(s) this quarter`,
  ).join("\n");
  const arch = archive
    .map(
      (a) =>
        `- "${a.title}" — ${a.trustee}, ${a.when}, ${a.attendees} attendees, ${a.rating}/5, tags [${a.tags.join(
          ", ",
        )}]. ${a.summary.slice(0, 180)}`,
    )
    .join("\n");
  const q = queued.length
    ? queued.map((s) => `- "${s.title}" — ${s.trustee} (for: ${s.needLabel})`).join("\n")
    : "- none";
  const needs = openNeeds.map((n) => `- ${n.label} (${n.dept}, ${n.votes} votes)`).join("\n");
  return [
    stats,
    `Trustee bench:\n${bench}`,
    `Scheduled (not yet run):\n${q}`,
    `Open needs queue:\n${needs}`,
    `Archive (searchable session memory):\n${arch}`,
  ].join("\n\n");
}

export const HW_ASSISTANT_PROMPTS = [
  "Who should teach Instagram drops?",
  "What did Maria's pilot cover?",
  "Which open need would you run next?",
  "What has the program cost so far?",
];
