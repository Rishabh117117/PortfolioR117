# CV source

`cv.html` is the single source for `public/Rishabh-Salian-CV.pdf` (the About page's
"Download CV · PDF" button serves that file directly — no code change needed to refresh it).

Since 2026-07-26 the CV speaks the site's design language: paper + static AmbientField
orbs (the About gold/blue palette), typography directly on the background (no cards —
per Rishabh; the gold-wash contact box is the one boxed element), gold `§ NN ·` kickers,
Bricolage/Inter/Plex Mono mapped exactly like the site tokens, hand-drawn line icons
(currentColor, stroke 1.7, round — the site glyph recipe), and the About journey
timeline turned vertical, latest first (node colors: hollow ink = education,
ink = studio/agency, accent = Parsons era, hollow accent = upcoming; accent chips =
the two pivots). Layout: title + role + profile flow as one block over a contact box
and the timeline (left); photo above Education, skills, Open to (right rail).

Content rules: everything on the CV must already exist somewhere approved — the About
page (`app/about/page.tsx`, including the journey timeline), `lib/projects.ts`
taglines, or a prior CV. No invented claims. No em/en dashes in prose (site rule);
en-dash year ranges are fine (site-canonical).

The photo tile crops `public/images/about/portrait-lg.jpg` via `background-size` /
`background-position` — swap the file (or the URL in `.photo`) to change the portrait;
retune `background-position` if the new photo's face sits elsewhere. That file is the
same portrait the About page's hero frame uses, so the two surfaces stay in sync.

## Re-render

```
chrome --headless=new --disable-gpu --no-first-run --user-data-dir=<FRESH-TEMP-DIR> \
  --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf="public/Rishabh-Salian-CV.pdf" "file:///<abs-path>/docs/cv/cv.html"
```

Needs network (Google Fonts: Bricolage Grotesque + Inter + IBM Plex Mono). Target:
exactly 1 A4 page — verify by opening the PDF after rendering.

Gotchas (both bitten in the 2026-07-26 build):

- **Use a fresh `--user-data-dir` every run.** If Chrome's singleton is already
  running against that profile, headless silently exits WITHOUT printing (no
  "bytes written" line, file untouched). The "bytes written" stdout line is the
  success signal.
- **Keep every absolutely-positioned element inside `.bg` (or within the page box).**
  The ambient orbs hang past the sheet edges; `.bg { inset: 0; overflow: hidden }`
  contains them. Anything positioned outside the 210mm box widens the printed
  document and Chrome silently shrink-to-fits the whole page (~80%), which shows up
  as wide right/bottom margins and everything slightly small.
