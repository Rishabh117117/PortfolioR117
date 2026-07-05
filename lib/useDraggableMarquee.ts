"use client";

import { useEffect, useRef } from "react";

/**
 * Turns a horizontal "marquee" strip into one that keeps auto-scrolling but can
 * also be grabbed and dragged (mouse / pen) or swiped (touch) on demand —
 * replacing the pure-CSS `@keyframes translateX` marquee the decks used to run.
 *
 * The strip becomes a hidden-scrollbar scroll container; a rAF loop advances
 * `scrollLeft` to reproduce the drift, and because the card set is duplicated
 * (`sets` copies) wrapping `scrollLeft` by exactly one set-width loops seamlessly
 * in both directions.
 *
 * Behaviour:
 *  - auto-drifts at the original pace — `durationSec` is the number of seconds
 *    the old CSS animation took to travel one set; the speed is derived from the
 *    *measured* set pitch, so the pace matches regardless of card width/viewport;
 *  - pauses while hovered, while a child card is focused (keyboard), and while
 *    the tab is hidden;
 *  - mouse / pen: press-and-drag slides it (grab → grabbing cursor); a real drag
 *    (moved past `dragThreshold`) swallows the click so you don't open a card
 *    mid-slide;
 *  - touch: native horizontal scrolling handles the swipe + momentum (the strip
 *    is set to `touch-action: pan-x`); the auto-drift stays parked until the
 *    gesture settles, then eases back in after `resumeDelay`;
 *  - respects `prefers-reduced-motion`: no auto-drift and no wrapping — it's just
 *    a plain manual scroller (user-initiated scrolling is always allowed).
 *
 * Returns a ref to attach to the scroll container (the `.strip`). While a pointer
 * drag is active the container carries a `data-dragging` attribute — style the
 * grabbing cursor off that (an attribute survives CSS-module hashing where a
 * class name would not).
 */
export function useDraggableMarquee<T extends HTMLElement>({
  sets,
  durationSec,
  dragThreshold = 6,
  resumeDelay = 1400,
}: {
  /** number of duplicated content sets rendered inside the track (2 or 3) */
  sets: number;
  /** seconds the original CSS animation took to travel one set (sets the pace) */
  durationSec: number;
  /** px a press must travel before it counts as a drag (and suppresses the click) */
  dragThreshold?: number;
  /** ms of stillness after a gesture before the auto-drift resumes */
  resumeDelay?: number;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // --- measure one set's pitch (exact: distance between the first cell of set
    // 0 and the first cell of set 1 — margin-agnostic, unlike scrollWidth/sets) ---
    let oneSet = 0;
    let speed = 0; // px / second
    const measure = () => {
      const track = el.firstElementChild;
      const cells = track ? (Array.from(track.children) as HTMLElement[]) : [];
      const perSet = Math.round(cells.length / sets);
      if (perSet > 0 && cells[perSet]) {
        oneSet = cells[perSet].offsetLeft - cells[0].offsetLeft;
      } else {
        oneSet = el.scrollWidth / sets;
      }
      speed = oneSet > 0 ? oneSet / durationSec : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    // keep scrollLeft inside [0, oneSet); the sets are identical so this is
    // invisible and lets the strip loop endlessly either direction.
    const wrap = () => {
      if (reduce.matches || oneSet <= 0) return;
      if (el.scrollLeft >= oneSet) el.scrollLeft -= oneSet;
      else if (el.scrollLeft < 0) el.scrollLeft += oneSet;
    };

    // --- pause bookkeeping ---
    let hovering = false;
    let focused = false;
    let interacting = false; // a pointer/touch gesture is in progress
    let resumeAt = 0; // perf.now() before which the auto-drift stays parked
    const canAuto = () =>
      !reduce.matches &&
      !hovering &&
      !focused &&
      !interacting &&
      !document.hidden &&
      performance.now() >= resumeAt;

    // --- auto-drift ---
    let raf = 0;
    let last = 0;
    let sub = 0; // sub-pixel accumulator (scrollLeft is integer)
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!canAuto()) {
        last = t; // keep the clock current so dt stays small on resume
        return;
      }
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      sub += speed * dt;
      const step = Math.floor(sub);
      if (step) {
        sub -= step;
        el.scrollLeft += step;
        wrap();
      }
    };
    raf = requestAnimationFrame(tick);

    // --- hover / focus / visibility ---
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "touch") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "touch") hovering = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = el.contains(document.activeElement);
    };
    const onVis = () => {
      last = 0;
    };

    // --- pointer drag (mouse / pen); touch is left to native scrolling ---
    let dragging = false;
    let dragId: number | null = null;
    let startX = 0;
    let lastX = 0;
    let moved = 0; // net px travelled this gesture — drives click suppression
    const onDown = (e: PointerEvent) => {
      interacting = true;
      if (e.pointerType === "touch" || e.button !== 0) return;
      dragging = true;
      dragId = e.pointerId;
      startX = lastX = e.clientX;
      moved = 0;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // pointer may not be capturable (already released / detached) — the drag
        // still works via the move/up listeners on the element
      }
      el.dataset.dragging = "true";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== dragId) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved = Math.abs(e.clientX - startX);
      el.scrollLeft -= dx;
      wrap();
    };
    const endDrag = (e: PointerEvent) => {
      if (dragging && e.pointerId === dragId) {
        dragging = false;
        dragId = null;
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* capture may already be gone */
        }
        delete el.dataset.dragging;
      }
      // any pointer lift (incl. touch) → ease the drift back after a beat
      interacting = false;
      resumeAt = performance.now() + resumeDelay;
      last = 0;
    };
    const onUp = (e: PointerEvent) => {
      endDrag(e);
      // reset the drag distance a moment later so a subsequent keyboard/tap
      // click isn't wrongly swallowed by a stale value
      window.setTimeout(() => {
        moved = 0;
      }, 80);
    };

    // swallow the click a real drag/swipe emits so a card doesn't open/navigate
    const onClick = (e: MouseEvent) => {
      if (moved > dragThreshold) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // touch: pointer-drag is skipped, so track the swipe distance here (for the
    // click-suppression above) and let the browser scroll natively
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0]?.clientX ?? 0;
      moved = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      moved = Math.abs((e.touches[0]?.clientX ?? 0) - touchStartX);
    };

    // native drag of an <img> or an anchor card would hijack the pointer drag
    const onDragStart = (e: Event) => e.preventDefault();
    // keep the loop seamless during native (touch) momentum scrolling
    const onScroll = () => {
      if (!dragging) wrap();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClick, true);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [sets, durationSec, dragThreshold, resumeDelay]);

  return ref;
}
