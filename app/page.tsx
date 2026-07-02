import Link from "next/link";
import type { ReactNode } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import EarlierWorkDeck from "@/components/EarlierWorkDeck/EarlierWorkDeck";
import AmbientField from "@/components/AmbientField/AmbientField";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import { FollowThumb, GreenerHoursThumb } from "@/components/ProjectThumbs/ProjectThumbs";
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

      <div className={styles.pageContent}>
      {/* ================= HERO ================= */}
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>Rishabh Salian · designer</p>

          {/* HERO COPY — interim wording; final line pending D-01 */}
          <h1 className={styles.headline}>
            I design <em>systems</em> that used to be objects.
          </h1>

          <p className={styles.subhead}>
            I started in industrial and product design, moved through UX, and
            now build AI-native products end to end. The work below traces that
            arc.
          </p>

          <div className={styles.ctaRow}>
            <a href="#work" className="btn primary">
              View work ↓
            </a>
            <Link href="/about" className="btn ghost">
              About &amp; CV
            </Link>
          </div>
        </div>
      </section>

      {/* ================= "THE ARC" — static placeholder ================= */}
      {/* SIGNATURE MOTION DEFERRED — static placeholder, see DESIGN.md §10 */}
      <section className={`section ${styles.arcSection}`} aria-label="The arc">
        <div className="container" data-ambient-dim>
          <p className={`eyebrow ${styles.arcEyebrow}`}>The arc</p>
          <DriftGroup>
            <ol className={styles.arc}>
              <li className={styles.arcItem} data-depth="-9">
                <span className={styles.arcWord}>OBJECTS</span>
                <span className={`cap ${styles.arcCap}`}>Industrial design · 2019–22</span>
              </li>
              <li className={styles.arcArrow} aria-hidden="true">
                →
              </li>
              <li className={styles.arcItem} data-depth="7">
                <span className={styles.arcWord}>INTERFACES</span>
                <span className={`cap ${styles.arcCap}`}>Product & UX · 2021–24</span>
              </li>
              <li className={styles.arcArrow} aria-hidden="true">
                →
              </li>
              <li className={styles.arcItem} data-depth="-12">
                <span className={styles.arcWord}>SYSTEMS</span>
                <span className={`cap ${styles.arcCap}`}>AI-powered systems · 2025–26</span>
              </li>
            </ol>
          </DriftGroup>
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section id="work" className={`section ${styles.workSection}`}>
        <div className="container" data-ambient-dim>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Selected work</h2>
            <Link href="/work" className={`mono ${styles.seeAll}`}>
              All work →
            </Link>
          </div>

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
                featured={p.featured}
                thumb={THUMBS[p.slug]?.thumb}
                thumbNode={THUMBS[p.slug]?.node}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= EARLIER WORK (real portfolio thumbnails) ================= */}
      <section className={`section ${styles.earlierSection}`}>
        <div className="container" data-ambient-dim>
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
      <section className={`section ${styles.ctaSection}`}>
        <div className="container" data-ambient-dim>
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>Looking for a systems-minded designer?</h2>
            <div className={styles.ctaRow}>
              <Link href="/about" className="btn primary">
                About &amp; CV
              </Link>
              <a href="#contact" className="btn ghost">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
