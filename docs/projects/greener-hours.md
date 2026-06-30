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

## Product depth — CURATED
Three-surface overview (`SurfaceThumbs`, the deck's slide-7 thumbnails) + **one
fully rebuilt hero mockup: the Tier-1 "Compute Window Indicator"** chat
(`ComputeWindowMock` — the Claude-in-the-chat hook). Tiers 2 & 3 are the lighter
thumbnails, not full UI rebuilds.

## Sections (deck → page)
Hero → the scale (945 TWh + `ScaleChart`) → the invisibility (dark band,
`VisibilityFlow`) → the insight (quote) → three forces (`ForceVisual` ×3) → one
standard / three surfaces (`SurfaceThumbs` + substrate) → how it works
(`HeadersDiagram`) → Tier-1 deep dive (`ComputeWindowMock` + principles) → HTTPS
precedent (dark band, `AdoptionCurve`) → 6 precedents → 4 trade-offs → 6 KPIs (+
"directional, not predictive" caveat) → close (dark band) → DemoCallout → pager.
(Deck slides 2 "reframe" and 12 "principle pyramid" intentionally not ported.)

## Files
- **Page:** `app/work/greener-hours/{page.tsx, greener-hours.module.css}`.
- **Motion:** `AmbientField.{tsx,css}` (copy-renamed from HM, forest+amber,
  namespaced `gh-`).
- **Diagrams (faithful deck ports):** `ScaleChart.tsx`, `VisibilityFlow.tsx`,
  `ForceVisual.tsx` (variant), `HeadersDiagram.tsx`, `AdoptionCurve.tsx`, the
  shared `diagrams.css` utility classes.
- **Surfaces:** `SurfaceThumbs.{tsx,module.css}`, `ComputeWindowMock.{tsx,module.css}`.
- **Data:** `lib/greenerHours.ts` (all copy + list data, faithful to the deck).
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
