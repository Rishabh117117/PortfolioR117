"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./HeroCollage.module.css";

/* The hero's backdrop — Rishabh's own cover set (Desktop\cover images,
   exported by _asset-tools/export_home_hero.mjs) thrown across the hero
   like physical cards: tilted, overlapping, z = throw order, no gaps.
   Hovering a card parts the pile — neighbours slide away radially (closer
   cards move further) so the hovered one gets air, the way you'd nudge
   prints aside on a table. Pointer-fine + motion-safe only; the layer is
   aria-hidden and never intercepts clicks meant for the glass card (the
   glass sits above and captures its own pointer events). */

type Card = {
  k: string;
  src: string;
  /** card centre, % of the wall box */
  cx: number;
  cy: number;
  /** width in vw (mobile override lives in the CSS) */
  w: number;
  rot: number;
  /** aspect-ratio, ~native so spreads aren't cropped hard */
  ar: string;
  sizes: string;
  priority?: boolean;
};

/* Even spread across the whole box — a jittered 5×3 zigzag, renders +
   punchy-colour cards distributed across columns (never clumped), portraits
   and landscapes alternated so the rows knit vertically. Sizes reduced from
   the first pass. throw order = array order = z-index (renders/colour land
   last, on top). mobile widths scale by --wm (see the CSS). */
const CARDS: Card[] = [
  /* under-layer — neutral/busy cards land first. Rows are bricked (row 2's
     columns sit under row 1's seams) and cards oversized to shingle with no
     paper showing between them. */
  { k: "flyerTable", src: "/images/home-hero/flyer-table.jpg", cx: 88, cy: 47, w: 24, rot: 4, ar: "3 / 4", sizes: "(max-width: 767px) 44vw, 24vw" },
  { k: "hmlDrawers", src: "/images/home-hero/hml-drawers.jpg", cx: 92, cy: 85, w: 19, rot: 5, ar: "3 / 4", sizes: "(max-width: 767px) 35vw, 19vw" },
  { k: "hmlJars", src: "/images/home-hero/hml-jars.jpg", cx: 9, cy: 15, w: 20, rot: -5, ar: "3 / 4", sizes: "(max-width: 767px) 36vw, 20vw" },
  { k: "workshopMatrix", src: "/images/home-hero/workshop-matrix.jpg", cx: 8, cy: 85, w: 19, rot: 5, ar: "3 / 4", sizes: "(max-width: 767px) 35vw, 19vw" },
  { k: "hwPresenting", src: "/images/home-hero/hw-presenting.jpg", cx: 68, cy: 45, w: 20, rot: -5, ar: "3 / 4", sizes: "(max-width: 767px) 38vw, 20vw" },
  { k: "vsgScreens", src: "/images/home-hero/vsg-screens.jpg", cx: 50, cy: 80, w: 24, rot: 3, ar: "13 / 10", sizes: "(max-width: 767px) 46vw, 24vw" },
  /* mid-layer — the colour cards */
  { k: "vsgPersonas", src: "/images/home-hero/vsg-personas.jpg", cx: 28, cy: 45, w: 21, rot: -4, ar: "16 / 15", sizes: "(max-width: 767px) 40vw, 21vw" },
  { k: "bloomFoam", src: "/images/home-hero/bloom-foam.jpg", cx: 27, cy: 85, w: 20, rot: -4, ar: "3 / 4", sizes: "(max-width: 767px) 38vw, 20vw" },
  { k: "hwTag", src: "/images/home-hero/hw-tag.jpg", cx: 70, cy: 13, w: 18, rot: 5, ar: "3 / 4", sizes: "(max-width: 767px) 34vw, 18vw" },
  { k: "yaapBlue", src: "/images/home-hero/yaap-blue.jpg", cx: 48, cy: 48, w: 25, rot: 3, ar: "14 / 10", sizes: "(max-width: 767px) 46vw, 25vw" },
  { k: "yaapYellow", src: "/images/home-hero/yaap-yellow.jpg", cx: 27, cy: 13, w: 21, rot: 4, ar: "16 / 9", sizes: "(max-width: 767px) 40vw, 21vw", priority: true },
  /* top-layer — the product renders land last */
  { k: "lotusTop", src: "/images/home-hero/lotus-top.jpg", cx: 8, cy: 49, w: 21, rot: 4, ar: "13 / 10", sizes: "(max-width: 767px) 40vw, 21vw" },
  { k: "lotusPair", src: "/images/home-hero/lotus-pair.jpg", cx: 49, cy: 16, w: 24, rot: -3, ar: "14 / 10", sizes: "(max-width: 767px) 46vw, 24vw", priority: true },
  { k: "stunSide", src: "/images/home-hero/stun-side.jpg", cx: 72, cy: 83, w: 22, rot: -4, ar: "4 / 3", sizes: "(max-width: 767px) 42vw, 22vw" },
  { k: "stun3q", src: "/images/home-hero/stun-3q.jpg", cx: 89, cy: 15, w: 22, rot: -5, ar: "4 / 3", sizes: "(max-width: 767px) 42vw, 22vw", priority: true },
];

/* radial falloff for the part: closer cards slide further */
const PUSH_MAX = 46;
const PUSH_RADIUS = 640;
const PUSH_BREATH = 6;

export default function HeroCollage() {
  const wallRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      active.current = fine.matches && !still.matches;
    };
    update();
    fine.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  const cardsOf = (root: HTMLDivElement) =>
    Array.from(root.querySelectorAll<HTMLElement>("[data-k]"));

  const settle = () => {
    const root = wallRef.current;
    if (!root) return;
    for (const el of cardsOf(root)) {
      el.style.setProperty("--px", "0px");
      el.style.setProperty("--py", "0px");
      el.removeAttribute("data-hover");
    }
  };

  const part = (k: string) => {
    if (!active.current) return;
    const root = wallRef.current;
    if (!root) return;
    const els = cardsOf(root);
    const target = els.find((el) => el.dataset.k === k);
    if (!target) return;
    const tr = target.getBoundingClientRect();
    const tx = tr.left + tr.width / 2;
    const ty = tr.top + tr.height / 2;
    for (const el of els) {
      if (el === target) {
        el.setAttribute("data-hover", "");
        el.style.setProperty("--px", "0px");
        el.style.setProperty("--py", "0px");
        continue;
      }
      el.removeAttribute("data-hover");
      const r = el.getBoundingClientRect();
      const dx = r.left + r.width / 2 - tx;
      const dy = r.top + r.height / 2 - ty;
      const dist = Math.hypot(dx, dy) || 1;
      const push =
        Math.max(0, PUSH_MAX * (1 - dist / PUSH_RADIUS)) + PUSH_BREATH;
      el.style.setProperty("--px", `${((dx / dist) * push).toFixed(1)}px`);
      el.style.setProperty("--py", `${((dy / dist) * push).toFixed(1)}px`);
    }
  };

  return (
    <div className={styles.collage} aria-hidden="true">
      <div ref={wallRef} className={styles.wall} onPointerLeave={settle}>
        {CARDS.map((c, i) => (
          <div
            key={c.k}
            data-k={c.k}
            className={`${styles.card} ${styles[c.k]}`}
            style={
              {
                left: `${c.cx}%`,
                top: `${c.cy}%`,
                aspectRatio: c.ar,
                zIndex: i + 1,
                "--w": c.w,
                "--rot": `${c.rot}deg`,
              } as React.CSSProperties
            }
            onPointerEnter={() => part(c.k)}
          >
            <div className={styles.inner}>
              <Image
                className={styles.img}
                src={c.src}
                alt=""
                fill
                sizes={c.sizes}
                priority={c.priority}
              />
            </div>
          </div>
        ))}
      </div>

      {/* paper washes — quiet under the glass, open over the pile, then a
          melt into flat paper before the arc band (pointer-transparent, so
          hovers reach the cards beneath) */}
      <div className={styles.wash} />
      <div className={styles.fade} />
    </div>
  );
}
