import type { Metadata } from "next";
import Link from "next/link";
import PackagesApp from "../PackagesApp";
import { HM_ROOT_STYLE } from "../theme";
import styles from "./prototype.module.css";

export const metadata: Metadata = {
  title: "Healthy Materials Packages — live prototype · Rishabh Salian",
  description:
    "The working slice of Healthy Materials Packages: scope-based healthy-material spec packages for NYC affordable housing, with live cost / carbon / health totals, a value-engineering stress lens, spec-sheet export, and a grounded AI assistant. Illustrative data.",
};

export default function PackagesPrototypePage() {
  return (
    <div style={HM_ROOT_STYLE} className={styles.page}>
      <header className={styles.head}>
        <div>
          <p className={`mono ${styles.kicker}`}>working prototype · illustrative data</p>
          <h1 className={styles.title}>Healthy Materials Packages</h1>
        </div>
        <Link className={`mono ${styles.back}`} href="/work/healthy-materials">
          ← Back to the case study
        </Link>
      </header>
      <div className={styles.mount}>
        <PackagesApp />
      </div>
    </div>
  );
}
