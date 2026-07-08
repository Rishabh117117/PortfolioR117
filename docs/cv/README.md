# CV source

`cv.html` is the single source for `public/Rishabh-Salian-CV.pdf` (the About page's
"Download CV · PDF" button serves that file directly — no code change needed to refresh it).

Content rules: everything on the CV must already exist somewhere approved — the About
page work list (`app/about/page.tsx`), `lib/projects.ts` taglines, or a prior CV.
No invented claims.

## Re-render

```
chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=12000 \
  --print-to-pdf="public/Rishabh-Salian-CV.pdf" "file:///<abs-path>/docs/cv/cv.html"
```

Needs network (Google Fonts: Bricolage Grotesque). Target: exactly 1 A4 page —
check with any PDF reader after rendering.
