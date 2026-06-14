import type { Metadata } from "next";
import { ARCHIVE } from "@/lib/projects";
import styles from "./archive.module.css";

export const metadata: Metadata = {
  title: "Archive — Rishabh Salian",
};

export default function ArchivePage() {
  return (
    <>
      <header className="container pageHeader">
        <p className="pageEyebrow">Archive</p>
        <h1 className="pageTitle">Earlier work (2019–23)</h1>
        <p className="lede">
          A visual gallery of seven earlier projects. Imagery is extracted from
          the portfolio PDF in Phase 2.
        </p>
      </header>

      <section className="container section">
        <ul className={styles.grid}>
          {ARCHIVE.map((p) => (
            <li key={p.slug} className={styles.card}>
              {/* Imagery placeholder — extracted from PDF in Phase 2. */}
              <div
                className={styles.thumb}
                style={{ borderColor: p.accent }}
                aria-hidden="true"
              >
                <span className="cap">Image — Phase 2</span>
              </div>
              <h2 className={styles.name}>{p.name}</h2>
              <p className={`mono ${styles.meta}`}>
                {p.year} · {p.discipline}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
