import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FLAGSHIPS } from "@/lib/projects";
// Reuse the project pager styles from the [slug] route (same markup + classes);
// our own module below carries only the deck-frame + stage layout.
import pager from "../[slug]/project.module.css";
import styles from "./greener-hours.module.css";

const SLUG = "greener-hours";

export const metadata: Metadata = {
  title: "Greener Hours — Rishabh Salian",
  description:
    "Greener Hours — the final presentation. A self-contained climate · AI case study deck, embedded.",
};

export default function GreenerHoursPage() {
  const index = FLAGSHIPS.findIndex((p) => p.slug === SLUG);
  if (index === -1) notFound();
  const project = FLAGSHIPS[index];
  const prev = index > 0 ? FLAGSHIPS[index - 1] : null;
  const next = index < FLAGSHIPS.length - 1 ? FLAGSHIPS[index + 1] : null;

  // §8 — set the project accent at the page root; everything inherits.
  const rootStyle = { "--accent": project.accent } as React.CSSProperties;

  return (
    <div style={rootStyle}>
      {/* The case study IS the deck — a vendored, self-scaling 1920×1080 canvas
          (public/greener-hours/index.html) shown in a 16:9 frame so it fills
          with no letterbox. Global Nav sits above; the project pager below.
          The deck's title slide lives inside the iframe (a separate document), so
          the host page carries its own heading for the document outline / a11y. */}
      <h1 className={styles.srOnly}>{project.name}</h1>
      <section className={styles.stage}>
        <div className={styles.bar}>
          <p className={`mono ${styles.eyebrow}`}>
            {project.year} · {project.discipline}
          </p>
          <a
            className={`mono ${styles.openLink}`}
            href="/greener-hours/index.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Greener Hours presentation full screen (opens in a new tab)"
          >
            Open full screen <span aria-hidden="true">↗</span>
          </a>
        </div>
        {/* the wrapper clips the iframe's near-black canvas to the rounded
            corners (overflow:hidden) and carries the 16:9 sizing + shadow */}
        <div className={styles.frame}>
          <iframe
            className={styles.deck}
            src="/greener-hours/index.html"
            title="Greener Hours — presentation"
            loading="lazy"
            allow="fullscreen"
          />
        </div>
      </section>

      {/* §5 — project pager (prev/next), markup + styles reused from [slug] */}
      <nav className="container section" aria-label="Project pager">
        <div className={pager.pager}>
          {prev ? (
            <Link href={`/work/${prev.slug}`} className={pager.pagerLink}>
              <span className={`mono ${pager.pagerLabel}`}>← Previous</span>
              <span className={pager.pagerName}>{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className={`${pager.pagerLink} ${pager.pagerNext}`}
            >
              <span className={`mono ${pager.pagerLabel}`}>Next →</span>
              <span className={pager.pagerName}>{next.name}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </div>
  );
}
