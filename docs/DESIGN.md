# docs/DESIGN.md — Design Language (LOCKED v1.0)

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
- Labels, code, demo UI, meta: IBM Plex Mono (400/500)

--font-display: 'Bricolage Grotesque', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
--font-mono:    'IBM Plex Mono', ui-monospace, monospace;

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
| --fs-label    | labels/UI     | mono 500    | 11px UPPERCASE             | .08em    | 1.4  |

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
Work · About · CV · Contact right. Active link in --accent, mono 11px. Mobile → burger.

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
- Do NOT build scroll-reveals, parallax, or the signature arc yet — those come in the motion phase.

---

## 8. Per-project accent map

Set --accent (+ derived shades) at the project page/root level; everything else inherits.

| Project            | --accent  | Notes                          |
|--------------------|-----------|--------------------------------|
| Follow             | #1C39BB   | Persian Blue (flagship)        |
| Greener Hours      | #1C3B36   | Forest                         |
| Healthy Materials  | #5C7A3A   | Leaf (clay #B0763F secondary)  |
| Housing Works      | #C0263B   | Magenta-red                    |
| Stun Gun / Lotus   | #A85F45   | Rose-metal / bronze            |
| VSG / BEST / OBC   | brand     | client brand colors per case   |

When a project sets --accent, also set --accent-deep/-wash/-tint to matching shades.

---

## 9. Accessibility

- Color contrast >= WCAG AA for text. (Persian Blue on paper passes for large/medium text; check
  small text — darken to --accent-deep if needed.)
- Visible focus rings (--accent, 2px) on all interactive elements.
- prefers-reduced-motion respected globally.
- Semantic HTML; alt text on all imagery; nav as <nav>, landmarks correct.

---

## 10. What's NOT decided yet (do not invent)

- Full motion system (scroll reveals, the signature "objects→interfaces→systems" arc, true
  parallax) — deferred to the motion phase, built against real pages.
- Hero copy / positioning line — depends on D-01.
- About/CV content — depends on D-04, D-05.
- Exact imagery — extracted from the portfolio PDF in Phase 2.

Build the shell and static structure on the LOCKED tokens above. Leave the deferred items as
clean, clearly-marked placeholders.
