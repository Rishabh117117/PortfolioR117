import Link from "next/link";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  name: string;
  year: string;
  discipline: string;
  href: string;
  /** The project's own accent color (§8 accent map). */
  accent?: string;
  /** Optional demo status tag, e.g. "WORKING" / "SIMULATED". */
  status?: string;
  /** Larger card treatment (desktop) for the flagship. */
  featured?: boolean;
};

export default function ProjectCard({
  name,
  year,
  discipline,
  href,
  accent,
  status,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      {/* thin accent bar in the project's own color */}
      <span
        className={styles.bar}
        style={accent ? { background: accent } : undefined}
        aria-hidden="true"
      />
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{name}</h3>
          {status && <span className="chip accent">{status}</span>}
        </div>
        <p className={`mono ${styles.meta}`}>
          {year} · {discipline}
        </p>
      </div>
    </Link>
  );
}
