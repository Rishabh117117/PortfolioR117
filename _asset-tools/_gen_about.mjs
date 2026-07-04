import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

const src = "C:/Users/Owner/Downloads/Portfolio Picture -20260704T190451Z-3-001/Portfolio Picture";
const out = "C:/Users/Owner/Desktop/Claude/PortfolioR117/public/images/about";
mkdirSync(out, { recursive: true });

const GRAD = "20260515_191419.jpg";              // New School grad, Fifth Ave, Empire State
const STUDIO = "IMG-20251120-WA0041.jpg";        // Parsons crit (red-string BUILD)
const MUMBAI = "d88f7b9d-61b6-4d0d-a264-a98f54e65eff.jpg"; // book-lined group

// .rotate() auto-applies EXIF orientation; sharp strips metadata (incl. GPS) by default.
// Cluster tiles: small + eager. -lg: the click-to-zoom view, loaded on demand.
// [source, outfile, resize opts, quality]
const jobs = [
  [GRAD,   "grad-nyc.jpg",     { width: 900 },  82],
  [STUDIO, "studio-nyc.jpg",   { width: 760 },  80],
  [MUMBAI, "mumbai.jpg",       { width: 760 },  80],
  // large (zoom) — cap long edge ~1600; withoutEnlargement keeps the low-res Mumbai source native (768w)
  [GRAD,   "grad-nyc-lg.jpg",   { height: 1600, withoutEnlargement: true }, 80],
  [STUDIO, "studio-nyc-lg.jpg", { height: 1600, withoutEnlargement: true }, 80],
  [MUMBAI, "mumbai-lg.jpg",     { height: 1600, withoutEnlargement: true }, 86],
];

for (const [inf, outf, resize, q] of jobs) {
  const info = await sharp(path.join(src, inf))
    .rotate()
    .resize({ ...resize, withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(path.join(out, outf));
  console.log(`${outf.padEnd(18)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
