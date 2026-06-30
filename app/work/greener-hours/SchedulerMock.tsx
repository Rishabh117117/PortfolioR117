import "./diagrams.css";
import s from "./TierMocks.module.css";

/**
 * §Tier 2 — Flexible Compute Scheduler (deck slide 9, rebuilt in tokens).
 * Set a deadline → the system routes to the cleanest grid window. Forest = clean
 * window, amber = dirty, amber-soft = medium; the selected clean window is boxed.
 */

// 18 hourly forecast bars: [y, h, toneClass, opacity]
const FC: [number, number, string, number][] = [
  [40, 27, "ghd-amber", 0.5], [34, 33, "ghd-amber", 0.55],
  [48, 19, "ghd-forest", 0.7], [52, 15, "ghd-forest", 0.9],
  [50, 17, "ghd-forest", 0.9], [46, 21, "ghd-forest", 0.65],
  [36, 31, "ghd-amberSoft", 0.65], [22, 45, "ghd-amber", 0.7],
  [12, 55, "ghd-amber", 0.9], [8, 59, "ghd-amber", 1],
  [14, 53, "ghd-amber", 0.85], [24, 43, "ghd-amber", 0.7],
  [32, 35, "ghd-amber", 0.6], [40, 27, "ghd-amberSoft", 0.6],
  [44, 23, "ghd-amberSoft", 0.55], [38, 29, "ghd-amber", 0.55],
  [32, 35, "ghd-amber", 0.6], [28, 39, "ghd-amber", 0.65],
];

export default function SchedulerMock() {
  return (
    <div className={s.frame}>
      <div className={s.chrome}>
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ console.ai/tasks/new-batch</span>
      </div>
      <div className={s.pane}>
        <div className={s.crumbs}>
          <span>TASKS</span>
          <span className={s.sep}>/</span>
          <span className={s.here}>NEW BATCH REQUEST</span>
        </div>

        <div className={s.taskHead}>
          <div className={s.kmono}>Task</div>
          <div className={s.taskName}>Translate 4,200 docs · ES → EN</div>
          <div className={s.taskMeta}>
            <span><b>MODEL</b>Sonnet 4.7</span>
            <span><b>INPUT</b>s3://docs-es</span>
            <span><b>EST. RUNTIME</b>~38m</span>
          </div>
        </div>

        <div className={s.schedLbl}>SCHEDULE · WHEN TO RUN</div>

        <div className={s.optSel}>
          <div className={s.optHead}>
            <span className={s.radioOn} />
            <span className={s.optTitle}>Flexible timing</span>
            <span className={s.optSub}>— complete by deadline</span>
          </div>
          <div className={s.schedGrid}>
            <div>
              <div className={s.kmono}>Deadline</div>
              <div className={s.field}>
                <span>Tomorrow · 09:00 ET</span>
                <span className={s.sep}>▾</span>
              </div>
            </div>
            <div>
              <div className={s.kmono}>Grid intensity forecast · next 18h</div>
              <svg viewBox="0 0 480 70" style={{ width: "100%", height: "56px", display: "block" }} aria-hidden="true">
                {FC.map(([y, h, cls, o], i) => (
                  <rect key={i} className={cls} x={i * 26} y={y} width="22" height={h} opacity={o} />
                ))}
                <rect className="ghd-none ghs-forest" x="48" y="44" width="108" height="24" strokeWidth="1.5" strokeDasharray="3 2" />
              </svg>
              <div className={s.fcAxis}>
                <span>now</span><span>02:00</span><span>05:00</span><span>15:00</span><span>tom. 9am</span>
              </div>
            </div>
          </div>
          <div className={s.result}>
            <span>
              <span className={s.resultDot}>●</span> Routing to <b>02:00–05:00 ET</b> · ~180 gCO₂eq/kWh
            </span>
            <span className={s.cleaner}>↓ 56% cleaner</span>
          </div>
        </div>

        <div className={s.optOff}>
          <span className={s.radioOff} />
          Run immediately
          <span className={s.push}>~412 g/kWh · current grid mix</span>
        </div>

        <div className={s.actions}>
          <button className={s.btnGhost} type="button" tabIndex={-1}>Cancel</button>
          <button className={s.btnDark} type="button" tabIndex={-1}>Schedule task →</button>
        </div>
      </div>
    </div>
  );
}
