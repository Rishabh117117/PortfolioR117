import Link from "next/link";
import Image from "next/image";
import type { ArchiveProject } from "@/lib/archive";
import styles from "./ArchiveCard.module.css";

export default function ArchiveCard({ project }: { project: ArchiveProject }) {
  return (
    <li className={styles.card}>
      <Link
        href={`/archive/${project.slug}`}
        className={styles.cardLink}
        style={{ "--accent": project.accent } as React.CSSProperties}
      >
        <div className={styles.thumbWrap}>
          <Image
            className={styles.thumb}
            src={project.thumb}
            alt={`${project.name} — cover slide`}
            width={900}
            height={506}
            sizes="(min-width: 1180px) 380px, (min-width: 768px) 50vw, 100vw"
          />
          <span className={`mono ${styles.count}`}>
            {project.slideCount} slides
          </span>
        </div>
        <div className={styles.body}>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={`mono ${styles.meta}`}>
            {project.year} · {project.discipline}
          </p>
          <p className={`cap ${styles.desc}`}>{project.oneLine}</p>
          <span className={`mono ${styles.cta}`}>View project →</span>
        </div>
      </Link>
    </li>
  );
}
