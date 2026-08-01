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
the two pivots). Layout: full-width intro (title + role + profile + availability chip
over the gold-wash contact box), then education + skills rail (left) beside the
journey (right).

Content rules: everything on the CV must already exist somewhere approved — the About
page (`app/about/page.tsx`, including the journey timeline), `lib/projects.ts`
taglines, or a prior CV. No invented claims. No em/en dashes in prose (site rule);
en-dash year ranges are fine (site-canonical).

**No photo, by design (2026-07-29):** US/EU hiring convention — CVs there are expected
photo-free (bias-screening; some ATS/recruiters reject photo CVs outright). Don't add a
portrait back for those markets. The About page's portrait frames are a different
surface and keep their photos.

**Two emails (2026-07-31):** `salir225@newschool.edu` leads, `rishabhsalian@ymail.com`
follows — the same order as the About contact block. The school address rides the
grad-cap glyph (rhyming with Education), the personal one the mail glyph. The box is
two balanced full-width flex rows (`.cRow`, space-between): four reach items over
three links — seven single-line cells, no double-height cell, no orphaned grid slot.
If either address changes, `lib/site.ts` is the site's source but this file is
hand-maintained — update both.

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
