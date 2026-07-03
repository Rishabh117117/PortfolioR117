import Link from "next/link";
import { FLAGSHIPS } from "@/lib/projects";
import styles from "./ProjectPager.module.css";

/**
 * ProjectPager — Previous/Next trail between the flagship case studies, so a
 * deep-dive never dead-ends (F-02). Wraps around: the first project's
 * Previous is the last project and vice versa. Derives neighbors from
 * FLAGSHIPS order; pass the current page's slug.
 */
export default function ProjectPager({ slug }: { slug: string }) {
  const index = FLAGSHIPS.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const prev = FLAGSHIPS[(index - 1 + FLAGSHIPS.length) % FLAGSHIPS.length];
  const next = FLAGSHIPS[(index + 1) % FLAGSHIPS.length];

  return (
    <nav className="container section" aria-label="Project pager">
      <div className={styles.pager}>
        <Link href={`/work/${prev.slug}`} className={styles.pagerLink}>
          <span className={`mono ${styles.pagerLabel}`}>← Previous</span>
          <span className={styles.pagerName}>{prev.name}</span>
        </Link>
        <Link href={`/work/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className={`mono ${styles.pagerLabel}`}>Next →</span>
          <span className={styles.pagerName}>{next.name}</span>
        </Link>
      </div>
    </nav>
  );
}
