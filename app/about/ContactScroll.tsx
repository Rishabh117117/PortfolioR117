"use client";

import { useEffect } from "react";

/**
 * Scrolls to the #contact block when the About page is opened via /about#contact
 * — the nav "Contact" link and the home "Get in touch" CTA both point here with
 * `scroll={false}`, so the page lands at the top and this glides down to the
 * contact section on mount. Behaviour follows the global `scroll-behavior`
 * (smooth normally, auto under prefers-reduced-motion), so we don't hard-code
 * "smooth" and the a11y gate stays intact.
 *
 * We re-check the hash on both a rAF and a short fallback timeout because the
 * URL can settle a beat after a client-side navigation commits — checking only
 * once on mount could miss it and leave the page at the top.
 */
export default function ContactScroll() {
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      if (window.location.hash !== "#contact") return;
      const el = document.getElementById("contact");
      if (!el) return;
      el.scrollIntoView({ block: "start" });
      done = true;
    };
    const raf = requestAnimationFrame(go);
    const timer = setTimeout(go, 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
