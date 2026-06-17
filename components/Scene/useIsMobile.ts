"use client";

import { useEffect, useState } from "react";

/** Reactive max-width match. Used to halve parallax amplitudes on small screens. */
export function useIsMobile(query = "(max-width: 767px)") {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}
