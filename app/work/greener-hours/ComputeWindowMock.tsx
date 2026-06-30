import { CARBON_PILL } from "@/lib/greenerHours";
import s from "./ComputeWindowMock.module.css";

/**
 * §8 — Tier-1 "Compute Window Indicator" (deck slide 8, rebuilt in tokens).
 * Two placements: the topbar pill + the persistent status strip below the input.
 * Static, illustrative (no live API); the values are captioned as illustrative.
 */

const RECENT = [
  "Data-center water usage",
  "Q3 product strategy",
  "Draft email · supplier",
  "Calendar conflict",
  "SQL — quarterly forecast",
];

export default function ComputeWindowMock() {
  const p = CARBON_PILL;
  return (
    <div className={s.frame}>
      <div className={s.chrome}>
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ chat.ai/conversation/8e2f4a</span>
      </div>

      <div className={s.body}>
        {/* sidebar */}
        <aside className={s.side}>
          <div className={s.brand}>
            <span className={s.brandMark} />
            Chat
          </div>
          <div className={s.newChat}>+ New chat</div>
          <div className={s.recentLbl}>RECENT</div>
          {RECENT.map((r, i) => (
            <div key={r} className={`${s.recent} ${i === 0 ? s.active : ""}`}>
              {r}
            </div>
          ))}
          <div className={s.user}>
            <span className={s.avatarSm} />
            Rishabh S.
          </div>
        </aside>

        {/* main */}
        <div className={s.main}>
          <div className={s.topbar}>
            <div className={s.model}>
              <span className={s.modelLbl}>MODEL</span>
              <span className={s.modelName}>Sonnet 4.7 ▾</span>
            </div>
            <div className={s.pill} title="Compute Window Indicator">
              <span className={s.pillDot} />
              <span className={s.pillText}>
                {p.value} g/kWh · {p.region}
              </span>
            </div>
          </div>

          <div className={s.thread}>
            <div className={s.msg}>
              <span className={`${s.avatar} ${s.u}`} />
              <div className={s.bubble}>
                Help me draft a research summary on data-center water usage in the
                southwest US — focus on disclosures from major operators.
              </div>
            </div>
            <div className={s.msg}>
              <span className={`${s.avatar} ${s.a}`} />
              <div className={s.bubble}>
                Sure — here&apos;s a starting outline around regional stress,
                cooling disclosures, and operator reports.
                <br />
                <br />
                <strong>1. Regional baseline.</strong> Arizona, Nevada, and west
                Texas clusters draw from already-stressed aquifers and Colorado
                River allocations.
                <br />
                <br />
                <strong>2. Operator disclosures.</strong> Microsoft, Google, and
                Meta publish annual cooling-water figures; Amazon discloses less
                granularly.
              </div>
            </div>
          </div>

          <div className={s.foot}>
            <div className={s.reply}>
              <span>Reply…</span>
              <span className={s.send}>↑</span>
            </div>
            <div className={s.statusStrip}>
              <div className={s.statusLbl}>COMPUTE WINDOW · CURRENT</div>
              <div className={s.statusVals}>
                <span>
                  <span className={s.hot}>●</span> {p.value} {p.unit}
                </span>
                <span className={s.sep}>|</span>
                <span>{p.region}</span>
                <span className={s.sep}>|</span>
                <span className={s.hot}>{p.confidence}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
