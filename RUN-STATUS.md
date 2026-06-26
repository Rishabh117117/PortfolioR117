# RUN-STATUS — RESTRUCTURE-1 (reel split)

**Branch:** `claude/portfolio-foundation-g8xwbo`
**Scope:** "How it works" / reel section only — full-viewport scroll-pin → inline two-up (2/3 reel autoplay-loop + 1/3 write-up).
**Started/Finished:** 2026-06-25 · **Status:** COMPLETE, verified, committed per-file. Branch left unmerged for review.

## Decisions taken in-sprint (the prototype could not supply these)
- **Loop cadence** (named prototype held no timed loop): **1100ms / beat + 1500ms end-hold** (~11.4s/cycle, 9 beats).
- **Mobile edge-legend** (short box clipped the overlay): **moved below the reel** as a dark strip on mobile; stays an in-box overlay on desktop.

## Done
- `app/work/follow/FollowReel.tsx` — scroll sequencer → IntersectionObserver autoplay-on-view loop (1100/1500). Removed `scrollVh` prop, scrolly/pin wrappers, and the now-false "scroll ↓" hint. New `.followReelHolder` root holds the box + the relocated `.reelLegend` sibling. Reduced-motion → static final frame preserved.
- `app/work/follow/FollowReel.css` — removed `.followReel-scrolly` (450vh) + `.followReel-pin` (sticky/100dvh) + `.reelHint`/bob keyframe. Reel root is now `width:100%; aspect-ratio:16/10; border-radius:var(--radius-lg); overflow:hidden`. Dark-theme tokens moved to `.followReelHolder` (so the sibling legend inherits them). `.reelLegend`: dark strip below the box on mobile, in-box overlay (fade-in at beat 3 via adjacent-sibling selector) ≥768px. topcap/reelLabel insets → `var(--space-4)`.
- `app/work/follow/page.tsx` — reel-head intro + bare `<FollowReel />` → one two-up section (`.howGrid` → `.reelWrap` + `.writeup` aside). Illustrative-animation note + stat strip kept untouched (per acceptance).
- `app/work/follow/follow.module.css` — `.howGrid` (1col mobile / `2fr 1fr` ≥768px), `.reelWrap` (min-width:0), `.writeup` (tint panel, borderless, hover-lift pointer-only + reduced-motion-safe), `.writeupKicker`, `.writeupBody`.
- Docs: `follow.md` §2 item 5 + stale "scroll-pinned" claims; `DESIGN.md` §7 + §10 (autoplay-on-view = first scoped motion piece); `DECISIONS.md` Log RESTRUCTURE-1 entry + D-02 descriptor.
- Snapshot of the four pre-cut files in `_archive/2026-06-25-reel-split/`.

## Checks (actual output)
- `npm run build` → `✓ Compiled successfully` / `Linting and checking validity of types ...` / `✓ Generating static pages (20/20)` / exit 0. `/work/follow` prerenders static (4.01 kB). (Lint not run — ESLint not installed per CLAUDE.md; the build type-check is the gate.)
- Desktop 1280px: grid `725px / 363px` (2:1), gap 48px, reel aspect 1.60, write-up `#FBEFE7` tint, border 0, specified shadow. Legend overlay inside box (324px top / 82px from bottom), hidden through beats 1–2, opacity 1 from beat 3. No overlap/clip.
- Loop mechanism (verified by deterministic replay — preview tab is `document.hidden`, so IntersectionObserver/rAF/screenshots don't fire there; the loop runs in a visible browser): additive `on go fp1…fpN`, caption populates per beat from BEATS, scrubber 11.11%→100% in 9 steps, resets to base. `additiveOK: true`.
- Mobile 390px: stacks single-column; reel box (aspect 1.60) → navy legend strip below it (all 5 edge types, unclipped) → write-up. Order + gaps correct. No console errors.

## Post-sprint follow-up (2026-06-26)
- Removed the dark stat strip (5 LLM roles · 3 tensors · 5 edge types · 12 MCP tools) from `/work/follow` per request — section + orphaned `.strip/.stat*` CSS deleted; `--navy` kept (still used by the hero dots-mark); docs reconciled (`follow.md` §0/§1/§2, `DECISIONS.md` Log). The illustrative-animation note above it was left in place (not the strip). Build green; section flow verified (note → differentiators).

## Guardrails honoured
- Per-file commits, no `--amend`. No merge / no deploy / no PR. Branch left for review.
- Tokens only (no new hard-coded hex/px beyond the spec-given panel shadow + pre-existing scoped reel dark-theme palette). No new deps; `motion@12` still unused.
