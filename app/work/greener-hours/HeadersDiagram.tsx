import "./diagrams.css";
import { API_HEADERS, HEADER_TIERS } from "@/lib/greenerHours";

/**
 * §7 — "the standard adds three headers to existing API calls" (deck slide 11).
 * Left: an unchanged API call + the three new amber response headers. Right: a
 * dark panel showing the headers surfaced across the three tiers.
 */

const TIER_Y = [115, 220, 325];

export default function HeadersDiagram() {
  return (
    <svg
      viewBox="0 0 1700 480"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An existing AI API call, unchanged, returns three new response headers (X-Compute-Carbon-Intensity, X-Compute-Region, X-Compute-Confidence) which an SDK parses and surfaces across the three tiers: chat indicator, flexible scheduler, enterprise dashboard."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* LEFT — existing call */}
      <rect className="ghd-card ghs-line" x="40" y="40" width="720" height="400" />
      <text className="ghf-mono ghd-soft" x="70" y="80" fontSize="14" fontWeight="600">EXISTING AI API CALL · UNCHANGED</text>
      <line className="ghs-line" x1="70" y1="92" x2="740" y2="92" />
      <text className="ghf-mono ghd-ink" x="70" y="130" fontSize="18">POST /v1/messages</text>
      <text className="ghf-mono ghd-ink" x="70" y="160" fontSize="18">Authorization: Bearer ...</text>
      <text className="ghf-mono ghd-ink" x="70" y="190" fontSize="18">Content-Type: application/json</text>
      <text className="ghf-mono ghd-soft" x="70" y="240" fontSize="14" fontWeight="600">RESPONSE</text>
      <text className="ghf-mono ghd-ink" x="70" y="275" fontSize="18">200 OK</text>
      <text className="ghf-mono ghd-ink" x="70" y="305" fontSize="18">Content-Type: application/json</text>

      {/* the three new headers */}
      <rect className="ghd-amber ghs-amber" x="60" y="320" width="680" height="110" fillOpacity="0.08" strokeWidth="1.5" />
      {API_HEADERS.map((h, i) => (
        <text key={h.name} className="ghf-mono ghd-amber" x="80" y={350 + i * 28} fontSize="16" fontWeight="600">
          {h.name}: {h.value}
        </text>
      ))}

      {/* parse arrow */}
      <line className="ghs-ink" x1="790" y1="240" x2="880" y2="240" strokeWidth="2.5" />
      <polygon className="ghd-ink" points="880,240 871,234 871,246" />
      <text className="ghf-mono ghd-soft" x="835" y="225" textAnchor="middle" fontSize="13">SDK PARSES</text>

      {/* RIGHT — dark panel, three tiers */}
      <rect className="ghd-ink" x="910" y="40" width="750" height="400" />
      <text className="ghf-mono ghd-amberSoft" x="940" y="80" fontSize="14" fontWeight="600">SURFACED ACROSS THREE TIERS</text>
      {HEADER_TIERS.map((t, i) => (
        <g key={t.t}>
          <rect className="ghd-onDark ghs-amberSoft" x="940" y={TIER_Y[i]} width="690" height="90" fillOpacity="0.08" strokeWidth="1" />
          <text className="ghf-mono ghd-amberSoft" x="970" y={TIER_Y[i] + 33} fontSize="13">
            {t.t} · {t.label.toUpperCase()}
          </text>
          <text className="ghf-sans ghd-onDark" x="970" y={TIER_Y[i] + 65} fontSize="18">
            {t.surface}
          </text>
        </g>
      ))}
    </svg>
  );
}
