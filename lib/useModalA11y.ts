"use client";

import { useEffect, useRef, type RefObject } from "react";

type ModalA11yOptions = {
  /** lock <body> scroll while open (default true). Turn off if the caller already locks it. */
  lockScroll?: boolean;
  /** return focus to the opener element on close (default true). */
  restoreFocus?: boolean;
  /** close on Escape (default true). Turn off if the caller already handles Escape. */
  handleEscape?: boolean;
  /** move focus into the dialog on open (default true). */
  autoFocus?: boolean;
};

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Shared modal/lightbox accessibility. While `open`, it traps Tab focus inside
 * `ref`, moves focus in on open, restores focus to the opener on close, locks
 * body scroll, and closes on Escape. Each behavior can be disabled for surfaces
 * that already own it (e.g. ArchiveReader keeps its scroll-lock + arrow-key nav;
 * AboutPhotos keeps its own scroll-lock + focus handling and takes only the Tab
 * trap). `onClose` is read through a ref, so it need not be memoized and the
 * effect re-runs only when `open` (or an option) changes.
 */
export function useModalA11y(
  open: boolean,
  onClose: () => void,
  ref: RefObject<HTMLElement>,
  {
    lockScroll = true,
    restoreFocus = true,
    handleEscape = true,
    autoFocus = true,
  }: ModalA11yOptions = {},
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const dialog = ref.current;
    const opener = document.activeElement as HTMLElement | null;

    const focusables = () =>
      dialog
        ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.getClientRects().length > 0,
          )
        : [];

    if (autoFocus) (focusables()[0] ?? dialog)?.focus?.();

    let prevOverflow = "";
    if (lockScroll) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    const onKey = (e: KeyboardEvent) => {
      if (handleEscape && e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        dialog.focus?.();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (lockScroll) document.body.style.overflow = prevOverflow;
      if (restoreFocus) opener?.focus?.();
    };
  }, [open, ref, lockScroll, restoreFocus, handleEscape, autoFocus]);
}
