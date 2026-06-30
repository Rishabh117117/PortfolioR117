# RUN-STATUS — GH-PAGE-1 (Greener Hours bespoke narrative page)

**Branch:** `claude/portfolio-foundation-g8xwbo`
**Scope:** Replace the iframe "deck-as-page" (GH-DECK-1) at `/work/greener-hours`
with a full bespoke narrative case study — a peer to Follow / Housing Works /
Healthy Materials — rebuilt from the presentation deck's content + visual
language. Keep the vendored deck as a linked artifact.
**Started/Finished:** 2026-06-30 · **Status:** COMPLETE, verified, committed
per-file. Branch left for review. **Supersedes the GH-DECK-1 status.**

## Restructure (2026-06-30, same day — per Rishabh's flow feedback)
- **Narrative reordered:** the HTTPS precedent + supporting precedents moved up to
  sit **right after the reframe**, combined into one dark section (statement →
  HTTPS `AdoptionCurve` → 3 precedents: EU energy labels · FDA nutrition · cloud
  carbon). Then opportunity (forces) → the product. New order: hero → scale →
  invisibility → **reframe+precedent** → opportunity → **the standard** →
  **the three surfaces (tabs)** → trade-offs → KPIs → close → demo → pager.
- **The reframe statement** was restyled (the cramped left-border quote → a clean
  full-width Fraunces opener on the dark band).
- **Product = the three surfaces, tabbed.** New `TierTabs` (client) tabs across
  Tier 1/2/3, each with its **full mockup** (left brief + right mock). Built
  `SchedulerMock` (T2, deck slide 9) + `DashboardMock` (T3, deck slide 10) so all
  three surfaces are real (was: one full + two thumbnails). `SurfaceThumbs`
  removed. WAI-ARIA tablist + roving-tabindex keyboard nav.
- New files: `TierTabs.{tsx,module.css}`, `SchedulerMock.tsx`, `DashboardMock.tsx`,
  `TierMocks.module.css`; per-tier `TIER2_PRINCIPLES`/`TIER3_PRINCIPLES` in
  `lib/greenerHours.ts`. `npm run build` clean (20/20; `/work/greener-hours`
  8.54 kB). DOM-verified: flow order, reframe renders, all 3 tabs switch
  (left+right), no console errors, no h-overflow desktop+mobile. (Screenshots:
  the preview screenshot subsystem hung this session — verified via eval/DOM.)
  3-lens review (correctness/a11y/css-tokens) → fixes applied (stable tabpanel
  id for `aria-controls`, field-caret color, defensive `min-width:0`, dropped an
  unused `--amber-wash`).

## Decisions taken in-sprint (confirmed with Rishabh)
- **Visual = HYBRID:** portfolio shell + Bricolage; a **page-scoped serif
  (Fraunces, `--font-serif`)** loaded via `next/font` in `page.tsx` only (display
  moments — hero, 945 stat, insight quote, section titles, KPI numerals, close);
  the deck's **amber `#C2410C` + navy `#1E3A5F`** (+ `--amber-soft`, `--sky`) as
  **page-scoped vars on the root**, carried into the diagrams. Primary accent
  stays **Forest `#1C3B36`** (matches the card; avoids Follow's amber). Color
  semantics: amber = carbon/dirty, navy + forest = clean/renewable.
- **Product = CURATED:** 3-surface overview (`SurfaceThumbs`, the deck's slide-7
  thumbnails) + ONE full rebuild — the Tier-1 "Compute Window Indicator" chat
  (`ComputeWindowMock`, the Claude-in-the-chat hook). Tiers 2/3 = the thumbnails.
- **Deck kept:** the vendored `public/greener-hours/index.html` is no longer
  iframed; it is linked from the hero + DemoCallout as "View the full deck ↗".
- **Honesty:** badge `COURSE PROJECT · CONCEPT` (speculative open-standard
  coursework); demo `SIMULATED`; live Tier-1 prototype deferred (Phase 4).

## Done
- `lib/greenerHours.ts` — all page data + copy, faithful to the deck.
- `app/work/greener-hours/page.tsx` — full narrative (16 sections), server
  component; scoped Fraunces + `rootStyle` (Forest accent + scoped amber/navy/sky);
  `AmbientField` + `.pageContent`; reuses `DemoCallout` + the `[slug]` pager.
- `app/work/greener-hours/greener-hours.module.css` — HM-style scene system
  (`.page`/`.pageContent`, light `.band` + opaque dark `.navy` bands, hero,
  `.giant`, `.quoteBig`, card grids, tier grid, KPIs, close, `.diagram` wrappers).
- Diagram components (faithful deck ports, tokens via `diagrams.css`): `ScaleChart`,
  `VisibilityFlow`, `ForceVisual` (variant), `HeadersDiagram`, `AdoptionCurve`.
- `SurfaceThumbs.{tsx,module.css}` (3 surface thumbnails incl. mini grid-forecast
  + dual-bar charts); `ComputeWindowMock.{tsx,module.css}` (Tier-1 chat).
- `AmbientField.{tsx,css}` — copy-renamed from HM, forest+amber, namespaced `gh-`,
  amber-dominant→forest scroll cross-fade, `document.hidden` + reduced-motion guards.
- `lib/projects.ts` — status `SIMULATED` → `COURSE PROJECT · CONCEPT` (Forest
  accent unchanged; propagates to home grid + `/work` chips).
- Docs: `ROADMAP.md` (greener-hours → GH-PAGE-1 bespoke), `DECISIONS.md` (D-06
  reversed + GH-PAGE-1 log), `docs/projects/greener-hours.md` (rewritten),
  `CLAUDE.md` changelog, this RUN-STATUS.

## Checks (actual output)
- **Build:** `npm run build` → `✓ Compiled successfully` / `✓ Generating static
  pages (20/20)` / exit 0. `/work/greener-hours` prerenders **`○ (Static)`**
  (3.5 kB, First Load 99.5 kB). No double-route for `greener-hours`
  (`BESPOKE_SLUGS`). ESLint not installed — build type-check is the gate.
- **Browser (dev `:3000`, real 1280×900 viewport):** Fraunces loads + is **scoped**
  (hero `font-family: __Fraunces_…`; `--font-serif` set on the page root); scoped
  `--amber` `#C2410C` / `--navy` `#1E3A5F` resolve; the giant stat is amber, the
  kickers Forest; **3 dark navy bands** (invisibility, HTTPS, close) opaque; the
  Tier-1 carbon pill renders (`412 g/kWh · us-east-1`); 9 SVG diagrams present;
  **no horizontal overflow** (docScrollW 1265 ≤ 1280); **no console errors**.
  Screenshots captured: hero, scale chart, dark-matter flow, Tier-1 mock, HTTPS
  band, forces + 3 surfaces.
- **Mobile (375):** single column, no horizontal overflow (375 == 375); wide
  diagrams (viewBox 1700) scroll inside their `.diagram`/`.diagramWide` wrapper,
  not the page (`.page { overflow-x: clip }`).
- **Cross-page:** other routes + the pager (← Follow / Healthy Materials →) intact;
  Greener Hours card stays Forest.

## Guardrails honoured
- Per-file commits, no `--amend`. No merge / no PR / no deploy beyond the branch.
- No new GLOBAL tokens; all color via page-scoped vars on the root (HM/Follow
  pattern) or existing globals. The only raw values are the `rootStyle` hex (the
  scoped palette) + the Follow-matched `rgba(26,26,26,…)` shadow. Fraunces scoped
  to this route only (no `layout.tsx`/`globals.css` change).
- The vendored deck is untouched and preserved. Reduced-motion respected
  (AmbientField no-ops; only CSS micro-transitions otherwise).
