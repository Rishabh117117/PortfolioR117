import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

const src = "C:/Users/Owner/Downloads/Portfolio Picture -20260704T190451Z-3-001/Portfolio Picture";
const out = "C:/Users/Owner/Desktop/Claude/PortfolioR117/public/images/about";
mkdirSync(out, { recursive: true });

// The grad shot (20260515_191419.jpg — Fifth Ave, Empire State) was the hero
// frame until 2026-07-28, when the East River portrait replaced it; the
// grad-nyc outputs were deleted on 07-29 at Rishabh's word. The portrait
// itself was generated ad hoc from a phone source, not through this script.
// The two group tiles beside the portrait — a Parsons crit (IMG-20251120-WA0041.jpg,
// the red-string BUILD installation) and a book-lined Mumbai group
// (d88f7b9d-61b6-4d0d-a264-a98f54e65eff.jpg) — were removed from About on
// 2026-08-03 at Rishabh's word, so their outputs are deleted and their jobs are
// gone from this list: About shows his portrait alone now. Nothing left to run.

// .rotate() auto-applies EXIF orientation; sharp strips metadata (incl. GPS) by default.
// [source, outfile, resize opts, quality]
const jobs = [];

for (const [inf, outf, resize, q] of jobs) {
  const info = await sharp(path.join(src, inf))
    .rotate()
    .resize({ ...resize, withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(path.join(out, outf));
  console.log(`${outf.padEnd(18)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
