import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.meta}`}>
          Rishabh Salian — portfolio · {year} · built in the open
        </p>

        <ul className={styles.links}>
          {/* Placeholder contact links — real handles pending D-04. */}
          <li>
            <a href="mailto:rishabhsalian@ymail.com">Email</a>
          </li>
          <li>
            <a href="#" aria-disabled="true" className={styles.disabled}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" aria-disabled="true" className={styles.disabled}>
              GitHub
            </a>
          </li>
        </ul>

        {/*
          ========================================================================
          ASK THE PORTFOLIO — concierge entry point (DEFERRED, Phase 4)
          A Claude-powered concierge loaded with all 11 projects + CV, answering
          with citations/deep-links, proxied through app/api/ask (server-side key).
          DO NOT BUILD HERE YET — placeholder only.
          ========================================================================
        */}
      </div>
    </footer>
  );
}
