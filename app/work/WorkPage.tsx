// UNROUTED (2026-07-02): the standalone /work index duplicated the landing page,
// so "Work" in the nav now scrolls to the projects section (/#work) and /work
// 301-redirects there (see next.config.js). This component is preserved verbatim
// but is no longer a route — the file was renamed page.tsx → WorkPage.tsx so
// Next stops emitting /work.
// TODO: restore as app/work/page.tsx when discipline filtering ships (the header
// copy below already promises "Filtering by discipline arrives in a later phase").
import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { FLAGSHIPS, ARCHIVE } from "@/lib/projects";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work — Rishabh Salian",
};

export default function WorkPage() {
  return (
    <>
      <header className="container pageHeader">
        <p className="pageEyebrow">Work</p>
        <h1 className="pageTitle">Selected work</h1>
        <p className="lede">
          Systems &amp; AI work from 2025–26, plus earlier product and industrial
          design. Filtering by discipline arrives in a later phase.
        </p>
      </header>

      {/* Systems & AI */}
      <section className="container section">
        <h2 className={styles.groupTitle}>Systems &amp; AI (2025–26)</h2>
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
            />
          ))}
        </div>
      </section>

      {/* Earlier work */}
      <section className="container section">
        <div className={styles.groupHead}>
          <h2 className={styles.groupTitle}>Earlier work (2019–23)</h2>
          <Link href="/archive" className={`mono ${styles.seeAll}`}>
            Archive gallery →
          </Link>
        </div>
        <div className={styles.grid}>
          {ARCHIVE.map((p) => (
            <ProjectCard
              key={p.slug}
              name={p.name}
              year={p.year}
              discipline={p.discipline}
              href="/archive"
              accent={p.accent}
            />
          ))}
        </div>
      </section>
    </>
  );
}
