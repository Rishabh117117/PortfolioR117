import "./diagrams.css";
import { TIERS } from "@/lib/greenerHours";
import s from "./SurfaceThumbs.module.css";

/**
 * §6 — the three surfaces at a glance (deck slide 7). T1 mini chat, T2 scheduler
 * with a grid-forecast spark, T3 dashboard with KPIs + a volume/intensity spark.
 * Clean windows read forest (the accent); dirty/carbon reads amber.
 */

// T2 grid forecast — tone: dirty (amber) · med (amberSoft) · clean (forest)
const FORECAST: { h: number; tone: "ghd-amber" | "ghd-amberSoft" | "ghd-forest"; o: number }[] = [
  { h: 18, tone: "ghd-amber", o: 0.55 },
  { h: 10, tone: "ghd-forest", o: 0.85 },
  { h: 8, tone: "ghd-forest", o: 0.95 },
  { h: 10, tone: "ghd-forest", o: 0.8 },
  { h: 18, tone: "ghd-amberSoft", o: 0.7 },
  { h: 26, tone: "ghd-amber", o: 0.8 },
  { h: 30, tone: "ghd-amber", o: 1 },
  { h: 26, tone: "ghd-amber", o: 0.85 },
  { h: 18, tone: "ghd-amber", o: 0.55 },
  { h: 14, tone: "ghd-amberSoft", o: 0.6 },
  { h: 12, tone: "ghd-amberSoft", o: 0.6 },
  { h: 18, tone: "ghd-amber", o: 0.5 },
  { h: 22, tone: "ghd-amber", o: 0.65 },
  { h: 18, tone: "ghd-amber", o: 0.5 },
];

// T3 dual bars — [navyY, navyH, amberY, amberH]
const DUAL: [number, number, number, number][] = [
  [21, 19, 11, 29], [20, 19, 12, 27], [18, 21, 11, 28], [22, 17, 18, 21],
  [16, 23, 14, 25], [22, 18, 21, 19], [16, 23, 18, 21], [20, 19, 22, 17],
  [13, 26, 13, 26], [20, 19, 15, 24], [14, 26, 18, 22], [17, 22, 16, 23],
];

export default function SurfaceThumbs() {
  return (
    <div className={s.grid}>
      {/* TIER 01 */}
      <div>
        <div className={s.tierLbl}>TIER 01 · {TIERS[0].role.toUpperCase()}</div>
        <div className={s.wf}>
          <div className={s.chrome}>
            <span className={s.cdot} />
            <span className={s.cdot} />
            <span className={s.cdot} />
          </div>
          <div className={s.pane}>
            <div className={s.t1head}>
              <span className={s.t1model}>SONNET 4.7</span>
              <span className={s.miniPill}>
                <span />
                <span>412 g/kWh</span>
              </span>
            </div>
            <div className={s.row}>
              <span className={`${s.av} ${s.u}`} />
              <div className={s.bub}>Help me draft a research summary…</div>
            </div>
            <div className={s.row}>
              <span className={`${s.av} ${s.a}`} />
              <div className={s.bub}>Sure — outline: regional baseline → operator disclosures…</div>
            </div>
            <div className={s.replyMini}>Reply…</div>
          </div>
        </div>
        <h3 className={s.cap}>{TIERS[0].name}</h3>
        <p className={s.job}>
          A glyph in chat. <em>Job: legibility.</em>
        </p>
      </div>

      {/* TIER 02 */}
      <div>
        <div className={s.tierLbl}>TIER 02 · {TIERS[1].role.toUpperCase()}</div>
        <div className={s.wf}>
          <div className={s.chrome}>
            <span className={s.cdot} />
            <span className={s.cdot} />
            <span className={s.cdot} />
          </div>
          <div className={s.pane}>
            <div className={s.kmono}>TASK</div>
            <div className={s.ktask}>Translate 4,200 docs · ES→EN</div>
            <div className={`${s.opt} ${s.sel}`}>
              <span className={s.radio} />
              Flexible · by deadline
            </div>
            <div className={`${s.opt} ${s.off}`}>
              <span className={s.radio} />
              Run immediately
            </div>
            <div className={s.kmono}>GRID FORECAST · next 18h</div>
            <svg viewBox="0 0 200 32" style={{ width: "100%", height: "30px", display: "block" }} aria-hidden="true">
              {FORECAST.map((b, i) => (
                <rect key={i} className={b.tone} x={i * 14} y={32 - b.h} width="12" height={b.h} opacity={b.o} />
              ))}
              <rect className="ghd-none ghs-forest" x="12" y="20" width="56" height="13" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
        </div>
        <h3 className={s.cap}>{TIERS[1].name}</h3>
        <p className={s.job}>
          Deadline-based routing. <em>Job: one-click shift.</em>
        </p>
      </div>

      {/* TIER 03 */}
      <div>
        <div className={s.tierLbl}>TIER 03 · {TIERS[2].role.toUpperCase()}</div>
        <div className={s.wf}>
          <div className={s.chrome}>
            <span className={s.cdot} />
            <span className={s.cdot} />
            <span className={s.cdot} />
          </div>
          <div className={s.pane}>
            <div className={s.tabs}>
              <span className={s.on}>OPERATIONAL EFF.</span>
              <span>SUPPLY CHAIN</span>
              <span>COST</span>
            </div>
            <div className={s.kpis}>
              <div className={s.kpi}>
                <div className={s.lab}>REQUESTS</div>
                <div className={s.fig}>2.4M</div>
              </div>
              <div className={`${s.kpi} ${s.dark}`}>
                <div className={s.lab}>SCOPE 3</div>
                <div className={s.fig}>847 t</div>
              </div>
            </div>
            <div className={s.kmono}>VOLUME &amp; INTENSITY · DAILY</div>
            <svg viewBox="0 0 190 42" style={{ width: "100%", height: "42px", display: "block" }} aria-hidden="true">
              {DUAL.map(([vy, vh, ay, ah], i) => (
                <g key={i}>
                  <rect className="ghd-navy" x={i * 16} y={vy} width="7" height={vh} opacity="0.32" />
                  <rect className="ghd-amber" x={i * 16 + 3} y={ay} width="4" height={ah} opacity="0.9" />
                </g>
              ))}
            </svg>
          </div>
        </div>
        <h3 className={s.cap}>{TIERS[2].name}</h3>
        <p className={s.job}>
          Procurement view. <em>Job: institutional decisions.</em>
        </p>
      </div>
    </div>
  );
}
