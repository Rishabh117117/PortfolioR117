import type { Metadata } from "next";
import Image from "next/image";
import ArchiveCard from "@/components/ArchiveCard/ArchiveCard";
import AmbientField from "@/components/AmbientField/AmbientField";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import { ARCHIVE_PROJECTS, ARCHIVE_COVER } from "@/lib/archive";
import styles from "./archive.module.css";

// subtle scroll-drift stagger for the project grid (px, alternating)
const GRID_DEPTHS = [12, -10, 14, -12, 10, -14, 12];

export const metadata: Metadata = {
  title: "Earlier work (2019–23)",
  description:
    "The original design portfolio (2019–23): seven product, UX and graphic-design projects, shown page-for-page.",
};

export default function ArchivePage() {
  return (
    <div className={styles.page}>
      {/* shell ambient — the archive is a shell surface: gold leads, blue rises */}
      <AmbientField
        warm={[
          { color: "#9A7B4F", alpha: 0.4 },
          { color: "#9A7B4F", alpha: 0.34 },
        ]}
        cool={[
          { color: "#1C39BB", alpha: 0.34 },
          { color: "#1C39BB", alpha: 0.3 },
        ]}
        restWarm={0.9}
        restCool={0.6}
        dim={0.28}
      />

      <div className={styles.pageContent}>
      <header className="container pageHeader">
        <p className="pageEyebrow">Archive · 2019–23</p>
        <h1 className="pageTitle">Earlier work</h1>
        <p className="lede">
          The original design portfolio — product, UX and graphic-design work
          from 2019–23 — shown exactly as it was presented, page for page. Open a
          project to read it slide by slide.
        </p>
      </header>

      {/* the real portfolio cover */}
      <section className="container">
        <figure className={styles.cover}>
          <Image
            src={ARCHIVE_COVER.src}
            alt="Cover of Rishabh Salian's design portfolio (2019–23)"
            width={ARCHIVE_COVER.w}
            height={ARCHIVE_COVER.h}
            sizes="(min-width: 1180px) 1180px, 100vw"
            priority
          />
          <figcaption className={`cap ${styles.coverCap}`}>
            The original portfolio cover
          </figcaption>
        </figure>
      </section>

      <section className="container section">
        <DriftGroup>
          <ul className={styles.grid}>
            {ARCHIVE_PROJECTS.map((p, i) => (
              <ArchiveCard
                key={p.slug}
                project={p}
                depth={GRID_DEPTHS[i % GRID_DEPTHS.length]}
              />
            ))}
          </ul>
        </DriftGroup>
      </section>
      </div>
    </div>
  );
}
