import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Link from "next/link";
import {
  HERO,
  SCALE_GIANT,
  SCALE_UNIT,
  SCALE_LEDE,
  SCALE_SOURCE,
  VIS_HEADLINE_A,
  VIS_HEADLINE_B,
  VIS_HEADLINE_EM,
  VIS_BUCKETS,
  VIS_SOURCE,
  INSIGHT,
  FORCES,
  SUBSTRATE,
  HTTPS,
  PRECEDENTS,
  TRADEOFFS,
  KPIS,
  KPI_CAVEAT,
  CLOSE,
} from "@/lib/greenerHours";
import AmbientField from "./AmbientField";
import ScaleChart from "./ScaleChart";
import VisibilityFlow from "./VisibilityFlow";
import ForceVisual from "./ForceVisual";
import HeadersDiagram from "./HeadersDiagram";
import AdoptionCurve from "./AdoptionCurve";
import GhApp from "./GhApp";
import ProjectPager from "@/components/ProjectPager/ProjectPager";
import { GH_ROOT_STYLE } from "./theme";
import styles from "./greener-hours.module.css";

// Page-scoped serif (the deck's Fraunces) — loaded here, exposed as --font-serif
// on the page root only. Cannot leak past this route. Fraunces is a variable
// font: the variable load is 2 files (normal+italic) covering every weight the
// page uses — including the 300 the tier numerals ask for, which the old
// fixed-weight load didn't ship.
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SLUG = "greener-hours";

export const metadata: Metadata = {
  title: "Greener Hours",
  description:
    "Greener Hours — an open accountability standard for AI compute carbon disclosure, with three implementation surfaces that turn invisible energy costs into legible procurement infrastructure. A Design-for-a-Warming-World case study.",
};

const FORCE_VARIANTS = ["regulatory", "procurement", "infrastructure"] as const;

export default function GreenerHoursPage() {
  // §8 accent — Forest (matches the work-grid card) + the deck's amber/navy as
  // page-scoped atmosphere/diagram colors. One source (./theme.ts), shared
  // with the /prototype route so the two mounts can't drift.
  const rootStyle = GH_ROOT_STYLE;

  return (
    <div className={`${serif.variable} ${styles.page}`} style={rootStyle}>
      <AmbientField />
      <div className={styles.pageContent}>
        {/* ============ §1 HERO ============ */}
        <header className={styles.hero}>
          <span className={styles.badge}>Course project · Concept</span>
          <p className={styles.heroEyebrow}>{HERO.eyebrow}</p>
          <h1 className={styles.heroLockup}>
            Greener<br />
            Hours<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.heroLede}>{HERO.lede}</p>
          <div className={styles.heroFoot}>
            <div className={styles.heroMeta}>
              {HERO.meta.map((m) => (
                <div key={m.k} className={styles.metaItem}>
                  <div className={styles.k}>{m.k}</div>
                  <div className={styles.v}>{m.v}</div>
                </div>
              ))}
            </div>
            <a
              className={styles.deckLink}
              href="/greener-hours/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the full deck ↗
            </a>
          </div>
        </header>

        {/* ============ §2 THE SCALE (problem — one dark band with §3) ============ */}
        <section className={`section ${styles.navy}`}>
          <div className="container">
            <p className={styles.kicker}>§ 03 · The problem · the scale</p>
            <div className={styles.scaleGrid}>
              <div>
                <div className={styles.giant}>
                  {SCALE_GIANT}
                  <span className={styles.unit}>{SCALE_UNIT}</span>
                </div>
                <p className={styles.body}>{SCALE_LEDE}</p>
              </div>
              <ScaleChart />
            </div>
            <p className={styles.source}>{SCALE_SOURCE}</p>
          </div>
        </section>

        {/* ============ §3 THE INVISIBILITY (dark) ============ */}
        <section className={`section ${styles.navy}`}>
          <div className="container">
            <p className={styles.kicker}>§ 04 · The invisibility</p>
            <h2 className={styles.title}>
              {VIS_HEADLINE_A}
              <br />
              {VIS_HEADLINE_B}
              <em>{VIS_HEADLINE_EM}</em>
            </h2>
            <div className={styles.diagram}>
              <div className={styles.diagramWide}>
                <VisibilityFlow />
              </div>
            </div>
            <div className={styles.buckets}>
              {VIS_BUCKETS.map((b) => (
                <div key={b.lbl} className={styles.bucket}>
                  <span className={styles.lbl}>{b.lbl}</span>
                  <div className={styles.txt}>
                    {b.txt} <em>{b.em}</em>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.source}>{VIS_SOURCE}</p>
          </div>
        </section>

        {/* ============ §4 THE REFRAME + PRECEDENT (light, centered) ============ */}
        <section className="section" data-ambient-dim>
          <div className="container">
            <p className={`${styles.kicker} ${styles.center}`}>§ 05 · The reframe</p>
            <p className={styles.reframeStatement}>
              {INSIGHT.lead}{" "}
              <span className={styles.turn}>{INSIGHT.turn}</span>
            </p>
            <p className={styles.reframeLead}>{INSIGHT.attr}</p>

            {/* the hero precedent — HTTPS */}
            <div className={styles.httpsGrid}>
              <div>
                <h2 className={styles.httpsPull}>
                  {HTTPS.pullA}
                  <br />
                  <em>{HTTPS.pullB}</em>
                </h2>
                <p className={styles.httpsBody}>{HTTPS.body}</p>
              </div>
              <div className={styles.diagram}>
                <AdoptionCurve />
              </div>
            </div>

            {/* three supporting precedents */}
            <p className={styles.precLead}>The same pattern, across domains</p>
            <div className={styles.cards3}>
              {PRECEDENTS.slice(0, 3).map((p) => (
                <div key={p.name} className={styles.prec}>
                  <div className={styles.precName}>{p.name}</div>
                  <span className={styles.precKind}>{p.kind}</span>
                  <p className={styles.precNote}>{p.note}</p>
                </div>
              ))}
            </div>
            <p className={styles.source}>{HTTPS.source}</p>
          </div>
        </section>

        {/* ============ §5 THE OPPORTUNITY (forces) — blue band ============ */}
        <section className={`section ${styles.blue}`}>
          <div className="container">
            <p className={styles.kicker}>§ 06 · The opportunity · three forces</p>
            <h2 className={styles.title}>
              Why now, <em>not five years ago.</em>
            </h2>
            <div className={styles.cards3}>
              {FORCES.map((f, i) => (
                <div key={f.no} className={styles.force}>
                  <div className={styles.fnum}>{f.no}</div>
                  <h3 className={styles.ftitle}>{f.title}</h3>
                  <div className={styles.forceVisual}>
                    <ForceVisual variant={FORCE_VARIANTS[i]} />
                  </div>
                  <p className={styles.ftake}>
                    {f.take} <em>{f.takeEm}</em>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ §6 THE STANDARD (the product) ============ */}
        <section className="section" data-ambient-dim>
          <div className="container">
            <p className={styles.kicker}>§ 07 · The product · the standard</p>
            <h2 className={styles.title}>
              One standard. <em>Three surfaces.</em>
            </h2>
            <div className={styles.substrate}>
              <div className={styles.substrateLabel}>{SUBSTRATE.label}</div>
              <div className={styles.substrateBody}>{SUBSTRATE.body}</div>
            </div>
            <div className={styles.diagram}>
              <div className={styles.diagramWide}>
                <HeadersDiagram />
              </div>
            </div>
            <p className={styles.headerNote}>
              Open-source spec · reference SDK in Python, TypeScript &amp; Go ·
              piggybacks on existing API plumbing. <em>Adoption is three headers.</em>
            </p>
          </div>
        </section>

        {/* ============ §7 THE THREE SURFACES (tabbed) ============ */}
        <section className="section">
          <div className="container">
            <p className={styles.kicker}>§ 08 · The three surfaces</p>
            <h2 className={styles.title}>
              One indicator, one scheduler, <em>one dashboard.</em>
            </h2>
            <GhApp compact />
            <p className={styles.source}>
              The P-codes on each surface map to the ten design principles from
              Prof. Godelnik&apos;s <em>Design for a Warming World</em> — the project
              was developed roughly against that framework.
            </p>
            <p className={`mono ${styles.demoFoot}`}>
              <Link href="/work/greener-hours/prototype">open the prototype full-screen ↗</Link>
            </p>
          </div>
        </section>

        {/* ============ §8 HONEST TRADE-OFFS ============ */}
        <section className="section" data-ambient-dim>
          <div className="container">
            <p className={styles.kicker}>§ 15 · Named, not hidden</p>
            <h2 className={styles.title}>
              What this project <em>cannot pretend.</em>
            </h2>
            <div className={styles.tradeoffs}>
              {TRADEOFFS.map((t) => (
                <div key={t.no} className={styles.tradeoff}>
                  <div className={styles.toNo}>{t.no}</div>
                  <h3 className={styles.toTitle}>{t.title}</h3>
                  <p className={styles.toBody}>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ §9 SPECULATIVE KPIs ============ */}
        <section className={`section ${styles.band}`}>
          <div className="container">
            <p className={styles.kicker}>§ 16 · If the wedge works</p>
            <h2 className={styles.title}>
              When compute disclosure becomes <em>a normal procurement field.</em>
            </h2>
            <div className={styles.kpiGrid}>
              {KPIS.map((k) => (
                <div key={k.label} className={styles.kpi}>
                  <div className={styles.kpiFig}>{k.figure}</div>
                  <div className={styles.kpiLabel}>{k.label}</div>
                  <p className={styles.kpiSub}>{k.sub}</p>
                </div>
              ))}
            </div>
            <p className={styles.caveat}>{KPI_CAVEAT}</p>
          </div>
        </section>

        {/* ============ §10 CLOSE (dark) ============ */}
        <section className={`section ${styles.navy}`}>
          <div className="container">
            <p className={styles.kicker}>§ 17 · Close</p>
            <h2 className={styles.closeLine}>
              Make the invisible legible, and <em>the providers move.</em>
            </h2>
            <div className={styles.closeMeta}>
              {CLOSE.meta.map((m) => (
                <div key={m.k}>
                  <div className={styles.k}>{m.k}</div>
                  <div className={styles.v}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ §12 PROJECT PAGER ============ */}
        <ProjectPager slug={SLUG} />
      </div>
    </div>
  );
}
