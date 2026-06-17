import type { Metadata } from "next";
import Link from "next/link";
import Experience from "./Experience";
import styles from "./stun-gun.module.css";

export const metadata: Metadata = {
  title: "Stun Gun — Rishabh Salian",
  description:
    "A self-defence stun gun for women, restyled from aircraft language into an everyday object. An interactive scroll piece built from real product renders.",
};

// §8 — Stun Gun / Lotus accent (#A85F45 rose-metal) + derived shades, set at the
// page root; everything inherits.
const rootStyle = {
  "--accent": "#A85F45",
  "--accent-deep": "#8A4B34",
  "--accent-wash": "#EFD9CF",
  "--accent-tint": "#F7ECE6",
} as React.CSSProperties;

export default function StunGunPage() {
  return (
    <div style={rootStyle} className={styles.page}>
      {/* ============ INTRO (scrolls) ============ */}
      <header className={`container ${styles.intro}`}>
        <p className={`mono ${styles.eyebrow}`}>Stun gun for women · 2022</p>
        <h1 className={styles.title}>
          A safety object that doesn’t read as a <em>weapon</em>.
        </h1>
        <p className={styles.lede}>
          An industrial-design study: take a category styled like a blunt
          instrument and redraw it as something calm enough to carry every day —
          its surface language borrowed from the Lockheed&nbsp;Martin F-22, its
          colour story carried by a single rose-gold body.
        </p>
        <p className={`mono ${styles.honest}`}>
          Interactive · scroll to turn the render — built from real product
          renders, not a 3D model.
        </p>
      </header>

      {/* ============ THE PINNED, TURNING RENDER ============ */}
      <Experience />

      {/* ============ CLOSE / HONEST NOTE ============ */}
      <section className={`container ${styles.close}`}>
        <p className={`mono ${styles.kicker}`}>On this page</p>
        <p className={styles.body}>
          The render turns through four real angles as you scroll — hero,
          profile, face, and interface — each timed to the section it
          illustrates. It’s a sequence of studio renders crossfaded on scroll,
          not a real-time 3D viewer. Original 2022 source files were lost; the
          imagery here is extracted from the portfolio archive.
        </p>
      </section>

      {/* ============ PAGER ============ */}
      <nav className={`container ${styles.pager}`} aria-label="Archive">
        <Link href="/archive" className={`mono ${styles.pagerLink}`}>
          ← All archive
        </Link>
        <Link href="/archive" className={`mono ${styles.pagerLink}`}>
          Lotus Heater →
        </Link>
      </nav>
    </div>
  );
}
