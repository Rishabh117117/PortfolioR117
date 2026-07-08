import "./diagrams.css";
import { SCALE_BARS } from "@/lib/greenerHours";

/**
 * §2 — global data-centre electricity, 2018–2030 (deck slide 3). Now on the dark
 * "problem" band: paper-toned axes/labels, amber bars (amber-soft for the 945
 * peak label so it reads on navy). Data-driven from SCALE_BARS; axis 0–1000 TWh.
 */

const AX_TOP = 60;
const AX_BOTTOM = 400;
const PX_PER_TWH = (AX_BOTTOM - AX_TOP) / 1000;
const BAR_W = 60;
const X0 = 90;
const STEP = 80;
const GRID = [0, 250, 500, 750, 1000];

export default function ScaleChart() {
  return (
    <svg
      viewBox="0 0 700 460"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Global data-center electricity demand, terawatt-hours, 2018 to 2030: 200, 240, 290, 415 (2024, actual), then projected ~580, ~760 and 945 by 2030 — more than double 2024."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* axes */}
      <line className="ghs-onDark" x1="60" y1={AX_BOTTOM} x2="680" y2={AX_BOTTOM} strokeWidth="1.5" opacity="0.7" />
      <line className="ghs-onDark" x1="60" y1="40" x2="60" y2={AX_BOTTOM} strokeWidth="1.5" opacity="0.7" />

      {/* gridlines + y labels */}
      {GRID.map((g) => {
        const y = AX_BOTTOM - g * PX_PER_TWH;
        return (
          <g key={g}>
            {g > 0 && (
              <line className="ghs-onDark" x1="60" y1={y} x2="680" y2={y} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.18" />
            )}
            <text className="ghf-mono ghd-onDark" opacity="0.6" x="48" y={y + 4} textAnchor="end" fontSize="12">
              {g}
            </text>
          </g>
        );
      })}

      {/* bars */}
      {SCALE_BARS.map((b, i) => {
        const h = b.twh * PX_PER_TWH;
        const x = X0 + i * STEP;
        const y = AX_BOTTOM - h;
        const cx = x + BAR_W / 2;
        const actualOpacity = 0.6 + i * 0.06;
        return (
          <g key={b.year}>
            {b.peak ? (
              <rect className="ghd-amber" x={x} y={y} width={BAR_W} height={h} />
            ) : b.projected ? (
              <rect
                className="ghd-amber ghs-amber"
                x={x}
                y={y}
                width={BAR_W}
                height={h}
                opacity={0.4}
                strokeWidth="1"
                strokeDasharray="4 3"
              />
            ) : (
              <rect className="ghd-amber" x={x} y={y} width={BAR_W} height={h} opacity={actualOpacity} />
            )}
            <text
              className={"ghf-mono " + (b.peak ? "ghd-amberSoft" : "ghd-onDark")}
              x={cx}
              y={y - 8}
              textAnchor="middle"
              fontSize={b.peak ? 15 : 12}
              fontWeight={b.peak || b.year === "2024" ? 700 : 400}
            >
              {b.label}
            </text>
            <text
              className="ghf-mono ghd-onDark"
              opacity="0.7"
              x={cx}
              y="425"
              textAnchor="middle"
              fontSize="12"
              fontWeight={b.peak || b.year === "2024" ? 700 : 400}
            >
              {b.year}
            </text>
          </g>
        );
      })}

      {/* title + legend */}
      <text className="ghf-serif ghd-onDark" x="60" y="26" fontSize="16" fontWeight="500">
        Global data-center electricity · TWh
      </text>
      <text className="ghf-mono ghd-onDark" opacity="0.6" x="680" y="26" textAnchor="end" fontSize="11">
        solid · actual    outlined · projection
      </text>
    </svg>
  );
}
