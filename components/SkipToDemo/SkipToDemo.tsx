import styles from "./SkipToDemo.module.css";

/* Hero CTA — jumps to the page's embedded demo (the section carrying
   id="demo"). A ghost .btn in the page's own accent with the global
   live-demo pulse dot; on hover the button lifts and the arrow dips. */
export default function SkipToDemo() {
  return (
    <p className={styles.row}>
      <a href="#demo" className={`btn ghost ${styles.skip}`}>
        <span className="pulseDot" aria-hidden="true" />
        Skip to the live demo
        <span className={styles.arr} aria-hidden="true">
          ↓
        </span>
      </a>
    </p>
  );
}
