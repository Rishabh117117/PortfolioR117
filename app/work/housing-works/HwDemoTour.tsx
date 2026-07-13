"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./housing-works.module.css";

/**
 * Follow-style spotlight walkthrough for the Trustee Workshops demo — the
 * simple variant: NO stop-pill rail above the app, just the spotlight and
 * one message card PINNED to the stage's bottom-center. measure() clamps
 * the spotlight hole above the card's band so message and spotlight never
 * overlap. Auto-starts once when the demo scrolls ~35% into view (no
 * scroll-jack, no focus steal); stepping happens on the card (back/next);
 * Esc, ✕, the dim, or ANY click into the app ends the tour and the click
 * lands normally (capture phase, overlay controls excluded via
 * [data-tour-overlay]).
 *
 * The overlay portals into `#hw-sandbox-stage` (the appBleedInner, made
 * position:relative) and everything is absolute within it, so the whole
 * tour scrolls WITH the demo. View switches are dispatched as `hw:goto`
 * window events; WorkshopsApp listens.
 */

const STOPS: { view: string; target: "main" | "ask"; title: string; line: string }[] = [
  {
    view: "match",
    target: "main",
    title: "Match a need",
    line: "Open staff needs from the pulse survey live here. Pick one and the matcher scores every trustee in the open, with the why behind each score.",
  },
  {
    view: "sessions",
    target: "main",
    title: "Run a session",
    line: "Scheduled 45-minute workshops. Press Run on one to watch the capture loop: transcript, summary, badge, then into the archive.",
  },
  {
    view: "archive",
    target: "main",
    title: "The team’s memory",
    line: "Every session lands here, searchable by text and tags, so what’s taught stays with the team.",
  },
  {
    view: "ask",
    target: "ask",
    title: "Ask the archive",
    line: "The assistant answers from the live program state: the bench, the queue, and every archived summary.",
  },
];

type Box = { top: number; left: number; width: number; height: number };

const stageEl = () => document.getElementById("hw-sandbox-stage");

export default function HwDemoTour() {
  const [stop, setStop] = useState<number | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false); // the auto-start only ever fires once

  const measure = useCallback((i: number) => {
    const stage = stageEl();
    if (!stage) return;
    const mobile = window.matchMedia("(max-width: 719px)").matches;
    const t =
      STOPS[i].target === "ask" && mobile
        ? stage // the dock is a full-screen overlay down here — ring the whole app
        : document.querySelector(`[data-tour="${STOPS[i].target}"]`);
    const tr = t?.getBoundingClientRect();
    if (!tr || tr.width === 0) return;
    const sr = stage.getBoundingClientRect();
    const r = { top: tr.top - sr.top, left: tr.left - sr.left, width: tr.width, height: tr.height };
    // the message card owns a fixed band at the stage's bottom — clamp the
    // hole so the spotlight never runs under it (first paint has no card
    // yet; the rAF loop applies the clamp a frame later)
    const cr = cardRef.current?.getBoundingClientRect();
    if (cr) {
      const bandTop = cr.top - sr.top - 10;
      if (r.top + r.height > bandTop) r.height = Math.max(40, bandTop - r.top);
    }
    setBox((prev) =>
      prev &&
      Math.abs(prev.top - r.top) < 0.5 &&
      Math.abs(prev.left - r.left) < 0.5 &&
      Math.abs(prev.width - r.width) < 0.5 &&
      Math.abs(prev.height - r.height) < 0.5
        ? prev
        : r,
    );
  }, []);

  const goto = useCallback(
    (i: number, opts?: { scroll?: boolean }) => {
      startedRef.current = true;
      window.dispatchEvent(new CustomEvent("hw:goto", { detail: STOPS[i].view }));
      setStop(i);
      // one synchronous measurement so the spotlight is placed on the very
      // first paint — the rAF loop keeps it fresh after
      measure(i);
      if (opts?.scroll !== false) {
        const el = stageEl();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    },
    [measure],
  );

  const end = useCallback(() => {
    setStop(null);
    setBox(null);
  }, []);

  // AUTO-start: the first time the visitor lands on the demo (stage ~35%
  // in view), open the tour at stop 1 — without scrolling or stealing focus.
  useEffect(() => {
    const target = stageEl();
    if (!target || startedRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (startedRef.current) {
          io.disconnect();
          return;
        }
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          goto(0, { scroll: false });
        }
      },
      { threshold: 0.35 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [goto]);

  // track the target every frame while the tour runs — view swaps and
  // resizes covered by one loop (parked with the tab)
  useEffect(() => {
    if (stop === null) return;
    let raf = 0;
    const track = () => {
      if (!document.hidden) measure(stop);
      raf = requestAnimationFrame(track);
    };
    raf = requestAnimationFrame(track);
    return () => cancelAnimationFrame(raf);
  }, [stop, measure]);

  // Esc ends the tour from anywhere
  useEffect(() => {
    if (stop === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") end();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stop, end]);

  // clicking INSIDE the spotlighted app hands control over: the tour gets
  // out of the way and the click lands normally (capture phase, no
  // preventDefault — "click" only, so touch scrolls don't dismiss)
  useEffect(() => {
    if (stop === null) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      if (t.closest("[data-tour-overlay]")) return;
      if (t.closest("#hw-sandbox-stage")) end();
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [stop, end]);

  const s = stop !== null ? STOPS[stop] : null;
  const stage = s && box ? stageEl() : null;

  if (!(s && box && stage)) return null;

  return createPortal(
    <div className={styles.spot} data-tour-overlay="">
      {/* four dim panels — the hole between them is empty, so the
          spotlighted region stays fully interactive */}
      <div
        className={styles.spotDim}
        style={{ top: 0, left: 0, right: 0, height: Math.max(0, box.top) }}
        onClick={end}
      />
      <div
        className={styles.spotDim}
        style={{ top: box.top, left: 0, width: Math.max(0, box.left), height: box.height }}
        onClick={end}
      />
      <div
        className={styles.spotDim}
        style={{ top: box.top, left: box.left + box.width, right: 0, height: box.height }}
        onClick={end}
      />
      <div
        className={styles.spotDim}
        style={{ top: box.top + box.height, left: 0, right: 0, bottom: 0 }}
        onClick={end}
      />
      {/* keyed per stop so the landing flash replays every move */}
      <div
        key={`ring${stop}`}
        className={styles.spotRing}
        style={{
          top: box.top - 4,
          left: box.left - 4,
          width: box.width + 8,
          height: box.height + 8,
        }}
      />
      {/* the demo message — ONE fixed spot, bottom-center of the stage */}
      <div className={styles.spotDockWrap}>
        <div
          ref={cardRef}
          className={styles.spotCard}
          role="dialog"
          aria-label={`Demo walkthrough, stop ${stop! + 1} of ${STOPS.length}: ${s.title}`}
          aria-live="polite"
          tabIndex={-1}
        >
          <button type="button" className={styles.spotSkip} onClick={end} aria-label="End the walkthrough">
            ✕
          </button>
          <p className={`mono ${styles.spotNo}`}>
            stop {stop! + 1} / {STOPS.length}
          </p>
          <h3 className={styles.spotTitle}>{s.title}</h3>
          <p className={styles.spotLine}>{s.line}</p>
          <div className={styles.spotBtns}>
            {stop === 0 ? (
              <button type="button" className={`mono ${styles.spotGhost}`} onClick={end}>
                skip
              </button>
            ) : (
              <button
                type="button"
                className={`mono ${styles.spotGhost}`}
                onClick={() => goto(stop! - 1)}
              >
                ← back
              </button>
            )}
            <button
              type="button"
              className={`mono ${styles.spotNext}`}
              onClick={() => (stop! >= STOPS.length - 1 ? end() : goto(stop! + 1))}
            >
              {stop! >= STOPS.length - 1 ? "finish ✓" : "next →"}
            </button>
          </div>
          <p className={`mono ${styles.spotHint}`}>
            or just click in, the walkthrough gets out of the way
          </p>
        </div>
      </div>
    </div>,
    stage,
  );
}
