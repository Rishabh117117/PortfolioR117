import type { Metadata } from "next";
import Link from "next/link";
import { ARCHIVE } from "@/lib/projects";
import styles from "./archive.module.css";

// Archive projects that have a built page (vs. still gallery-only placeholders).
const LIVE_ROUTES: Record<string, string> = {
  "stun-gun": "/archive/stun-gun",
};

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
          {ARCHIVE.map((p) => {
            const href = LIVE_ROUTES[p.slug];
            const inner = (
              <>
                {/* Imagery placeholder — extracted from PDF in Phase 2. */}
                <div
                  className={styles.thumb}
                  style={{ borderColor: p.accent }}
                  aria-hidden="true"
                >
                  <span className="cap">
                    {href ? "View piece →" : "Image — Phase 2"}
                  </span>
                </div>
                <h2 className={styles.name}>{p.name}</h2>
                <p className={`mono ${styles.meta}`}>
                  {p.year} · {p.discipline}
                </p>
              </>
            );
            return (
              <li key={p.slug} className={styles.card}>
                {href ? (
                  <Link href={href} className={styles.cardLink}>
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
