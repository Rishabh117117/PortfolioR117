import DriftGroup from "@/components/DriftGroup/DriftGroup";
import { MATERIAL_GRID } from "@/lib/healthyMaterials";
import styles from "./MaterialRail.module.css";

const IMG = "/images/healthy-materials";

/**
 * The healthy materials as a compact, staggered set of cards with a gentle
 * scroll PARALLAX — each card drifts vertically at its own rate (per-card
 * `depth`) as the section moves through the viewport. The motion engine is
 * the shared DriftGroup (this component's original bespoke loop was the
 * recipe DriftGroup generalized — and it leaked rAF chains on scroll, which
 * DriftGroup fixed). Reduced-motion and hidden-tab behavior come with it.
 * Hover-lift stays on the image so it never fights the drift transform.
 */
export default function MaterialRail() {
  return (
    <DriftGroup className={styles.rail}>
      {MATERIAL_GRID.map((m) => (
        <article className={styles.card} key={m.id} data-depth={m.depth}>
          <span className={styles.frame}>
            <img
              className={styles.img}
              src={`${IMG}/${m.img}`}
              alt={m.name}
              loading="lazy"
              width="1200"
              height="1500"
            />
          </span>
          <h3 className={styles.name}>{m.name}</h3>
          <p className={`mono ${styles.line}`}>{m.line}</p>
        </article>
      ))}
    </DriftGroup>
  );
}
