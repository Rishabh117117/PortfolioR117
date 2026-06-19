# Rishabh Salian — Portfolio
Interactive portfolio with live, AI-powered project demos. Deployed on Railway, auto-deploy from main.
## Workflow
- The GitHub repo is the shared source of truth between Rishabh, Claude (chat/planning), and Claude Code (building).
- Claude writes specs into docs/. Claude Code reads them and builds. Railway deploys main.
- ALWAYS read docs/SITEMAP.md, docs/DECISIONS.md, docs/ROADMAP.md before starting any task.
## Hard rules
- ANTHROPIC_API_KEY is server-side only, accessed via app/api/ask. NEVER expose it client-side. Add rate limiting before launch.
- Every demo must be labeled honestly: WORKING (real prototype) vs SIMULATED (scripted). Never overclaim.
- The visual design language is NOT finalized. Do not commit to a design system, palette, or motion library until docs/ROADMAP.md Phase 1 is marked done.
## Projects (11)
- Flagships with live demos: Follow (working prototype), Greener Hours, Low-Carbon Materials, Housing Works.
- Archive (2019–23, static case studies): VSG (shipped client work), OBC Bank, BEST Bus, Music Rooms, YAAP, Stun Gun, Lotus Heater.
- Note: original source files were lost to a dead laptop. BEST app will be rebuilt in code; 3D products (stun gun, lotus heater) remodeled in Blender → GLB; archive imagery extracted from the existing portfolio PDF.

## Changelog
- **FOLLOW-PAGE-1 (2026-06-19) — bespoke `/work/follow`.** Replaced the Phase-3 `[slug]` placeholder with a real Follow page, ported 1:1 from `docs/prototypes/follow-page-scroll.html`. Shipped:
  - `app/work/follow/{page.tsx, FollowReel.tsx, FollowReel.css, follow.module.css}` — hero (dots-mark), deck-style project timeline, the problem, research & interviews, a full-viewport **scroll-pinned pipeline reel** (9 cumulative beats, JS scrubber, caption pill, reduced-motion → final frame), stat strip, differentiators, the four questions, where-it-sits, and the real `DemoCallout`.
  - Routing: `"follow"` added to `BESPOKE_SLUGS` (no double route generation — verified in the build).
  - Accent: Follow Persian Blue `#1C39BB` → burnt orange `#C2410C` in `lib/projects.ts` (+ derived shades on the page root); consistent on the page, the home grid card, and the `/work` card.
  - Reel CSS fully namespaced under `.followReel` (prototype `.reel`→`.followReel`, `pN`→`fpN`, reel-local `--ink`→`--navy`); shell tokens untouched; no global leak.
  - Verified in-browser: build clean (zero TS errors), no console errors, scroll sequencer + scrubber + caption track correctly, mobile stacks (timeline scrolls horizontally), other pages unchanged.
  - **One minimal shell adaptation:** the reel's top caption/label sit at `top:76px` to clear the layout's ~60px sticky nav (the standalone prototype had no shared shell).
  - **Decision flagged (D-03):** demo badge shipped as **SIMULATED** (default — the on-page artifact is an illustrative animation and the sandbox isn't built). To present Follow as **WORKING** instead, flip `status` in `lib/projects.ts`, the Follow page `DemoCallout`, and the home-page `DemoCallout` together.
  - **Follow-ups:** build the team-memory sandbox + point the CTA at it (currently `href="#"`); ESLint isn't installed in the repo, so `npm run lint` would trigger Next's first-run setup — the build's type-check is the gate.
