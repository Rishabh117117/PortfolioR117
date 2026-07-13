"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ArchiveProject } from "@/lib/archive";
import { useModalA11y } from "@/lib/useModalA11y";
import styles from "./reader.module.css";

export default function ArchiveReader({ project }: { project: ArchiveProject }) {
  const { slides } = project;
  const [activeN, setActiveN] = useState(1);
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  // portal the lightbox to <body> so its fixed z-100 overlay isn't trapped
  // below the sticky Nav by the page's z-index:1 .pageContent stacking context
  // (the AmbientField lift). Mirrors the housing-works lightbox fix. The
  // lightbox styles use only global tokens, so it needs no accent scope.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const slidesRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);

  // collapsible "Contents" index. Docked in the left gutter on wide screens
  // (≥1680px, where it clears the slides); a slim pill you expand on narrower
  // desktops, where the fixed panel would otherwise overlay the slide edge.
  const [navOpen, setNavOpen] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const navUserSet = useRef(false);
  const pillRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // set by a user toggle so the focus effect only moves focus on intent, never
  // on the mount/resize matchMedia default.
  const pendingFocus = useRef<null | "pill" | "panel">(null);

  // scroll-spy: highlight the slide crossing the viewport centre band
  useEffect(() => {
    const root = slidesRef.current;
    if (!root) return;
    const figs = Array.from(root.querySelectorAll<HTMLElement>("[data-n]"));
    if (!figs.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) setActiveN(Number(best.target.getAttribute("data-n")));
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    figs.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, [project.slug]);

  // keep the active item visible inside the floating overlay nav (long lists)
  useEffect(() => {
    if (!navOpen) return;
    const nav = asideRef.current;
    if (!nav) return;
    const btn = nav.querySelector<HTMLElement>('[aria-current="true"]');
    if (!btn) return;
    const nb = nav.getBoundingClientRect();
    const bb = btn.getBoundingClientRect();
    if (bb.top < nb.top + 8 || bb.bottom > nb.bottom - 8) {
      nav.scrollTop += bb.top - nb.top - (nb.height - bb.height) / 2;
    }
  }, [activeN, navOpen]);

  // pick the default open/closed state from the viewport: docked-open on wide
  // screens, collapsed on narrower desktops. Track "overlay" (the range where an
  // open panel covers the slides) to gate the dismiss-on-outside behavior. Once
  // the reader is measured, mark ready so the panel/pill don't flash pre-hydration.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1680px)");
    const over = window.matchMedia(
      "(min-width: 1024px) and (max-width: 1679.98px)"
    );
    const apply = () => {
      setOverlay(over.matches);
      if (!navUserSet.current) setNavOpen(wide.matches);
    };
    apply();
    setNavReady(true);
    wide.addEventListener("change", apply);
    over.addEventListener("change", apply);
    return () => {
      wide.removeEventListener("change", apply);
      over.removeEventListener("change", apply);
    };
  }, []);

  // manual toggles lock the user's choice (survives resize); auto-dismiss doesn't.
  const expand = useCallback(() => {
    navUserSet.current = true;
    pendingFocus.current = "panel";
    setNavOpen(true);
  }, []);
  const collapse = useCallback(() => {
    navUserSet.current = true;
    pendingFocus.current = "pill";
    setNavOpen(false);
  }, []);

  // in overlay mode only, dismiss the open panel on Escape or an outside click
  // (wide/docked screens keep it pinned, exactly as before). Suspended while a
  // lightbox is open so Escape dismisses only the topmost surface.
  useEffect(() => {
    if (!overlay || !navOpen || lbIndex !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pendingFocus.current = "pill";
        setNavOpen(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      const el = asideRef.current;
      if (el && !el.contains(e.target as Node)) setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [overlay, navOpen, lbIndex]);

  // Keep the retracted surface out of the tab/a11y order immediately (the CSS
  // visibility flip is delayed for the fade), and hand focus to whatever control
  // is now active so keyboard users don't lose their place. inert is toggled
  // imperatively so it works regardless of the installed React typings.
  useEffect(() => {
    asideRef.current?.toggleAttribute("inert", !navOpen);
    pillRef.current?.toggleAttribute("inert", navOpen);
    const want = pendingFocus.current;
    pendingFocus.current = null;
    if (!navReady || !want) return;
    const target = want === "pill" ? pillRef.current : closeRef.current;
    target?.focus({ preventScroll: true });
  }, [navOpen, navReady]);

  const goTo = useCallback(
    (n: number) => {
      const el = document.getElementById(`slide-${n}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveN(n);
        // the overlay panel covers what you just jumped to — get out of the way
        if (overlay) {
          pendingFocus.current = "pill";
          setNavOpen(false);
        }
      }
    },
    [overlay]
  );

  const openAt = useCallback((i: number) => {
    setZoomed(false);
    setLbIndex(i);
  }, []);
  const close = useCallback(() => setLbIndex(null), []);
  const step = useCallback(
    (dir: number) => {
      setZoomed(false);
      setLbIndex((i) => {
        if (i === null) return i;
        const next = i + dir;
        return next >= 0 && next < slides.length ? next : i;
      });
    },
    [slides.length]
  );

  // lightbox: body-scroll lock + keyboard nav
  useEffect(() => {
    if (lbIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lbIndex, close, step]);

  // focus-trap + move-in/restore for the lightbox; the effect above keeps the
  // body-scroll lock + Esc/arrow keys, so those are disabled here to avoid dupes.
  useModalA11y(lbIndex !== null, close, lbRef, { lockScroll: false, handleEscape: false });

  const active = slides.find((s) => s.n === activeN) ?? slides[0];
  const lb = lbIndex === null ? null : slides[lbIndex];

  return (
    <>
      {/* mobile "where am I" bar */}
      <div className={styles.mobileBar} aria-hidden="true">
        <span className={styles.mobileBarCount}>
          {String(active.n).padStart(2, "0")} / {slides.length}
        </span>
        <span className={styles.mobileBarLabel}>{active.label}</span>
      </div>

      <div className={styles.layout}>
        {/* collapsed pill — expands the index (shown when the panel is retracted) */}
        <button
          ref={pillRef}
          type="button"
          className={styles.sidePill}
          data-open={!navOpen}
          data-ready={navReady}
          onClick={expand}
          aria-expanded={navOpen}
          aria-controls="archive-contents"
          aria-label="Show contents"
        >
          <span className={styles.pillIcon} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="3" y1="4.5" x2="13" y2="4.5" />
                <line x1="3" y1="8" x2="13" y2="8" />
                <line x1="3" y1="11.5" x2="13" y2="11.5" />
              </g>
            </svg>
          </span>
          <span className={`mono ${styles.pillCount}`}>
            {activeN}
            <span className={styles.pillSlash}>/</span>
            {slides.length}
          </span>
        </button>

        {/* side scroll-index */}
        <aside
          ref={asideRef}
          id="archive-contents"
          className={styles.side}
          data-open={navOpen}
          data-ready={navReady}
          aria-hidden={!navOpen}
        >
          <div className={styles.sideHead}>
            <p className={styles.sideTitle}>Contents</p>
            <button
              ref={closeRef}
              type="button"
              className={styles.sideClose}
              onClick={collapse}
              aria-label="Collapse contents"
            >
              ‹
            </button>
          </div>
          <ol className={styles.sideList}>
            {slides.map((s) => (
              <li key={s.n}>
                <button
                  type="button"
                  className={styles.item}
                  aria-current={s.n === activeN ? "true" : undefined}
                  onClick={() => goTo(s.n)}
                >
                  <span className={styles.sideNum}>
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        {/* the real slides, in order */}
        <div className={styles.slides} ref={slidesRef}>
          {slides.map((s, i) => (
            <figure
              key={s.n}
              id={`slide-${s.n}`}
              data-n={s.n}
              className={styles.slide}
            >
              <button
                type="button"
                className={styles.slideBtn}
                onClick={() => openAt(i)}
                aria-label={`Zoom slide ${s.n}: ${s.label}`}
              >
                <Image
                  className={styles.slideImg}
                  src={s.src}
                  alt={`${project.name} · ${s.label}`}
                  width={s.w}
                  height={s.h}
                  sizes="(min-width: 1024px) 1140px, 100vw"
                  priority={i === 0}
                />
                <span className={`mono ${styles.zoomHint}`}>⤢ Tap to zoom</span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* lightbox — portaled to <body> to escape the .pageContent stacking context */}
      {mounted &&
        lb &&
        createPortal(
        <div
          ref={lbRef}
          className={styles.lb}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name}, slide ${lb.n}: ${lb.label}`}
        >
          <div className={styles.lbBar}>
            <span className={styles.lbCount}>
              {lb.n} / {slides.length} · {lb.label}
            </span>
            <button
              type="button"
              className={styles.lbBtn}
              onClick={() => step(-1)}
              disabled={lbIndex === 0}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.lbBtn}
              onClick={() => step(1)}
              disabled={lbIndex === slides.length - 1}
              aria-label="Next slide"
            >
              ›
            </button>
            <button
              type="button"
              className={styles.lbBtn}
              onClick={close}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div
            className={`${styles.lbStage} ${zoomed ? styles.lbStageZoomed : ""}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`${styles.lbImg} ${zoomed ? styles.lbImgZoomed : ""}`}
              src={lb.zoom}
              alt={`${project.name} · ${lb.label} (full detail)`}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
            />
          </div>
          <p className={styles.lbCaption}>
            {zoomed ? "Tap image to fit · " : "Tap image to zoom · "}
            Esc to close
          </p>
        </div>,
          document.body
        )}
    </>
  );
}
