# /public/images/stun-gun — assets for /archive/stun-gun

Real imagery, extracted from the portfolio PDF (`Rishabh's portfolio.pdf`,
pages 2–6) and processed: pages rasterised at 200 DPI, the four render angles
background-removed (AI matting) and registered to a common 1100×1100 transparent
canvas, model centred. Supporting photos cropped to JPEG.

## Rotation frames (the pinned crossfade sequence) — transparent PNG, 1100²
| file                   | source         | angle              | caption          |
|------------------------|----------------|--------------------|------------------|
| frame-01-hero.png      | PDF p2         | hero ¾ view        | `01 · FORM`      |
| frame-02-side.png      | PDF p6         | side profile       | `— · CONTEXT`    |
| frame-03-front.png     | PDF p4 (TR)    | front / face view  | `03 · SILHOUETTE`|
| frame-04-interface.png | PDF p4 (large) | top-down interface | `04 · INTERFACE` |

All four share one canvas with the model registered/centred — required or the
crossfade jumps. 6 angles read smoother than 4: add two intermediate ¾ frames
and extend the `FRAMES` array in `app/archive/stun-gun/Experience.tsx`; the
engine interpolates any count ≥ 2.

## Supporting imagery (parallax blocks, NOT rotated) — JPEG
| file                       | source     | block              |
|----------------------------|------------|--------------------|
| context-old-gun.jpg        | PDF p3 (L) | Context Analysis   |
| inspiration-f22.jpg        | PDF p3 (R) | Design Inspiration |
| inspiration-wireframe.jpg  | PDF p3 (R) | Design Inspiration |
| features-foam.jpg          | PDF p5 (R) | Features           |

## Re-extracting / swapping
The extraction scripts live outside the repo in `_asset-tools/`
(thumbs → zoom → extract → bg → register → finalize). To replace an angle, drop
a new transparent PNG here (same filename) or update the `src` in `Experience.tsx`.
