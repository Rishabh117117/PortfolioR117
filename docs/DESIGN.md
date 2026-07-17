# docs/DESIGN.md — Design Language (v1.1 — v1.0 LOCKED + SHELL-1.1 additive layer, see §7)

> The single source of truth for the visual system. Claude Code: implement these as CSS
> custom properties in a global stylesheet and reference the tokens everywhere — never
> hard-code raw hex/px values in components. Plain CSS modules. No Tailwind.

---

## 0. Principles

1. **One shell, many accents.** A constant neutral frame (paper + ink + type + spacing) holds
   every page. Each project introduces ONE accent color via the `--accent` variable. Nothing
   else changes between projects.
2. **Mobile-first, always.** Design and write CSS for ~390px first, then enhance up. Mobile is
   the primary canvas (the site is built and reviewed on a phone).
3. **Honesty is designed in.** The demo component carries a status badge: `WORKING` (real
   prototype) or `SIMULATED` (scripted) or `LIVE API`. Never vague, never overclaimed.
4. **Restraint.** Clean professional base; interactive moments are rare and earned. (Motion
   system is specified separately and later — for now, only the micro-transitions in §7.)

---

## 1. Color tokens

:root{
  /* shell — constant across the whole site */
  --paper:      #F4F2EC;  /* page background (warm off-white) */
  --card:       #FCFBF7;  /* raised surfaces, cards */
  --line:       #D9D6CD;  /* hairlines, borders, dividers */
  --fill:       #E7E3D8;  /* subtle fills */
  --ink:        #1A1A1A;  /* display + headings */
  --ink-2:      #2A2A28;  /* body text */
  --soft:       #6B6B66;  /* captions, meta, mono labels */
  --gold:       #9A7B4F;  /* rare warm accent for section numbers/eyebrows */

  /* accent — DEFAULT is Follow's Persian Blue; overridden per project (see §8) */
  --accent:      #1C39BB;  /* Persian Blue */
  --accent-deep: #142A8C;  /* hover/pressed, darker shade */
  --accent-wash: #DDE2F6;  /* light fills behind accent content */
  --accent-tint: #EEF0FB;  /* lightest tint, hover backgrounds */
}

Usage rules:
- Links, active nav state, focus rings, primary buttons, status pulse → --accent.
- Body text → --ink-2. Headings/display → --ink. Captions/labels → --soft.
- --gold used ONLY for section eyebrows / numbers (e.g. "01 ·"). Sparingly.
- Never put two project accents on one page (except the work index, where cards carry their own).

---

## 2. Typography

Faces (Google Fonts):
- Display + headings: Bricolage Grotesque (opsz, weights 500/600/700)
- Body + UI text: Inter (400/500/600)
- Portfolio-chrome labels (eyebrows/kickers/chips/metas): --font-label —
  **UNFOLD-POLISH TRIAL in progress**: candidate A = Bricolage caps (current
  default), B = Fraunces caps, C = Inter caps; compared live via the dev-only
  LabelFaceSwitcher chip. Mono chrome read "robotic" (Rishabh, 2026-07-16).
  Lock the winner here + delete the trial rig after review.
- Code, demo/product-replica UI: IBM Plex Mono (400/500) — the demo apps
  (FollowSandbox, PackagesApp, WorkshopsApp, GhApp/TierMocks) keep true mono
  deliberately: they are software surfaces, not narrative chrome.

--font-display: 'Bricolage Grotesque', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
--font-mono:    'IBM Plex Mono', ui-monospace, monospace;
--font-label:   var(--font-display)  /* trial default (candidate A) */

Type scale (clamp = fluid mobile→desktop). Headings weight 600, tight tracking.

| Token         | Role          | Font        | Size (clamp)               | Tracking | Line |
|---------------|---------------|-------------|----------------------------|----------|------|
| --fs-display  | hero only     | display 600 | clamp(34px, 8vw, 64px)     | -.035em  | 1.0  |
| --fs-h1       | page titles   | display 600 | clamp(30px, 6vw, 42px)     | -.025em  | 1.02 |
| --fs-h2       | section heads | display 600 | 26px                       | -.015em  | 1.1  |
| --fs-h3       | subsections   | display 600 | 18px                       | -.01em   | 1.2  |
| --fs-body-l   | intro/lede    | body 400    | clamp(15px, 2.4vw, 18px)   | 0        | 1.55 |
| --fs-body     | reading text  | body 400    | 15px                       | 0        | 1.6  |
| --fs-cap      | captions/meta | body 400    | 13px (color --soft)        | 0        | 1.5  |
| --fs-label    | labels/UI     | label 500   | 11px UPPERCASE             | .08em    | 1.4  |

Signature move: one key word per hero/heading may be set in *italic* Bricolage as emphasis
(e.g. "I design *systems* that used to be objects"). Use at most once per heading. Optional.

---

## 3. Spacing & layout

--space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
--space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px; --space-9: 96px;

--maxw-text:   720px;   /* reading column */
--maxw-wide:   1180px;  /* full layouts, desktop */
--page-pad:    22px;    /* mobile/tablet side padding */
--radius:      12px;    /* default card radius */
--radius-sm:   8px;
--radius-lg:   16px;

- Reading content capped at --maxw-text. Wide layouts (desktop split heroes, grids) cap at
  --maxw-wide, centered, never edge-to-edge on large monitors.
- Section vertical rhythm: --space-8 top/bottom on desktop, --space-7 on mobile.

---

## 4. Responsive — three breakpoints

/* mobile-first base = ~390px. Then: */
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1180px) { /* desktop, designed at FHD 1920 then capped via --maxw-wide */ }

Rules:
- Mobile (base): single column, burger nav, stacked cards, full-width demos. Everything works
  by tap. This is the canonical layout.
- Tablet (>=768): inline nav appears, 2-column grids where useful, larger imagery.
- Desktop (>=1180): full nav, split heroes (content + demo teaser side by side), multi-column
  grids, room for the (later) signature motion. Content/hierarchy identical to mobile — only
  layout density and optional enhancement differ.
- Hover effects are a desktop/pointer bonus only (@media (hover:hover)); never required to use
  anything. Touch targets >= 44px.

---

## 5. Global elements

Nav (every page): wordmark "Rishabh Salian" (display 600/18px) left; links
Work · About · Contact right (CV dropped — it downloads from About, CV-DOWNLOAD-1).
Active link in --accent, mono 11px. Mobile → burger. A breadcrumb trail
(components/Breadcrumbs) sits directly under the nav on every route except `/`.

Footer (every page): mono meta line + contact links + "Ask the portfolio" entry (later phase).

Project pager: prev/next at the bottom of every project page (mono labels + project name).

---

## 6. Components

### 6.1 Buttons
.btn            → mono 12.5px, padding 11px 18px, radius --radius-sm, 1.5px solid --accent
.btn.primary    → bg --accent, text #fff; hover bg --accent-deep
.btn.ghost      → transparent, text --accent; hover bg --accent-tint
Optional leading pulse dot (8px, --accent or #fff) for "live demo" CTAs.

### 6.2 Status chip / label
Mono 11px uppercase, tracking .08em, color --soft on --card with --line border, radius
--radius-sm. Accent variant: --accent text on --accent-tint.

### 6.3 Demo callout — the signature component
The recurring "this runs" element. Structure:
- Header bar in --accent (white text), with: left = pulse dot + mono label
  ("LIVE DEMO · {name}"); right = status badge (★ WORKING / ★ SIMULATED / ★ LIVE API).
- Body on --card: H3 title, body paragraph, primary button.
- Border 1.5px --accent, radius --radius-lg, overflow hidden.
- The badge text is mandatory and must be accurate (see §0.3, honesty).

### 6.4 Project card (work index / grid)
--card surface, --line border, radius --radius. Contains: project name (display 600),
mono meta line (year · discipline), a thin accent bar (the project's own --accent), and a
status tag if it has a demo. Hover (desktop): subtle lift (specified in motion phase).

---

## 7. Micro-transitions (the only motion for now)

Full motion system is deferred. For the shell, implement ONLY these, snappy:
--t-fast: .22s;  --e-snappy: cubic-bezier(.2,.9,.25,1);
- Button/card hover & press: transform + background over --t-fast --e-snappy.
- Link underline-offset on hover.
- Honor prefers-reduced-motion: reduce → disable all transitions/animations; content static.
- **Gentle tier (UNFOLD-POLISH, 2026-07-16): anything that MOVES rides
  --t-gentle .45s (expansion/reveal) or --t-soft .35s (hover moves) with
  --e-gentle cubic-bezier(.22, 1, .36, 1); color/press feedback may stay fast.
  Card hovers lift at most -2px. Hover must NEVER change layout (the Unfold
  hover-peek was removed for this). "The site has fluid and easy motion —
  nothing can be sudden."**
- Do NOT build scroll-reveals, parallax, or the signature arc yet — those come in the motion phase.
- **Exception (RESTRUCTURE-1):** the `/work/follow` pipeline reel uses an
  **autoplay-on-view loop** (IntersectionObserver-gated timed sequencer, vanilla
  JS — `motion@12` still unused). This is the first, deliberately-scoped piece of
  the deferred motion phase, limited to that one component; reduced-motion shows
  the reel's fully-built final frame, statically. Scroll-reveals, parallax, and
  the signature arc remain deferred.
- **DESIGN-PHASE-1 — the motion phase begins (on `/work/follow` only).** With
  Phase 1 done and at the user's direction, the deferred motion items (§10) are
  now being built, scoped to the Follow page and kept deliberately subtle/clean:
  - **Page-wide ambient backdrop + parallax** (`AmbientField`): a single
    `position:fixed` soft-light layer behind the WHOLE page (z-index 0; every
    section floats on a `.pageContent` z-index:1 layer above it — Material-style
    layering). Low-opacity **blue (`#1C39BB`) + orange (`#C2410C`)** blurred orbs
    that drift **side-to-side** and lean toward the pointer; their per-orb opacity
    **cross-fades by scroll position** so the colour matches the story (intro =
    both → problem = orange → Follow = blue). One always-on rAF loop (the browser
    throttles it while the tab is hidden); under reduced-motion nothing attaches
    and a CSS guard pins the orbs.
  - **Glass hover-lift** on the differentiator + insight cards (translucent
    border/shadow change + a `translateY` lift gated on `hover` and
    `prefers-reduced-motion: no-preference`).
  - **Diagram packets**: the two static "structural change" diagrams
    (`CompareDiagram`) are still; the only motion is the read/write packets in
    the With-Follow variant (CSS, disabled under reduced motion).
  All pure CSS + a little vanilla rAF; `motion@12` still unused; locked tokens +
  Follow burnt-orange only. The signature "objects→interfaces→systems" arc and
  page-wide scroll-reveals remain deferred.
- **SHELL-1.1 (2026-07-01) — the ambient + drift language goes site-wide.** After
  all four flagship pages converged on the same DNA, it was promoted into the
  shell at Rishabh's direction:
  - New v1.1 tokens in `globals.css`: `--shadow-rest`, `--shadow-lift`,
    `--glass-bg`, `--glass-blur`, `--nav-h`; new global utilities `.kicker`
    (mono-gold section heading) and `.lift` (opt-in pointer-gated hover-lift).
    All v1.0 tokens are unchanged — this is additive.
  - `components/AmbientField` — the shared, parameterized version of the
    flagship orb backdrop (HW-generation engine: scroll-phase Lissajous,
    `[data-ambient-dim]` fades, `document.hidden` guard, reduced-motion
    no-attach). Props: per-orb `{color, alpha}` ×4 + rest opacities + dim. Used
    by `/` and `/about` (gold → Persian Blue), `/archive` (gold-led), and every
    `/archive/[slug]` (the project's accent + gold). The flagship pages keep
    their own tuned copies.
  - `components/DriftGroup` — the MaterialRail scroll-parallax recipe
    generalized: children with `data-depth="<px>"` drift by depth × distance
    from viewport centre. Keep hover transforms on an INNER element.
  - `components/Breadcrumbs` — a mono "where am I" trail under the nav on every
    route except `/` (in §5 Global elements now). Non-sticky by design: it must
    not add permanent chrome height (the Follow reel pins at ~60px).
  - The home page moved onto this language (ambient, gold hero kicker, frosted
    arc band, `--shadow-lift` card hovers); `.kicker`/`.lift`/the shared field
    are the defaults for any new shell surface.

---

## 8. Per-project accent map

Set --accent (+ derived shades) at the project page/root level; everything else inherits.

| Project            | --accent  | Notes                          |
|--------------------|-----------|--------------------------------|
| Follow             | #C2410C   | Burnt orange (was #1C39BB Persian Blue) — matches the product brand + capstone deck. Derived: --accent-deep #9E340A, --accent-wash #F7E0D4, --accent-tint #FBEFE7. Page-local --navy #0A1F33 for the dark band. |
| Greener Hours      | #1C3B36   | Forest                         |
| Healthy Materials  | #5C7A3A   | Leaf (clay #B0763F secondary)  |
| Housing Works      | #C0263B   | Magenta-red                    |
| Stun Gun / Lotus   | #A85F45   | Rose-metal / bronze            |
| VSG / BEST / OBC   | brand     | client brand colors per case   |

When a project sets --accent, also set --accent-deep/-wash/-tint to matching shades.

> Note: the global default `--accent` in `globals.css` remains Persian Blue
> `#1C39BB` (used by pages with no project accent, e.g. /about). Follow now
> overrides it to burnt orange at its own page root via an inline `rootStyle`, so
> the `#1C39BB` label on the Follow row above is historical, not the current value.

---

## 9. Accessibility

- Color contrast >= WCAG AA for text. (Persian Blue on paper passes for large/medium text; check
  small text — darken to --accent-deep if needed.)
- Visible focus rings (--accent, 2px) on all interactive elements.
- prefers-reduced-motion respected globally.
- Semantic HTML; alt text on all imagery; nav as <nav>, landmarks correct.

---

## 10. What's NOT decided yet (do not invent)

- The signature "objects→interfaces→systems" arc animation and page-wide
  scroll-REVEALS — still deferred. (The ambient backdrop + subtle drift
  parallax shipped site-wide in SHELL-1.1, see §7; the home arc strip drifts
  but does not yet morph.)
- Hero copy / positioning line — depends on D-01.
- (CV — resolved: the `/cv` route was removed; the CV is a PDF download from
  About, CV-DOWNLOAD-1. About's photos remain designed placeholders until real
  images land.)
- Exact imagery — extracted from the portfolio PDF in Phase 2.

Build the shell and static structure on the LOCKED tokens above. Leave the deferred items as
clean, clearly-marked placeholders.
