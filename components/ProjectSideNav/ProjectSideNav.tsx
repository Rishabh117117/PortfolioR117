"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./ProjectSideNav.module.css";

export type SideNavSection = { id: string; label: string };

/**
 * ProjectSideNav — a floating right-edge section index for the flagship
 * project pages. Mechanics lifted from the archive ArchiveReader "Contents"
 * nav: one IntersectionObserver picks the best-ratio section and
 * aria-current tracks it.
 *
 * ROUND-2026-07-17: the nav rests as a column of DOTS at every width — the
 * old collapsed hamburger pill and the ≥1440 auto-open rail are gone.
 * Hovering or focusing a dot floats its section name in as a glass chip
 * beside it (a floating chip, so hover never shifts layout); the chevron at
 * the top of the rail pins the full labeled rail open for people who want
 * the whole index visible, and collapses it back into dots.
 *
 * Only renders ≥1180px (below that it returns null — mobile keeps
 * SkipToDemo).
 */
export default function ProjectSideNav({
  sections,
}: {
  sections: SideNavSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false); // ≥1180px
  const [expanded, setExpanded] = useState(false); // dots (false) vs labeled rail

  // visibility from the viewport
  useEffect(() => {
    const vis = window.matchMedia("(min-width: 1180px)");
    const apply = () => setVisible(vis.matches);
    apply();
    vis.addEventListener("change", apply);
    return () => vis.removeEventListener("change", apply);
  }, []);

  // scroll-spy: the section crossing the viewport centre band wins
  useEffect(() => {
    if (!visible) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections, visible]);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  }, []);

  if (!visible) return null;

  return (
    <nav
      id="project-sidenav"
      className={styles.rail}
      data-mode={expanded ? "rail" : "dots"}
      aria-label="On this page"
    >
      {/* the chevron — expands the labeled rail, collapses back to dots */}
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-controls="project-sidenav-list"
        aria-label={expanded ? "Collapse to dots" : "Show section names"}
      >
        <span className={styles.chev} aria-hidden="true">
          ›
        </span>
      </button>

      <ol id="project-sidenav-list" className={styles.list}>
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={styles.item}
              data-label={s.label}
              aria-current={s.id === active ? "true" : undefined}
              onClick={() => goTo(s.id)}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
