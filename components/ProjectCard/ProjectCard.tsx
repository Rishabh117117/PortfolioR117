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
  // Drive the whole card from the project's accent: set --accent on the root so
  // BOTH the bar and the status chip (which uses --accent/-tint/-wash) take the
  // project color. The module derives the light tint/wash from --accent, so the
  // chip is no longer stuck on the global default (Persian Blue).
  const style = accent
    ? ({ "--accent": accent } as React.CSSProperties)
    : undefined;
  return (
    <Link
      href={href}
      style={style}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      {/* thin accent bar in the project's own color (via --accent on the card) */}
      <span className={styles.bar} aria-hidden="true" />
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
