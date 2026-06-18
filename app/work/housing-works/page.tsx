import type { Metadata } from "next";
import PosterWidget from "@/components/PosterWidget/PosterWidget";
import WorkshopDeck from "@/components/WorkshopDeck/WorkshopDeck";
import WorkshopHarness from "@/components/WorkshopHarness/WorkshopHarness";
import Motion from "./Motion";
import styles from "./housing-works.module.css";
import "./hw-motion.css";

export const metadata: Metadata = {
  title: "Housing Works — Rishabh Salian",
  description:
    "A talent study for Housing Works: mixed-methods research on attracting and keeping younger staff a nonprofit can't outbid — plus the trustee-led workshop system that runs the strategy.",
};

// §4 — Housing Works accent (#C0263B, echoing the AIDS red ribbon) + derived
// shades, set at the page root; everything inherits.
const rootStyle = {
  "--accent": "#C0263B",
  "--accent-deep": "#9E1E30",
  "--accent-wash": "#F4D6DB",
  "--accent-tint": "#FBEEF0",
} as React.CSSProperties;

// Photo slots (§9). Real hi-res frames drop into public/images/housing-works/
// on import; until then each scene shows a labeled placeholder caption.
const IMG = "/images/housing-works";

export default function HousingWorksPage() {
  return (
    <div style={rootStyle} className={styles.page}>
      {/* Motion adds `.hw-js` after hydration to activate scroll reveals/draws.
          The hero ribbon draws on load via pure CSS (no JS gating), so there's
          no hydration mismatch and no re-draw flicker. JS-off = fully visible. */}
      <Motion />

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
          <svg
            className={`${styles.ribbon} hw-autodraw hw-fig`}
            viewBox="0 0 80 110"
            aria-hidden="true"
          >
            <path
              className="hw-line hw-crim"
              pathLength="1"
              d="M36 104 C 30 78, 14 60, 34 38 C 44 27, 60 32, 52 50"
            />
            <path
              className="hw-line hw-crim"
              pathLength="1"
              d="M52 104 C 58 78, 74 60, 54 38 C 44 27, 28 32, 36 50"
            />
          </svg>

          <p className={`mono ${styles.eyebrow}`}>
            External Engagement Studio · MS Strategic Design &amp; Management,
            Parsons · Spring 2025
          </p>
          {/* TODO (title — Rishabh picks; default B):
              A. Preparing Housing Works for the workplace of the future
              B. The People pillar — attracting and keeping Housing Works’ next generation
              C. A talent study for Housing Works */}
          <h1 className={styles.title}>
            The People pillar — attracting and keeping Housing Works’ next
            generation
          </h1>
          <p className={styles.heroSub}>
            Housing Works runs on a three-year strategic plan with three focus
            areas: People, Programs, and Innovation. We were brought in on
            People — staff and board recruitment, retention, and flexibility,
            with the goal of making Housing Works the employer and Board home of
            choice for the next generation. Within that, we narrowed to one
            question: how can Housing Works attract and keep younger staff when
            it can’t match private-sector pay?
          </p>
        </div>
      </header>

      {/* ============ SCENE 2 — THE BRIEF ============ */}
      <section className={styles.scene}>
        <div className={`${styles.wrap} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>The brief</p>
          <p className={styles.lede}>
            Housing Works funds HIV and homelessness services through a chain of
            thrift stores and a bookstore. It can’t pay what companies pay, and
            Gen Z will soon be about a third of the workforce. The Studio paired
            our team with Housing Works to work its People pillar; we focused on
            younger staff specifically.
          </p>
          <p className={styles.body}>
            Our team of three split the work. Mine was the economic and
            competitive analysis, the survey statistics, and one of the three
            frameworks we delivered — a system for trustee-led workshops.
          </p>
        </div>
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
          <h2 className={styles.dividerTitle}>Funded by what it sells.</h2>
        </div>
      </section>

      {/* ============ SCENE 4 — HOW WE WORKED ============ */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrap} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>How we worked</p>
          <p className={styles.lede}>
            We worked in four passes, and listened before we proposed anything.
          </p>
          <ol className={styles.passes}>
            <li className={styles.pass}>
              <span className={`mono ${styles.passNo}`}>01</span>
              <p className={styles.passBody}>
                <strong>Their documents first.</strong> We read Housing Works’
                FY23–25 strategic plan, its FY23 financial audit, and its org
                charts to understand the business and where pay actually sat.
                Alongside that we ran a competitor analysis and a short
                literature review on nonprofit hiring and retention.
              </p>
            </li>
            <li className={styles.pass}>
              <span className={`mono ${styles.passNo}`}>02</span>
              <p className={styles.passBody}>
                <strong>The sites.</strong> We visited four Housing Works
                locations — a thrift store, the cannabis dispensary, the Keith
                Cylar health centre, and the bookstore — to see the work
                first-hand.
              </p>
            </li>
            <li className={styles.pass}>
              <span className={`mono ${styles.passNo}`}>03</span>
              <p className={styles.passBody}>
                <strong>The people.</strong> We interviewed staff across roles,
                including a harm-reduction coordinator and the development team,
                and sat in on calls with Housing Works.
              </p>
            </li>
            <li className={styles.pass}>
              <span className={`mono ${styles.passNo}`}>04</span>
              <p className={styles.passBody}>
                <strong>Gen Z directly.</strong> We ran an interactive poster
                survey across campus (127 responses) and a “Bridges and
                Barriers” workshop, then clustered what we heard into a short set
                of findings.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ SCENE 4a — SITE VISITS (photo grid) ============ */}
      <section className={styles.gridScene}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>From the site visits</p>
        </div>
        <div className={styles.sitesGrid}>
          <img className={styles.sitePhoto} src={`${IMG}/site-1.jpg`} alt="Inside a Housing Works thrift store." loading="lazy" width="1200" height="900" />
          <img className={styles.sitePhoto} src={`${IMG}/site-2.jpg`} alt="Shoes and accessories on the retail floor." loading="lazy" width="1200" height="900" />
          <img className={styles.sitePhoto} src={`${IMG}/site-3.jpg`} alt="The thrift-store shop floor." loading="lazy" width="1200" height="900" />
          <img className={styles.sitePhoto} src={`${IMG}/site-4.jpg`} alt="Housewares and glassware on the shelves." loading="lazy" width="1200" height="900" />
          <img className={styles.sitePhoto} src={`${IMG}/site-5.jpg`} alt="The Housing Works bookstore shelves." loading="lazy" width="1200" height="900" />
          <img className={styles.sitePhoto} src={`${IMG}/site-6.jpg`} alt="A seating area in store." loading="lazy" width="1200" height="900" />
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

      {/* ============ WORKSHOP 01 — GEN Z POSTER SURVEY ============ */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>Workshop 01 · the Gen Z poster survey</p>

          <div className={styles.wsSplit}>
            <div className={styles.wsText}>
              <h2 className={styles.wsHeading}>
                We asked Gen Z directly — in their own space.
              </h2>
              <p className={styles.body}>
                Rather than guess what younger workers want, we ran a
                participatory poster survey across three New School campuses — the
                University Center, the List Center, and the NSSR Library. Each
                board led with a provocative statistic and one open question;
                passersby wrote or drew straight onto a sticky-note grid.
              </p>
              <p className={styles.body}>
                Over about two weeks we gathered roughly 127 responses — and the
                posters that named “Gen Z” out loud drew the most, proof that the
                framing itself pulled people in.
              </p>
              <img
                className={styles.wsContext}
                src={`${IMG}/campus-context.jpg`}
                alt="Survey posters installed along a New School corridor."
                loading="lazy"
                width="1200"
                height="1600"
              />
            </div>

            <div className={styles.wsDeck}>
              <WorkshopDeck />
            </div>
          </div>

          <p className={`cap ${styles.deckNote}`}>
            The cards show the real posters; the quotes are real responses, lightly
            trimmed for length.
          </p>

          {/* the working interactive — try the method yourself */}
          <div className={styles.tryIt}>
            <p className={`mono ${styles.subKicker}`}>
              Try the work-modality poster yourself
            </p>
            <PosterWidget />
          </div>
        </div>
      </section>

      {/* ============ WORKSHOP 02 — BRIDGES AND BARRIERS ============ */}
      <section className={styles.scene}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>Workshop 02 · Bridges and Barriers</p>
          <h2 className={styles.wsHeading}>Mapping the bridges and the barriers.</h2>

          <div className={styles.bridgesText}>
            <p className={styles.body}>
              In a sixty-minute in-person workshop, we sat six Gen Z students down
              to map the workplace from the ground up. On a four-level tree —
              volunteers at the roots, staff on the trunk, managers on the
              branches, leaders in the canopy — they marked the barriers younger
              staff hit, then the “bridges” that could carry them over.
            </p>
            <p className={styles.body}>
              Every proposed fix went onto an effort-versus-engagement matrix, so
              the high-impact, low-effort moves rose to the top. Recognition kept
              beating pay — as one participant put it, “It’s not even just about
              the pay. It’s also about being acknowledged.” Unclear career paths
              came up again and again, and even a TV in the break room landed as
              an easy win.
            </p>
            <p className={styles.body}>
              Those signals fed straight into our findings and proposals —
              especially the trustee-led workshops, where participants ranked clear
              career paths and mentorship as what would keep them.
            </p>
          </div>

          <figure className={styles.bridgesLead}>
            <img
              src={`${IMG}/bridges-matrix.jpg`}
              alt="The effort-versus-engagement matrix covered in sticky notes."
              loading="lazy"
              width="1050"
              height="1400"
            />
            <figcaption className={`mono ${styles.gCap}`}>
              Effort × engagement — plotting every fix by impact.
            </figcaption>
          </figure>

          <div className={styles.bridgesMasonry}>
            <figure className={styles.gItem}>
              <img
                src={`${IMG}/bridges-place.jpg`}
                alt="A participant placing notes on the board."
                loading="lazy"
                width="975"
                height="1300"
              />
              <figcaption className={`mono ${styles.gCap}`}>Marking barriers, live.</figcaption>
            </figure>
            <figure className={styles.gItem}>
              <img
                src={`${IMG}/bridges-tree.jpg`}
                alt="The four-level tree diagram with notes attached."
                loading="lazy"
                width="1050"
                height="1400"
              />
              <figcaption className={`mono ${styles.gCap}`}>
                Volunteers → staff → managers → leaders.
              </figcaption>
            </figure>
            <figure className={styles.gItem}>
              <img
                src={`${IMG}/bridges-room.jpg`}
                alt="The workshop in session."
                loading="lazy"
                width="1500"
                height="1125"
              />
            </figure>
            <figure className={styles.gItem}>
              <img
                src={`${IMG}/bridges-table.jpg`}
                alt="Participants working around the table."
                loading="lazy"
                width="1500"
                height="1125"
              />
            </figure>
            <figure className={styles.gItem}>
              <img
                src={`${IMG}/bridges-tree-clean.jpg`}
                alt="The blank four-level tree framework before the exercise."
                loading="lazy"
                width="900"
                height="1200"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ============ SCENE 7 — WHAT WE FOUND (four findings + glyphs) ====== */}
      <section className={styles.scene}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>What we found</p>
          <p className={styles.lede}>
            Four patterns came up again and again — and each one echoed something
            Housing Works had already named in its People plan. None of them were
            about money.
          </p>

          <ul className={styles.findings}>
            <li className={styles.finding}>
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
              <div className={styles.findingText}>
                <h3 className={styles.findingTitle}>
                  <span className={`mono ${styles.findingNo}`}>01</span> Hybrid
                  autonomy and trust
                </h3>
                <p className={styles.body}>
                  Flexible scheduling read as respect. Where it was applied
                  unevenly, staff noticed — the problem was inconsistency, not
                  the technology.
                </p>
              </div>
            </li>

            <li className={styles.finding}>
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
              <div className={styles.findingText}>
                <h3 className={styles.findingTitle}>
                  <span className={`mono ${styles.findingNo}`}>02</span>{" "}
                  Recognition and community
                </h3>
                <p className={styles.body}>
                  Staff wanted to be acknowledged, not only paid. As one put it:
                  “It’s not even just about the pay. It’s also about being
                  acknowledged.”
                </p>
              </div>
            </li>

            <li className={styles.finding}>
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
              <div className={styles.findingText}>
                <h3 className={styles.findingTitle}>
                  <span className={`mono ${styles.findingNo}`}>03</span>{" "}
                  Procedural fairness
                </h3>
                <p className={styles.body}>
                  What mattered most wasn’t the outcome but whether the rules
                  were applied consistently and explained. Even-handed processes
                  built more trust than perks did.
                </p>
              </div>
            </li>

            <li className={styles.finding}>
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
              <div className={styles.findingText}>
                <h3 className={styles.findingTitle}>
                  <span className={`mono ${styles.findingNo}`}>04</span> Career
                  clarity and trustee expertise
                </h3>
                <p className={styles.body}>
                  Younger staff couldn’t see the next role or how to reach it —
                  while the board’s professional expertise sat unused.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ SCENE 8 — WHAT WE PROPOSED ============ */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>What we proposed</p>
          <p className={styles.lede}>
            We gave Housing Works three low-cost frameworks it could adopt
            without new headcount. Each answered one of our findings — and each
            mapped onto a goal Housing Works had already set in its People plan:
          </p>

          <ul className={styles.proposed}>
            <li className={styles.prop}>
              <h3 className={styles.propName}>Hybrid Work Charter</h3>
              <p className={`mono ${styles.propBy}`}>Sharka</p>
              <p className={styles.body}>
                Gives shape to the plan’s aim to design a model for the new
                flexible workplace, applied consistently across roles.
              </p>
            </li>
            <li className={styles.prop}>
              <h3 className={styles.propName}>Skill-Badge Passport</h3>
              <p className={`mono ${styles.propBy}`}>Pani</p>
              <p className={styles.body}>
                Serves the plan’s call for a culture of appreciation,
                acknowledgement, and connection, using recognition and surplus
                stock.
              </p>
            </li>
            <li className={`${styles.prop} ${styles.propMine}`}>
              <h3 className={styles.propName}>
                <span className={styles.mineDot} aria-hidden="true" />
                Trustee-Led Workshops
              </h3>
              <p className={`mono ${styles.propBy}`}>mine</p>
              <p className={styles.body}>
                Act on the plan’s commitment to offer training and development to
                Board members and managers, and on its promise that it’s not just
                a job, it’s a career.
              </p>
            </li>
          </ul>

          <p className={styles.propTotal}>
            Together they cost under <strong>$2,700 a year</strong>.
          </p>
        </div>
      </section>

      {/* ============ SCENE 9 — MY FRAMEWORK → HARNESS ============ */}
      <section className={styles.scene}>
        <div className={`${styles.wrapWide} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>My framework — trustee-led workshops</p>
          <p className={styles.body}>
            The system matches a staff development need against a trustee’s
            skills and Housing Works’ strategic priorities, then turns the match
            into a short, structured session: 45 minutes — a quick intro, a
            discussion, a hands-on sprint, and questions. Each session is
            recorded, summarized, and archived, so what’s taught stays with the
            team.
          </p>

          {/* convergence diagram: need × trustee × strategy → workshop (§6) */}
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

          <p className={styles.body}>The tool below runs that logic on sample data.</p>

          <div className={styles.harnessWrap}>
            <WorkshopHarness />
          </div>

          {/* session timeline: 45 min split 5 / 15 / 15 / 10 (§6) */}
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
      </section>

      {/* ============ SCENE 10 — LIMITATIONS (quiet close) ============ */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrap} hw-reveal`}>
          <p className={`mono ${styles.kicker}`}>Limitations</p>
          <p className={styles.body}>
            A few honest caveats. Our survey leaned toward design students, the
            workshop was a single session, and these are proposals — Housing
            Works hasn’t piloted them yet. We’d suggest testing the workshops in
            one store before scaling them across the organization. We used AI
            tools to help with analysis and drafting; the fieldwork, the
            findings, and the decisions are ours.
          </p>
        </div>
      </section>

      {/* ============ SCENE 11 — FOOTER RIBBON ============ */}
      <div className={styles.footerRibbon}>
        <svg
          className={`${styles.ribbonFoot} hw-draw hw-fig`}
          viewBox="0 0 80 110"
          aria-hidden="true"
        >
          <path
            className="hw-line hw-crim"
            pathLength="1"
            d="M36 104 C 30 78, 14 60, 34 38 C 44 27, 60 32, 52 50"
          />
          <path
            className="hw-line hw-crim"
            pathLength="1"
            d="M52 104 C 58 78, 74 60, 54 38 C 44 27, 28 32, 36 50"
          />
        </svg>
      </div>
    </div>
  );
}
