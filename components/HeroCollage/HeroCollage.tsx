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

/* throw order = array order = z-index (later lands on top) */
const CARDS: Card[] = [
  { k: "flyerTable", src: "/images/home-hero/flyer-table.jpg", cx: 5, cy: 22, w: 16, rot: -7, ar: "3 / 4", sizes: "16vw" },
  { k: "hmlJars", src: "/images/home-hero/hml-jars.jpg", cx: 19, cy: 10, w: 15, rot: 4, ar: "3 / 4", sizes: "(max-width: 767px) 44vw, 15vw" },
  { k: "vsgPersonas", src: "/images/home-hero/vsg-personas.jpg", cx: 36, cy: 8, w: 20, rot: -3, ar: "16 / 15", sizes: "20vw" },
  { k: "hmlDrawers", src: "/images/home-hero/hml-drawers.jpg", cx: 9, cy: 56, w: 16, rot: 5, ar: "3 / 4", sizes: "16vw" },
  { k: "vsgScreens", src: "/images/home-hero/vsg-screens.jpg", cx: 30, cy: 44, w: 23, rot: 2, ar: "13 / 10", sizes: "23vw" },
  { k: "bloomFoam", src: "/images/home-hero/bloom-foam.jpg", cx: 28, cy: 82, w: 16, rot: -5, ar: "3 / 4", sizes: "16vw" },
  { k: "yaapBlue", src: "/images/home-hero/yaap-blue.jpg", cx: 48, cy: 30, w: 19, rot: 6, ar: "14 / 10", sizes: "19vw" },
  { k: "hwTag", src: "/images/home-hero/hw-tag.jpg", cx: 42, cy: 68, w: 17, rot: -4, ar: "3 / 4", sizes: "(max-width: 767px) 42vw, 17vw" },
  { k: "workshopMatrix", src: "/images/home-hero/workshop-matrix.jpg", cx: 6, cy: 92, w: 14, rot: 6, ar: "3 / 4", sizes: "14vw" },
  { k: "yaapYellow", src: "/images/home-hero/yaap-yellow.jpg", cx: 61, cy: 12, w: 21, rot: -5, ar: "16 / 9", sizes: "(max-width: 767px) 55vw, 21vw", priority: true },
  { k: "lotusPair", src: "/images/home-hero/lotus-pair.jpg", cx: 82, cy: 16, w: 24, rot: 3, ar: "14 / 10", sizes: "(max-width: 767px) 55vw, 24vw", priority: true },
  { k: "hwPresenting", src: "/images/home-hero/hw-presenting.jpg", cx: 65, cy: 50, w: 17, rot: 4, ar: "3 / 4", sizes: "(max-width: 767px) 44vw, 17vw" },
  { k: "stun3q", src: "/images/home-hero/stun-3q.jpg", cx: 84, cy: 45, w: 23, rot: -6, ar: "4 / 3", sizes: "(max-width: 767px) 58vw, 23vw", priority: true },
  { k: "lotusTop", src: "/images/home-hero/lotus-top.jpg", cx: 58, cy: 87, w: 21, rot: 5, ar: "13 / 10", sizes: "(max-width: 767px) 52vw, 21vw" },
  { k: "stunSide", src: "/images/home-hero/stun-side.jpg", cx: 88, cy: 84, w: 22, rot: -3, ar: "4 / 3", sizes: "22vw" },
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
