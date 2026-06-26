"use client";

import { useEffect, useRef } from "react";
import "./FollowReel.css";

/**
 * Follow — the scroll-pinned, full-viewport pipeline reel (FOLLOW-PAGE-1 §4.2).
 *
 * Ported 1:1 from docs/prototypes/follow-page-scroll.html. The prototype's
 * setTimeout loop is replaced by a scroll-driven sequencer: scroll progress
 * through the tall `.followReel-scrolly` track maps to a cumulative phase count,
 * and the reel's className is rebuilt additively (`followReel on go fp1 … fpN`)
 * so each beat stacks on the last. The scrubber width and the caption pill are
 * updated from the same handler, throttled with requestAnimationFrame.
 *
 * Degrades cleanly: the reel renders its built-up beats only after mount, so
 * there is no hydration mismatch. Under prefers-reduced-motion the reel is set
 * straight to its fully-built final frame, the last caption is shown, and the
 * scroll listeners are never attached.
 */

type Beat = { s: string; t: string };

const BEATS: Beat[] = [
  { s: "01 · INGEST", t: "three teammates, three AIs" },
  { s: "02 · REPORTER", t: "data becomes nodes" },
  { s: "03 · ANALYST", t: "five typed edges" },
  { s: "04 · EDITOR", t: "weighted by confidence" },
  { s: "05 · 3 TENSORS", t: "content · causal · context" },
  { s: "06 · ARCHIVIST", t: "versions kept beneath, never overwritten" },
  { s: "07 · THE INDEX", t: "this graph is the shared memory" },
  { s: "MCP →", t: "any AI tool can ask" },
  { s: "← MCP", t: "answered, with provenance" },
];

// per-packet travel vectors (straight from the prototype) — typed once.
const pkt = (dx: string, dy: string): React.CSSProperties =>
  ({ "--dx": dx, "--dy": dy }) as React.CSSProperties;

export type FollowReelProps = {
  /** Height of the scroll track in vh; controls the reel's scroll pace. */
  scrollVh?: number;
};

export default function FollowReel({ scrollVh = 450 }: FollowReelProps) {
  const scrollyRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const topcapRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const txtRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reel = reelRef.current;
    const scrolly = scrollyRef.current;
    if (!reel || !scrolly) return;
    const bar = barRef.current;
    const topcap = topcapRef.current;
    const stepEl = stepRef.current;
    const txtEl = txtRef.current;

    const N = BEATS.length;
    const lead = 0.05;
    const tail = 0.1;
    let last = -1;
    let ticking = false;
    let rafId = 0;

    const cap = (i: number) => {
      const b = BEATS[i];
      if (stepEl) stepEl.textContent = b.s;
      if (txtEl) txtEl.textContent = b.t;
      if (topcap) {
        // restart the entry animation on each new beat: remove .show, force a
        // synchronous reflow (reading offsetWidth flushes layout — the `>= 0`
        // keeps it a used expression), then re-add. Mirrors the prototype's
        // reflow restart, with no one-frame opacity-0 flash.
        topcap.classList.remove("show");
        if (topcap.offsetWidth >= 0) topcap.classList.add("show");
      }
    };

    const render = () => {
      ticking = false;
      const total = scrolly.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-scrolly.getBoundingClientRect().top, 0),
        total,
      );
      const progress = total > 0 ? scrolled / total : 0;
      let bp = (progress - lead) / (1 - lead - tail);
      if (bp < 0) bp = 0;
      if (bp > 1) bp = 1;
      const count = bp <= 0 ? 0 : Math.min(N, Math.floor(bp * N) + 1);
      let cls = "followReel on" + (count > 0 ? " go" : "");
      for (let k = 1; k <= count; k++) cls += " fp" + k;
      reel.className = cls;
      if (bar) bar.style.width = (progress * 100).toFixed(2) + "%";
      if (count !== last) {
        if (count > 0) cap(count - 1);
        else if (topcap) topcap.classList.remove("show");
        last = count;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(render);
      }
    };

    // reduced motion → jump to the fully-built final frame, no listeners.
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      let cls = "followReel on go";
      for (let k = 1; k <= N; k++) cls += " fp" + k;
      reel.className = cls;
      cap(N - 1);
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    render();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="followReel-scrolly"
      ref={scrollyRef}
      style={{ height: `${scrollVh}vh` }}
    >
      <div className="followReel-pin">
        <div className="followReel on" ref={reelRef}>
          <div className="reelLabel">
            <b>Follow</b> · how it works
          </div>
          <div className="reelHint">
            scroll
            <span className="ar">↓</span>
          </div>
          <div className="vig" />
          <div className="stage">
            <div className="aura" />
            <svg
              className="canvas"
              viewBox="0 0 1040 585"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Illustrative animation of the Follow pipeline: three teammates and their AIs are ingested into nodes, linked by five typed edges, weighted by confidence, embedded as three tensors, versioned beneath, framed as the shared Follow Index, then queried and answered with provenance over MCP."
            >
              <defs>
                <marker
                  id="aw"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="4.5"
                  markerHeight="4.5"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L10 5 L0 10 Z" fill="rgba(180,205,228,.75)" />
                </marker>
              </defs>

              {/* 01 INGEST — three chat sources */}
              <g className="src s1">
                <rect className="bub" x="44" y="104" width="48" height="28" rx="8" />
                <path className="bub" d="M56 131 L56 141 L66 131 Z" />
                <circle className="bdot" cx="56" cy="118" r="2.4" />
                <circle className="bdot" cx="68" cy="118" r="2.4" />
                <circle className="bdot" cx="80" cy="118" r="2.4" />
                <circle cx="54" cy="92" r="7" fill="var(--maya)" />
                <circle className="ai" cx="72" cy="92" r="6" />
                <text className="lbl" x="72" y="156" textAnchor="middle">
                  Maya · Claude
                </text>
              </g>
              <g className="src s2">
                <rect className="bub" x="44" y="244" width="48" height="28" rx="8" />
                <path className="bub" d="M56 271 L56 281 L66 271 Z" />
                <circle className="bdot" cx="56" cy="258" r="2.4" />
                <circle className="bdot" cx="68" cy="258" r="2.4" />
                <circle className="bdot" cx="80" cy="258" r="2.4" />
                <circle cx="54" cy="232" r="7" fill="var(--dev)" />
                <circle className="ai" cx="72" cy="232" r="6" />
                <text className="lbl" x="72" y="296" textAnchor="middle">
                  Alex · ChatGPT
                </text>
              </g>
              <g className="src s3">
                <rect className="bub" x="44" y="384" width="48" height="28" rx="8" />
                <path className="bub" d="M56 411 L56 421 L66 411 Z" />
                <circle className="bdot" cx="56" cy="398" r="2.4" />
                <circle className="bdot" cx="68" cy="398" r="2.4" />
                <circle className="bdot" cx="80" cy="398" r="2.4" />
                <circle cx="54" cy="372" r="7" fill="var(--sam)" />
                <circle className="ai" cx="72" cy="372" r="6" />
                <text className="lbl" x="72" y="436" textAnchor="middle">
                  Sam · Gemini
                </text>
              </g>

              {/* packets travelling into the index */}
              <circle className="pkt" cx="92" cy="118" r="4" fill="var(--maya)" style={pkt("230px", "40px")} />
              <circle className="pkt" cx="92" cy="118" r="3.5" fill="var(--maya)" style={pkt("436px", "32px")} />
              <circle className="pkt" cx="92" cy="258" r="4" fill="var(--dev)" style={pkt("300px", "-120px")} />
              <circle className="pkt" cx="92" cy="258" r="3.5" fill="var(--dev)" style={pkt("428px", "-36px")} />
              <circle className="pkt" cx="92" cy="398" r="4" fill="var(--sam)" style={pkt("280px", "-186px")} />
              <circle className="pkt" cx="92" cy="398" r="3.5" fill="var(--sam)" style={pkt("260px", "-90px")} />

              {/* 07 THE INDEX — frame + tab */}
              <rect className="frame" x="230" y="80" width="470" height="330" rx="14" />
              <rect className="fpulse" x="230" y="80" width="470" height="330" rx="14" />
              <g className="ftab">
                <rect x="380" y="70" width="170" height="22" rx="11" />
                <text x="465" y="85" textAnchor="middle">
                  THE FOLLOW INDEX
                </text>
              </g>

              {/* 03 ANALYST — five typed edges */}
              <line className="ed ref" x1="322" y1="158" x2="392" y2="138" />
              <line className="ed sup" x1="392" y1="138" x2="458" y2="162" />
              <line className="ed ref" x1="458" y1="162" x2="528" y2="150" />
              <line className="ed ela" x1="322" y1="158" x2="300" y2="232" />
              <line className="ed ref" x1="300" y1="232" x2="372" y2="212" />
              <line className="ed sup" x1="372" y1="212" x2="442" y2="240" />
              <line className="ed ref" x1="442" y1="240" x2="520" y2="222" />
              <line className="ed ela" x1="528" y1="150" x2="520" y2="222" />
              <line className="ed ref" x1="372" y1="212" x2="352" y2="308" />
              <line className="ed sup" x1="442" y1="240" x2="436" y2="318" />
              <line className="ed ref" x1="520" y1="222" x2="512" y2="300" />
              <line className="ed ela" x1="436" y1="318" x2="512" y2="300" />
              <line className="ed con" x1="392" y1="138" x2="442" y2="240" />
              <line className="ed sps" x1="352" y1="308" x2="436" y2="318" markerEnd="url(#aw)" />

              {/* 06 ARCHIVIST — versions kept beneath */}
              <circle className="ver v2" cx="405" cy="156" r="9" fill="var(--dev)" />
              <circle className="ver v1" cx="398" cy="147" r="9" fill="var(--dev)" />
              <circle className="ver v2" cx="455" cy="258" r="9" fill="var(--maya)" />
              <circle className="ver v1" cx="448" cy="249" r="9" fill="var(--maya)" />
              <circle className="ver v2" cx="365" cy="326" r="9" fill="var(--sam)" />
              <circle className="ver v1" cx="358" cy="317" r="9" fill="var(--sam)" />
              <text className="verlab" x="392" y="120" textAnchor="middle">
                versioned
              </text>
              <text className="verlab" x="470" y="268" textAnchor="middle">
                versioned
              </text>
              <text className="verlab" x="352" y="352" textAnchor="middle">
                versioned
              </text>

              {/* 02 REPORTER — nodes */}
              <circle className="nd dl1" cx="322" cy="158" r="9" fill="var(--maya)" />
              <circle className="nd dl2" cx="392" cy="138" r="9" fill="var(--dev)" />
              <circle className="nd dl3" cx="458" cy="162" r="9" fill="var(--sam)" />
              <circle className="nd dl4" cx="528" cy="150" r="9" fill="var(--maya)" />
              <circle className="nd dl2" cx="300" cy="232" r="9" fill="var(--dev)" />
              <circle className="nd dl3" cx="372" cy="212" r="9" fill="var(--sam)" />
              <circle className="nd dl4" cx="442" cy="240" r="9" fill="var(--maya)" />
              <circle className="nd dl5" cx="520" cy="222" r="9" fill="var(--dev)" />
              <circle className="nd dl5" cx="352" cy="308" r="9" fill="var(--sam)" />
              <circle className="nd dl6" cx="436" cy="318" r="9" fill="var(--maya)" />
              <circle className="nd dl7" cx="512" cy="300" r="9" fill="var(--dev)" />

              {/* 05 3 TENSORS — content · causal · context */}
              <line className="tray" x1="520" y1="222" x2="612" y2="168" />
              <line className="tray" x1="520" y1="222" x2="662" y2="206" />
              <line className="tray cx" x1="520" y1="222" x2="606" y2="262" />
              <circle className="tn" cx="612" cy="168" r="7" fill="#EAF1F8" />
              <circle className="tn b" cx="662" cy="206" r="7" fill="#EAF1F8" />
              <circle className="tn c" cx="606" cy="262" r="8" fill="var(--glow)" />
              <text className="tlab" x="612" y="154" textAnchor="middle" fill="rgba(244,242,236,.72)">
                CONTENT 768d
              </text>
              <text className="tlab" x="662" y="194" textAnchor="middle" fill="rgba(244,242,236,.72)">
                CAUSAL 512d
              </text>
              <text className="tlab" x="606" y="280" textAnchor="middle" fill="var(--glow)">
                CONTEXT · who
              </text>

              {/* 08 MCP → / 09 ← MCP — round-trip with provenance */}
              <line className="mcpln" x1="700" y1="180" x2="775" y2="180" />
              <g className="client">
                <rect className="cbox" x="775" y="150" width="180" height="62" rx="10" />
                <circle cx="805" cy="176" r="6" fill="#EAF1F8" />
                <circle cx="824" cy="176" r="5.5" fill="none" stroke="var(--glow)" strokeWidth="1.5" />
                <text className="clbl" x="865" y="202" textAnchor="middle">
                  AI tool · via MCP
                </text>
              </g>
              <circle className="qpkt" cx="778" cy="180" r="5" />
              <g className="apkt">
                <circle cx="690" cy="180" r="5" fill="#EAF1F8" />
                <circle cx="678" cy="180" r="3.5" fill="var(--maya)" />
                <circle cx="670" cy="180" r="3.5" fill="var(--dev)" />
              </g>
              <g className="aprov">
                <text x="865" y="232" textAnchor="middle">
                  answer · Maya + Alex
                </text>
              </g>
            </svg>

            <div className="topcap" ref={topcapRef}>
              <div className="pill">
                <span className="step" ref={stepRef} />
                <span className="txt" ref={txtRef} />
              </div>
            </div>

            <div className="legend">
              <div className="it">
                <svg width="28" height="8" aria-hidden="true" focusable="false">
                  <line x1="2" y1="4" x2="26" y2="4" stroke="#b4cde4" strokeWidth="1.4" />
                </svg>
                <span>references</span>
              </div>
              <div className="it">
                <svg width="28" height="8" aria-hidden="true" focusable="false">
                  <line x1="2" y1="4" x2="26" y2="4" stroke="#cde0f2" strokeWidth="3" />
                </svg>
                <span>supports</span>
              </div>
              <div className="it">
                <svg width="28" height="8" aria-hidden="true" focusable="false">
                  <line x1="2" y1="4" x2="26" y2="4" stroke="#b4cde4" strokeWidth="1.6" strokeDasharray="1.5 3" />
                </svg>
                <span>elaborates</span>
              </div>
              <div className="it">
                <svg width="32" height="8" aria-hidden="true" focusable="false">
                  <line x1="2" y1="4" x2="22" y2="4" stroke="#b4cde4" strokeWidth="1.7" />
                  <path d="M22 1 L29 4 L22 7 Z" fill="#b4cde4" />
                </svg>
                <span>supersedes</span>
              </div>
              <div className="it con">
                <svg width="28" height="8" aria-hidden="true" focusable="false">
                  <line x1="2" y1="4" x2="26" y2="4" stroke="#E8703A" strokeWidth="2.2" strokeDasharray="4 3" />
                </svg>
                <span>contradicts</span>
              </div>
            </div>
          </div>
          <div className="scrub">
            <i ref={barRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
