import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import DemoCallout from "@/components/DemoCallout/DemoCallout";
import { FLAGSHIPS } from "@/lib/projects";
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
import TierTabs from "./TierTabs";
import pager from "../[slug]/project.module.css";
import styles from "./greener-hours.module.css";

// Page-scoped serif (the deck's Fraunces) — loaded here, exposed as --font-serif
// on the page root only. Cannot leak past this route.
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SLUG = "greener-hours";

export const metadata: Metadata = {
  title: "Greener Hours — Rishabh Salian",
  description:
    "Greener Hours — an open accountability standard for AI compute carbon disclosure, with three implementation surfaces that turn invisible energy costs into legible procurement infrastructure. A Design-for-a-Warming-World case study.",
};

const FORCE_VARIANTS = ["regulatory", "procurement", "infrastructure"] as const;

export default function GreenerHoursPage() {
  const index = FLAGSHIPS.findIndex((p) => p.slug === SLUG);
  if (index === -1) notFound();
  const project = FLAGSHIPS[index];
  const prev = index > 0 ? FLAGSHIPS[index - 1] : null;
  const next = index < FLAGSHIPS.length - 1 ? FLAGSHIPS[index + 1] : null;

  // §8 accent — Forest (matches the work-grid card) + the deck's amber/navy as
  // page-scoped atmosphere/diagram colors. Never global tokens.
  const rootStyle = {
    "--accent": project.accent, // #1C3B36 Forest
    "--accent-deep": "#142B27",
    "--accent-wash": "#D7E0DD",
    "--accent-tint": "#EAF0EE",
    "--amber": "#C2410C",
    "--amber-soft": "#E8A642",
    "--amber-wash": "#F7E4D6",
    "--navy": "#1E3A5F",
    "--navy-soft": "#3A5A82",
    "--navy-deep": "#15293F",
    "--sky": "#7A9BBE",
  } as React.CSSProperties;

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
            <TierTabs />
            <p className={styles.source}>
              The P-codes on each surface map to the ten design principles from
              Prof. Godelnik&apos;s <em>Design for a Warming World</em> — the project
              was developed roughly against that framework.
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

        {/* ============ §11 DEMO CALLOUT (honest) ============ */}
        <section className="section">
          <div className="container">
            <DemoCallout
              name="Greener Hours"
              status="WORKING"
              title="The three surfaces above are live."
              body="Tab through them: the scheduler queues real jobs to the cleanest grid window, the dashboard ticks live, and the chat runs on the real Claude API through a server-side proxy (the key never reaches the browser). Greener Hours itself remains a speculative open standard — the full argument lives in the presentation deck."
              buttonLabel="View the full deck ↗"
              href="/greener-hours/index.html"
              external
            />
          </div>
        </section>

        {/* ============ §12 PROJECT PAGER ============ */}
        <nav className="container section" aria-label="Project pager">
          <div className={pager.pager}>
            {prev ? (
              <Link href={`/work/${prev.slug}`} className={pager.pagerLink}>
                <span className={`mono ${pager.pagerLabel}`}>← Previous</span>
                <span className={pager.pagerName}>{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className={`${pager.pagerLink} ${pager.pagerNext}`}
              >
                <span className={`mono ${pager.pagerLabel}`}>Next →</span>
                <span className={pager.pagerName}>{next.name}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
