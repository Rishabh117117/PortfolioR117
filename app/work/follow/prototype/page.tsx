import type { Metadata } from "next";
import Link from "next/link";
import FollowSandbox from "../FollowSandbox";
import { FOLLOW_ROOT_STYLE } from "../theme";
import styles from "./prototype.module.css";

export const metadata: Metadata = {
  title: "Follow — team-memory sandbox · Rishabh Salian",
  description:
    "The live Follow sandbox: a pre-loaded team workspace with per-entry provenance, contested pairs flagged instead of resolved, a who-knows-what directory, and Ask Follow — a grounded model answering from the shared memory. Sample data.",
};

export default function FollowPrototypePage() {
  return (
    <div style={FOLLOW_ROOT_STYLE} className={styles.page}>
      <header className={styles.head}>
        <div>
          <p className={`mono ${styles.kicker}`}>team-memory sandbox · pre-loaded sample workspace</p>
          <h1 className={styles.title}>
            Follow<span className={styles.dot}>.</span>
          </h1>
        </div>
        <Link className={`mono ${styles.back}`} href="/work/follow">
          ← Back to the case study
        </Link>
      </header>
      <div className={styles.mount}>
        <FollowSandbox />
      </div>
    </div>
  );
}
