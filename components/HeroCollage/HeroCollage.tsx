"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./HeroCollage.module.css";

/* The hero's backdrop — Rishabh's own cover set (Desktop\cover images,
   exported by _asset-tools/export_home_hero.mjs) thrown across the hero like
   physical cards: tilted, overlapping, no gaps, even across the box.
   Hovering a card parts the pile (neighbours slide away radially) AND raises
   a small glass label at its bottom edge — what the artifact is + the project
   it belongs to, and the whole card links there.

   Decorative by default: the layer is aria-hidden and the card links are
   tabIndex=-1 (a mouse-only enhancement — every project is reachable from the
   nav, the glass CTA, and the work grid). On touch the cards are inert
   (pointer-events:none via the CSS) so a tap never navigates unexpectedly. */

type ProjKey = "hw" | "hm" | "lotus" | "yaap" | "vsg" | "stun";

const PROJECTS: Record<ProjKey, { name: string; href: string }> = {
  hw: { name: "Housing Works", href: "/work/housing-works" },
  hm: { name: "Healthy Materials", href: "/work/healthy-materials" },
  lotus: { name: "Lotus Heater", href: "/archive/lotus-heater" },
  yaap: { name: "YAAP", href: "/archive/yaap" },
  vsg: { name: "VSG", href: "/archive/vsg" },
  stun: { name: "Stun Gun", href: "/archive/stun-gun" },
};

type Card = {
  k: string;
  src: string;
  cx: number;
  cy: number;
  w: number;
  rot: number;
  ar: string;
  sizes: string;
  /** what the artifact is (short) */
  what: string;
  proj: ProjKey;
  priority?: boolean;
};

/* 3-row × 7/6/7 bricked spread — offset middle row covers the outer rows'
   vertical seams; cards run tall (good row overlap) and narrower (smaller than
   the 15-card pass). Projects + colours interleaved so no region is one
   project or all-pale; throw order = array order = z-index. */
const CARDS: Card[] = [
  /* row 1 (7) */
  { k: "hmlJars", src: "/images/home-hero/hml-jars.jpg", cx: 7, cy: 15, w: 16, rot: -5, ar: "3 / 4", what: "Materials library", proj: "hm", sizes: "(max-width: 767px) 30vw, 16vw", priority: true },
  { k: "yaapYellow", src: "/images/home-hero/yaap-yellow.jpg", cx: 21, cy: 14, w: 19, rot: 4, ar: "16 / 9", what: "Social campaign", proj: "yaap", sizes: "(max-width: 767px) 36vw, 19vw", priority: true },
  { k: "lotusPair", src: "/images/home-hero/lotus-pair.jpg", cx: 35, cy: 15, w: 19, rot: -3, ar: "14 / 10", what: "Product render", proj: "lotus", sizes: "(max-width: 767px) 36vw, 19vw", priority: true },
  { k: "hwTag", src: "/images/home-hero/hw-tag.jpg", cx: 50, cy: 14, w: 15, rot: 5, ar: "3 / 4", what: "Thrift-shop tag", proj: "hw", sizes: "(max-width: 767px) 28vw, 15vw" },
  { k: "stun3q", src: "/images/home-hero/stun-3q.jpg", cx: 64, cy: 16, w: 20, rot: -4, ar: "4 / 3", what: "Concept render", proj: "stun", sizes: "(max-width: 767px) 38vw, 20vw", priority: true },
  { k: "vsgPersonas", src: "/images/home-hero/vsg-personas.jpg", cx: 78, cy: 15, w: 21, rot: 3, ar: "16 / 15", what: "User personas", proj: "vsg", sizes: "(max-width: 767px) 40vw, 21vw", priority: true },
  { k: "hwHealthcare", src: "/images/home-hero/hw-healthcare.jpg", cx: 93, cy: 15, w: 16, rot: -5, ar: "3 / 4", what: "Cylar Health Center", proj: "hw", sizes: "(max-width: 767px) 30vw, 16vw" },
  /* row 2 (6, offset) */
  { k: "lotusTop", src: "/images/home-hero/lotus-top.jpg", cx: 10, cy: 51, w: 21, rot: 4, ar: "13 / 10", what: "Top view", proj: "lotus", sizes: "(max-width: 767px) 40vw, 21vw" },
  { k: "yaapBlue", src: "/images/home-hero/yaap-blue.jpg", cx: 28, cy: 50, w: 19, rot: -3, ar: "14 / 10", what: "Social campaign", proj: "yaap", sizes: "(max-width: 767px) 36vw, 19vw" },
  { k: "hwPresenting", src: "/images/home-hero/hw-presenting.jpg", cx: 43, cy: 50, w: 16, rot: 5, ar: "3 / 4", what: "Team workshop", proj: "hw", sizes: "(max-width: 767px) 30vw, 16vw" },
  { k: "bloomFoam", src: "/images/home-hero/bloom-foam.jpg", cx: 57, cy: 50, w: 16, rot: -4, ar: "3 / 4", what: "Bloom Foam", proj: "hm", sizes: "(max-width: 767px) 30vw, 16vw" },
  { k: "thriftDenim", src: "/images/home-hero/thrift-denim.jpg", cx: 71, cy: 50, w: 16, rot: 4, ar: "3 / 4", what: "Thrift textile", proj: "hw", sizes: "(max-width: 767px) 30vw, 16vw" },
  { k: "stunSide", src: "/images/home-hero/stun-side.jpg", cx: 90, cy: 48, w: 22, rot: -4, ar: "4 / 3", what: "Concept render", proj: "stun", sizes: "(max-width: 767px) 42vw, 22vw", priority: true },
  /* row 3 (7) */
  { k: "workshopMatrix", src: "/images/home-hero/workshop-matrix.jpg", cx: 7, cy: 85, w: 16, rot: 5, ar: "3 / 4", what: "Engagement matrix", proj: "hw", sizes: "(max-width: 767px) 30vw, 16vw" },
  { k: "hmlDrawers", src: "/images/home-hero/hml-drawers.jpg", cx: 21, cy: 86, w: 16, rot: -4, ar: "3 / 4", what: "Materials taxonomy", proj: "hm", sizes: "(max-width: 767px) 30vw, 16vw" },
  { k: "yaapMatch", src: "/images/home-hero/yaap-match.jpg", cx: 35, cy: 85, w: 14, rot: 4, ar: "2 / 3", what: "Social campaign", proj: "yaap", sizes: "(max-width: 767px) 26vw, 14vw" },
  { k: "lotusConcepts", src: "/images/home-hero/lotus-concepts.jpg", cx: 49, cy: 85, w: 14, rot: -4, ar: "7 / 12", what: "Concept sketches", proj: "lotus", sizes: "(max-width: 767px) 26vw, 14vw" },
  { k: "vsgScreens", src: "/images/home-hero/vsg-screens.jpg", cx: 64, cy: 84, w: 21, rot: 3, ar: "13 / 10", what: "Website redesign", proj: "vsg", sizes: "(max-width: 767px) 40vw, 21vw" },
  { k: "hwRetail", src: "/images/home-hero/hw-retail.jpg", cx: 79, cy: 85, w: 16, rot: -5, ar: "3 / 4", what: "Retail visit", proj: "hw", sizes: "(max-width: 767px) 30vw, 16vw" },
  { k: "flyerTable", src: "/images/home-hero/flyer-table.jpg", cx: 93, cy: 84, w: 18, rot: 4, ar: "3 / 4", what: "Research posters", proj: "hw", sizes: "(max-width: 767px) 34vw, 18vw" },
];

/* Footer arrangement — the SAME gapless slots (geometry) as the hero but the
   images rotated onto different slots, so the closing collage rhymes with the
   hero for continuity without being a carbon copy. Never eager/priority
   (below the fold), no bottom bleed (it's the last section). */
export const FOOTER_CARDS: Card[] = CARDS.map((slot, i) => {
  const img = CARDS[(i + 11) % CARDS.length];
  return {
    ...slot,
    k: `f-${img.k}`,
    src: img.src,
    what: img.what,
    proj: img.proj,
    priority: false,
  };
});

type Props = {
  /** card layout to render (defaults to the hero arrangement) */
  cards?: Card[];
  /** eager-load the priority cards (hero above the fold); off for the footer */
  eager?: boolean;
  /** let the bottom row bleed below the box into the next section + run the
      scroll parallax (hero only) */
  bleed?: boolean;
};

/* radial falloff for the part: closer cards slide further */
const PUSH_MAX = 40;
const PUSH_RADIUS = 620;
const PUSH_BREATH = 6;

export default function HeroCollage({
  cards = CARDS,
  eager = true,
  bleed = true,
}: Props = {}) {
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

  /* depth parallax — each card drifts up on scroll by a rate set by its layer
     (throw order = z-index): the back cards (low z) barely move, the front
     cards (high z) move most, so the layers slide past and crunch into each
     other. Sets --pary per card (composed into the card transform in CSS);
     rAF-throttled, paused while hidden, skipped under reduced motion. */
  useEffect(() => {
    if (!bleed) return; // parallax is a hero-only motion; the footer sits still
    const wall = wallRef.current;
    const box = wall?.parentElement; // .collage (the clip box)
    if (!wall || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(wall.querySelectorAll<HTMLElement>("[data-k]"));
    const n = els.length;
    // depth rate — kept SMALL so the differential stays under the cards'
    // overlap and the pile never opens white gaps as it drifts (back barely
    // moves, front a little more); the bottom bleed is the main scroll motion
    const rate = (i: number) => 0.01 + (i / (n - 1)) * 0.04;
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (document.hidden) return;
      const rect = box.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return; // off-screen
      const scrolled = Math.max(0, -rect.top); // px scrolled into/past the hero
      for (let i = 0; i < n; i++) {
        els[i].style.setProperty("--pary", `${(-scrolled * rate(i)).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      els.forEach((el) => el.style.removeProperty("--pary"));
    };
  }, [bleed]);

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
    <div
      className={`${styles.collage} ${bleed ? "" : styles.noBleed}`}
      aria-hidden="true"
    >
      <div ref={wallRef} className={styles.wall} onPointerLeave={settle}>
        {cards.map((c, i) => {
          const p = PROJECTS[c.proj];
          return (
            <Link
              key={c.k}
              href={p.href}
              data-k={c.k}
              tabIndex={-1}
              draggable={false}
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
              <span className={styles.inner}>
                <Image
                  className={styles.img}
                  src={c.src}
                  alt=""
                  fill
                  sizes={c.sizes}
                  priority={eager && !!c.priority}
                />
              </span>
              {/* the glass label — rises from the bottom edge only when the
                  card is selected (data-hover, set by part()) */}
              <span className={styles.label}>
                <span className={styles.what}>{c.what}</span>
                <span className={styles.cta}>
                  {p.name}
                  <svg
                    className={styles.arrow}
                    viewBox="0 0 16 16"
                    width="11"
                    height="11"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* paper wash — keeps the copy legible over the pile on the left; open
          over the rest (pointer-transparent so hovers reach the cards) */}
      <div className={styles.wash} />
    </div>
  );
}
