// Export Rishabh's selected cover images into public/images/home-hero/.
// Source: C:\Users\Owner\Desktop\cover images (his hand-picked set, 2026-07-03).
// sharp .rotate() applies EXIF orientation (the five phone photos are stored
// sideways); longest edge capped at 1600, mozjpeg q78 (PNG screenshots become
// JPEG too — all-opaque sources). Re-run after changing the set:
//   node _asset-tools/export_home_hero.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "C:/Users/Owner/Desktop/cover images";
const OUT = "public/images/home-hero";

const FILES = [
  ["20250401_142714.jpg", "flyer-table.jpg"],
  ["20250507_124457.jpg", "hw-tag.jpg"],
  ["20251001_160604.jpg", "hml-jars.jpg"],
  ["20251001_160728.jpg", "hml-drawers.jpg"],
  ["20251001_160852.jpg", "bloom-foam.jpg"],
  ["IMG-20250418-WA0016.jpg", "workshop-matrix.jpg"],
  ["IMG-20250418-WA0022.jpg", "hw-presenting.jpg"],
  ["Screenshot 2026-07-03 223626.png", "lotus-pair.jpg"],
  ["Screenshot 2026-07-03 223642.png", "lotus-top.jpg"],
  ["Screenshot 2026-07-03 223710.png", "yaap-yellow.jpg"],
  ["Screenshot 2026-07-03 223735.png", "yaap-blue.jpg"],
  ["Screenshot 2026-07-03 223808.png", "vsg-screens.jpg"],
  ["Screenshot 2026-07-03 223821.png", "vsg-personas.jpg"],
  ["untitled.34.jpg", "stun-side.jpg"],
  ["untitled.39.jpg", "stun-3q.jpg"],
  // added 2026-07-04 (his +5)
  ["20250221_154625.jpg", "hw-healthcare.jpg"],
  ["20250224_153335.jpg", "hw-retail.jpg"],
  ["20250507_124301.jpg", "thrift-denim.jpg"],
  ["Screenshot 2026-07-04 002102.png", "yaap-match.jpg"],
  ["Screenshot 2026-07-04 002133.png", "lotus-concepts.jpg"],
];

mkdirSync(OUT, { recursive: true });

for (const [src, out] of FILES) {
  // failOn:none tolerates the slightly-corrupt 8160px denim JPEG
  const img = sharp(path.join(SRC, src), { failOn: "none" }).rotate(); // EXIF-aware
  const meta = await img.metadata();
  await img
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(OUT, out));
  const done = await sharp(path.join(OUT, out)).metadata();
  console.log(
    `${src} (${meta.width}x${meta.height}, orient ${meta.orientation ?? 1}) -> ${out} (${done.width}x${done.height})`
  );
}
