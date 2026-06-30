# RUN-STATUS — GH-DECK-1 (Greener Hours deck-as-page)

**Branch:** `claude/portfolio-foundation-g8xwbo`
**Scope:** Replace the `[slug]` placeholder at `/work/greener-hours` with the
finished presentation deck, vendored as a static asset and embedded in a
full-bleed 16:9 iframe (global Nav above, project pager below). Deck copied
verbatim — not rebuilt, restyled, or tokenized.
**Started/Finished:** 2026-06-30 · **Status:** COMPLETE, verified, committed
per-file. Branch left unmerged for review.

## Decisions taken in-sprint
- **Pager styles reused, not copied:** the page imports the pager classes from
  `app/work/[slug]/project.module.css` (true reuse); `greener-hours.module.css`
  carries only the deck-frame + stage layout.
- **Clip wrapper + height-derived width cap:** the iframe sits in a `.frame` div
  with `overflow:hidden` that reliably clips the deck's near-black canvas to the
  `--radius-lg` corners (an iframe alone doesn't honor border-radius across
  engines) and carries `aspect-ratio:16/9` + `max-width: calc((100svh -
  var(--deck-reserve)) * 16 / 9)` (with a `100vh` fallback line first for engines
  without `svh`). On short/wide viewports the 16:9 box shrinks (width follows the
  height cap) instead of letterboxing; `--deck-reserve:160px` ≈ sticky Nav (60px)
  + stage padding + caption bar, so the framed deck sits within the viewport on
  landing. On phones the 16:9 box is small — the "Open full screen" link is the
  intended mobile reading path. (Single px/shadow values confined to the
  iframe-frame CSS, per brief.)
- **Compact caption bar** above the frame: project eyebrow (`{year} ·
  {discipline}`, accent) left, "Open full screen ↗" (mono, → new tab) right. No
  big H1 — the deck's own title slide is the heading, so a page H1 would double it.
- **`allow="fullscreen"`** on the iframe so the deck's own F-key / fullscreen
  button works in-frame (in addition to the "Open full screen" link).

## Done
- `public/greener-hours/index.html` — vendored deck, byte-for-byte verbatim
  (`diff` clean, 128471 B == source). No edits to its markup/CSS/JS.
- `app/work/greener-hours/page.tsx` — minimal bespoke route: `--accent` from
  `FLAGSHIPS`, a `.frame` wrapper around the 16:9 iframe
  (`src="/greener-hours/index.html"`, `title="Greener Hours — presentation"`,
  `loading="lazy"`, `allow="fullscreen"`), caption bar with the "Open full screen
  ↗" link, and the `[slug]` project pager (prev/next derived from `FLAGSHIPS`
  order → ← Follow / Healthy Materials →). Static `metadata` export → title
  `"Greener Hours — Rishabh Salian"` (matches the sibling Follow bespoke page).
  A11y/robustness from the review pass: a visually-hidden `<h1>` (document outline
  — the deck title is sealed in the iframe), an `aria-label` + `aria-hidden`
  arrow on the full-screen link, and an `index === -1 → notFound()` guard.
- `app/work/greener-hours/greener-hours.module.css` — frame + stage layout only,
  tokens throughout (`--maxw-wide`, `--page-pad`, `--space-*`, `--radius-lg`,
  `--ink`); the `.frame` clip wrapper (overflow:hidden) + `.deck` (iframe fills
  it) + `--deck-reserve` var + `vh`/`svh` height-cap fallbacks + an `.srOnly`
  helper; shadow value matches Follow's write-up panel.
- `app/work/[slug]/page.tsx` — `"greener-hours"` added to `BESPOKE_SLUGS` (dynamic
  route no longer emits it; no duplicate / no route-conflict warning).
- Docs: `docs/ROADMAP.md` Phase 3 (greener-hours → built; remaining = the
  prototype embed); `docs/DECISIONS.md` (D-06 RESOLVED + GH-DECK-1 Log entry);
  `docs/projects/greener-hours.md` (new short spec + the deferred prototype
  follow-up); this RUN-STATUS.

## Checks (actual output)
- **Build:** to avoid contending with the parallel housing-works session's dev
  server (port 3000) over the shared `.next`, the build ran in an isolated mirror
  of the tree (`scratchpad/gh-build`, fresh `.next`, `node_modules` junctioned).
  `npm run build` → `✓ Compiled successfully` / `✓ Generating static pages
  (20/20)` / exit 0. `/work/greener-hours` prerenders **`○ (Static)`** (376 B,
  First Load 96.4 kB). Count stays 20/20 (not incremented) **by design** —
  greener-hours simply moved from `[slug]`-generated to its own bespoke route
  (net zero); no `[slug]` sub-path for it, no duplicate-route warning.
  (Lint not run — ESLint not installed per CLAUDE.md; the build type-check is the
  gate. The `[slug]/project.module.css` cross-route import resolves cleanly.)
- **HTTP (isolated prod server, port 3210):** `/work/greener-hours` → 200;
  `/greener-hours/index.html` → 200. Route HTML contains the iframe
  (`src="/greener-hours/index.html"`, title, `loading="lazy"`,
  `allow="fullscreen"`), the `2025–26 · Climate · AI` eyebrow, "Open full
  screen", and the pager (`aria-label="Project pager"`, Follow / Healthy
  Materials). The served deck is the real one (`Greener Hours — Final
  Presentation`, `width: 1920px`, `--scale`).
- **No-letterbox (geometric):** the deck canvas is 1920×1080 (16:9) scaled by
  `min(scaleX, scaleY)`; in a 16:9 frame `scaleX === scaleY`, so it fills exactly
  with no letterbox, and re-scales on resize via the deck's own resize handler.
- **Review:** a 5-lens adversarial pass (brief-compliance, React/Next
  correctness, CSS robustness, a11y, docs) found no correctness bugs and confirmed
  the acceptance suite. Two `major` items were fixed: the iframe needed an
  `overflow:hidden` clip wrapper for the rounded corners, and the `svh` height cap
  needed a `vh` fallback; plus the headingless-page a11y gap (sr-only `<h1>`) and
  link/guard nits. The isolated build was re-run green after the fixes.
- **Browser screenshot not captured:** the preview MCP would require either
  editing the tracked `.claude/launch.json` or starting a second dev server in
  the shared folder (both would disturb the parallel housing-works session), so
  it was deliberately skipped in favor of the build + HTTP + DOM + geometry
  evidence above.

## Guardrails honoured
- Per-file commits, no `--amend`. No merge / no PR / no deploy. Branch left for
  review.
- Surgical staging (explicit paths only) — the parallel session's uncommitted
  `housing-works` + `AmbientField` changes were left untouched and uncommitted.
- The deck is a vendored asset: copied verbatim, no refactor / no token or lint
  rules applied. No new design tokens; the only raw values are inside the
  iframe-frame CSS (height-cap px + the Follow-matched shadow). `lib/projects.ts`
  unchanged (card accent Forest, status SIMULATED).
