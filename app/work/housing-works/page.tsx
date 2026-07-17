import type { Metadata } from "next";
import WorkshopDeck from "@/components/WorkshopDeck/WorkshopDeck";
import BridgesGallery from "@/components/BridgesGallery/BridgesGallery";
import Link from "next/link";
import Motion from "./Motion";
import AmbientField from "./AmbientField";
import Timeline from "./Timeline";
import WorkshopsApp from "./WorkshopsApp";
import HwDemoTour from "./HwDemoTour";
import ProjectPager from "@/components/ProjectPager/ProjectPager";
import Unfold from "@/components/Unfold/Unfold";
import ProjectSideNav from "@/components/ProjectSideNav/ProjectSideNav";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import SkipToDemo from "@/components/SkipToDemo/SkipToDemo";
import { HW_ROOT_STYLE } from "./theme";
import styles from "./housing-works.module.css";
import "./hw-motion.css";

export const metadata: Metadata = {
  title: "Housing Works",
  description:
    "A talent study for Housing Works: mixed-methods research on attracting and keeping younger staff when a nonprofit can't outbid private-sector pay, plus the trustee-led workshop system that runs the strategy.",
};

// §4 — the Housing Works accent lives in ./theme.ts (shared with the
// /prototype route); set at the page root, everything inherits.

// Photo slots (§9). Real hi-res frames drop into public/images/housing-works/
// on import; until then each scene shows a labeled placeholder caption.
const IMG = "/images/housing-works";

const SECTIONS = [
  { id: "brief", label: "The brief" },
  { id: "semester", label: "The semester" },
  { id: "how-we-worked", label: "How we worked" },
  { id: "workshop-01", label: "Poster survey" },
  { id: "workshop-02", label: "Bridges & Barriers" },
  { id: "findings", label: "What we found" },
  { id: "proposed", label: "What we proposed" },
  { id: "demo", label: "The app" },
  { id: "limitations", label: "Limitations" },
];

export default function HousingWorksPage() {
  return (
    <div style={HW_ROOT_STYLE} className={styles.page}>
      {/* Motion adds `.hw-js` after hydration to activate scroll reveals/draws.
          The hero ribbon draws on load via pure CSS (no JS gating), so there's
          no hydration mismatch and no re-draw flicker. JS-off = fully visible. */}
      <Motion />

      {/* Page-wide ambient backdrop (z-0, fixed): the World AIDS Day gradient as
          four scroll-driven orbs. The content below floats over it on .pageContent
          (z-1); the opaque photo scenes sit on top of the wash. */}
      <AmbientField />
      <ProjectSideNav sections={SECTIONS} />

      <div className={styles.pageContent}>
      {/* ============ SCENE 1 — HERO (parallax photo) ============ */}
      <header className={`${styles.photo} ${styles.hero}`}>
        <div
          className="hw-bg"
          data-par="-0.10"
          aria-hidden="true"
          style={{ backgroundImage: `url(${IMG}/hero.jpg)` }}
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCard}>
            <p className={`mono ${styles.eyebrow}`}>
              External Engagement Studio · MS Strategic Design &amp; Management,
              Parsons · Spring 2025
            </p>
            <h1 className={styles.title}>
              The <em>People</em> pillar: attracting and keeping Housing Works’
              next generation
            </h1>
            <p className={styles.heroSub}>
              Housing Works runs on a three-year strategic plan with three focus
              areas: People, Programs, and Innovation. We were brought in on
              People, covering staff and board recruitment, retention, and
              flexibility, with the goal of making Housing Works the employer
              and Board home of choice for the next generation. Within that, we
              narrowed to one question: how can Housing Works attract and keep
              younger staff when it can’t match private-sector pay?
            </p>
            <SkipToDemo />
          </div>
        </div>
      </header>

      {/* ============ SCENE 2 — THE BRIEF ============ */}
      <section className={styles.scene} data-ambient-dim id="brief" data-snav-target>
        <div className={`${styles.wrap} hw-reveal`}>
          <SectionHeader n={1}>The brief</SectionHeader>
          <p className={styles.ledeXL}>
            Housing Works funds HIV and homelessness services through a chain of
            thrift stores and a bookstore. It can’t pay what companies pay, and
            Gen Z will soon be about a third of the workforce. The Studio paired
            our team with Housing Works to work its People pillar; we focused on
            younger staff specifically.
          </p>
          <p className={styles.body}>
            Our team of three — Sharka, Pani, and me — split the work. Mine
            was the economic and competitive analysis, the survey statistics,
            and one of the three frameworks we delivered: a system for
            trustee-led workshops.
          </p>
        </div>
      </section>

      {/* ============ SCENE 2b — THE SEMESTER (project timeline) ============ */}
      <section className={styles.scene} id="semester" data-snav-target>
        <div className={`${styles.wrap} hw-reveal`} data-ambient-dim>
          <SectionHeader n={2}>The semester</SectionHeader>
          <p className={styles.ledeXL}>
            Fifteen weeks, from meeting the partner to handing over the
            strategy.
          </p>
        </div>
        {/* the chart breaks out of the reading column onto a full-bleed glass
            band; kept outside the reveal so the backdrop blur stays clean */}
        <Timeline />
      </section>

      {/* ============ SCENE 3 — DIVIDER (storefront) ============ */}
      <section className={`${styles.photo} ${styles.divider}`}>
        <div
          className="hw-bg"
          data-par="-0.14"
          aria-hidden="true"
          style={{ backgroundImage: `url(${IMG}/divider-retail.jpg)` }}
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.dividerInner}>
          <div className={styles.imgGlass}>
            <h2 className={styles.dividerTitle}>Funded by what it sells.</h2>
          </div>
        </div>
      </section>

      {/* ============ SCENE 4 — HOW WE WORKED ============ */}
      <section className={`${styles.scene} ${styles.band}`} data-ambient-dim id="how-we-worked" data-snav-target>
        <div className={`${styles.wrap} hw-reveal`}>
          <SectionHeader n={3}>How we worked</SectionHeader>
          <p className={styles.ledeXL}>
            We worked in four passes, and listened before we proposed anything.
          </p>
          <p className={styles.body}>
            One caveat up front: we couldn’t survey Housing Works’ own younger
            staff directly, so the Gen Z fieldwork ran as analogous research,
            with students across The New School standing in for the generation
            Housing Works wants to attract and keep.
          </p>
          <ol className={styles.iconCardGrid}>
            <li className={styles.iconCard}>
              <span className={`mono ${styles.passNo}`}>01</span>
              <svg
                className={`${styles.passGlyph} hw-draw hw-fig`}
                viewBox="0 0 80 54"
                role="img"
                aria-label="Stacked documents."
              >
                <path className="hw-line" pathLength="1" d="M28 6 L60 6 L60 38 L28 38 Z" />
                <path className="hw-line" pathLength="1" d="M20 14 L52 14 L52 46 L20 46 Z" />
                <path
                  className="hw-line"
                  pathLength="1"
                  d="M25 22 L47 22 M25 28 L47 28 M25 34 L41 34"
                />
                <circle className="hw-line hw-crim" pathLength="1" cx="52" cy="14" r="2.6" />
              </svg>
              <h3 className={styles.passTitle}>Their documents first.</h3>
              <p className={styles.passBody}>
                We read Housing Works’ FY23–25 strategic plan, its FY23
                financial audit, and its org charts to understand the
                business and where pay actually sat. Alongside that we ran a
                competitor analysis and a short literature review on
                nonprofit hiring and retention.
              </p>
            </li>
            <li className={styles.iconCard}>
              <span className={`mono ${styles.passNo}`}>02</span>
              <svg
                className={`${styles.passGlyph} hw-draw hw-fig`}
                viewBox="0 0 80 54"
                role="img"
                aria-label="A storefront with an awning."
              >
                <path className="hw-line" pathLength="1" d="M14 22 L14 48 L66 48 L66 22" />
                <path className="hw-line" pathLength="1" d="M10 22 L18 10 L62 10 L70 22 Z" />
                <path
                  className="hw-line"
                  pathLength="1"
                  d="M18 22 L18 10 M28 22 L26 10 M38 22 L38 10 M48 22 L50 10 M58 22 L58 10"
                />
                <path className="hw-line" pathLength="1" d="M32 48 L32 32 L48 32 L48 48" />
                <circle className="hw-line hw-crim" pathLength="1" cx="44" cy="40" r="1.6" />
              </svg>
              <h3 className={styles.passTitle}>The sites.</h3>
              <p className={styles.passBody}>
                We visited four Housing Works locations to see the work
                first-hand: a thrift store, the cannabis dispensary, the Keith
                Cylar health center, and the bookstore.
              </p>
            </li>
            <li className={styles.iconCard}>
              <span className={`mono ${styles.passNo}`}>03</span>
              <svg
                className={`${styles.passGlyph} hw-draw hw-fig`}
                viewBox="0 0 80 54"
                role="img"
                aria-label="Two heads in conversation."
              >
                <circle className="hw-line" pathLength="1" cx="20" cy="27" r="12" />
                <circle className="hw-line" pathLength="1" cx="60" cy="27" r="12" />
                <circle className="hw-line hw-crim" pathLength="1" cx="34" cy="27" r="1.4" />
                <circle className="hw-line hw-crim" pathLength="1" cx="40" cy="27" r="1.4" />
                <circle className="hw-line hw-crim" pathLength="1" cx="46" cy="27" r="1.4" />
              </svg>
              <h3 className={styles.passTitle}>The people.</h3>
              <p className={styles.passBody}>
                We interviewed staff across roles, including a
                harm-reduction coordinator and the development team, and sat
                in on calls with Housing Works.
              </p>
            </li>
            <li className={styles.iconCard}>
              <span className={`mono ${styles.passNo}`}>04</span>
              <svg
                className={`${styles.passGlyph} hw-draw hw-fig`}
                viewBox="0 0 80 54"
                role="img"
                aria-label="A poster board with sticky notes."
              >
                <path className="hw-line" pathLength="1" d="M16 6 L64 6 L64 40 L16 40 Z" />
                <path className="hw-line" pathLength="1" d="M40 40 L40 48 M28 48 L52 48" />
                <path className="hw-line" pathLength="1" d="M16 6 L8 16 M64 6 L72 16" />
                <path className="hw-line" pathLength="1" d="M23 14 L33 14 L33 22 L23 22 Z" />
                <path className="hw-line" pathLength="1" d="M38 18 L48 18 L48 26 L38 26 Z" />
                <path className="hw-line hw-crim" pathLength="1" d="M52 12 L60 12 L60 20 L52 20 Z" />
              </svg>
              <h3 className={styles.passTitle}>Gen Z directly.</h3>
              <p className={styles.passBody}>
                We ran an interactive poster survey across campus (127
                responses) and a “Bridges &amp; Barriers” workshop, then
                clustered what we heard into a short set of findings.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ SCENE 4a — SITE VISITS (bento photo grid) ============ */}
      <section className={styles.gridScene}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <SectionHeader n={4}>From the site visits</SectionHeader>
          <div className={styles.sitesGrid}>
            <img className={`${styles.sitePhoto} ${styles.sBig}`} src={`${IMG}/site-1.jpg`} alt="Inside a Housing Works thrift store." loading="lazy" width="1200" height="900" />
            <img className={styles.sitePhoto} src={`${IMG}/site-2.jpg`} alt="Shoes and accessories on the retail floor." loading="lazy" width="1200" height="900" />
            <img className={styles.sitePhoto} src={`${IMG}/site-3.jpg`} alt="The thrift-store shop floor." loading="lazy" width="1200" height="900" />
            <img className={styles.sitePhoto} src={`${IMG}/site-4.jpg`} alt="Housewares and glassware on the shelves." loading="lazy" width="1200" height="900" />
            <img className={styles.sitePhoto} src={`${IMG}/site-5.jpg`} alt="The Housing Works bookstore shelves." loading="lazy" width="1200" height="900" />
            <img className={`${styles.sitePhoto} ${styles.sWide}`} src={`${IMG}/site-6.jpg`} alt="A seating area in store." loading="lazy" width="1200" height="900" />
          </div>
        </div>
      </section>

      {/* ============ SCENE 4b — FIELDWORK BY THE NUMBERS (dark data strip) ===== */}
      <section className={styles.dataStrip} aria-label="Fieldwork by the numbers">
        <div className={styles.dataInner}>
          <div className={styles.stat}>
            <span className={styles.statNum}>127</span>
            <span className={`mono ${styles.statLabel}`}>survey responses</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4</span>
            <span className={`mono ${styles.statLabel}`}>site visits</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4</span>
            <span className={`mono ${styles.statLabel}`}>research passes</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>1</span>
            <span className={`mono ${styles.statLabel}`}>Bridges &amp; Barriers workshop</span>
          </div>
        </div>
      </section>

      {/* ===== WORKSHOP 01 — the whole Gen Z poster study runs over the campus
           photo: the intro card, the moving posters, AND the final insight all
           lay over one image that carries down to the Bridges & Barriers
           workshop (the photo is the section background, not a separate hero). */}
      <section className={styles.posterStudy} id="workshop-01" data-snav-target>
        <div
          className="hw-bg"
          data-par="-0.05"
          aria-hidden="true"
          style={{ backgroundImage: `url(${IMG}/campus-context.jpg)` }}
        />
        <div className={`${styles.scrim} ${styles.scrimStrong}`} aria-hidden="true" />

        {/* intro — glass card over the photo */}
        <div className={styles.posterStudyInner}>
          <div className={`${styles.imgGlass} hw-reveal`}>
            <p className={`mono ${styles.wsHeroKicker}`}>
              Workshop 01 · the Gen Z poster survey
            </p>
            <h2 className={styles.wsHeroTitle}>
              We asked Gen Z directly, in their own space.
            </h2>
            <p className={styles.subLine}>
              Three campuses, six posters, ~127 sticky-note responses.
            </p>
            <Unfold
              variant="bare"
              header={<span className={styles.wsHow}>how we ran it</span>}
            >
              <p className={styles.wsHeroText}>
                Rather than guess what younger workers want, we ran a
                participatory poster survey across three New School campuses: the
                University Center, the List Center, and the NSSR Library. Each
                board led with a provocative statistic and one open question;
                passersby, mostly students, wrote or drew straight onto a
                sticky-note grid.
              </p>
              <p className={styles.wsHeroText}>
                Over about two weeks we gathered roughly 127 responses, and the
                posters that named “Gen Z” out loud drew the most. The framing
                itself pulled people in.
              </p>
            </Unfold>
          </div>
          <p className={`mono ${styles.subKickerOnPhoto}`}>
            The posters · moving through all six
          </p>
        </div>

        {/* the posters move across the photo — cards are opaque, captions legible */}
        <div className={styles.deckOnPhoto}>
          <WorkshopDeck tone="onPhoto" />
        </div>

        {/* provenance — the per-poster insights live ON the cards now */}
        <div className={styles.posterStudyInner}>
          <p className={`cap ${styles.deckNoteOnPhoto}`}>
            From our Spring 2025 participatory poster survey at The New School.
            The cards show the real posters and real responses, lightly trimmed.
            The sharp headline on each board earned the attention; the insight
            on each card is what people’s answers actually said.
          </p>
        </div>
      </section>

      {/* ============ WORKSHOP 02 — BRIDGES AND BARRIERS ============ */}
      <section className={styles.scene} data-ambient-dim id="workshop-02" data-snav-target>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <SectionHeader n={5}>Workshop 02 · Bridges &amp; Barriers</SectionHeader>
          <h2 className={styles.wsHeading}>Mapping the bridges and the barriers.</h2>
          <p className={styles.subLine}>
            Six students, a four-level tree, an effort-vs-engagement matrix.
          </p>
          <Unfold
            variant="bare"
            header={<span className={styles.wsHow}>inside the session</span>}
          >
            <div className={styles.bridgesText}>
              <p className={styles.body}>
                In a sixty-minute in-person workshop, we sat six Gen Z students
                down to map the workplace from the ground up. On a four-level
                tree (volunteers at the roots, staff on the trunk, managers on
                the branches, leaders in the canopy) they marked the barriers
                younger staff hit, then the “bridges” that could carry them over.
              </p>
              <p className={styles.body}>
                Every proposed fix went onto an effort-versus-engagement matrix,
                so the high-impact, low-effort moves rose to the top. Recognition
                kept beating pay. Unclear career paths came up again and again,
                and even a TV in the break room landed as an easy win.
              </p>
              <p className={styles.body}>
                Those signals fed straight into our findings and proposals,
                especially the trustee-led workshops, where participants ranked
                clear career paths and mentorship as what would keep them.
              </p>
            </div>
          </Unfold>

          <p className={`mono ${styles.subKicker}`}>
            How the session unfolded · tap a frame to enlarge
          </p>
        </div>

        {/* all six steps on one screen — vertical-rectangle cards, click to zoom */}
        <BridgesGallery />

        <div className={styles.wrapWide}>
          <div className={styles.bridgesOutro}>
            <p className={`mono ${styles.subKicker}`}>What it pointed to</p>
            <p className={styles.bridgesOutroText}>
              Two workshops, the same signals. We clustered what we heard into the
              four findings below.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SCENE 7 — WHAT WE FOUND (four findings + glyphs) ====== */}
      <section className={styles.scene} data-ambient-dim id="findings" data-snav-target>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <SectionHeader n={6}>What we found</SectionHeader>
          <p className={styles.ledeXL}>
            Four patterns came up again and again, and each one echoed something
            Housing Works had already named in its People plan. None of them were
            about money.
          </p>
        </div>

        {/* the four findings sit side by side, on a row wider than the
            reading column so the cards get room */}
        <div className={`${styles.findings} hw-reveal`}>
            <Unfold
              variant="card"
              header={
                <div className={styles.findingHead}>
                  <svg
                    className={`${styles.glyph} hw-draw hw-fig`}
                    viewBox="0 0 60 56"
                    aria-hidden="true"
                  >
                    <circle className="hw-line" pathLength="1" cx="14" cy="28" r="7" />
                    <circle className="hw-line" pathLength="1" cx="46" cy="28" r="7" />
                    <path className="hw-line" pathLength="1" d="M23 24 L37 24" />
                    <path className="hw-line hw-crim" pathLength="1" d="M37 24 L33 20 M37 24 L33 28" />
                    <path className="hw-line" pathLength="1" d="M37 32 L23 32" />
                    <path className="hw-line hw-crim" pathLength="1" d="M23 32 L27 28 M23 32 L27 36" />
                  </svg>
                  <h3 className={styles.findingTitle}>
                    <span className={`mono ${styles.findingNo}`}>01</span> Hybrid
                    autonomy and trust
                  </h3>
                </div>
              }
            >
              <p className={styles.body}>
                Flexible scheduling read as respect. Where it was applied
                unevenly, staff noticed. The problem was inconsistency, not
                the technology.
              </p>
            </Unfold>

            <Unfold
              variant="card"
              header={
                <div className={styles.findingHead}>
                  <svg
                    className={`${styles.glyph} hw-draw hw-fig`}
                    viewBox="0 0 60 56"
                    aria-hidden="true"
                  >
                    <path
                      className="hw-line"
                      pathLength="1"
                      d="M16 16 L40 16 L50 28 L40 40 L16 40 Z"
                    />
                    <circle className="hw-line hw-crim" pathLength="1" cx="39" cy="28" r="3.2" />
                  </svg>
                  <h3 className={styles.findingTitle}>
                    <span className={`mono ${styles.findingNo}`}>02</span>{" "}
                    Recognition and community
                  </h3>
                </div>
              }
            >
              <p className={styles.body}>
                Staff wanted to be acknowledged, not only paid. As one put it:
                “It’s not even just about the pay. It’s also about being
                acknowledged.”
              </p>
            </Unfold>

            <Unfold
              variant="card"
              header={
                <div className={styles.findingHead}>
                  <svg
                    className={`${styles.glyph} hw-draw hw-fig`}
                    viewBox="0 0 60 56"
                    aria-hidden="true"
                  >
                    <path className="hw-line" pathLength="1" d="M30 14 L30 42" />
                    <path className="hw-line" pathLength="1" d="M16 20 L44 20" />
                    <path className="hw-line" pathLength="1" d="M16 20 L11 31 M16 20 L21 31" />
                    <path className="hw-line" pathLength="1" d="M11 31 Q16 37 21 31" />
                    <path className="hw-line" pathLength="1" d="M44 20 L39 31 M44 20 L49 31" />
                    <path className="hw-line" pathLength="1" d="M39 31 Q44 37 49 31" />
                    <path className="hw-line" pathLength="1" d="M23 46 L37 46" />
                    <path className="hw-line" pathLength="1" d="M30 42 L30 46" />
                    <circle className="hw-line hw-crim" pathLength="1" cx="30" cy="15" r="2.2" />
                  </svg>
                  <h3 className={styles.findingTitle}>
                    <span className={`mono ${styles.findingNo}`}>03</span>{" "}
                    Procedural fairness
                  </h3>
                </div>
              }
            >
              <p className={styles.body}>
                What mattered most wasn’t the outcome but whether the rules
                were applied consistently and explained. Even-handed processes
                built more trust than perks did.
              </p>
            </Unfold>

            <Unfold
              variant="card"
              header={
                <div className={styles.findingHead}>
                  <svg
                    className={`${styles.glyph} hw-draw hw-fig`}
                    viewBox="0 0 60 56"
                    aria-hidden="true"
                  >
                    <path
                      className="hw-line"
                      pathLength="1"
                      d="M12 46 L24 46 L24 35 L36 35 L36 24 L48 24 L48 13"
                    />
                    <path className="hw-line hw-crim" pathLength="1" d="M44 17 L48 13 L52 17" />
                  </svg>
                  <h3 className={styles.findingTitle}>
                    <span className={`mono ${styles.findingNo}`}>04</span> Career
                    clarity and trustee expertise
                  </h3>
                </div>
              }
            >
              <p className={styles.body}>
                Younger staff couldn’t see the next role or how to reach it,
                while the board’s professional expertise sat unused.
              </p>
            </Unfold>
        </div>
      </section>

      {/* ==== SCENE 8 — WHAT WE PROPOSED → MY FRAMEWORK → THE WORKING APP ==== */}
      <section className={`${styles.scene} ${styles.band}`} data-ambient-dim id="proposed" data-snav-target>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <SectionHeader n={7}>What we proposed</SectionHeader>
          <p className={styles.ledeXL}>
            We gave Housing Works three low-cost frameworks it could adopt
            without new headcount. Each answered one of our findings and mapped
            onto a goal Housing Works had already set in its People plan:
          </p>

          {/* Each card carries a native line-glyph rebuilt from the report's
              own intervention graphics (Fig. 42–43): hybrid = home⇄office,
              badge = a passport credential, workshop = a trustee at the easel. */}
          <ul className={styles.proposed}>
            <li className={`${styles.prop} ${styles.iconCard}`}>
              <svg className={`${styles.propGlyph} hw-draw hw-fig`} viewBox="0 0 80 54" role="img" aria-label="A home and an office linked both ways: hybrid work.">
                <path className="hw-line" pathLength="1" d="M5 41 L75 41" />
                <path className="hw-line" pathLength="1" d="M11 26 L22 17 L33 26" />
                <path className="hw-line" pathLength="1" d="M14 26 L14 41 M30 26 L30 41" />
                <path className="hw-line" pathLength="1" d="M19 41 L19 33 L25 33 L25 41" />
                <path className="hw-line" pathLength="1" d="M47 16 L47 41 L70 41 L70 16 Z" />
                <path className="hw-line" pathLength="1" d="M53 22 L53 28 M61 22 L61 28 M53 33 L53 38 M61 33 L61 38" />
                <path className="hw-line hw-crim" pathLength="1" d="M35 32 L45 32" />
                <path className="hw-line hw-crim" pathLength="1" d="M35 32 L39 29 M35 32 L39 35 M45 32 L41 29 M45 32 L41 35" />
              </svg>
              <h3 className={styles.propName}>Hybrid Work Charter</h3>
              <p className={`mono ${styles.propBy}`}>Sharka</p>
              <p className={styles.body}>
                Gives shape to the plan’s aim to design a model for the new
                flexible workplace, applied consistently across roles.
              </p>
            </li>
            <li className={`${styles.prop} ${styles.iconCard}`}>
              <svg className={`${styles.propGlyph} hw-draw hw-fig`} viewBox="0 0 80 54" role="img" aria-label="A passport credential carrying an earned skill badge.">
                <path className="hw-line" pathLength="1" d="M25 8 L25 46 L53 46 L53 8 Z" />
                <path className="hw-line" pathLength="1" d="M31 8 L31 46" />
                <path className="hw-line" pathLength="1" d="M36 14 L48 14" />
                <path className="hw-line" pathLength="1" d="M36 40 L48 40" />
                <circle className="hw-line hw-crim" pathLength="1" cx="42" cy="27" r="7" />
                <path className="hw-line hw-crim" pathLength="1" d="M38 27 L41 30 L46 24" />
              </svg>
              <h3 className={styles.propName}>Skill-Badge Passport</h3>
              <p className={`mono ${styles.propBy}`}>Pani</p>
              <p className={styles.body}>
                Serves the plan’s call for a culture of appreciation,
                acknowledgement, and connection, using recognition and surplus
                stock.
              </p>
            </li>
            <li className={`${styles.prop} ${styles.propMine} ${styles.iconCard}`}>
              <svg className={`${styles.propGlyph} hw-draw hw-fig`} viewBox="0 0 80 54" role="img" aria-label="A trustee presenting at an easel to a small group: a workshop.">
                <path className="hw-line" pathLength="1" d="M44 12 L44 34 L71 34 L71 12 Z" />
                <path className="hw-line" pathLength="1" d="M49 19 L62 19 M49 25 L66 25" />
                <path className="hw-line" pathLength="1" d="M49 34 L45 46 M66 34 L70 46 M47 40 L68 40" />
                <circle className="hw-line" pathLength="1" cx="36" cy="22" r="3" />
                <path className="hw-line" pathLength="1" d="M36 25 L36 35 M36 28 L43 24" />
                <circle className="hw-line" pathLength="1" cx="11" cy="33" r="3" />
                <path className="hw-line" pathLength="1" d="M7 42 Q11 36 15 42" />
                <circle className="hw-line" pathLength="1" cx="21" cy="30" r="3" />
                <path className="hw-line" pathLength="1" d="M17 39 Q21 33 25 39" />
                <circle className="hw-line hw-crim" pathLength="1" cx="57" cy="8" r="1.6" />
                <path className="hw-line hw-crim" pathLength="1" d="M57 3 L57 5 M53 5 L54.5 6.3 M61 5 L59.5 6.3" />
              </svg>
              <h3 className={styles.propName}>
                <span className={styles.mineDot} aria-hidden="true" />
                Trustee Workshops
              </h3>
              <p className={`mono ${styles.propBy}`}>me</p>
              <p className={styles.body}>
                Acts on the plan’s commitment to offer training and development to
                Board members and managers, and on its promise that it’s not just
                a job, it’s a career.
              </p>
            </li>
          </ul>

          <p className={styles.propTotal}>
            Together they cost under <strong>$2,700 a year</strong>.
          </p>

          {/* my framework — folded into this section (was its own scene):
              a compact intro, the two figures side by side, then the app */}
          <h3 className={styles.fwHead}>My framework: trustee-led workshops</h3>

          {/* 2-col ≥900px: trimmed text + demo lead-in LEFT, convergence diagram
              RIGHT; the 45-minute timeline spans full width beneath both. */}
          <div className={styles.fwGrid}>
            <div className={styles.fwCol}>
              <p className={styles.body}>
                The system matches a staff development need against a trustee’s
                skills and Housing Works’ strategic priorities, then turns the
                match into one structured 45-minute session. Every session is
                recorded, summarized, and archived — what’s taught stays with
                the team. Its share of the three-framework budget is $900 a
                year.
              </p>
              <p className={styles.fwLeadin}>
                Below: the working version, as the People team would use it.
              </p>
            </div>

            {/* convergence diagram: need × trustee × strategy → workshop */}
            <svg
              className={`${styles.diagram} hw-draw hw-fig`}
              viewBox="0 0 340 200"
              role="img"
              aria-label="A staff need, a trustee skill, and a strategic priority converge into one matched workshop."
            >
              <text x="112" y="50" textAnchor="end">Staff need</text>
              <text x="112" y="104" textAnchor="end">Trustee skill</text>
              <text x="112" y="158" textAnchor="end">Strategy</text>
              <circle className="hw-line" pathLength="1" cx="122" cy="46" r="6" />
              <circle className="hw-line" pathLength="1" cx="122" cy="100" r="6" />
              <circle className="hw-line" pathLength="1" cx="122" cy="154" r="6" />
              <path className="hw-line" pathLength="1" d="M130 49 L198 100" />
              <path className="hw-line" pathLength="1" d="M130 100 L198 100" />
              <path className="hw-line" pathLength="1" d="M130 151 L198 100" />
              <circle className="hw-line hw-crim" pathLength="1" cx="208" cy="100" r="8" />
              <path className="hw-line" pathLength="1" d="M218 100 L266 100" />
              <path className="hw-line hw-crim" pathLength="1" d="M266 100 L259 95 M266 100 L259 105" />
              <circle className="hw-line" pathLength="1" cx="288" cy="100" r="13" />
              <text x="288" y="134" textAnchor="middle">WORKSHOP</text>
            </svg>
          </div>

          {/* session timeline: 45 min split 5 / 15 / 15 / 10 — full width */}
          <svg
            className={`${styles.timeline} hw-draw hw-fig`}
            viewBox="0 0 340 72"
            role="img"
            aria-label="The 45-minute session: 5-minute intro, 15-minute discussion, 15-minute sprint, 10-minute Q and A."
          >
            <text x="36" y="22" textAnchor="middle">Intro</text>
            <text x="103" y="22" textAnchor="middle">Discussion</text>
            <text x="203" y="22" textAnchor="middle">Sprint</text>
            <text x="286" y="22" textAnchor="middle">Q&amp;A</text>
            <path className="hw-line hw-crim" pathLength="1" d="M20 42 L320 42" />
            <path className="hw-line" pathLength="1" d="M20 36 L20 48" />
            <path className="hw-line" pathLength="1" d="M53 36 L53 48" />
            <path className="hw-line" pathLength="1" d="M153 36 L153 48" />
            <path className="hw-line" pathLength="1" d="M253 36 L253 48" />
            <path className="hw-line" pathLength="1" d="M320 36 L320 48" />
            <text x="36" y="64" textAnchor="middle">5m</text>
            <text x="103" y="64" textAnchor="middle">15m</text>
            <text x="203" y="64" textAnchor="middle">15m</text>
            <text x="286" y="64" textAnchor="middle">10m</text>
          </svg>
        </div>

        <div className={styles.appBleed} id="demo" data-snav-target>
          {/* the stage: the guided walkthrough's spotlight overlay portals in
              here and stays absolute within it (see HwDemoTour) */}
          <div className={styles.appBleedInner} id="hw-sandbox-stage">
            <WorkshopsApp />
          </div>
        </div>
        <HwDemoTour />

        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.demoFoot}`}>
            <Link href="/work/housing-works/prototype">open the prototype full-screen ↗</Link>
          </p>
        </div>
      </section>

      {/* ============ SCENE 10 — LIMITATIONS (quiet close) ============ */}
      <section className={`${styles.scene} ${styles.band}`} data-ambient-dim id="limitations" data-snav-target>
        <div className={`${styles.wrap} hw-reveal`}>
          <SectionHeader n={8}>Limitations</SectionHeader>
          <p className={styles.body}>
            A few honest caveats. As flagged up front, the Gen Z research was
            analogous and leaned toward design students; the workshop was a
            single session; and these are proposals Housing Works hasn’t
            piloted yet. We’d suggest testing the workshops in one store before
            scaling them across the organization. We used AI tools to help with
            analysis and drafting; the fieldwork, the findings, and the
            decisions are ours.
          </p>
        </div>
      </section>

      {/* ============ PROJECT PAGER ============ */}
      <ProjectPager slug="housing-works" />
      </div>
    </div>
  );
}
