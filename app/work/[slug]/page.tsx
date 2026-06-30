import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DemoCallout, { type DemoStatus } from "@/components/DemoCallout/DemoCallout";
import { FLAGSHIPS } from "@/lib/projects";
import styles from "./project.module.css";

// Slugs that have their own dedicated bespoke route (app/work/<slug>), which
// takes precedence; exclude them here so they aren't generated twice.
const BESPOKE_SLUGS = ["housing-works", "healthy-materials", "follow", "greener-hours"];

export function generateStaticParams() {
  return FLAGSHIPS.filter((p) => !BESPOKE_SLUGS.includes(p.slug)).map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = FLAGSHIPS.find((p) => p.slug === params.slug);
  return { title: project ? `${project.name} — Rishabh Salian` : "Work" };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = FLAGSHIPS.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();

  const project = FLAGSHIPS[index];
  const prev = index > 0 ? FLAGSHIPS[index - 1] : null;
  const next = index < FLAGSHIPS.length - 1 ? FLAGSHIPS[index + 1] : null;

  // §8 — set the project accent at the page root; everything inherits.
  const rootStyle = { "--accent": project.accent } as React.CSSProperties;

  return (
    <div style={rootStyle}>
      <header className="container pageHeader">
        <p className="pageEyebrow" style={{ color: "var(--accent)" }}>
          {project.year} · {project.discipline}
        </p>
        <h1 className="pageTitle">{project.name}</h1>
        {/* PROJECT PAGE TEMPLATE DEFERRED to Phase 3 (see docs/ROADMAP.md):
            Brief → Problem/Insight/Solution → Live demo → Process → Artifacts
            → Honest limits → Next project. Placeholder shell only below. */}
        <p className="lede">
          Full case study (brief, problem/insight/solution, process, artifacts,
          honest limits) is built in Phase 3. This is a structural placeholder.
        </p>
      </header>

      <section className="container section">
        <DemoCallout
          name={project.name}
          status={(project.status as DemoStatus) ?? "SIMULATED"}
          title="Live demo placeholder"
          body="The interactive demo for this project is built in Phase 3 and will be labeled honestly with an accurate status badge."
          buttonLabel="Demo coming in Phase 3"
          href={`/work/${project.slug}`}
        />
      </section>

      {/* §5 — project pager (prev/next) */}
      <nav className="container section" aria-label="Project pager">
        <div className={styles.pager}>
          {prev ? (
            <Link href={`/work/${prev.slug}`} className={styles.pagerLink}>
              <span className={`mono ${styles.pagerLabel}`}>← Previous</span>
              <span className={styles.pagerName}>{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={`mono ${styles.pagerLabel}`}>Next →</span>
              <span className={styles.pagerName}>{next.name}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </div>
  );
}
