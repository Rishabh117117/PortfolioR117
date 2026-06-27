# Follow — Page Build Spec

> **Status (current):** BUILT. The bespoke `/work/follow` route replaces the
> Phase-3 `[slug]` placeholder. Its centrepiece is an inline, autoplay-on-view
> motion-graphics reel of the Follow pipeline (sitting two-up beside a write-up
> panel), plus a deck-style project timeline and a research & interviews section.
> Ported from the prototype (`docs/prototypes/follow-page-scroll.html`) into the
> repo's conventions — not a redesign. Built under sprint **FOLLOW-PAGE-1**; the
> reel section was restructured from a full-viewport scroll-pin to the inline
> two-up under **RESTRUCTURE-1**.
>
> **DESIGN-PHASE-1 (2026-06-27):** design-phase pass. The page was restructured
> around **two static deck diagrams** (`CompareDiagram`, deck slide 13 split into
> Before / With-Follow halves — replacing a rejected morph-reel prototype), the
> research methodology was **clubbed under the timeline**, a new **"Insights &
> areas of opportunity"** section sits between the diagrams, the hero gained a
> giant `Follow.` lockup, and the deferred **motion phase began** (an
> `AmbientField` ambient/parallax backdrop + glass hover-lift). **v3** then made
> the ambient **page-wide** (every section floats over it), **refined** the two
> diagrams (glass panels, the Follow Index's four pillars, named team), added a
> **TMS definition aside** to the problem, and **removed the "four questions"
> section**. See §2 / §3.5.

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
| `app/work/follow/CompareDiagram.tsx` | Server component — the two static "structural change" diagrams (DESIGN-PHASE-1): `variant="before"|"after"`, reproducing the deck slide-13 halves. Only motion = read/write packets in the With-Follow variant (CSS). |
| `app/work/follow/CompareDiagram.css` | Plain, fully-namespaced stylesheet (scoped under `.cdHolder`; imported by `CompareDiagram.tsx`). |
| `app/work/follow/AmbientField.tsx` | `"use client"` — the ambient backdrop (DESIGN-PHASE-1 motion): drifting orbs with pointer + scroll parallax, IO-gated rAF, reduced-motion-still. |
| `app/work/follow/AmbientField.css` | Plain, fully-namespaced stylesheet (scoped under `.ambient`; imported by `AmbientField.tsx`). |
| `app/work/follow/follow.module.css` | Page-specific CSS Module (hero mark + giant lockup, deck timeline, clubbed research, insights, two-up How-it-works grid + write-up panel, cards + glass hover, queries). |
| `docs/prototypes/follow-capstone-deck-v4.html` | The 22-slide capstone deck (design reference; slide 13 = the before/after compare reproduced by `CompareDiagram`). |
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

Order as of **DESIGN-PHASE-1 v4** (problem → solution narrative arc):

1. **Hero (intro)** — dots-mark, eyebrow, the giant `Follow.` lockup (display,
   page `<h1>`, orange period), the `<p>` headline ("AI made everyone faster…
   *smarter*."), sub-lede.
2. **The journey** — deck-style **Project timeline** (legend + "what this is
   not"), with the **research methodology clubbed beneath** (`.clubbed`): "The
   research" — spine // six engagements.
3. **The gap — ONE white block (`.blockWhite`)**, three stacked parts on a single
   elevated white surface over the page ambient:
   - **The problem** — TMS framing + AI-guilt finding + the **TMS definition
     aside** (`.defNote`, Wegner 1985).
   - **The structural change · today** — `<CompareDiagram variant="before"/>`
     (`web→AI→user→meeting`; the meeting is last, and forgets).
   - **Insights & areas of opportunity** — 3 deck insight cards + the pull-quote.
4. **HMW** — eyebrow + a single large `<h2>` statement (`.hmw`): "How might we
   give a team *one shared, trustable memory* — across every AI tool they already
   use?"
5. **Follow concept — the response** — kicker + the reveal `<h2>` `Follow.`
   (`.revealName`) + concept line (`.revealLine`) + `<CompareDiagram
   variant="after"/>` (`web→AI→Follow Index→user`) + a note that **folds in the
   old "where it sits"** (between your tools, queryable via MCP; vs Glean).
6. **How it works** — "From conversation to *queryable* memory." + the two-up
   `FollowReel` pipeline reel + write-up; autoplay-on-view; the reel base frame
   now **starts blank**. Honest "illustrative animation" note.
7. **Demo** — the real `DemoCallout` (SIMULATED).
8. **What it accomplishes** — 3 outcome cards (shared AI memory · per-paragraph
   provenance · contradiction detection — the old differentiators, reworded);
   glass hover-lift.

> *Removed: the standalone "Where it sits" (folded into §5) and the "four
> questions" band (v3).*

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

## 3.5 CompareDiagram + AmbientField — contracts (DESIGN-PHASE-1)

### CompareDiagram — the two static "structural change" diagrams (v4)

A before/after pair adapted from deck slide 13, re-themed: `variant="before" |
"after"`. **Server component** (no client JS). `viewBox="0 0 640 400"`,
`role="img"` + variant `aria-label`. **Variant-specific layouts** (the flow order
differs, so each renders its own markup; only the shared AI row toggles on
`.after`):
- **before:** web → AI (dashed/private) → user (the team) → `THE MEETING` (last; forgets).
- **after:** web → AI (connected) → the **Follow Index** (shared layer) → user (in the loop).

| element | BEFORE | WITH FOLLOW |
|---------|--------|-------------|
| centre bar | `--cd-navy`, label `THE MEETING` | `--accent-wash`+accent border, `The Follow Index` + its **4 pillars** |
| AI circles | dashed, white fill | solid, `--accent-tint` fill |
| connections | `--cd-slate`, 1.4px | `--accent`, 2.6px |
| floating tag | `NO SHARED MEMORY` | `SHARED LAYER · every AI reads & writes here` |
| the team (Maya/Alex/Sam) | grey, no ring | `--cd-navy`, accent ring |
| flow packets | hidden | **animated (read/write), the only motion** |

Structure: `<figure class="cdHolder [after]">` (max-width 720, centered; scoped
brand vars) → **`.cdPanel` glass surface** (translucent + `backdrop-filter` blur +
soft shadow + hairline — an elevated layer over the page ambient) holding the
`.cdPill` badge + `.cdCanvas` SVG → `.cdSub` caption. A `@media (max-width:600px)`
block bumps in-SVG label sizes for mobile; `@media (prefers-reduced-motion)` stops
the packets. Namespaced under `.cdHolder`; brand vars (`--cd-navy/-slate/-muted/
-glow/-line/-ink2/-mem`) scoped there; accent tokens inherited.

*(Supersedes a rejected `BeforeAfterReel` morph prototype; v3 refined the earlier
"very okay" static version — glass panel, named pillars/team, consistent strokes.)*

### AmbientField — the page-wide ambient/parallax backdrop (motion phase, v4)

`"use client"`. The single **soft background layer for the whole page**: rendered
once as the first child of the page root, `position:fixed; inset:0; z-index:0`,
with all page content on a `.pageContent { z-index:1 }` layer above it (every
section floats over it). Low-opacity **blue (`#1C39BB`) + orange** blurred orbs
(`.ambient .orb`) drift **side-to-side**, lean toward the pointer, and **cross-fade
their opacity by scroll position** (intro = both → problem = orange → Follow =
blue). Decorative
(`aria-hidden`). One **always-on rAF loop** (no IntersectionObserver — it's a
constant backdrop; the browser throttles rAF while the tab is hidden); pointer
math uses `innerWidth/innerHeight` (no per-move layout read); `will-change` is set
on mount, cleared on unmount. Under `prefers-reduced-motion: reduce` nothing
attaches and a CSS guard pins the orbs. The glass hover-lift on `.card`/`.ins`
(in `follow.module.css`) is the other motion-phase piece. See DESIGN.md §7.

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
