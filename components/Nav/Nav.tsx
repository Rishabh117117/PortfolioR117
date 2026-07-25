"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ARCHIVE, FLAGSHIPS } from "@/lib/projects";
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

/* The Work menu — every project, in the order the site presents them:
   flagships (home-grid order), the archive deck (portfolio-PDF order, as on
   /archive), then the pre-design fine arts. Names come from lib/projects.ts —
   the lightweight metadata source (lib/archive.ts carries full slide data and
   would bloat the layout bundle). */
const ARCHIVE_ORDER = [
  "stun-gun",
  "lotus-heater",
  "yaap",
  "obc",
  "vsg",
  "music-rooms",
  "best",
];

const WORK_MENU: { label: string; items: { href: string; name: string }[] }[] = [
  {
    label: "Flagships · 2025–26",
    items: FLAGSHIPS.map((p) => ({ href: `/work/${p.slug}`, name: p.name })),
  },
  {
    label: "Archive · 2019–23",
    items: ARCHIVE_ORDER.flatMap((slug) => {
      const p = ARCHIVE.find((a) => a.slug === slug);
      return p ? [{ href: `/archive/${p.slug}`, name: p.name }] : [];
    }),
  },
  {
    label: "Early art · 2016",
    items: [
      { href: "/archive/early-art#boards", name: "Analogies boards" },
      { href: "/archive/early-art#charcoal", name: "Charcoal works" },
    ],
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workLinkRef = useRef<HTMLAnchorElement>(null);
  // set while Esc hands focus back to the Work link, so the focus event it
  // triggers doesn't immediately reopen the menu it just closed
  const suppressFocusOpen = useRef(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Contact points at /about#contact. When already on /about, Next won't
  // navigate, so glide to the section here; otherwise ContactScroll handles it
  // on arrival. Also closes the menus on any tap.
  const handleNav = (href: string) => {
    setOpen(false);
    setWorkOpen(false);
    if (href === "/about#contact" && pathname === "/about") {
      document.getElementById("contact")?.scrollIntoView({ block: "start" });
    }
  };

  // route change = a menu item (or any link) landed — drop both menus
  useEffect(() => {
    setOpen(false);
    setWorkOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark} onClick={() => setOpen(false)}>
          Rishabh Salian
        </Link>

        {/* desktop / tablet links */}
        <ul className={styles.links}>
          {/* Work carries the all-projects dropdown: opens on hover (mouse
              intent lives in the CSS transition delays) and on keyboard focus,
              closes on leave/blur/Esc/navigation. The link itself still goes
              to the work grid. */}
          <li
            className={styles.workLi}
            data-open={workOpen || undefined}
            onPointerEnter={(e) => {
              if (e.pointerType !== "touch") setWorkOpen(true);
            }}
            onPointerLeave={() => setWorkOpen(false)}
            onFocus={() => {
              if (suppressFocusOpen.current) {
                suppressFocusOpen.current = false;
                return;
              }
              setWorkOpen(true);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setWorkOpen(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape" && workOpen) {
                setWorkOpen(false);
                suppressFocusOpen.current = true;
                workLinkRef.current?.focus();
              }
            }}
          >
            <Link
              ref={workLinkRef}
              href="/#work"
              onClick={() => handleNav("/#work")}
              className={`${styles.link} ${styles.workLink}`}
              aria-expanded={workOpen}
            >
              Work
              <svg
                className={styles.caret}
                viewBox="0 0 10 6"
                width="9"
                height="6"
                aria-hidden="true"
              >
                <path
                  d="M1 1l4 3.4L9 1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className={styles.menu}>
              {WORK_MENU.map((group) => (
                <div key={group.label} className={styles.menuCol}>
                  <p className={styles.menuLabel}>{group.label}</p>
                  <ul className={styles.menuList}>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={styles.menuLink}
                          onClick={() => handleNav(item.href)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>

          {LINKS.filter((l) => l.label !== "Work").map((l) => (
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
