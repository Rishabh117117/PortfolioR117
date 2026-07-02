"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FLAGSHIPS, ARCHIVE } from "@/lib/projects";
import styles from "./Breadcrumbs.module.css";

/**
 * Breadcrumbs — a quiet "where am I" trail rendered directly under the sticky
 * nav on every route except the homepage. Deliberately NOT sticky: it shows
 * location at the top of a page and scrolls away, so it never eats viewport
 * height (the Follow reel pins its captions assuming ~60px of chrome).
 *
 * Segment labels come from lib/projects.ts (FLAGSHIPS + ARCHIVE cover every
 * project slug — the archive reader lib is too heavy to pull into the shell
 * bundle); unknown segments fall back to a prettified slug.
 */

const SECTION_LABELS: Record<string, string> = {
  work: "Work",
  about: "About",
  cv: "CV",
  archive: "Archive",
};

const PROJECT_LABELS: Record<string, string> = Object.fromEntries(
  [...FLAGSHIPS, ...ARCHIVE].map((p) => [p.slug, p.name])
);

function labelFor(segment: string, index: number): string {
  if (index === 0 && SECTION_LABELS[segment]) return SECTION_LABELS[segment];
  if (PROJECT_LABELS[segment]) return PROJECT_LABELS[segment];
  // fallback: de-kebab + title-case
  return segment
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null; // homepage — no trail

  const crumbs = [
    { href: "/", label: "Home" },
    ...segments.map((seg, i) => ({
      href: "/" + segments.slice(0, i + 1).join("/"),
      label: labelFor(seg, i),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className={styles.crumbs}>
      <div className="container">
        <ol className={styles.list}>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={c.href} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className={styles.link}>
                      {c.label}
                    </Link>
                    <span className={styles.sep} aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
