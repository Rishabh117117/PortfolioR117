# Follow — Page Build Spec

> **Status (current):** BUILT. The bespoke `/work/follow` route replaces the
> Phase-3 `[slug]` placeholder. Its centrepiece is an inline, autoplay-on-view
> motion-graphics reel of the Follow pipeline (sitting two-up beside a write-up
> panel), plus a deck-style project timeline and a research & interviews section.
> Ported from the prototype (`docs/prototypes/follow-page-scroll.html`) into the
> repo's conventions — not a redesign. Built under sprint **FOLLOW-PAGE-1**; the
> reel section was restructured from a full-viewport scroll-pin to the inline
> two-up under **RESTRUCTURE-1**.

- **Route:** `/work/follow` (bespoke; listed in `BESPOKE_SLUGS` in
  `app/work/[slug]/page.tsx` so the dynamic route does not also emit it).
- **Source of truth:** `docs/prototypes/follow-page-scroll.html` — exact markup,
  copy, SVG geometry, beat order, and scoped reel CSS.
- **Governed by:** `docs/DESIGN.md` (tokens, type, responsive) and `CLAUDE.md`
  (honest demo labels; never expose the API key). Quality bar:
  `app/work/housing-works/page.tsx` (scene sections, mono kickers, italic-word
  headings, page-root accent override). Plain CSS Modules, no Tailwind, no new
  deps. `motion@12` is installed but NOT used here (the reel is pure CSS/SVG +
  a small vanilla autoplay-on-view loop).

---

## 0. Files

| File | Role |
|------|------|
| `app/work/follow/page.tsx` | Bespoke page (server component). Sets the Follow accent at the page root; renders every section. |
| `app/work/follow/FollowReel.tsx` | `"use client"` — the inline, contained pipeline reel + the autoplay-on-view loop (IntersectionObserver + timed sequencer). |
| `app/work/follow/FollowReel.css` | Plain, fully-namespaced reel stylesheet (imported by `FollowReel.tsx`). |
| `app/work/follow/follow.module.css` | Page-specific CSS Module (hero mark, deck timeline, research, two-up How-it-works grid + write-up panel, cards, queries). |
| `app/work/[slug]/page.tsx` | `BESPOKE_SLUGS` gains `"follow"`. |
| `lib/projects.ts` | Follow `accent` → `#C2410C`; `status` → `"SIMULATED"` (D-03). |
| `app/page.tsx` | Home Follow `DemoCallout` kept in sync: SIMULATED, burnt orange. |

---

## 1. Accent

Follow's accent is overridden from the flagship Persian Blue to **burnt orange**
(`#C2410C`) to match the product brand + the capstone deck. Set at the page root
in `page.tsx` via an inline `rootStyle`; everything inherits.

```
--accent:      #C2410C
--accent-deep: #9E340A
--accent-wash: #F7E0D4
--accent-tint: #FBEFE7
```

The dark band colour used by the hero dots-mark is the page-local
`--navy: #0A1F33`, declared on `styles.page` (scoped to this route, never on
`:root`). The accent is consistent across the page, the home grid card,
and the `/work` index card (all read from `lib/projects.ts`).

---

## 2. Section order (port copy verbatim from the prototype)

1. **Hero** — mono eyebrow ("Capstone · PGDM Design Strategy, Parsons · 2025–26"),
   the dots-mark (3 navy + 1 hollow-orange) with "the invisible *teammate*", the
   italic-word H1 ("AI made everyone faster. Follow makes teams *smarter*."), sub-lede.
2. **Project timeline** — deck-style horizontal SVG in a horizontally-scrollable
   container (`overflow-x:auto`, `svg{min-width:840px;width:100%;height:auto}`);
   legend + the "what this is not" footnote.
3. **The problem** — band section, two paragraphs (TMS framing + the AI-guilt finding).
4. **Research & interviews** — two columns (theoretical spine // six primary
   engagements), the three "what we heard" insight cards, the AI-guilt pull-quote.
5. **How it works** — kicker + italic-word headline ("From conversation to
   *queryable* memory."), then a two-up layout: the reel at ~2/3 width on the
   left and a borderless tint-panel write-up at ~1/3 on the right (≥768px;
   stacks reel-then-write-up on mobile). The reel **autoplays a loop when
   scrolled into view** (an `IntersectionObserver` starts a timed sequencer at
   ~40% visibility; it pauses offscreen and restarts cleanly on re-entry). The
   honest "illustrative animation" note stays below. *RESTRUCTURE-1 superseded
   the original full-viewport scroll-pin/scroll-sequencer here; the timed loop
   is restored (the named prototype file itself only holds the later scroll
   version, so the per-beat interval + end hold were re-derived). Write-up copy
   is provisional (`TODO(copy)`).*
6. **Differentiators** — 3 cards (shared AI memory · per-paragraph provenance ·
   contradiction detection).
7. **The four questions** — band, 4 items (what's contested · who should I ask ·
   what changed · what's superseded).
8. **Where it sits** — vs Glean ("indexes the reasoning"); the MCP line.
9. **DemoCallout** — the real `components/DemoCallout` component (see §5).

> The dark stat strip (5 LLM roles · 3 tensors · 5 edge types · 12 MCP tools)
> that previously sat between "How it works" and the differentiators was removed
> (2026-06-26, per request).

---

## 3. FollowReel — component contract

Props: `scrollVh?: number` (default `450`) — the height of the `.followReel-scrolly`
track in `vh`, controlling the scroll pace.

Structure: a tall track → a `position: sticky; top: 0; height: 100dvh` pin → the
full-viewport `.followReel` (dark radial-gradient bg). Inside: a persistent corner
label, a scroll hint (hidden once scrolling starts), the big pipeline SVG
(`preserveAspectRatio="xMidYMid meet"`, `role="img"` + `aria-label`), the top
caption pill, the edge legend, and the bottom scrubber.

**The 9 beats** (caption = step · text):

| # | phase class | step | text |
|---|-------------|------|------|
| 1 | `fp1` | `01 · INGEST` | three teammates, three AIs |
| 2 | `fp2` | `02 · REPORTER` | data becomes nodes |
| 3 | `fp3` | `03 · ANALYST` | five typed edges |
| 4 | `fp4` | `04 · EDITOR` | weighted by confidence |
| 5 | `fp5` | `05 · 3 TENSORS` | content · causal · context |
| 6 | `fp6` | `06 · ARCHIVIST` | versions kept beneath, never overwritten |
| 7 | `fp7` | `07 · THE INDEX` | this graph is the shared memory |
| 8 | `fp8` | `MCP →` | any AI tool can ask |
| 9 | `fp9` | `← MCP` | answered, with provenance |

**Scroll math** (cumulative phases): `total = scrolly.offsetHeight - innerHeight`;
`progress = clamp(-scrolly.top, 0, total) / total`; `bp = clamp((progress - lead) /
(1 - lead - tail), 0, 1)` with `lead = 0.05`, `tail = 0.10`; `count = bp <= 0 ? 0 :
min(N, floor(bp * N) + 1)`. The reel className is rebuilt additively each frame —
`followReel on go fp1 … fp{count}` — so beats stack. The scrubber width is set to
`progress * 100%` from JS (no auto-loop animation). Throttled with
`requestAnimationFrame`; `scroll` (passive) + `resize` listeners; `render()` once
on mount; listeners removed on unmount.

**Reduced motion:** `prefers-reduced-motion: reduce` → the reel is set straight to
the fully-built final frame (`followReel on go fp1 … fp9`), the last caption is
set, and the scroll listeners are never attached.

**Hydration:** the reel renders `followReel on` on the server and only builds up
beats in a post-mount effect, so there is no hydration mismatch and JS-off shows
a clean (static, top-of-pipeline) frame.

**Shell adaptation:** the top overlays (caption pill + corner label) sit at
`top: 76px` to clear the layout's persistent ~60px sticky nav, which floats over
the full-viewport reel. This is the one minimal change needed to fit the shared
shell (the standalone prototype had its own nav).

---

## 4. The data shown (illustrative)

- **3 people / AIs:** Maya · Claude, Alex · ChatGPT, Sam · Gemini.
- **5 typed edges:** references, supports, elaborates, supersedes, contradicts.
- **3 tensors:** CONTENT 768d, CAUSAL 512d, CONTEXT · who.
- **Versioning:** supersession chains kept beneath the current node, never overwritten.
- **MCP round-trip:** an external AI tool queries the index and gets an answer with
  provenance ("answer · Maya + Alex").

---

## 5. Honesty (D-03)

The on-page artifact is a **scripted, illustrative animation**, and the
"team-memory sandbox" the CTA points to is **not built yet**. Per `CLAUDE.md`'s
honesty rule and `DESIGN.md` (the `/work` card + home grid must match the page
badge):

- **Implemented default:** `DemoCallout` status = **`SIMULATED`**, and
  `lib/projects.ts` Follow `status = "SIMULATED"` so all surfaces match. The home
  page's Follow `DemoCallout` is kept in sync (SIMULATED, burnt orange).
- **Honest note under the reel:** "Illustrative animation of the live pipeline …".
- **Override (Rishabh's call):** present Follow as `WORKING` (the underlying
  product is real and deployed). If so, flip BOTH `DemoCallout` statuses and the
  `projects.ts` status together — one line each. Flagged for confirmation.

The page does **not** call `/api/ask` and never exposes `ANTHROPIC_API_KEY`.

---

## 6. CSS isolation

- Reel styles are fully namespaced under `.followReel` / `.followReel-scrolly` /
  `.followReel-pin`. The prototype's `.reel` → `.followReel`, phase classes
  `p1…p9` → `fp1…fp9`, and the reel-local dark bg token (`--ink` in the prototype)
  → `--navy`, so nothing collides with the page or leaks globally.
- The reel's dark-theme tokens live on `.followReel` (NOT `:root`); `--font`/`--mono`
  map to the app's `--font-body`/`--font-mono`. The shell tokens in `globals.css`
  are never redefined.
- Page-specific styles are CSS-Module-scoped in `follow.module.css`; global
  utilities (`.container`, `.section`, `.lede`, `.mono`) are reused, not recreated.

---

## 7. Build / deploy

`npm run build` is clean (zero TypeScript errors; `/work/follow` prerenders as a
static route; `/work/[slug]` no longer emits `/work/follow`). Push to the Railway
deploy branch to ship. (Note: ESLint is not installed in this repo, so
`npm run lint` would trigger Next's first-run setup — the build's type-check is the
gate; the code is written to pass `next/core-web-vitals`.)

---

## 8. Open follow-ups

1. **D-03 badge** — confirm SIMULATED (default, shipped) vs WORKING (override).
2. **Team-memory sandbox** — the CTA `href` is a placeholder (`#`); point it at the
   sandbox route when built, and (if it's a real working demo) revisit the badge.
3. **Longitudinal pilot** — the timeline footnote frames the move "from modeled to
   measured"; that study is future work, not part of this page.
