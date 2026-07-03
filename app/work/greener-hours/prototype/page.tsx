import type { Metadata } from "next";
import Link from "next/link";
import TierTabs from "../TierTabs";
import { GH_ROOT_STYLE } from "../theme";
import styles from "./prototype.module.css";

export const metadata: Metadata = {
  title: "Greener Hours — live prototype",
  description:
    "The three Greener Hours surfaces running on one shared simulation: the Tier-1 compute-window chat (grounded live model), the Tier-2 flexible scheduler, and the Tier-3 footprint dashboard — pause the clock in one and it pauses everywhere.",
};

export default function GreenerHoursPrototypePage() {
  return (
    <div style={GH_ROOT_STYLE} className={styles.page}>
      <header className={styles.head}>
        <div>
          <p className={`mono ${styles.kicker}`}>working prototype · one shared simulation</p>
          <h1 className={styles.title}>Greener Hours — the three surfaces</h1>
        </div>
        <Link className={`mono ${styles.back}`} href="/work/greener-hours">
          ← Back to the case study
        </Link>
      </header>
      <div className={styles.mount}>
        <TierTabs />
      </div>
      <p className={`mono ${styles.foot}`}>
        one clock, one grid, one queue — pause the scheduler and the indicator freezes; submit a
        job and the dashboard&apos;s flex strip moves
      </p>
    </div>
  );
}
