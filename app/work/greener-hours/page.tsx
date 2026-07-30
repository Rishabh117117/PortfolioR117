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
import Unfold from "@/components/Unfold/Unfold";
import ProjectSideNav from "@/components/ProjectSideNav/ProjectSideNav";
import SkipToDemo from "@/components/SkipToDemo/SkipToDemo";
import Reveal from "@/components/Reveal/Reveal";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
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
    "Greener Hours: a proposed open standard that puts a carbon number on every AI API response, and three tools built on it. A chat indicator, a job scheduler, and a procurement dashboard, from a Design-for-a-Warming-World course project.",
};

const FORCE_VARIANTS = ["regulatory", "procurement", "infrastructure"] as const;

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "reframe", label: "The reframe" },
  { id: "standard", label: "The standard" },
  { id: "demo", label: "Three surfaces" },
  { id: "why-now", label: "Why now" },
  { id: "trade-offs", label: "The close" },
];

export default function GreenerHoursPage() {
  // §8 accent — Forest (matches the work-grid card) + the deck's amber/navy as
  // page-scoped atmosphere/diagram colors. One source (./theme.ts), shared
  // with the /prototype route so the two mounts can't drift.
  const rootStyle = GH_ROOT_STYLE;

  return (
    <div className={`${serif.variable} ${styles.page}`} style={rootStyle}>
      <AmbientField />
      {/* site-wide scroll-reveal: fades section content up as it enters view */}
      <Reveal />
      <ProjectSideNav sections={SECTIONS} />
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
          <SkipToDemo />
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

        {/* ============ §2 THE PROBLEM — ONE slide (2026-07-29, per Rishabh:
            "make the problem into one slide instead of 2"). The scale and the
            invisibility were two sections until 07-28, then one section in two
            divided halves; now they're one flow: the headline poses it, and
            everything under it is the "this" the headline points at — how big
            the number is, then where the signal dies. ============ */}
        <section className={`section ${styles.navy}`} id="problem" data-snav-target>
          <div className="container" data-reveal>
            <SectionHeader n={1}>The problem</SectionHeader>
            <h2 className={styles.title}>
              {VIS_HEADLINE_A}
              <br />
              {VIS_HEADLINE_B}
              <em>{VIS_HEADLINE_EM}</em>
            </h2>
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
            {/* both halves' citations, now one line under one slide */}
            <p className={styles.source}>
              {SCALE_SOURCE} {VIS_SOURCE}
            </p>
          </div>
        </section>

        {/* ============ §3 THE REFRAME + PRECEDENT (light, centered) ============ */}
        <section className="section" data-ambient-dim id="reframe" data-snav-target>
          <div className="container" data-reveal>
            <SectionHeader n={2} center>The reframe</SectionHeader>
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

        {/* ============ §4 THE STANDARD (the product) ============ */}
        <section className="section" data-ambient-dim id="standard" data-snav-target>
          <div className="container" data-reveal>
            <SectionHeader n={3}>The product · the standard</SectionHeader>
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

        {/* ============ §5 THE THREE SURFACES (tabbed) ============ */}
        <section className="section" data-ambient-live id="demo" data-snav-target>
          <div className="container" data-reveal>
            <SectionHeader n={4}>The three surfaces</SectionHeader>
            <h2 className={styles.title}>
              One indicator, one scheduler, <em>one dashboard.</em>
            </h2>
            <GhApp compact />
            <p className={styles.source}>
              The P-codes on each surface map to the ten design principles from
              the <em>Design for a Warming World</em> course (SP26 syllabus); I
              built the project against that framework.
            </p>
            <p className={`mono ${styles.demoFoot}`}>
              <Link href="/work/greener-hours/prototype">open the prototype full-screen ↗</Link>
            </p>
          </div>
        </section>

        {/* ============ §6 WHY NOW (opportunity · forces) — blue band ======= */}
        <section className={`section ${styles.blue}`} id="why-now" data-snav-target>
          <div className="container" data-reveal>
            <SectionHeader n={5}>The opportunity · three forces</SectionHeader>
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

        {/* ============ §6 THE CLOSE — trade-offs + KPIs + the closing line,
            ONE section (2026-07-29, per Rishabh: "make s6 and 7 into 1"; the
            trade-offs and KPIs had already merged on 07-28). It runs on the
            NAVY band the Close owned, so the page keeps its dark bookend
            against the § 01 problem band — the .navy retints below carry the
            trade-off glass and the KPI tiles onto the dark ground. ====== */}
        <section className={`section ${styles.navy}`} id="trade-offs" data-snav-target>
          <div className="container" data-reveal>
            <SectionHeader n={6}>Named, not hidden · if it works</SectionHeader>
            <h2 className={styles.title}>
              What this project <em>cannot pretend.</em>
            </h2>
            <div className={styles.tradeoffs}>
              {TRADEOFFS.map((t) => (
                <Unfold
                  key={t.no}
                  header={
                    <div className={styles.toHead}>
                      <div className={styles.toNo}>{t.no}</div>
                      <h3 className={styles.toTitle}>{t.title}</h3>
                    </div>
                  }
                >
                  <p className={styles.toBody}>{t.body}</p>
                </Unfold>
              ))}
            </div>

            {/* then what success would look like if those trade-offs are
                worth taking. Air, no rule — one slide, three beats. */}
            <div className={styles.subBlock}>
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

            {/* and the line the whole page was walking toward */}
            <div className={styles.subBlock}>
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
          </div>
        </section>

        {/* ============ §7 PROJECT PAGER ============ */}
        <ProjectPager slug={SLUG} />
      </div>
    </div>
  );
}
