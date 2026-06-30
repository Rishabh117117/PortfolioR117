# Greener Hours — Page Build Spec

> **Status (current):** BUILT (GH-DECK-1, 2026-06-30). The bespoke
> `/work/greener-hours` route replaces the Phase-3 `[slug]` placeholder. The
> case study **is the deck**: the finished presentation (a self-contained HTML
> deck) is vendored as a static asset and embedded in a full-bleed 16:9 iframe,
> with the global Nav above and the project pager below. It was **not** rebuilt
> in React or ported to the portfolio's token system — it is a vendored artifact
> that keeps its own fonts (Fraunces / JetBrains Mono) and amber palette.

The page is the deck. The presentation lives at
`public/greener-hours/index.html` (copied verbatim from the source deck; Next
serves it at `/greener-hours/index.html`). It is a fixed 1920×1080 canvas that
letterboxes itself to any viewport via `min(scaleX, scaleY)`, so a 16:9 frame
makes it fill exactly with no letterbox. The route (`app/work/greener-hours/`)
supplies only the centered paper stage + the framed iframe + a mono "Open full
screen ↗" link to the raw deck, plus the `[slug]` project pager (← Follow /
Healthy Materials →). `--accent` comes from `lib/projects.ts` (Forest
`#1C3B36`); `"greener-hours"` is in `BESPOKE_SLUGS` so the dynamic route no
longer emits it.

- **Route:** `/work/greener-hours` (bespoke; listed in `BESPOKE_SLUGS` in
  `app/work/[slug]/page.tsx`).
- **Files:** `app/work/greener-hours/{page.tsx, greener-hours.module.css}`,
  `public/greener-hours/index.html` (vendored deck).
- **Vendored asset rule:** do not refactor, restyle, or apply token/lint rules
  to the deck — copy it verbatim. Reduced-motion is handled inside the deck.
- **Registry:** card accent stays Forest `#1C3B36` (the deck's amber `#C2410C`
  would collide with Follow's card); `status` stays `SIMULATED` (placeholder)
  until the live prototype is wired (D-03). The deck stays amber internally.

## Open follow-up (deferred — do not lose)

The interactive **Greener Hours prototype** (`greener-hours-prototype.jsx` — a
real Claude-in-the-chat experience, Tier-1 chat) is a separate **external chat
artifact, not yet vendored into this repo**. A later
sprint embeds/links it on this route and routes its model calls through
`app/api/ask` (server-side `ANTHROPIC_API_KEY`, never client-side; rate-limit
before launch). That is the path to flipping the demo badge off `SIMULATED`. Not
part of GH-DECK-1 ("copy the deck"). The deck's clean look + the in-chat
prototype are the two design hooks to carry forward.
