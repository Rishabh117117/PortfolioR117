import Image from "next/image";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import styles from "./HeroCollage.module.css";

/* The hero's backdrop — an edge-to-edge wall of Rishabh's own photography
   and renders: the Gen-Z poster study, the HML materials library, Housing
   Works field visits, the stun-gun renders and its foam ergonomic model.
   No archive-page spreads (typeset text would fight the headline) and no
   web-sourced reference imagery — every frame is project-original.
   The wall fills the hero as a 6×3 mosaic; each image drifts a few px
   INSIDE its cell (the shift layer oversizes by 20px so the wall never
   opens a gap). Decorative throughout: aria-hidden, pointer-transparent. */

type Cell = {
  k:
    | "libWall"
    | "taxonomy"
    | "bloom"
    | "stunHero"
    | "foamModel"
    | "siteSofa"
    | "poster"
    | "siteRooms"
    | "siteRacks"
    | "stunFront";
  src: string;
  sizes: string;
  /** in-cell parallax offset in px; sign flips the direction */
  depth: number;
  tag?: string;
  priority?: boolean;
};

/* crop windows (object-position) live in the CSS module, per cell — they're
   layout, and the poster's shifts by breakpoint */
const CELLS: Cell[] = [
  /* row 1 */
  {
    k: "libWall",
    src: "/images/healthy-materials/library-wall.jpg",
    sizes: "34vw",
    depth: -10,
    priority: true,
  },
  {
    k: "taxonomy",
    src: "/images/healthy-materials/taxonomy-drawers.jpg",
    sizes: "17vw",
    depth: 14,
    priority: true,
  },
  {
    k: "bloom",
    src: "/images/healthy-materials/bloom-foam-card.jpg",
    sizes: "17vw",
    depth: -8,
    tag: "HML materials library",
  },
  {
    k: "stunHero",
    src: "/images/stun-gun/hero-3q.jpg",
    sizes: "(max-width: 767px) 67vw, 34vw",
    depth: 12,
    tag: "Stun-gun concept",
    priority: true,
  },
  /* row 2 */
  {
    k: "foamModel",
    src: "/images/stun-gun/features-foam.jpg",
    sizes: "17vw",
    depth: 10,
  },
  {
    k: "siteSofa",
    src: "/images/housing-works/site-1.jpg",
    sizes: "17vw",
    depth: -12,
  },
  {
    k: "poster",
    src: "/images/housing-works/deck-1.jpg",
    sizes: "(max-width: 767px) 34vw, 17vw",
    depth: 16,
    tag: "Gen-Z poster study",
  },
  /* row 3 */
  {
    k: "siteRooms",
    src: "/images/housing-works/site-3.jpg",
    sizes: "(max-width: 767px) 67vw, 34vw",
    depth: -10,
    tag: "Field visits",
  },
  {
    k: "siteRacks",
    src: "/images/housing-works/site-4.jpg",
    sizes: "(max-width: 767px) 34vw, 17vw",
    depth: 8,
  },
  {
    k: "stunFront",
    src: "/images/stun-gun/concept-front.jpg",
    sizes: "17vw",
    depth: -14,
  },
];

export default function HeroCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <DriftGroup className={styles.wall}>
        {CELLS.map((c) => (
          <div key={c.k} className={`${styles.cell} ${styles[c.k]}`}>
            {/* drift translates this oversized layer inside the clipped
                cell — the mosaic itself never moves or opens gaps */}
            <div className={styles.shift} data-depth={c.depth}>
              <Image
                className={styles.img}
                src={c.src}
                alt=""
                fill
                sizes={c.sizes}
                priority={c.priority}
              />
            </div>
            {c.tag ? <span className={styles.tag}>{c.tag}</span> : null}
          </div>
        ))}
      </DriftGroup>

      {/* paper washes — quiet under the glass, open over the right field,
          then a melt into flat paper before the arc band takes over */}
      <div className={styles.wash} />
      <div className={styles.fade} />

      {/* the exhibit chip — frames the wall as a curated set */}
      <span className={styles.chip}>Selected artifacts · 2019 → 2026</span>
    </div>
  );
}
