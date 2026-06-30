# Greener Hours — Page Build Spec

> **Status (current):** BUILT (GH-PAGE-1, 2026-06-30). `/work/greener-hours` is a
> **bespoke narrative case study** — a peer to Follow / Housing Works / Healthy
> Materials — rebuilt from the presentation deck's content and visual language.
> This **supersedes GH-DECK-1** (the iframe "deck-as-page"). The original deck
> stays vendored at `public/greener-hours/index.html` and is linked from the page
> as "View the full deck ↗".

## The decision (D-06, updated)
The case study was first shipped as the embedded deck (GH-DECK-1). Per Rishabh,
it was then rebuilt as a full narrative page "like Follow / HW / Healthy
Materials, using a lot of elements from the deck." The deck's clean editorial
look is the design hook; its diagrams and sections are the source material.

## Treatment — HYBRID (locked with the user)
- Portfolio shell + Bricolage/Inter/mono body, with a **page-scoped serif
  (Fraunces, `--font-serif`)** loaded via `next/font` in `page.tsx` and used only
  on display moments (hero lockup, the 945 stat, the insight quote, section
  titles, KPI numerals, close). Cannot leak past this route.
- The deck's **amber `#C2410C` + navy `#1E3A5F`** (+ `--amber-soft`, `--sky`) are
  **page-scoped CSS vars on the page root** (never global), carried into the
  rebuilt diagrams. Color semantics: amber = carbon/dirty/energy; navy + the
  Forest accent = clean/renewable.
- **Primary accent stays Forest `#1C3B36`** (matches the work-grid card; avoids
  colliding with Follow's amber card).

## Product depth — full three surfaces, tabbed (restructured 2026-06-30)
The three surfaces live in a **tabbed product view** (`TierTabs`, client): tab
across Tier 1 / 2 / 3 — each shows its brief + principles (left) and its **full
mockup** (right). All three are fully rebuilt: Tier 1 `ComputeWindowMock` (chat
carbon indicator — the Claude-in-the-chat hook), Tier 2 `SchedulerMock` (flexible
scheduler, deck slide 9), Tier 3 `DashboardMock` (compute-footprint dashboard,
deck slide 10). (Superseded the earlier curated "one full + two thumbnails"
approach; `SurfaceThumbs` removed.)

## Sections (deck → page) — narrative reordered 2026-06-30
Hero → the scale (945 TWh + `ScaleChart`) → the invisibility (dark band,
`VisibilityFlow`) → **the reframe + precedent, combined (dark band):** the
"visibility isn't enough / but + a standard works" statement → the **HTTPS** hero
precedent (`AdoptionCurve`) + **3** supporting precedents (EU energy labels · FDA
nutrition · cloud carbon) → the opportunity (three forces, `ForceVisual` ×3) →
**the standard** (substrate + `HeadersDiagram`) → **the three surfaces** (`TierTabs`)
→ trade-offs → KPIs → close (dark band) → DemoCallout → pager. The reordering
puts the proof-by-precedent right after the reframe, before the product; deck
slides 2 "reframe-arc" and 12 "principle pyramid" remain not ported.

## Files
- **Page:** `app/work/greener-hours/{page.tsx, greener-hours.module.css}`.
- **Motion:** `AmbientField.{tsx,css}` (copy-renamed from HM, forest+amber,
  namespaced `gh-`).
- **Diagrams (faithful deck ports):** `ScaleChart.tsx`, `VisibilityFlow.tsx`,
  `ForceVisual.tsx` (variant), `HeadersDiagram.tsx`, `AdoptionCurve.tsx`, the
  shared `diagrams.css` utility classes.
- **Surfaces:** `TierTabs.{tsx,module.css}` (client tabs) wrapping
  `ComputeWindowMock.{tsx,module.css}` (T1), `SchedulerMock.tsx` (T2),
  `DashboardMock.tsx` (T3) — the last two share `TierMocks.module.css`.
- **Data:** `lib/greenerHours.ts` (all copy + list data + per-tier principles,
  faithful to the deck).
- **Registry:** `lib/projects.ts` — accent stays Forest `#1C3B36`; `status` →
  `COURSE PROJECT · CONCEPT` (propagates to home grid + `/work` chips).
- **Kept:** `public/greener-hours/index.html` (vendored deck, now linked, not
  iframed); `"greener-hours"` already in `BESPOKE_SLUGS`.

## Honesty
A speculative open-standard **course project** (Design for a Warming World, Prof.
Raz Godelnik, Spring 2026) — not a shipped/measured product. Hero badge ==
registry status == grid chip (`COURSE PROJECT · CONCEPT`). `DemoCallout` is
`SIMULATED`. The Tier-1 mock values + scale figures are captioned illustrative /
sourced; KPIs carry the directional caveat.

## Open follow-up (deferred — do not lose)
The interactive **Greener Hours prototype** (`greener-hours-prototype.jsx` — a
real Claude-in-the-chat experience, Tier-1) is a separate **external chat
artifact, not yet vendored into this repo**. A later sprint embeds it on this
route and routes model calls through `app/api/ask` (server-side
`ANTHROPIC_API_KEY`; rate-limit before launch) — the path to flipping the demo
badge to `LIVE API`.
