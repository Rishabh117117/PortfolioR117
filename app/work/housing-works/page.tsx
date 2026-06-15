import type { Metadata } from "next";
import PosterWidget from "@/components/PosterWidget/PosterWidget";
import WorkshopHarness from "@/components/WorkshopHarness/WorkshopHarness";
import Openings from "@/components/Openings/Openings";
import styles from "./housing-works.module.css";

export const metadata: Metadata = {
  title: "Housing Works — Rishabh Salian",
  description:
    "Strategic research turning mixed-methods fieldwork into a defensible talent strategy for a nonprofit that can't compete on pay — plus the system that runs it.",
};

// §8 — Housing Works accent (#C0263B) + derived shades, set at the page root.
const rootStyle = {
  "--accent": "#C0263B",
  "--accent-deep": "#9E1E30",
  "--accent-wash": "#F4D6DB",
  "--accent-tint": "#FBEEF0",
} as React.CSSProperties;

export default function HousingWorksPage() {
  return (
    <div style={rootStyle} className={styles.page}>
      {/* World AIDS Day gradient — thin top rule, accent texture only (§5) */}
      <div className={styles.topRule} aria-hidden="true" />

      {/* ============ BEAT 1 — HERO ============ */}
      <header className={`container ${styles.hero}`}>
        {/* Hero image: World AIDS Day memorial tags (Rishabh's). TODO Phase 2 extraction (§6). */}
        <div className={styles.heroImg} role="img" aria-label="World AIDS Day memorial tags (photo placeholder, added in Phase 2)">
          <span className="cap">Hero image — World AIDS Day memorial tags (Phase 2)</span>
        </div>
        {/* TODO hero line blocked on D-01 — options:
            A. "Keeping a generation you can't outbid."
            B. "How do you keep Gen Z when you can't compete on pay?"
            C. "A nonprofit can't win on salary. So we found what it can win on."
            Default lean (systems-thinker) = A; placeholder shown below. */}
        <h1 className={styles.heroLine}>
          Keeping a generation you can&apos;t <em>outbid</em>.
        </h1>
        <p className={`mono ${styles.heroLabel}`}>
          STRATEGIC RESEARCH · PARSONS MS SDM · TEAM OF 3
        </p>
      </header>

      {/* ============ BEAT 2 — THE BRIEF ============ */}
      <section className={`containerText ${styles.beat}`}>
        <p className={`mono ${styles.beatKicker}`}>The brief</p>
        <p className={styles.lede}>
          Housing Works has fought HIV and homelessness since 1990, funding
          health clinics, a pharmacy, and supportive housing through a chain of
          thrift stores. The model has a catch: it can&apos;t match corporate
          pay. With Gen Z set to be roughly 30% of the workforce by 2030, the
          studio&apos;s question was simple and hard — how do you attract, keep,
          and grow young talent without inflating payroll?
        </p>
        <p className={styles.bodyText}>
          This was a three-person strategy team. My share: the economic and
          competitive analysis, the survey statistics, and one of the three
          interventions — a Trustee-Led Workshop system. Teammates:{" "}
          <strong>Sharka</strong> led the Hybrid Work Charter;{" "}
          <strong>Pani</strong> led the Skill-Badge Passport.
        </p>
      </section>

      {/* ============ BEAT 3 — DISCOVERY → POSTER WIDGET ============ */}
      <section className={`container ${styles.beat}`}>
        <div className={styles.beatHead}>
          <p className={`mono ${styles.beatKicker}`}>Discovery · how we listened</p>
          <h2 className={styles.h2}>We didn&apos;t guess — we asked, in their space.</h2>
        </div>
        <p className={`containerNarrow ${styles.bodyText}`}>
          Over spring 2025: field visits to three sites, a 127-response
          interactive poster survey across The New School, a Bridges &amp;
          Barriers workshop, and a financial and competitive benchmark of
          nonprofit pay. The poster survey was the engine — provocative stat
          headlines, and anyone could write or draw a reply.
        </p>

        <div className={styles.posterLayout}>
          <div className={styles.posterMain}>
            <PosterWidget />
          </div>
          <div className={styles.posterAside}>
            <span className={`mono ${styles.asideLabel}`}>Two more posters (static)</span>
            {/* Other two posters shown as static photos — TODO Phase 2 (§6). */}
            <div className={styles.imgSlot}>
              <span className="cap">Poster 2 photo — Phase 2</span>
            </div>
            <div className={styles.imgSlot}>
              <span className="cap">Poster 3 photo — Phase 2</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BEAT 4 — THE THREE OPENINGS ============ */}
      <section className={`container ${styles.beat}`}>
        <div className={styles.beatHead}>
          <p className={`mono ${styles.beatKicker}`}>What we heard · three openings</p>
          <h2 className={styles.h2}>Where a nonprofit can win instead.</h2>
        </div>
        <div className="containerNarrow">
          <Openings />
        </div>
      </section>

      {/* ============ BEAT 5 — THE STRATEGY ============ */}
      <section className={`container ${styles.beat} ${styles.strategy}`}>
        <div className={styles.beatHead}>
          <p className={`mono ${styles.beatKicker}`}>The strategy · three coordinated moves</p>
          <h2 className={styles.h2}>One move per opening. Under $2,700 a year, total.</h2>
        </div>

        <div className={styles.moves}>
          <article className={styles.move}>
            <span className={`mono ${styles.moveTie}`}>← Opening 01</span>
            <h3 className={styles.moveTitle}>Hybrid Work Charter</h3>
            <p className={`mono ${styles.moveBy}`}>Sharka</p>
            <p className={styles.bodyText}>Makes flexibility fair and legible across every role.</p>
          </article>
          <article className={styles.move}>
            <span className={`mono ${styles.moveTie}`}>← Opening 02</span>
            <h3 className={styles.moveTitle}>Skill-Badge Passport</h3>
            <p className={`mono ${styles.moveBy}`}>Pani</p>
            <p className={styles.bodyText}>Turns recognition and surplus stock into visible thank-yous.</p>
          </article>
          <article className={`${styles.move} ${styles.moveMine}`}>
            <span className={`mono ${styles.moveTie}`}>← Opening 03 · my piece</span>
            <h3 className={styles.moveTitle}>Trustee-Led Skill &amp; Career Workshops</h3>
            <p className={`mono ${styles.moveBy}`}>Rishabh</p>
            <p className={styles.bodyText}>
              Puts the board&apos;s untapped expertise to work as short, strategic
              lessons that upskill staff and clarify the ladder.
            </p>
          </article>
        </div>

        <p className={styles.handoff}>Here&apos;s mine, running.</p>
      </section>

      {/* ============ BEAT 6 — MY PIECE, RUNNING → HARNESS ============ */}
      <section className={`container ${styles.beat}`}>
        <div className={styles.beatHead}>
          <p className={`mono ${styles.beatKicker}`}>My piece, running</p>
          <h2 className={styles.h2}>The intervention as a working system.</h2>
        </div>
        <p className={`containerNarrow ${styles.bodyText}`}>
          On synthetic data: pick a staff need; it matches the right trustee
          against the strategy, builds the 45-minute session, then captures it —
          transcript, one-minute summary, searchable archive.
        </p>
        <div className={styles.harnessWrap}>
          <WorkshopHarness />
        </div>
      </section>

      {/* ============ BEAT 7 — HONEST CODA ============ */}
      <section className={`containerText ${styles.beat} ${styles.coda}`}>
        <p className={`mono ${styles.beatKicker}`}>An honest coda</p>
        <p className={styles.bodyText}>
          What I&apos;d flag honestly: the survey skewed toward design students,
          the workshop was a single session, and these are proposals, not yet a
          pilot. I&apos;d validate with one store before scaling. AI tools
          assisted analysis and drafting throughout; the fieldwork, framing, and
          decisions are the team&apos;s.
        </p>
      </section>
    </div>
  );
}
