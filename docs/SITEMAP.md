# Site Map
## L0 — Entry
- `/` Home: hero + positioning line; "The Arc" strip (objects → interfaces → systems); flagship Follow card; project grid; earlier-work teaser; footer CTA.
- Global layer (every page): nav (Work/About/Contact) + a breadcrumb trail under it (SHELL-1.1); project pager; "Ask the portfolio" — a Claude-powered concierge loaded with all 11 projects + CV, answers with citations/deep-links.
## L1 — Sections
- `/#work` (nav "Work"): the projects section on the landing page (Selected work + Earlier-work marquee). The standalone `/work` index duplicated the landing and is retired — `/work` now **301-redirects to `/#work`** and its component is preserved unrouted at `app/work/WorkPage.tsx`. Returns as a real page when discipline filtering ships.
- `/about`: arc narrative; timeline (roles/education); skills; photo; contact — **and the CV PDF download** (ABOUT-PAGE-1). [D-04 resolved]
- `/archive`: visual gallery of the 7 earlier projects.
- (`/cv` route REMOVED, CV-DOWNLOAD-1 — the CV is a direct PDF download from /about; `public/Rishabh-Salian-CV.pdf`.)
## L2 — Flagship project pages (shared template)
Template order: Brief → Problem/Insight/Solution → ★ Live demo (labeled) → Process → Artifacts → Honest limits → Next project.
- P-01 `/work/follow` — BUILT (bespoke route, FOLLOW-PAGE-1): scroll-pinned pipeline reel + deck-style timeline + research & interviews. On-page demo = illustrative animation (SIMULATED). Team-memory sandbox CTA = placeholder until built. [D-02 resolved: self-contained]
- P-02 `/work/greener-hours` — Demo: Tier 1 live chat carbon glyph + Tier 2 compute scheduler routing to cleanest grid window.
- P-03 `/work/healthy-materials` — Demo: Healthy Materials Package builder (pick scope → spec w/ cost/carbon comparison).
- P-04 `/work/housing-works` — Demo: trustee workshop generator (expertise + staff need → micro-workshop plan). Cross-link: origin of Follow.
## Flows
- F-01 Recruiter (primary): Home → Follow demo → About (+ CV download) → Contact (target < 90s).
- F-02 Deep dive: Work → project → demo → full report → next.
- F-03 Concierge: any page → Ask the portfolio → cited project/CV section.
