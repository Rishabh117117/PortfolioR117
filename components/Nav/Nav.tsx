"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  // Contact has no dedicated route yet — scrolls to the footer contact block.
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

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
                className={isActive(l.href) ? styles.mActive : styles.mLink}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
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
