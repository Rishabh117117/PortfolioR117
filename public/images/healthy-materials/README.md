# Healthy Materials — photo slots

Drop optimized photos here (cap ~2000px long edge, quality ~82, jpg/webp).
The page (`app/work/healthy-materials/page.tsx`) currently renders a labeled
placeholder (`<PhotoSlot>`) for each slot, so the page is never broken while
assets are pending. To use a real frame, replace that scene's `<PhotoSlot …>`
with an `<img src="/images/healthy-materials/<file>" …>` (keep the same aspect
ratio class / `aspect-ratio`).

All photos come from Rishabh's capstone deck / portfolio PDF — likely shot at
the HML materials library. Confirm provenance for any that aren't his.

| Filename                 | Scene                       | What to use                                                   | Need     |
| ------------------------ | --------------------------- | ------------------------------------------------------------ | -------- |
| `hero.jpg`               | 3.1 Hero (full-bleed)       | Materials library shelves                                    | Needed   |
| `material-mycelium.jpg`  | 3.3 Materials (3:4)         | Mycelium composite sample                                    | Needed   |
| `material-bloom-foam.jpg`| 3.3 Materials (3:4)         | "Bloom Foam · microalgae" — the in-hand shot from the deck   | Needed   |
| `material-hempcrete.jpg` | 3.3 Materials (3:4)         | Hempcrete sample                                             | Optional |
| `material-straw.jpg`     | 3.3 Materials (3:4)         | Straw panel sample                                           | Optional |
| `close.jpg`              | 3.9 Close (optional)        | A strong library / sample photo for the closing gallery      | Needed   |

## Not cleared / do not assume

- **Sustainability wheel** (health / carbon / circularity / water / social /
  waste) is likely HML's framework, **not Rishabh's IP**. Use only if cleared;
  otherwise omit or recreate a simplified original. Flag, don't assume (spec §10).

## Honesty (spec §10)

The page shows **zero invented numbers**. Material descriptors stay qualitative.
Keep it that way when swapping in real imagery — captions/alt name the shot, they
don't add specs or measured claims.
