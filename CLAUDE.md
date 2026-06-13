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
