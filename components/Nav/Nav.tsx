"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const LINKS = [
  // "Work" scrolls to the projects section on the landing page. Full path
  // (/#work, not #work) so it also works from /about and project detail pages.
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  // Contact = the full contact block at the bottom of /about (where the CV lives
  // too). scroll={false} + the About page's ContactScroll glide it into view.
  { href: "/about#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Contact points at /about#contact. When already on /about, Next won't
  // navigate, so glide to the section here; otherwise ContactScroll handles it
  // on arrival. Also closes the mobile menu on any tap.
  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "/about#contact" && pathname === "/about") {
      document.getElementById("contact")?.scrollIntoView({ block: "start" });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark} onClick={() => setOpen(false)}>
          Rishabh Salian
        </Link>

        {/* desktop / tablet links */}
        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                scroll={l.href.includes("#contact") ? false : undefined}
                onClick={() => handleNav(l.href)}
                className={isActive(l.href) ? styles.active : styles.link}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile burger */}
        <button
          type="button"
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? styles.barTop : styles.bar} />
          <span className={open ? styles.barHidden : styles.bar} />
          <span className={open ? styles.barBottom : styles.bar} />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <ul id="mobile-menu" className={styles.mobileMenu}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                scroll={l.href.includes("#contact") ? false : undefined}
                className={isActive(l.href) ? styles.mActive : styles.mLink}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => handleNav(l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
