import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Rishabh Salian",
};

export default function AboutPage() {
  // Content pending decision D-04 (bio, photo, role history).
  return (
    <>
      <header className="container pageHeader">
        <p className="pageEyebrow">About</p>
        <h1 className="pageTitle">About</h1>
        <p className="lede">
          Bio, the arc narrative, role/education timeline, and a photo land here.
        </p>
      </header>

      <section className="container section">
        <div className={styles.blocks}>
          {/* pending D-04 — narrative */}
          <div className="placeholder">
            <strong>Arc narrative</strong> — placeholder (pending D-04).
          </div>
          {/* pending D-04 — timeline */}
          <div className="placeholder">
            <strong>Timeline</strong> — roles &amp; education (pending D-04).
          </div>
          {/* pending D-04 — skills */}
          <div className="placeholder">
            <strong>Skills</strong> — disciplines &amp; tools (pending D-04).
          </div>
        </div>
      </section>
    </>
  );
}
