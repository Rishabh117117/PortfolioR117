import type { Metadata } from "next";
import Link from "next/link";
import WorkshopsApp from "../WorkshopsApp";
import { HW_ROOT_STYLE } from "../theme";
import styles from "./prototype.module.css";

export const metadata: Metadata = {
  title: "Trustee Workshops — live prototype",
  description:
    "The working version of the Trustee Workshops framework proposed to Housing Works: a needs queue, explainable trustee matching, the 45-minute session capture loop, and a searchable archive with a grounded AI assistant. Illustrative data.",
};

export default function WorkshopsPrototypePage() {
  return (
    <div style={HW_ROOT_STYLE} className={styles.page}>
      <header className={styles.head}>
        <div>
          <p className={`mono ${styles.kicker}`}>working prototype · illustrative data</p>
          <h1 className={styles.title}>Trustee Workshops</h1>
        </div>
        <Link className={`mono ${styles.back}`} href="/work/housing-works">
          ← Back to the case study
        </Link>
      </header>
      <div className={styles.mount}>
        <WorkshopsApp />
      </div>
    </div>
  );
}
