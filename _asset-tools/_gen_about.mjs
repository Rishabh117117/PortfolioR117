import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

// About's photo assets. Source lives outside the repo (a phone export), so pass
// its folder in rather than hard-coding a local path into a public repo:
//   node _asset-tools/_gen_about.mjs "<folder holding the source files>"
const src = process.argv[2] ?? process.env.ABOUT_SRC;
if (!src) {
  console.error('Usage: node _asset-tools/_gen_about.mjs "<source folder>"  (or set ABOUT_SRC)');
  process.exit(1);
}
const out = path.resolve('public/images/about');
mkdirSync(out, { recursive: true });

// History: the grad shot (20260515_191419.jpg, Fifth Ave) was the hero frame
// until 2026-07-28, when an East River portrait took over; the grad outputs were
// deleted on 07-29. Two group tiles sat beside the portrait — a Parsons crit
// (IMG-20251120-WA0041.jpg) and a book-lined Mumbai group
// (d88f7b9d-61b6-4d0d-a264-a98f54e65eff.jpg) — until 2026-08-03, when Rishabh
// had both removed and their four outputs deleted. About is one frame now.
const PORTRAIT = 'portrait, portfolio site.jpg'; // Chicago skyline, supplied 2026-08-06

// .rotate() auto-applies EXIF orientation; sharp strips metadata (incl. GPS) by default.
// The tile is small + eager; -lg is the click-to-zoom view, loaded on demand. The
// source is only 682x910, so withoutEnlargement keeps both native and -lg just
// spends its extra quality on the same pixels.
// [source, outfile, resize opts, quality]
const jobs = [
  [PORTRAIT, 'portrait.jpg',    { width: 900 }, 80],
  [PORTRAIT, 'portrait-lg.jpg', { width: 900 }, 86],
];

for (const [inf, outf, resize, q] of jobs) {
  const info = await sharp(path.join(src, inf))
    .rotate()
    .resize({ ...resize, withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(path.join(out, outf));
  console.log(`${outf.padEnd(18)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
