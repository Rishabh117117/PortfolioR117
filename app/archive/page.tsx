import type { Metadata } from "next";
import Image from "next/image";
import ArchiveCard from "@/components/ArchiveCard/ArchiveCard";
import { ARCHIVE_PROJECTS, ARCHIVE_COVER } from "@/lib/archive";
import styles from "./archive.module.css";

export const metadata: Metadata = {
  title: "Earlier work (2019–23) — Rishabh Salian",
  description:
    "The original design portfolio (2019–23): seven product, UX and graphic-design projects, shown page-for-page.",
};

export default function ArchivePage() {
  return (
    <>
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
        <ul className={styles.grid}>
          {ARCHIVE_PROJECTS.map((p) => (
            <ArchiveCard key={p.slug} project={p} />
          ))}
        </ul>
      </section>
    </>
  );
}
