# Healthy Materials — Page Build Spec (REBUILD)

> **STATUS — BUILT & VERIFIED (2026-06-29, HM-PAGE-2).** This spec is implemented:
> 10-section page, MaterialDeck carousel + recoloured AmbientField + data-driven
> Timeline + kept SwapCard, real assets in `public/images/healthy-materials/`.
> `next build` clean. NOT yet committed/pushed (deploy branch `claude/*`). Open
> items unchanged — see §9 (real dates, author split, CO₂ source).

> **Rebuild note (2026-06-29):** the live page (`app/work/healthy-materials/`, built
> 2026-06-25 to the stale 2026-06-17 Downloads spec) predates the **final capstone deck +
> field-visit photos** that arrived 2026-06-28. This spec supersedes that build. We
> **rebuild the page body** and **harvest the keepers**: `SwapCard.tsx`/`.module.css`, the
> sage/teal/clay theme vars, the real researched copy + interview quotes, and the salvageable
> CSS blocks (research-question block, theme/quote cards, concept cards). We **add** three
> reused mechanisms — a Follow-style deck **timeline**, the Housing-Works **moving-card deck**
> (the "Gen Z poster survey" carousel pattern), and the Follow **AmbientField** ambient motion
> (recoloured green/earth). We **delete** the dead `Motion.tsx` + `hm-motion.css` (parallax
> engine with zero targets). Components are **copy-and-renamed per page** — the live Follow and
> Housing Works pages are NOT touched.

- **Route:** `/work/healthy-materials` (already in `BESPOKE_SLUGS`, already a flagship in `lib/projects.ts`)
- **Status:** Ready to build. No API dependency (SwapCard is self-contained, like the current build).
- **Governed by:** `docs/DESIGN.md` (locked v1.0 tokens), `CLAUDE.md`. Reuse `Nav`/`Footer` from the layout. CSS modules, no Tailwind.
- **Source material:** `Desktop/Claude/healthy-materials/` (9 field photos + `_thumbs/`), the capstone deck (`Capstone Final Presentation.pptx`, 43 slides; 1–26 = talk, 27–43 = appendix).

---

## 0. Non-negotiables (honesty — read first)

1. **Two-author project, with a clear personal focus.** Capstone 2025, **Rishabh Salian & Henry Schroder** — the research (field visit, interviews, synthesis) was done **together**; credit Henry by name, never imply solo authorship. **But "Healthy Materials Packages" (intervention ①) is substantially Rishabh's idea, and the page centers on it** — it's the lead intervention and the one the `SwapCard` demo makes tangible (§9). Frame the shared research honestly ("we"), then foreground Package ① as Rishabh's contribution (like the Housing Works role line). The other two interventions are supporting context, not the headline.
2. **Status badge `GRADUATE RESEARCH · CONCEPT`** must render on the page **and** match `lib/projects.ts` + the `/work` card + the home grid (it's already the registered status; the current page fails to render it — fix that).
3. **The interactive (`SwapCard`) is a concept prototype.** Keep its honest caption: `concept prototype · directional vs business-as-usual · not measured data`. **No fabricated numbers anywhere** — directional reads only (Cost comparable · Carbon ↓ · Health ↑).
4. **Interview quotes are verbatim + attributed:** Alison Mears (Director, Healthy Materials Lab), Omir Majeed (Project Manager, CBRE), Ricardo Ortiz (regenerative architect). Do not paraphrase into their mouths.
5. **Cite the headline stat.** "~37% of global energy-related CO₂" needs a source (UNEP / Global Status Report for Buildings & Construction). Add a footnote/source line.
6. **Photo provenance is split and must stay honest:**
   - The **9 field-visit photos are authentic** (Rishabh's own, HML / Parsons, 2025-10-01) — they carry the page.
   - The **4 material close-ups are web-sourced** (we don't have studio shots). Use openly-licensed images (Wikimedia Commons / manufacturer press / CC), record attribution in `public/images/healthy-materials/CREDITS.md`, and treat them as *illustrative of the material category*, not as field documentation.

---

## 1. What this page proves

Healthy Materials is the portfolio's **systems-research → intervention** evidence: real mixed-methods fieldwork (a materials-library field visit + three practitioner interviews) synthesised into a **leverage-point** analysis of *why good materials stall*, then turned into **three buildable interventions** — one of which is made tangible as an interactive.

- **The research arc (timeline) →** *can he run and structure real qualitative systems research?*
- **The field visit (card deck) →** *did he actually go look, and can he show it?*
- **SwapCard →** *can he turn the research into a tool someone could actually use?*

---

## 2. Page structure — 9 sections (top-to-bottom)

Alternating **teal / paper** rhythm (keep the current build's surface cadence). Copy below is draft-ready from the deck; lift or tighten in Rishabh's voice. Image slots flagged `[ASSET]`.

### §1 — HERO (teal)
- **Eyebrow (mono):** `graduate design research · healthy materials lab, parsons`
- **Badge:** `GRADUATE RESEARCH · CONCEPT` (the registered status — must appear)
- **H1 (display):** *Healthy, low-carbon materials are **already** here.* / *The question is whether our processes will let them in.* (the deck's closing line, repurposed as the thesis)
- **Sub-line / authors (mono):** `Capstone 2025 · Rishabh Salian & Henry Schroder`
- **[ASSET]** full-bleed hero = HML library wide shot (`20251001_160458` — the "for a healthier Material Library" wall)
- Scroll cue. AmbientField glows behind.

### §2 — THE FRAME / WHY (paper)
- **Kicker:** `the frame`
- Hook: *"We have so many exciting materials — why do they rarely make it past the exhibition wall?"*
- Body: construction is **~37% of global energy-related CO₂** [source]; affordable-housing context; the Healthy Materials Lab at Parsons as the anchor.
- **Research question, set large (display):** *How might we increase the adoption of innovative low-carbon materials in construction?*
- **Scope definition** (a small inline spectrum, from deck slide 6): materials that **both** significantly cut embodied carbon **and** are commercially buyable today — Mineral/Technical (clay · mineral coatings · carbon-cured concrete) → Non-standard bio-based (hemp · straw · cellulose · mycelium). *Not early R&D or lab prototypes.*

### §3 — THE JOURNEY (paper) → **FOLLOW-STYLE TIMELINE**
- **Kicker:** `the journey` · **H2:** `How I researched this`
- Deck-style horizontal timeline (see §3-mechanism). Milestones (dates TBD — user supplies):
  1. Literature scan + HML library access *(field research)*
  2. Field visit — Donghia Healthy Materials Lab *(field research)*
  3. Interview — Alison Mears, Director, HML *(expert interview)*
  4. Interview — Ricardo Ortiz, regenerative architect *(expert interview)*
  5. Interview — Omir Majeed, PM, CBRE *(expert interview)*
  6. Insight development → affinity mapping *(synthesis)*
  7. Ecosystem mapping + overlay *(synthesis)*
  8. Leverage points identified *(milestone)*
  9. Three prototype concepts *(milestone)*
  - *(Ecovative field visit = pending; contractor/manufacturer interviews = next steps — mark as forward-looking, not done.)*
- **Clubbed beneath** (Follow's `.clubbed` pattern — hairline border): *Why these methods* (deck slide 31): adoption is a **systems** problem (interviews + ecosystem mapping reveal how decisions move across actors); barriers are cultural/procedural/regulatory (qualitative captures nuance surveys miss); the goal was to find **intervention points**, not measure attitudes (visual synthesis makes them explicit).

### §4 — INSIDE THE HEALTHY MATERIALS LAB (teal) → **HOUSING-WORKS MOVING-CARD DECK**
- **Kicker:** `field visit` · **H2:** `Inside the Healthy Materials Lab`
- One-line intro: a field visit to the Donghia HML at Parsons — a library you can pull open drawer by drawer.
- **Moving carousel** of the 9 field photos (see §4-mechanism). Each card = photo + mono caption + a pulled detail. Click → lightbox. Card set:
  | img | caption | detail |
  |---|---|---|
  | library wide | *The library wall* | "Designed for a healthier material library." |
  | taxonomy drawers (160728) | *Organised like a hardware store for health* | Wall Assemblies · Flooring · Insulation · Acoustic… |
  | category drawers (160738) | *Every category, openable* | Flooring · Dimensional Surfaces · Wall Coverings · Paints · Special Collections |
  | structural/cladding (160741) | *From cladding to ceilings* | Exterior & Cladding · Structural · Wall Assemblies |
  | Bloom Foam card (160852) | *A sample you can hold* | "Bloom Foam — microalgae." Non-circulating, barcoded. |
  | overhead jars (160604) | *Hundreds of catalogued samples* | Each tagged, classified, traceable. |
  | BioFabricate poster (161336) | *The vocabulary of biomaterials* | Biobased · Biosynthetic · Biofabricated · Bioassembled. |
  | plastics poster (161341) | *Your choices matter* | Plastics, ranked Avoid → Better. |
  | sustainability wheel (162808) | *What "healthy" actually measures* | Waste · Water · Circularity · Carbon · Health · Social. |
- Hint: `Hover to pause · tap a photo to enlarge`.

### §5 — MEET THE MATERIALS (teal) → **STATIC GALLERY GRID** (BridgesGallery pattern)
- **Kicker:** `the materials`
- 4–5 material cards (web-sourced close-ups, `fit:cover`), qualitative line each (no fake numbers):
  - **Mycelium composite** — bio-grown blocks from fungal mycelium + ag waste; lightweight, compostable.
  - **Bloom foam (microalgae)** — foam from harvested algae biomass; we held the actual sample at HML.
  - **Hempcrete** — hemp hurd + lime; carbon-storing, breathable, non-structural infill.
  - **Straw panel** — compressed agricultural straw; seasonal, high insulation.
  - *(optional 5th)* **Carbon-cured concrete** — CO₂ mineralised into the cure (the "buyable today" technical end of the spectrum).

### §6 — THE PROBLEM: FOUR THEMES (paper band) → salvaged theme/quote cards
- **Kicker:** `what's actually blocking adoption`
- Four real themes (deck slides 13–16), each a quote card:
  1. **Policy, codes & standards** — *"In more novel systems like in the hemp area, there weren't any standard specifications in any of the building codes."* — Alison Mears. Novel materials sit outside normal code/test/spec pathways; approvers/insurers default to the familiar.
  2. **Cost & market pressures** — *"It's the cold truth of construction. They will never spend more; they will only do it if they have to."* — Omir Majeed (CBRE). Low-bid procurement + contingency fear → value-engineered back to cheapest conventional.
  3. **Process & supply** — *"Smaller markets don't have backup suppliers, which means lead times stretch and cost goes up."* — Alison Mears. Thin, fragile supply chains; one supplier, long lead times → teams revert to what's on the shelf.
  4. **Awareness & education** — *"If I'm not aware, I don't know to ask. If I'm aware, I create a market force for better materials."* — Alison Mears. Intent gets lost between design, spec, procurement, and site.

### §7 — THE INSIGHT: DECISIONS CASCADE (paper) → small static diagram
- **Kicker:** `the turn`
- Central insight (deck slide 17): *Adoption doesn't scale through individual persuasion. Decisions are made in a **cascading order** — that's where **leverage points** develop.*
- The **5 leverage points** (deck slide 19), as a small cascading-actors diagram or numbered rail:
  1. **Owner awareness & priorities** — early RFP/standards asks give the whole team permission.
  2. **Standard creation & testing** — shared tests/specs turn "experimental" into "normal."
  3. **PM training & planning** — protects healthy specs from schedule/cost/substitution pressure.
  4. **Contractor-controlled decisions** — support + substitution guidance flips a common blocker into a driver.
  5. **Supply transparency** — trusted info on available, tested products lowers perceived risk.

### §8 — FROM INSIGHT TO INTERVENTION (paper) → salvaged concept cards
- **Kicker:** `three interventions`
- Three concept cards (deck slides 21–24), each with a "builds on…" provenance line:
  1. **Healthy Materials Packages** *(flag: "the one I'd build first")* — pre-assembled spec packages for common NYC interior scopes (unit reno, corridor, lobby, bathroom) swapping in vetted lower-carbon materials with a cost + maintenance + carbon comparison to business-as-usual. *Builds on: HML curated collections; NYC Enterprise Green Communities Criteria + NYC Overlay.*
  2. **Supplier Transparency & Vetting Dashboard** — approved suppliers, product health/carbon data, lead times, "safe substitutions" per category. *Builds on: mindful MATERIALS Common Materials Framework; HPD Public Repository.*
  3. **On-Site Contractor Training & Material Intro Kit** — sample boards, install cards, short safety videos, a "substitution playbook" of pre-approved alternatives. *Builds on: HML educational programs; LEED low-emitting-materials guidance + USGBC training.*

### §9 — MADE TANGIBLE (paper band + teal card) → **SwapCard (KEPT)**
- **Kicker:** `the intervention, made tangible`
- Intro: prototype ① made real — pick an interior scope, see the swap + directional reads.
- `<SwapCard />` unchanged (chips: unit/corridor/bathroom → conventional → healthy + pitch; reads Cost/Carbon/Health; honesty caption).

### §10 — CLOSE + REFLECTION (teal)
- Closing line (display): *Healthy, low-carbon materials are here. The question is whether our processes will let them in.*
- **Reflection** (deck slide 25): *Stick to what you're good at — focus on practical improvements, not industry-wide disruption.*
- **Next steps** (deck slide 43): finish stakeholder interviews (contractors, manufacturers); finalise affinity mapping → key adoption barriers; continue collaboration with HML.
- Credit (mono): `Healthy Materials Lab, Parsons School of Design · with Henry Schroder`.

---

## 3. Mechanism — Follow-style timeline (§3)

Follow's timeline is a **hand-coded inline SVG** (`follow/page.tsx` 62–212; CSS `follow.module.css` 222–281) — no data array, every coordinate hand-placed. **For HM, build it data-driven** so the user's later dates are a one-line edit, not an SVG renumber.

- **New file:** `app/work/healthy-materials/Timeline.tsx` (client or server — pure SVG, no state → server is fine).
- **Inputs** (from `lib/healthyMaterials.ts`):
  ```ts
  type TLMarker = "field" | "expert" | "synthesis" | "milestone"; // → dot fill: ink / accent / hollow / sage
  type TLEntry  = { x: number; side: "above" | "below"; marker: TLMarker; title: string; sub: string };
  type TLTick   = { x: number; label: string };
  type TLPivot  = { x: number; title: string; sub: string };
  ```
  Render the repeated **4-node cluster** (connector `<line>` + `<circle>` + title `<text>` + sub `<text>`) via `.map()`. `viewBox="0 0 1120 300"`, `preserveAspectRatio`, one comprehensive `aria-label` built from the entries.
- **CSS:** copy Follow's `.tlLegend*` / `.tlScroll` (`min-width:840px` → horizontal scroll on mobile) / `.tlFoot` into `healthy-materials.module.css`. Reads global tokens; `--accent` = sage.
- **Legend:** Field research (ink dot) · Expert interview (sage/accent dot) · Synthesis (hollow dot) · Milestone (small bar). Tune labels to the 4 markers above.
- **Clubbed block:** copy Follow's `.clubbed` + two-column research list for the "Why these methods" sub-block.
- **PENDING INPUT:** real dates → fill `TLTick[]` (axis) + each entry's `sub`. Until then use season labels (`Spring '25`, `Fall '25`, …) as placeholders.

## 4. Mechanism — Housing-Works moving-card deck (§4) + static grid (§5)

The "Gen Z poster survey" carousel is **`WorkshopDeck`** (a 52s linear marquee, duplicated track for a seamless −50% loop, hover/focus pause, edge-fade `mask-image`, click→lightbox, reduced-motion→scroll-snap). The static 6-up grid is **`BridgesGallery`** (`fit: cover|contain`, same lightbox). **Copy-and-rename both** (decision: isolate from live pages):

- **`components/MaterialDeck/`** ← copy of `WorkshopDeck/` (carousel for §4 field photos). Change `const IMG = "/images/healthy-materials"`, swap data import to `FIELD_DECK`, relabel caption fields + alt/aria from poster-speak to photo-speak.
- **`components/MaterialGallery/`** ← copy of `BridgesGallery/` (static grid for §5 materials). Same `IMG` change, data import `MATERIAL_GRID`.
- Both recolour automatically off `var(--accent)` (sage) — no hex in the component CSS.
- *(Optional cleanup, low priority: both copies duplicate the lightbox. A shared `components/Lightbox/` would DRY three copies — defer unless time allows; copy-rename is the agreed path.)*
- **New data file `lib/healthyMaterials.ts`:**
  ```ts
  export type FieldCard = { id: string; img: string; caption: string; detail: string };
  export type MaterialCard = { id: string; img: string; name: string; line: string; fit: "cover" | "contain" };
  export const FIELD_DECK: FieldCard[];      // the 9 field photos (table in §4)
  export const MATERIAL_GRID: MaterialCard[]; // the 4–5 materials (§5)
  export const FIELD_FOOTNOTE = "Field visit to the Donghia Healthy Materials Lab, Parsons School of Design, Oct 2025.";
  ```

## 5. Mechanism — AmbientField ambient motion (recoloured)

Copy `follow/AmbientField.{tsx,css}` → `app/work/healthy-materials/AmbientField.{tsx,css}` (copy-rename; do not touch Follow's). Four blurred orbs, side-to-side sine drift + pointer parallax + scroll colour cross-fade.

- **Palette swap (CSS gradients):** orange→**green** (forest/sage, e.g. `rgba(92,122,58,…)` = `#5C7A3A`, `rgba(143,176,106,…)` = `#8FB06A`); blue→**earth/clay** (`rgba(176,118,63,…)` = `#B0763F`). Keep centre alpha in the original 0.14–0.20 band. Update the header comments.
- **Scroll arc:** retune the `a`/`b` ramp windows + weight endpoints in the rAF loop to HM's section boundaries (e.g. neutral intro → green-dominant through the problem/insight → warm earth toward the interventions/close). If a two-act arc feels off for this calmer topic, keep both colours closer/steadier.
- **Hardening:** add the real `document.hidden` guard the original comment promises (early-return inside `loop` + `visibilitychange`).
- **Wiring:** mount as the **first child** inside `styles.page`; wrap all content in `styles.pageContent` with `position:relative; z-index:1` (copy that rule). `.ambient` stays `position:fixed; inset:0; z-index:0; pointer-events:none; aria-hidden`.
- Respects `prefers-reduced-motion` (already does — keep).

---

## 6. Assets

### 6a. Field photos (authentic, 9) — process from `Desktop/Claude/healthy-materials/Pictures/`
- **Rotate upright** (all are 90° sideways), strip EXIF, resize ~1600px long edge, compress < ~300KB, save to `public/images/healthy-materials/`. Re-encode `20251001_162808` (corrupt JPEG bytes). Name semantically (`library-wall.jpg`, `taxonomy-drawers.jpg`, `categories.jpg`, `cladding-structural.jpg`, `bloom-foam-card.jpg`, `samples-overhead.jpg`, `biofabricate-poster.jpg`, `plastics-poster.jpg`, `sustainability-wheel.jpg`).

### 6b. Material close-ups (web-sourced, 4–5) — DECISION: source high-res from the web
- Find openly-licensed high-res images for: **mycelium composite/brick**, **hempcrete**, **straw panel/bale construction**, **bloom foam / microalgae foam**, *(opt.)* **carbon-cured concrete**.
- Prefer Wikimedia Commons / manufacturer press kits / CC. Download → resize/compress → `public/images/healthy-materials/`. Record source + license in `public/images/healthy-materials/CREDITS.md`.

---

## 7. Conventions / registration (already mostly in place)

- `lib/projects.ts`: HM entry exists — `accent #5C7A3A`, `year "2025–26"`, `discipline "Materials · Research"`, `status "GRADUATE RESEARCH · CONCEPT"`. Keep. Page `rootStyle --accent` **must** equal `#5C7A3A` (+ derived `-deep #47602D` / `-wash #DCE6CE` / `-tint #EFF3E7`, already in the current page; reuse).
- `BESPOKE_SLUGS` already includes `healthy-materials`. No routing change.
- Server Component page; no `Nav`/`Footer` in-page (layout owns them). `export const metadata` = `"Healthy Materials — Rishabh Salian"`.
- Tokens only; kicker = `mono ${styles.kicker}`; section rhythm `.section` > `.container`/`.containerText`.

## 8. Build phases

1. **Assets** — process 9 field photos; source + process 4–5 material images; write `CREDITS.md`.
2. **Data** — `lib/healthyMaterials.ts` (timeline entries/ticks/pivots, FIELD_DECK, MATERIAL_GRID, footnotes) + section copy constants.
3. **Components** — copy-rename `MaterialDeck` (←WorkshopDeck), `MaterialGallery` (←BridgesGallery), `AmbientField` (recolour); build `Timeline.tsx`.
4. **Page** — rebuild `page.tsx` to the §2 spine; keep `SwapCard`; add status badge; wire AmbientField + `.pageContent` z-index.
5. **CSS** — salvage/fold the keeper blocks of `healthy-materials.module.css` (question block, theme/quote cards, concept cards) + paste timeline/legend CSS; delete `Motion.tsx` + `hm-motion.css`.
6. **Verify** — `next build` type-check (ESLint not installed; build is the gate); restart `next dev` after build; preview tab is `document.hidden` → verify motion via DOM/computed-style + `show_widget` mockups; subagent visual QA; mobile + reduced-motion.
7. **Ship** — update this doc + CLAUDE.md changelog (`HM-PAGE-2`); commit + push to the **`claude/*` deploy branch** (NOT `main`).

## 9. Open items / pending input
- **Real timeline dates** (user will supply) — until then, season-label placeholders.
- **Rishabh's vs Henry's specific contribution split** — to foreground honestly.
- **37% CO₂ source citation** — confirm exact source/year.
- **AmbientField scroll-arc tuning** — finalise after section heights are real.
