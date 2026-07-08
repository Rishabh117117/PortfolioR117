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

## Product depth — three LIVE surfaces, tabbed (interactive, 2026-06-30)
The three surfaces are a **tabbed, full-width product view** (`TierTabs`, client):
brief + principle chips (header) over each tier's **live surface**. Adapted from
the working prototype (`greener-hours-prototype.jsx`) into the page's tokens — no
new deps:
- **Tier 1 `ComputeWindowMock`** — a real chat wired to **`/api/ask`** (the
  server-side Claude proxy; the API key never reaches the browser) + a live carbon
  indicator that cycles a simulated 24h grid. The "Claude-in-the-chat" hook.
- **Tier 2 `SchedulerMock`** — a working job queue: submit a job → it's scheduled
  to the cleanest grid window before its deadline; advance the sim clock (or auto)
  to watch jobs run → complete. Self-contained, no backend.
- **Tier 3 `DashboardMock`** — a live procurement dashboard: KPIs tick while LIVE
  is on; the anti-rebound chart pairs falling intensity with rising volume.
(Superseded the static "wireframe" mockups + the earlier curated approach;
`SurfaceThumbs` removed.)

**Live chat requires `ANTHROPIC_API_KEY`** set server-side (`.env.local` for dev,
Railway env for prod). Without it, `/api/ask` returns a graceful 503 and the chat
shows "backend isn't configured" — everything else stays interactive.

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
Two honest axes, kept distinct:
- **Project** (the standard itself) is still a speculative open-standard **course
  project** — Design for a Warming World, Spring 2026. The
  hero badge + `lib/projects.ts` status + grid chip stay `COURSE PROJECT · CONCEPT`.
  The P-codes on the surfaces reference the course's ten design principles.
- **Demo** (the on-page surfaces) is now a real interactive prototype, so the
  `DemoCallout` status is **`WORKING`** (was SIMULATED). The chat connects to the
  real Claude API via the server-side `/api/ask` proxy; the scheduler + dashboard
  are working client-side sims. Scale figures stay sourced; KPIs keep the
  "directional, not predictive" caveat; the dashboard data is illustrative.

## Done — prototype integrated (2026-06-30)
The interactive **Greener Hours prototype** (`greener-hours-prototype.jsx`) was
adapted into the three live surfaces above + the `/api/ask` server proxy (rate-
limited, key server-side). `app/api/ask/route.ts` is implemented (was a 501
scaffold).

**To make the chat live in prod:** set `ANTHROPIC_API_KEY` in Railway's env (and
`.env.local` for dev). Then the chat flips from the graceful 503 to real Claude
responses (model `claude-sonnet-4-6`). Optional next steps: streaming responses,
a durable rate-limit store, and the carbon-state demo controls + headers panel
from the prototype (trimmed here for the tab's width).
