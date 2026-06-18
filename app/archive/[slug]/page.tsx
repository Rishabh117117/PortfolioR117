import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARCHIVE_PROJECTS, getArchiveProject } from "@/lib/archive";
import ArchiveReader from "./ArchiveReader";
import styles from "./reader.module.css";

export function generateStaticParams() {
  return ARCHIVE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getArchiveProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.year}) — Rishabh Salian`,
    description: p.oneLine,
  };
}

export default function ArchiveProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getArchiveProject(params.slug);
  if (!project) notFound();

  const idx = ARCHIVE_PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? ARCHIVE_PROJECTS[idx - 1] : null;
  const next =
    idx < ARCHIVE_PROJECTS.length - 1 ? ARCHIVE_PROJECTS[idx + 1] : null;

  return (
    <div style={{ "--accent": project.accent } as React.CSSProperties}>
      <header className="container pageHeader">
        <p className="pageEyebrow">
          <Link href="/archive" className={styles.crumb}>
            Archive
          </Link>{" "}
          · {project.year}
        </p>
        <h1 className="pageTitle">{project.name}</h1>
        <p className={`mono ${styles.headMeta}`}>
          {project.discipline} · {project.slideCount} slides
        </p>
        <p className="lede">{project.oneLine}</p>
      </header>

      <ArchiveReader project={project} />

      <nav className="container" aria-label="More earlier work">
        <div className={styles.pager}>
          {prev ? (
            <Link href={`/archive/${prev.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerKicker}>← Previous</span>
              <span className={styles.pagerName}>{prev.name}</span>
            </Link>
          ) : (
            <Link href="/archive" className={styles.pagerLink}>
              <span className={styles.pagerKicker}>←</span>
              <span className={styles.pagerName}>All earlier work</span>
            </Link>
          )}
          {next ? (
            <Link href={`/archive/${next.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerKicker}>Next →</span>
              <span className={styles.pagerName}>{next.name}</span>
            </Link>
          ) : (
            <Link href="/archive" className={styles.pagerLink}>
              <span className={styles.pagerKicker}>→</span>
              <span className={styles.pagerName}>All earlier work</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
