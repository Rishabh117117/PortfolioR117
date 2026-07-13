import Link from "next/link";
import type { ReactNode } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import EarlierWorkDeck from "@/components/EarlierWorkDeck/EarlierWorkDeck";
import AmbientField from "@/components/AmbientField/AmbientField";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import Reveal from "@/components/Reveal/Reveal";
import HeroCollage, { FOOTER_CARDS } from "@/components/HeroCollage/HeroCollage";
import { FollowThumb, GreenerHoursThumb } from "@/components/ProjectThumbs/ProjectThumbs";
import { ObjectsCutout, InterfacesCutout, SystemsCutout } from "@/components/ArcCutouts";
import { FLAGSHIPS } from "@/lib/projects";
import styles from "./page.module.css";

// flagship cover art by slug: real photos where they exist, bespoke SVG motifs
// for Follow + Greener Hours (which ship diagrams, not photography).
const THUMBS: Record<
  string,
  { thumb?: { src: string; alt: string }; node?: ReactNode }
> = {
  follow: { node: <FollowThumb /> },
  "greener-hours": { node: <GreenerHoursThumb /> },
  "healthy-materials": {
    thumb: {
      src: "/images/healthy-materials/samples-overhead.jpg",
      alt: "Material samples laid out overhead",
    },
  },
  "housing-works": {
    thumb: {
      src: "/images/housing-works/hero.jpg",
      alt: "Housing Works service-design fieldwork",
    },
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      {/* shell ambient — warm gold (origin) → Persian Blue (the site accent).
          Bolder alphas + a deeper dim target: orbs read solid in open space and
          fall back hard (per-orb) as their core crosses a [data-ambient-dim] block. */}
      <AmbientField
        warm={[
          { color: "#9A7B4F", alpha: 0.4 },
          { color: "#9A7B4F", alpha: 0.34 },
        ]}
        cool={[
          { color: "#1C39BB", alpha: 0.38 },
          { color: "#1C39BB", alpha: 0.32 },
        ]}
        restWarm={0.9}
        restCool={0.65}
        dim={0.28}
      />
      {/* site-wide scroll-reveal: fades section content up as it enters view
          (hero stays instant — no fade on the pinboard collage) */}
      <Reveal />

      <div className={styles.pageContent}>
      {/* ================= HERO ================= */}
      {/* pinboard of real work behind, copy on the flagship glass in front */}
      <section className={`section ${styles.hero}`}>
        <HeroCollage />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroCard}>
            <p className={`eyebrow ${styles.eyebrow}`}>Rishabh Salian · designer &amp; builder</p>

            {/* HERO COPY — D-01 resolved (COPY-A-1): the claim is design + build,
                substantiated by the four working demos in the grid below. */}
            <h1 className={styles.headline}>
              I design AI products, and <em>build</em> them, so you can try
              everything below.
            </h1>

            <p className={styles.subhead}>
              I started in industrial and product design, moved through UX, and
              now build AI-native products end to end.
            </p>

            <div className={styles.ctaRow}>
              <a href="#work" className="btn primary">
                View work ↓
              </a>
              <Link href="/about" className="btn ghost">
                About &amp; CV
              </Link>
            </div>

            {/* the intent line, above the fold — mirrors the About hero chip so
                a recruiter never has to scroll to learn what he's looking for */}
            <p className={styles.availability}>
              <span className={styles.liveDot} aria-hidden="true" />
              Brooklyn, NY — open to internships now · full-time from early 2027
            </p>
          </div>
        </div>
      </section>

      {/* ================= "THE ARC" — static placeholder ================= */}
      {/* SIGNATURE MOTION DEFERRED — static placeholder, see DESIGN.md §10 */}
      <section className={`section ${styles.arcSection}`} aria-label="The arc">
        <div className="container" data-ambient-dim data-reveal>
          <p className={`eyebrow ${styles.arcEyebrow}`}>The arc</p>
          <DriftGroup>
            <ol className={styles.arc}>
              <li className={styles.arcItem} data-depth="-9">
                <span className={`${styles.arcSticker} ${styles.tiltA}`} aria-hidden="true">
                  <ObjectsCutout />
                </span>
                <span className={styles.arcWord}>OBJECTS</span>
                <span className={`cap ${styles.arcCap}`}>Industrial design · 2019–22</span>
              </li>
              <li className={styles.arcArrow} aria-hidden="true">
                →
              </li>
              <li className={styles.arcItem} data-depth="7">
                <span className={`${styles.arcSticker} ${styles.tiltB}`} aria-hidden="true">
                  <InterfacesCutout />
                </span>
                <span className={styles.arcWord}>INTERFACES</span>
                <span className={`cap ${styles.arcCap}`}>Product & UX · 2021–24</span>
              </li>
              <li className={styles.arcArrow} aria-hidden="true">
                →
              </li>
              <li className={styles.arcItem} data-depth="-12">
                <span className={`${styles.arcSticker} ${styles.tiltC}`} aria-hidden="true">
                  <SystemsCutout />
                </span>
                <span className={styles.arcWord}>SYSTEMS</span>
                <span className={`cap ${styles.arcCap}`}>AI-native products · 2025–26</span>
              </li>
            </ol>
          </DriftGroup>
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section id="work" className={`section ${styles.workSection}`}>
        <div className="container" data-ambient-dim data-reveal>
          {/* the flagship grid sits on a narrower measure — four equal cards
              in a compact 2×2 (the featured banner treatment is retired) */}
          <div className={styles.workInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.h2}>Selected work</h2>
            </div>
            {/* top-of-funnel proof line — the chips claim it, this says it plainly */}
            <p className={`cap ${styles.workNote}`}>
              All four end in something you can actually try — open any card.
            </p>

            <div className={styles.grid}>
              {FLAGSHIPS.map((p) => (
                <ProjectCard
                  key={p.slug}
                  name={p.name}
                  year={p.year}
                  discipline={p.discipline}
                  href={`/work/${p.slug}`}
                  accent={p.accent}
                  status={p.status}
                  meta={p.meta}
                  tagline={p.tagline}
                  thumb={THUMBS[p.slug]?.thumb}
                  thumbNode={THUMBS[p.slug]?.node}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EARLIER WORK (real portfolio thumbnails) ================= */}
      <section className={`section ${styles.earlierSection}`}>
        <div className="container" data-ambient-dim data-reveal>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Earlier work · 2019–23</h2>
            <Link href="/archive" className={`mono ${styles.seeAll}`}>
              Open the full portfolio →
            </Link>
          </div>
          <EarlierWorkDeck />
        </div>
      </section>

      {/* ================= FOOTER CTA ROW ================= */}
      {/* mirrors the hero — the same pile (fresh arrangement) behind the same
          glass — so the page opens and closes on the one language */}
      <section className={`section ${styles.ctaSection}`}>
        <HeroCollage cards={FOOTER_CARDS} eager={false} bleed={false} behindGlass />
        <div className={styles.ctaGlass} />
        <div className={`container ${styles.ctaContent}`} data-reveal>
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>
              I graduate this December — open to internships this fall, and
              Design Engineer &amp; Product roles from early 2027.
            </h2>
            <div className={styles.ctaRow}>
              <Link href="/about" className="btn primary">
                About &amp; CV
              </Link>
              <Link href="/about#contact" scroll={false} className="btn ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
