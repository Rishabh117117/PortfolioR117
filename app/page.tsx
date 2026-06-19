import Link from "next/link";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import DemoCallout from "@/components/DemoCallout/DemoCallout";
import ArchiveCard from "@/components/ArchiveCard/ArchiveCard";
import { FLAGSHIPS } from "@/lib/projects";
import { ARCHIVE_PROJECTS } from "@/lib/archive";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>Rishabh Salian · designer</p>

          {/* HERO COPY PLACEHOLDER — pending decision D-01 */}
          <h1 className={styles.headline}>
            I design <em>systems</em> that used to be objects.
          </h1>

          {/* Subhead placeholder — pending D-01 */}
          <p className={styles.subhead}>
            Placeholder positioning line. A short, honest sentence about the arc
            from products to interfaces to AI-powered systems goes here.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/work/follow" className="btn primary">
              <span className="pulseDot" aria-hidden="true" />
              Try the Follow demo
            </Link>
            <a href="#work" className="btn ghost">
              View work ↓
            </a>
          </div>
        </div>
      </section>

      {/* ================= "THE ARC" — static placeholder ================= */}
      {/* SIGNATURE MOTION DEFERRED — static placeholder, see DESIGN.md §10 */}
      <section className={`section ${styles.arcSection}`} aria-label="The arc">
        <div className="container">
          <p className={`eyebrow ${styles.arcEyebrow}`}>The arc</p>
          <ol className={styles.arc}>
            <li className={styles.arcItem}>
              <span className={styles.arcWord}>OBJECTS</span>
              <span className={`cap ${styles.arcCap}`}>Industrial design · 2019–22</span>
            </li>
            <li className={styles.arcArrow} aria-hidden="true">
              →
            </li>
            <li className={styles.arcItem}>
              <span className={styles.arcWord}>INTERFACES</span>
              <span className={`cap ${styles.arcCap}`}>Product & UX · 2021–24</span>
            </li>
            <li className={styles.arcArrow} aria-hidden="true">
              →
            </li>
            <li className={styles.arcItem}>
              <span className={styles.arcWord}>SYSTEMS</span>
              <span className={`cap ${styles.arcCap}`}>AI-powered systems · 2025–26</span>
            </li>
          </ol>
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section id="work" className={`section ${styles.workSection}`}>
        <div className="container">
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
              />
            ))}
          </div>

          {/* ONE example DemoCallout instance near the Follow card (§6.3).
              Kept in sync with the Follow page + projects.ts (D-03): SIMULATED
              badge, burnt-orange accent. The link goes to the Follow case study,
              whose on-page artifact is the illustrative pipeline reel. */}
          <div className={styles.demoWrap}>
            <DemoCallout
              name="Follow"
              status="SIMULATED"
              title="See how the pipeline works"
              body="Walk the Follow case study: the scroll-driven pipeline reel, the research, and the two pivots to a shared team-memory layer. The on-page animation is illustrative; the live MCP product connects to your real AI tools."
              buttonLabel="Open the Follow case study"
              href="/work/follow"
              accent="#C2410C"
            />
          </div>
        </div>
      </section>

      {/* ================= EARLIER WORK (real portfolio thumbnails) ================= */}
      <section className={`section ${styles.earlierSection}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Earlier work · 2019–23</h2>
            <Link href="/archive" className={`mono ${styles.seeAll}`}>
              Open the full portfolio →
            </Link>
          </div>
          <ul className={styles.earlierGrid}>
            {ARCHIVE_PROJECTS.map((p) => (
              <ArchiveCard key={p.slug} project={p} />
            ))}
          </ul>
        </div>
      </section>

      {/* ================= FOOTER CTA ROW ================= */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>Looking for a systems-minded designer?</h2>
            <div className={styles.ctaRow}>
              <Link href="/cv" className="btn primary">
                View CV
              </Link>
              <a href="#contact" className="btn ghost">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
