import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARCHIVE_PROJECTS, getArchiveProject } from "@/lib/archive";
import AmbientField from "@/components/AmbientField/AmbientField";
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
    title: `${p.name} (${p.year})`,
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
    <div
      className={styles.page}
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      {/* per-project ambient — the project's accent leads, shell gold rises;
          orbs show in the gutters and blur through the glass side index */}
      <AmbientField
        warm={[
          { color: project.accent, alpha: 0.54 },
          { color: project.accent, alpha: 0.43 },
        ]}
        cool={[
          { color: "#9A7B4F", alpha: 0.46 },
          { color: "#9A7B4F", alpha: 0.41 },
        ]}
        restWarm={0.88}
        restCool={0.6}
        dim={0.79}
      />

      <div className={styles.pageContent}>
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
    </div>
  );
}
