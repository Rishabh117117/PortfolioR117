# Housing Works — Page Build Spec

> **Rebuild note (current):** the live page is now the **scene-based, borderless,
> image-forward** presentation rebuild (researcher voice, parallax photos +
> scroll-drawn line-SVGs, 11 scenes), replacing the Phase-A 7-beat version
> described below. The two interactives (poster recreation, workshop harness)
> and all honesty rules below are unchanged. Motion (parallax/reveal/draw) lives
> in `app/work/housing-works/{Motion.tsx,hw-motion.css}`, scoped to this page.
> Photo slots are placeholders until frames land in
> `public/images/housing-works/` (see that folder's README). Title default = B.
> The §2 beat copy below is superseded by the researcher-voice copy in the page.

- **Route:** `/work/housing-works`
- **Status:** Ready to build. Phase A (shell + beats 1–5 + coda + poster widget) buildable now. Phase B (live harness) depends on `/api/ask` + OpenRouter (portfolio Phase 4).
- **Governed by:** `docs/DESIGN.md` (tokens, type, responsive) and `CLAUDE.md`. Reuse existing `Nav`, `Footer`, and the `/work/[slug]` template patterns. Build CSS modules, no Tailwind.
- **Drop location:** `docs/projects/housing-works.md`

---

## 0. Non-negotiables (honesty — read first)

1. **This was a team project.** A 3-person strategy team (originally a 6-person "Team People" group). Credit teammates by name and foreground Rishabh's actual slice. Do **not** imply solo authorship.
   - Rishabh's contribution: the **economic + competitive analysis**, the **survey statistics**, and **one of three interventions** — the Trustee-Led Workshop system.
   - Sharka: Hybrid Work Charter. Pani: Skill-Badge Passport / recognition.
2. **Label both interactive moments precisely** (exact strings in §9):
   - Poster widget = **recreation** of the real study instrument. Real study data shown; visitor responses are illustrative and **not stored**.
   - Harness = **working AI on synthetic data** *only when wired to live AI*. While running on the canned fallback it must read **"simulated,"** never "working AI."
3. **No Follow connection on this page.** The link between Housing Works and Follow lives on Follow's page, pointing back. Do not add a "this became Follow" callout anywhere here — including inside the harness.
4. **No overclaiming.** These are proposals, not a shipped pilot. The coda says so.

---

## 1. What this page proves

Housing Works is the portfolio's strongest **systems-thinker / researcher** evidence: real mixed-methods research turned into a defensible strategy, plus the ability to build the system that runs it. Two interactive moments each answer a "can he do X?":

- **Poster widget →** *can he design research people actually join?*
- **Workshop Harness →** *can he build the system that runs his strategy, not just propose it?*

Everything else on the page is the connective story that makes those two moments mean something.

---

## 2. Page structure — 7 beats

Build top-to-bottom in this order. Copy below is draft-ready in Rishabh's voice (plain, specific); lift or tighten. Mark image slots as placeholders until Phase 2 extraction (§6).

### Beat 1 — Hero: who Housing Works is
- **Asset:** the World AIDS Day memorial-tags photo (Rishabh's). Full-bleed or large.
- **Copy:** one line + the project label. **TODO (blocked on D-01 — pick one):**
  - A. *"Keeping a generation you can't outbid."*
  - B. *"How do you keep Gen Z when you can't compete on pay?"*
  - C. *"A nonprofit can't win on salary. So we found what it can win on."*
  - Default lean if D-01 = systems-thinker: **A** or **C**.
- Sub-label (mono): `STRATEGIC RESEARCH · PARSONS MS SDM · TEAM OF 3`
- No interaction. One image, one line.

### Beat 2 — The brief
> Housing Works has fought HIV and homelessness since 1990, funding health clinics, a pharmacy, and supportive housing through a chain of thrift stores. The model has a catch: it can't match corporate pay. With Gen Z set to be roughly 30% of the workforce by 2030, the studio's question was simple and hard — how do you attract, keep, and grow young talent without inflating payroll?
>
> This was a three-person strategy team. My share: the economic and competitive analysis, the survey statistics, and one of the three interventions — a Trustee-Led Workshop system.

This is also where the **team + role** line lives. Keep it short and honest, up front.

### Beat 3 — Discovery: how we listened → **POSTER WIDGET (§3)**
> We didn't guess what Gen Z wanted — we asked, in their space. Over spring 2025: field visits to three sites, a 127-response interactive poster survey across The New School, a Bridges & Barriers workshop, and a financial and competitive benchmark of nonprofit pay. The poster survey was the engine — provocative stat headlines, and anyone could write or draw a reply.

Then: `Try it →` the poster widget.

### Beat 4 — What we heard: the three openings (framework tap-through)
Interactive tap/accordion. Three blocks, each: **insight + a real quote (evidence) + the "how might we" reframe.** On desktop, optionally render as the vertical-line-with-nodes from the report (rebuilt natively). Mobile = accordion/stepper.

1. **Hybrid Autonomy & Trust**
   - Insight: Gen Z reads flexible/remote scheduling as respect and trust. Housing Works applied hybrid inconsistently — one staffer reported "*one day a week… some weeks not at all*," another was required "*in the office three days a week.*" The barrier was clarity and standardization, not technology.
   - HMW: *How might Housing Works write a hybrid charter so every employee feels understood and trusted?*
2. **Recognition & Community**
   - Insight: survey and workshop emphasized non-monetary recognition — "*Trust & autonomy is motivating,*" "*Freedom to work in my way :)*." One participant: "*It's not even just about the pay. It's also about being acknowledged.*" Soltis et al.: peer-recognition tokens lifted engagement ~15 points and cut absenteeism ~9%.
   - HMW: *How might surplus stock become peer gifts that link every thank-you to the mission and improve job satisfaction?*
3. **Career Clarity & Trustee Expertise**
   - Insight: unclear career paths were a top barrier — "*what is the next position I can be?*" Staff wanted 1:1s clarifying expectations and the path. Housing Works lists trustees with deep industry expertise that staff never touch. Boardman & Ponomariov: ~23-point gain in career clarity when trustees lead micro-workshops.
   - HMW: *How might trustees teach short lessons that upskill staff while turning hidden paths into clear ladders?*

### Beat 5 — The strategy: three coordinated moves
> Three coordinated interventions, one per team member: a **Hybrid Work Charter** (Sharka) to make flexibility fair and legible; a **Skill-Badge Passport** (Pani) turning recognition and surplus stock into visible thank-yous; and my piece — **Trustee-Led Skill & Career Workshops** — putting the board's untapped expertise to work as short, strategic lessons. Total cost: under $2,700 a year.

Visually tie each move back to its opening (Beat 4). Then hand off into the harness with a line like: *Here's mine, running.*

### Beat 6 — My piece, running → **WORKSHOP HARNESS (§4)**
> My intervention as a working system, on synthetic data. Pick a staff need; it matches the right trustee against the strategy, builds the 45-minute session, then captures it — transcript, one-minute summary, searchable archive.

Then the harness. Ends on its own merit (no Follow).

### Beat 7 — Honest coda
> What I'd flag honestly: the survey skewed toward design students, the workshop was a single session, and these are proposals, not yet a pilot. I'd validate with one store before scaling. AI tools assisted analysis and drafting throughout; the fieldwork, framing, and decisions are the team's.

End the page here.

---

## 3. Interactive moment 1 — Poster Survey (recreation)

**Goal:** make the visitor *do* the research method, then show real results.

**Scope (v1):** ONE interactive poster — the **work-modality** one (cleanest data). Show the other two posters as static photos in Beat 3. Architect so a second/third poster can be added later. *(Open: Rishabh may want all three — default to one.)*

**Behavior (mobile-first):**
1. Render a faithful poster: bold headline claim, the prompt, three tap chips.
   - Headline (the real on-poster provocation): **"72% of Gen Z prefer hybrid"** (vs 16% remote, 12% in-person).
   - Prompt: *"How do you prefer to work?"*
   - Chips: `Hybrid` · `In-person` · `Remote`
2. On tap, the choice animates in like a sticky note.
3. Reveal the **real collected result** (this is the honest payoff, and it differs from the headline on purpose):
   - *Of 31 responses on this poster: **52% hybrid, 23% in-person, 6% remote.*** (16 / 7 / 2.)
   - Surface 2–3 **real sticky-note quotes**: "*Hybrid work for life: no micromanagement = freedom to work*," "*I love HYBRID*," "*money is the motivation.*"
   - One-line framing of the gap: *the claim pulled people in; here's what they actually wrote.* (Methods insight, not a number-fudge.)
4. Footnote = the honest label (§9).

**Technical:** pure client-side. Visitor response is **ephemeral** (resets on reload). **No datastore, no persistence** unless Rishabh later opts in. No `<form>`.

---

## 4. Interactive moment 2 — Workshop Harness (working AI · synthetic data)

**Goal:** the framework as a working tool — *need × trustee skill × strategy → a generated workshop → a captured session.*

### 4a. Synthetic data (illustrative stand-ins; bake in)
```
STRATEGIC PRIORITIES (FY23–25): Retail revenue · Staff retention · Equity & inclusion · Hybrid flexibility

TRUSTEE BENCH:
- Maria Alvarez — Visual merchandising, retail operations
- David Chen — Digital marketing, social drop events
- Renée Thompson — Nonprofit finance, career coaching
- Marcus Webb — Brand strategy, mission storytelling

STAFF NEEDS (visitor picks one):
- Weak visual merchandising — Gramercy + 2 stores report inconsistent displays hurting sell-through.
- Unclear promotion paths — new retail hires can't see the next role or how to reach it.
- Thin digital skills — staff want to run Instagram drop events but lack the know-how.
```

### 4b. Flow
1. **Setup:** show the three inputs (needs as tap chips; trustee bench; priorities). One line: *need × trustee skill × strategy → the right workshop.* Button: **Generate workshop.**
2. **Generate:** call the AI (§4d). Render the workshop: title, matched trustee, objective, the **fixed 4-block agenda** (Intro 5 / Core Discussion 15 / Sprint 15 / Q&A 10) each with one concrete line, badge earned, the KPI it moves, `45 MIN` footer. Button: **Run the session.**
3. **Capture loop (the signature reveal — stagger the three steps):**
   - `LIVE TRANSCRIPT` — 5 short turns.
   - ↓ `1-MINUTE SUMMARY · AUTO` — the readout.
   - ↓ `ARCHIVED · SEARCHABLE` — topic tags + line: *Stored to the team's shared memory.*
   - **Stop there.** No Follow callout. The capture loop is a real feature of the workshop design (transcribe → summarize → archive was in the accessibility spec); it does not get a "became Follow" line.
4. Reset / try another need.

### 4c. Prompts (use verbatim; expect JSON only)
**Workshop:**
```
You are the engine inside a Trustee-Led Workshop system for Housing Works, a nonprofit running thrift retail to fund HIV and homelessness services. Match a staff development need against the board's skills and the org's strategic priorities, and design ONE short workshop.

STRATEGIC PRIORITIES (FY23–25): retail revenue growth, staff retention, equity & inclusion, hybrid flexibility.
TRUSTEE SKILL INVENTORY:
[inject bench]
STAFF NEED: [label — detail]

Pick the single best-matched trustee. Agenda MUST be exactly four blocks — Intro (5), Core Discussion (15), Sprint (15), Q&A (10) — each one concrete sentence, specific to retail/nonprofit work.

Respond with ONLY valid JSON, no fences, no preamble:
{"title":"","trustee":"","objective":"one sentence","agenda":[{"block":"Intro","minutes":5,"content":""},{"block":"Core Discussion","minutes":15,"content":""},{"block":"Sprint","minutes":15,"content":""},{"block":"Q&A","minutes":10,"content":""}],"badge":"","kpi":""}
```
**Session capture:**
```
A Housing Works trustee just delivered "[title]", led by [trustee], addressing: [need]. Produce a realistic capture as the system would record, transcribe, and auto-summarize it. Brief, believable, first names only.

Respond with ONLY valid JSON, no fences, no preamble:
{"transcript":[{"speaker":"","line":""}],"summary":"40–55 word one-minute readout with the key takeaway","tags":["3–5 short tags"]}
The transcript should have 5 short turns.
```
Parse defensively: strip ``` fences; if the text doesn't start with `{`, slice from first `{` to last `}` before `JSON.parse`.

### 4d. API contract + fallback
- **Live path:** client → `POST /api/ask` with `{ prompt, max_tokens: 1000 }`. The **server route** adds `OPENROUTER_API_KEY` (server-only env, added on Railway at Phase 4), calls OpenRouter, returns `{ text }`. **Rate-limit per IP.** Never expose the key client-side. Pick a capable instruct model on OpenRouter (Rishabh to confirm).
- **Fallback (pre-Phase-4):** behind a `HARNESS_LIVE = false` flag, return a **canned** example workshop + session so the page works without the API. While in this state the badge must read **"DEMO — simulated output,"** and copy must not claim "working AI." Flip to live + the real label only once `/api/ask` is wired.

---

## 5. Design & motion
- **Tokens:** per `DESIGN.md`. Accent = **#C0263B** (Housing Works). Paper `#F4F2EC`, ink `#1A1A1A`. The World AIDS Day **gradient** (pink → orange → teal) is accent *texture* only — a thin top rule, the poster header — used sparingly. The crimson echoes the AIDS red ribbon; keep it.
- **Type:** Bricolage Grotesque (headings, 500–600), Inter (body), **IBM Plex Mono** for labels, agenda, transcript, and all demo UI (the "machinery" voice).
- **Responsive:** mobile-first — 390 primary, 768 tablet, FHD desktop. Both interactive moments must work on touch everywhere; heavy motion is desktop progressive enhancement.
- **Motion:** micro-interactions snappy; content reveals hybrid; demo-proof (the capture loop) smooth and staggered. Respect `prefers-reduced-motion` with static fallbacks. Keep interaction as *proof*, not decoration.

---

## 6. Assets to extract (Phase 2 — mark slots TODO)
From the portfolio PDF / Housing Works report (all Rishabh's own photos):
- **Hero:** World AIDS Day memorial tags.
- **Discovery (Beat 3):** the three poster-survey photos + Bridges & Barriers workshop photos.
- **Texture:** boutique-style thrift-shop interiors; dispensary/health-center shots.
- **Diagrams (curriculum Venn, session structure):** rebuild natively in HTML/CSS to match the design system — do **not** embed the report JPEGs.

---

## 7. Build order & dependencies
- **Phase A (now):** page shell + Beats 1–5 + coda, static, placeholder hero + image placeholders. Poster widget (client-only — fully works now). Harness UI with the **simulated fallback**.
- **Phase B (portfolio Phase 4):** wire `/api/ask` → OpenRouter, flip `HARNESS_LIVE = true`, swap to the "working AI · synthetic data" label.
- **Phase 2 overlap:** slot real photos as they're extracted.

---

## 8. Open TODOs for Rishabh
1. **Hero line** — pick A/B/C (blocked on D-01, the portfolio's one impression).
2. **Photo extraction** — Phase 2.
3. **Poster scope** — confirm one poster (default) vs all three.
4. **OpenRouter model** + wire `/api/ask` for the live harness.
5. **Persist visitor poster responses?** Default = no (ephemeral). Opt-in only.

---

## 9. Honesty microcopy (exact strings)
- Poster widget footnote: **"A recreation of the participatory poster survey run at The New School, spring 2025. Real study results shown; your response is illustrative and not stored."**
- Harness badge, **live:** **"PROTOTYPE — working AI · synthetic data."**
- Harness badge, **fallback:** **"DEMO — simulated output · live AI coming soon."**
- Harness footnote: **"Matching and generation are real model output. Trustees, staff needs, and outcomes are illustrative stand-ins for private Housing Works data."**
