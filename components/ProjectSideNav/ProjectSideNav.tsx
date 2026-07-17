"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProjectSideNav.module.css";

export type SideNavSection = { id: string; label: string };

/**
 * ProjectSideNav — a floating right-edge section index for the flagship
 * project pages (ROUND-2026-07-16). Mechanics lifted from the archive
 * ArchiveReader "Contents" nav: one IntersectionObserver picks the
 * best-ratio section, aria-current tracks it, and it collapses to a pill.
 *
 * Only renders ≥1180px (below that it returns null — mobile keeps
 * SkipToDemo). Auto-collapses to a pill between 1180 and 1440px, where an
 * open rail would overlap the content; expanded by default ≥1440px, where the
 * page's side gutter has room for it.
 */
export default function ProjectSideNav({
  sections,
}: {
  sections: SideNavSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false); // ≥1180px
  const [open, setOpen] = useState(true); // rail vs. pill
  const userSet = useRef(false);
  const pendingFocus = useRef<null | "pill" | "rail">(null);
  const railRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);

  // visibility + default open/closed from the viewport
  useEffect(() => {
    const vis = window.matchMedia("(min-width: 1180px)");
    const wide = window.matchMedia("(min-width: 1440px)");
    const apply = () => {
      setVisible(vis.matches);
      if (!userSet.current) setOpen(wide.matches);
    };
    apply();
    vis.addEventListener("change", apply);
    wide.addEventListener("change", apply);
    return () => {
      vis.removeEventListener("change", apply);
      wide.removeEventListener("change", apply);
    };
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

  // keep the retracted surface out of the tab/a11y order, and hand focus to the
  // now-active control on an intentional toggle (never on the mount default).
  useEffect(() => {
    if (!visible) return;
    railRef.current?.toggleAttribute("inert", !open);
    pillRef.current?.toggleAttribute("inert", open);
    const want = pendingFocus.current;
    pendingFocus.current = null;
    if (!want) return;
    const target =
      want === "pill"
        ? pillRef.current
        : railRef.current?.querySelector<HTMLElement>('[aria-current="true"]') ??
          railRef.current?.querySelector<HTMLElement>("button");
    target?.focus({ preventScroll: true });
  }, [open, visible]);

  const expand = useCallback(() => {
    userSet.current = true;
    pendingFocus.current = "rail";
    setOpen(true);
  }, []);
  const collapse = useCallback(() => {
    userSet.current = true;
    pendingFocus.current = "pill";
    setOpen(false);
  }, []);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.root}>
      {/* collapsed pill — expands the rail */}
      <button
        ref={pillRef}
        type="button"
        className={styles.pill}
        data-shown={!open}
        onClick={expand}
        aria-expanded={open}
        aria-controls="project-sidenav"
        aria-label="Show section navigation"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="3" y1="4.5" x2="13" y2="4.5" />
            <line x1="3" y1="8" x2="13" y2="8" />
            <line x1="3" y1="11.5" x2="13" y2="11.5" />
          </g>
        </svg>
      </button>

      {/* the section rail */}
      <nav
        ref={railRef}
        id="project-sidenav"
        className={styles.rail}
        data-shown={open}
        aria-label="On this page"
        aria-hidden={!open}
      >
        <ol className={styles.list}>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={styles.item}
                aria-current={s.id === active ? "true" : undefined}
                onClick={() => goTo(s.id)}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.label}>{s.label}</span>
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.collapse}
          onClick={collapse}
          aria-label="Collapse section navigation"
        >
          ›
        </button>
      </nav>
    </div>
  );
}
