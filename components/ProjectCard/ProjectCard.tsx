import Link from "next/link";
import Image from "next/image";
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
  /** One-line value prop shown under the name (what the project IS). */
  tagline?: string;
  /** Larger card treatment (desktop) for the flagship. */
  featured?: boolean;
  /** Optional cover photo (16:9, object-fit cover). */
  thumb?: { src: string; alt: string };
  /** Optional bespoke thumbnail node (inline SVG) — used when no photo exists. */
  thumbNode?: React.ReactNode;
};

export default function ProjectCard({
  name,
  year,
  discipline,
  href,
  accent,
  status,
  tagline,
  featured = false,
  thumb,
  thumbNode,
}: ProjectCardProps) {
  const media = thumb ? (
    <Image
      className={styles.thumb}
      src={thumb.src}
      alt={thumb.alt}
      fill
      sizes="(min-width: 1180px) 580px, (min-width: 768px) 50vw, 100vw"
    />
  ) : (
    thumbNode
  );
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
      {media && (
        <div className={styles.media} aria-hidden="true">
          {media}
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{name}</h3>
          {status && <span className="chip accent">{status}</span>}
        </div>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
        <p className={`mono ${styles.meta}`}>
          {year} · {discipline}
        </p>
      </div>
    </Link>
  );
}
