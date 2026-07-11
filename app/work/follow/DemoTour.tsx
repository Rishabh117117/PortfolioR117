"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./follow.module.css";

/**
 * The sandbox walkthrough — five numbered stops, product-onboarding style,
 * run as a SPOTLIGHT tour: a stop dims the whole page behind four fixed
 * panels and cuts a live window around the relevant sandbox region
 * (`[data-tour="main"]` — the active view — or `[data-tour="ask"]`, the Ask
 * dock), ringed in accent with a flash pulse each time it lands, plus a
 * coach card pinned bottom-center (stop text · skip/back · next). The hole
 * is real (four panels, not a box-shadow cutout), so the sandbox stays
 * fully interactive while spotlighted; a rAF loop re-measures the target
 * every frame, so the spotlight tracks scrolling, resizes, and view swaps.
 * Esc or a click on the dim ends the tour. The overlay portals to
 * document.body (the site's lightbox convention).
 *
 * Entry points:
 *  · AUTO — the first time the sandbox scrolls substantially into view
 *    (IntersectionObserver, once per mount), the tour opens itself at stop
 *    1 with "skip tour" up front — the way a product onboards a new
 *    customer. No scroll-jack, no focus steal.
 *  · MANUAL — every tour card is clickable edge to edge (the "show me ↓"
 *    label's hit area is stretched over the card) and jumps straight to
 *    that stop.
 *
 * View switching rides the existing follow:goto event (FollowSandbox
 * listens); "ask" only opens the Ask overlay in the ≤719px app shell, where
 * the spotlight falls back to the whole sandbox frame.
 */

const STOPS: { view: string; target: "main" | "ask"; title: string; line: string }[] = [
  {
    view: "items",
    target: "main",
    title: "Skim their week",
    line: "All items is the team’s five days, newest first: 16 conversations, 7 files.",
  },
  {
    view: "conversations",
    target: "main",
    title: "Open a conversation",
    line: "See how an answer really happened: the assistant thinks, checks the team’s index, then replies.",
  },
  {
    view: "graph",
    target: "main",
    title: "Spin the graph",
    line: "The whole memory as one structure — every fact wired to its source, contested points in red.",
  },
  {
    view: "ask",
    target: "ask",
    title: "Ask Follow yourself",
    line: "Type a question — it runs Follow’s real tools live, thinking and tool calls on screen.",
  },
  {
    view: "mcp",
    target: "main",
    title: "Watch the wire",
    line: "The MCP console runs the same loop with the raw requests and results exposed.",
  },
];

type Box = { top: number; left: number; width: number; height: number };

export default function DemoTour() {
  const [stop, setStop] = useState<number | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false); // any start, auto or manual — auto never fires twice
  const focusCardRef = useRef(true); // manual starts hand focus to the card; auto doesn't steal it

  const measure = useCallback((i: number) => {
    const mobile = window.matchMedia("(max-width: 719px)").matches;
    const sel =
      STOPS[i].target === "ask" && mobile
        ? "#follow-sandbox" // the dock is a full-screen overlay down here
        : `[data-tour="${STOPS[i].target}"]`;
    const r = document.querySelector(sel)?.getBoundingClientRect();
    if (r && r.width > 0) {
      setBox((prev) =>
        prev &&
        Math.abs(prev.top - r.top) < 0.5 &&
        Math.abs(prev.left - r.left) < 0.5 &&
        Math.abs(prev.width - r.width) < 0.5 &&
        Math.abs(prev.height - r.height) < 0.5
          ? prev
          : { top: r.top, left: r.left, width: r.width, height: r.height },
      );
    }
  }, []);

  const goto = useCallback(
    (i: number, opts?: { scroll?: boolean }) => {
      startedRef.current = true;
      window.dispatchEvent(new CustomEvent("follow:goto", { detail: STOPS[i].view }));
      setStop(i);
      // one synchronous measurement so the spotlight is placed on the very
      // first paint (the target is the view CONTAINER, which doesn't move
      // when the view inside it swaps) — the rAF loop keeps it fresh after
      measure(i);
      if (opts?.scroll !== false) {
        const el = document.getElementById("follow-sandbox");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    },
    [measure],
  );

  const start = (i: number) => {
    if (stop === null) restoreRef.current = document.activeElement as HTMLElement | null;
    focusCardRef.current = true;
    goto(i);
  };

  const end = useCallback(() => {
    setStop(null);
    setBox(null);
    restoreRef.current?.focus?.({ preventScroll: true });
    restoreRef.current = null;
  }, []);

  // AUTO-start: the first time the visitor lands on the demo (sandbox ~35%
  // in view), open the tour at stop 1 — without scrolling or stealing focus.
  useEffect(() => {
    const target = document.getElementById("follow-sandbox");
    if (!target || startedRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (startedRef.current) {
          io.disconnect();
          return;
        }
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          restoreRef.current = document.activeElement as HTMLElement | null;
          focusCardRef.current = false;
          goto(0, { scroll: false });
        }
      },
      { threshold: 0.35 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [goto]);

  // track the target every frame while the tour runs — content swaps,
  // scrolling, and resizes all covered by one loop (parked with the tab)
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

  // clicking INSIDE the spotlighted component hands control over: the tour
  // gets out of the way and the click lands normally (capture phase, no
  // preventDefault — "click" only, so touch scrolls inside the hole don't
  // dismiss it). The coach card and dim panels live on document.body, so
  // they never match; the dims keep their own click-to-end.
  useEffect(() => {
    if (stop === null) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.("#follow-sandbox")) end();
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [stop, end]);

  // hand focus to the coach card when a MANUAL tour opens (not per stop)
  const open = stop !== null;
  useEffect(() => {
    if (open && focusCardRef.current) cardRef.current?.focus({ preventScroll: true });
  }, [open]);

  const s = stop !== null ? STOPS[stop] : null;

  return (
    <div className={styles.tour}>
      <p className={`mono ${styles.tourKicker}`}>
        new here? the tour — five stops, two minutes
      </p>
      <ol className={styles.tourRail}>
        {STOPS.map((st, i) => (
          <li key={st.view} className={styles.tourStop}>
            <span className={`mono ${styles.tourNo}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.tourTitle}>{st.title}</h3>
            <p className={styles.tourLine}>{st.line}</p>
            {/* the visible label; its hit area is stretched over the whole
                card (::after inset 0), so the card is clickable edge to edge */}
            <button
              type="button"
              className={`mono ${styles.tourGo}`}
              aria-label={`Show me — stop ${i + 1} of ${STOPS.length}: ${st.title}`}
              onClick={() => start(i)}
            >
              show me ↓
            </button>
          </li>
        ))}
      </ol>

      {s && box
        ? createPortal(
            <div className={styles.spot}>
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
              <div
                ref={cardRef}
                className={styles.spotCard}
                role="dialog"
                aria-label={`Tour stop ${stop! + 1} of ${STOPS.length}: ${s.title}`}
                aria-live="polite"
                tabIndex={-1}
              >
                <button type="button" className={styles.spotSkip} onClick={end} aria-label="End the tour">
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
                      skip tour
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
                  or just click in — the tour gets out of the way
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
