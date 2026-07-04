import type { Metadata } from "next";
import Link from "next/link";
import ProjectPager from "@/components/ProjectPager/ProjectPager";
import FollowReel from "./FollowReel";
import CompareDiagram from "./CompareDiagram";
import AmbientField from "./AmbientField";
import FollowSandbox from "./FollowSandbox";
import { FOLLOW_ROOT_STYLE } from "./theme";
import styles from "./follow.module.css";

export const metadata: Metadata = {
  title: "Follow",
  description:
    "Follow — a shared, trackable memory layer that sits between a team’s AI tools. The capstone: the pipeline, the research, and the two pivots to a team-memory layer.",
};

// §4.1 — the Follow accent lives in ./theme.ts (shared with the /prototype
// route); --navy (the dark band) is declared on styles.page so it stays
// scoped to this route.

export default function FollowPage() {
  return (
    <div style={FOLLOW_ROOT_STYLE} className={styles.page}>
      {/* page-wide soft background layer — every section floats over this */}
      <AmbientField />
      <div className={styles.pageContent}>
      {/* ============ HERO ============ */}
      <header className={styles.hero}>
        <div className={styles.heroBody}>
          <div className={styles.dotsmark}>
            <span className={styles.dots}>
              <span className={styles.d} />
              <span className={styles.d} />
              <span className={styles.d} />
              <span className={`${styles.d} ${styles.ai}`} />
            </span>
            <span className={styles.ml}>
              the invisible <em>teammate</em>
            </span>
          </div>
          <p className={styles.heroEyebrow}>
            Capstone · MS Strategic Design &amp; Management, Parsons · 2025–26
          </p>
          <h1 className={styles.heroLockup}>
            Follow<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.heroTitle}>
            AI made everyone faster. Follow makes teams <em>smarter</em>.
          </p>
          <p className={styles.heroSub}>
            Follow is a shared, trackable memory layer that sits <em>between</em>{" "}
            your team’s AI tools — so what one person works out with their AI, the
            whole team can find, trust, and build on.
          </p>
        </div>
      </header>

      {/* ============ PROJECT TIMELINE (deck-style, at the start) ============ */}
      <section className="section">
        <div className="container">
          <h2 className={`mono ${styles.kicker}`}>Project timeline</h2>
          <p className="lede">
            Spring 2025 → May 2026 — field research, expert interviews, and the
            two pivots that turned Follow from an AI-native document tool into a
            team-memory layer.
          </p>
          {/* legend + chart sit on a full-bleed frosted band (the Healthy
              Materials timeline recipe) — the blue/orange ambient blurs
              through behind the chart */}
          <div className={styles.tlGlass}>
          <div className={styles.tlGlassInner}>
          <div className={styles.tlLegend}>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.ink}`} />
              Field research
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.acc}`} />
              Expert interview
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.holo}`} />
              Product moment
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.piv}`} />
              Pivot
            </span>
          </div>
          <div className={styles.tlScroll}>
            <svg
              viewBox="0 0 1120 300"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Project timeline, Spring 2025 to May 2026: Housing Works origin, concept v1, peer tests, pivot to a workspace extension, interviews with Alexandra Becker, Andy and Atanu Sinha, build sprints, pivot to teams-first, and the v6 capstone."
            >
              <rect x="453.5" y="22" width="3" height="248" fill="var(--accent)" opacity=".85" />
              <rect x="378" y="22" width="155" height="34" rx="4" fill="var(--accent)" />
              <text x="455" y="40" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="1.2">
                PIVOT 1 · MAR 17
              </text>
              <text x="455" y="52" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="9.5" fill="#fff" opacity=".92">
                doc editor → workspace ext.
              </text>
              <rect x="863.5" y="22" width="3" height="248" fill="var(--accent)" opacity=".85" />
              <rect x="788" y="22" width="155" height="34" rx="4" fill="var(--accent)" />
              <text x="865" y="40" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="1.2">
                PIVOT 2 · LATE APR
              </text>
              <text x="865" y="52" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="9.5" fill="#fff" opacity=".92">
                individuals → teams-first
              </text>

              <line x1="50" y1="150" x2="1070" y2="150" stroke="var(--ink)" strokeWidth="2" />
              <g fontFamily="IBM Plex Mono,monospace" fontSize="10" fill="var(--soft)" letterSpacing="1">
                <line x1="95" y1="150" x2="95" y2="156" stroke="var(--soft)" />
                <text x="95" y="172" textAnchor="middle">SPRING ’25</text>
                <line x1="300" y1="150" x2="300" y2="156" stroke="var(--soft)" />
                <text x="300" y="172" textAnchor="middle">FEB ’26</text>
                <line x1="430" y1="150" x2="430" y2="156" stroke="var(--soft)" />
                <text x="430" y="172" textAnchor="middle">MAR ’26</text>
                <line x1="700" y1="150" x2="700" y2="156" stroke="var(--soft)" />
                <text x="700" y="172" textAnchor="middle">APR ’26</text>
                <line x1="1010" y1="150" x2="1010" y2="156" stroke="var(--soft)" />
                <text x="1010" y="172" textAnchor="middle">MAY ’26</text>
              </g>

              <line x1="95" y1="150" x2="95" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="95" cy="150" r="6" fill="var(--ink)" />
              <text x="95" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Housing Works
              </text>
              <text x="95" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                3-person team · the origin
              </text>

              <line x1="250" y1="150" x2="250" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="250" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
              <text x="250" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Concept v1
              </text>
              <text x="250" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                cognitive debt · AI-native doc
              </text>

              <line x1="375" y1="150" x2="375" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="375" cy="150" r="6" fill="var(--ink)" />
              <text x="375" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Peer tests
              </text>
              <text x="375" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                4 peers · early wireframe
              </text>

              <line x1="540" y1="150" x2="540" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="540" cy="150" r="6" fill="var(--ink)" />
              <text x="540" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Alexandra Becker
              </text>
              <text x="540" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                concept test · outside view · Mar 31
              </text>

              <line x1="620" y1="150" x2="620" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="620" cy="150" r="6" fill="var(--ink)" />
              <text x="620" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Workshop
              </text>
              <text x="620" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                Intelligence Gap · 4 teams
              </text>

              <line x1="705" y1="150" x2="705" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="705" cy="150" r="6" fill="var(--accent)" />
              <text x="705" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Andy
              </text>
              <text x="705" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--accent)">
                expert · agentic systems
              </text>

              <line x1="785" y1="150" x2="785" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="785" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
              <text x="785" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Build sprints
              </text>
              <text x="785" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                MCP tools · the pipeline
              </text>

              <line x1="945" y1="150" x2="945" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="945" cy="150" r="6" fill="var(--accent)" />
              <text x="945" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Atanu Sinha
              </text>
              <text x="945" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--accent)">
                expert · 25-yr operator
              </text>

              <line x1="1025" y1="150" x2="1025" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="1025" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
              <text x="1025" y="214" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                v6 capstone
              </text>
              <text x="1025" y="230" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                teams-first · this artifact
              </text>
            </svg>
          </div>
          </div>
          </div>
          <p className={styles.tlFoot}>
            <strong>What this is not:</strong> a longitudinal deployment study.
            The peer tests informed a pivot, not a validation — the longitudinal
            pilot ahead is the move from modeled to measured.
          </p>

          {/* research methodology, clubbed under the timeline (the journey) */}
          <div className={styles.clubbed}>
            <h3 className={`mono ${styles.kicker}`}>The research</h3>
            <p className="lede">
              Mixed-methods, and honest about scope: a theoretical spine, plus six
              primary engagements — from lived experience to expert interviews.
            </p>
            <div className={styles.rcols}>
              <div className={styles.rcol}>
                <p className={styles.rlabel}>Secondary · the theoretical spine</p>
                <div className={styles.rlist}>
                  <div className={styles.r}>
                    <strong>Wegner</strong> — transactive memory systems
                  </div>
                  <div className={styles.r}>
                    <strong>Clark &amp; Chalmers</strong> — the extended mind
                  </div>
                  <div className={styles.r}>
                    <strong>Sweller</strong> — cognitive load theory
                  </div>
                  <div className={styles.r}>
                    <strong>Bienefeld et al.</strong> — TMS in human–AI teams
                  </div>
                  <div className={styles.r}>
                    <strong>Kosmyna et al. (MIT)</strong> — cognitive debt
                  </div>
                  <div className={styles.r}>
                    <strong>Doshi &amp; Hauser</strong> — homogenization risk
                  </div>
                </div>
              </div>
              <div className={styles.rcol}>
                <p className={styles.rlabel}>Primary · six engagements</p>
                <div className={styles.rlist}>
                  <div className={styles.r}>
                    <strong>Housing Works NYC</strong>
                    <span className={styles.kind}>Lived experience</span>
                  </div>
                  <div className={styles.r}>
                    <strong>Intelligence Gap workshop</strong>
                    <span className={styles.kind}>4 teams · 12 participants</span>
                  </div>
                  <div className={styles.r}>
                    <strong>Peer concept tests</strong>
                    <span className={styles.kind}>4 peers · early wireframe</span>
                  </div>
                  <div className={styles.r}>
                    <strong>Andy</strong>
                    <span className={styles.kind}>Expert · agentic systems</span>
                  </div>
                  <div className={styles.r}>
                    <strong>Alexandra Becker</strong>
                    <span className={styles.kind}>Concept test · outside perspective</span>
                  </div>
                  <div className={styles.r}>
                    <strong>Atanu Sinha</strong>
                    <span className={styles.kind}>Expert · 25-year operator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE GAP (white block): problem · today's structure · insights ============ */}
      <section className={`section ${styles.blockWhite}`}>
        <div className="containerText">
          <h2 className={`mono ${styles.kicker}`}>The problem</h2>
          <p className="lede">
            Work isn’t written alone anymore. Almost every decision now passes
            through someone’s AI chat — the constraints, the rejected options,
            the reasoning — and then stays locked in that one private thread.
          </p>
          <p className={styles.body}>
            Teams already run as a transactive memory system with each other:
            everyone keeps a rough map of who knows what. But they don’t have
            that with their AI tools. The context that actually shaped the work
            scatters across separate chats and disappears. Across five concept
            tests, most people volunteered the same feeling before seeing
            anything — that their AI-assisted work didn’t quite feel like theirs.
          </p>
          <aside className={styles.defNote}>
            <p className={styles.defTerm}>Transactive memory system</p>
            <p className={styles.defBody}>
              A group’s shared memory: instead of everyone knowing everything,
              members specialize and quietly keep a directory of{" "}
              <em>who knows what</em> — so the team retrieves knowledge by knowing
              whom to ask. Coined by Daniel Wegner, 1985.
            </p>
          </aside>
        </div>

        <div className="container">
          <div className={styles.reelHead}>
            <p className={`mono ${styles.kicker}`}>The structural change · today</p>
            <h2 className={styles.reelTitle}>
              Same team. Same tools. The reasoning <em>scatters</em>.
            </h2>
          </div>
          <CompareDiagram variant="before" />
          <p className={styles.reelNote}>
            From the capstone deck — three teammates, three AIs, each working in a
            private thread the others can’t see.
          </p>
        </div>

        <div className="container">
          <h2 className={`mono ${styles.kicker}`}>
            Insights &amp; areas of opportunity
          </h2>
          <p className="lede">
            Three findings shaped where Follow plays — and where the opportunity
            is largest.
          </p>
          <div className={styles.insights}>
            <div className={styles.ins}>
              <span className={styles.num}>01</span>
              <h3>AI is the invisible teammate.</h3>
              <p>
                Teams already run as transactive memory systems with each other —
                but not with their AI, because its contributions were never
                captured in a form the team could route to.
              </p>
            </div>
            <div className={styles.ins}>
              <span className={styles.num}>02</span>
              <h3>Cross-tool memory is structurally vacant.</h3>
              <p>
                Native memory inside one AI tool is solved by vendors. Cross-tool,
                cross-contributor memory is empty — no vendor with the surface to
                build it has a reason to make it cross-vendor.
              </p>
            </div>
            <div className={styles.ins}>
              <span className={styles.num}>03</span>
              <h3>Provenance matters where stakes are high.</h3>
              <p>
                The strongest signal for value comes where the cost of being wrong
                is asymmetric — legal review, regulated work, compliance. That’s
                also where pricing tolerance is highest.
              </p>
            </div>
          </div>

          <div className={styles.guilt}>
            <p>
              “The deliverable shipped — we didn’t fail. But I could have done
              better work if I’d known how my teammates got where they got.”
            </p>
            <p className={styles.src}>
              From the Housing Works experience — and the five concept tests
              kept surfacing the same feeling, unprompted.
            </p>
          </div>
        </div>
      </section>

      {/* ============ HMW ============ */}
      <section className="section">
        <div className="containerText">
          <p className={styles.hmwEyebrow}>The opportunity</p>
          <h2 className={styles.hmw}>
            How might we give a team{" "}
            <em>one shared, trustable memory</em> — across every AI tool they
            already use?
          </h2>
        </div>
      </section>

      {/* ============ FOLLOW CONCEPT — the response (with-Follow diagram) ============ */}
      <section className="section">
        <div className="container">
          <p className={`mono ${styles.kicker}`}>The response</p>
          <h2 className={styles.revealName} aria-label="The response: Follow">
            Follow<span className={styles.dot}>.</span>
          </h2>
          <p className={styles.revealLine}>
            A shared memory layer that lives <em>between</em> your AI tools — not
            inside any one of them.
          </p>
          <CompareDiagram variant="after" />
          <p className={styles.reelNote}>
            It sits between your AI tools rather than inside any one of them, and
            it’s queryable from any of them through MCP — the shared, scoped,
            conflict-aware memory is the product. (Tools like Glean index your
            documents; Follow indexes the <em>reasoning</em>.)
          </p>
        </div>
      </section>

      {/* ============ HOW IT WORKS — inline two-up: reel (~2/3) + write-up (~1/3) ============ */}
      <section className="section">
        <div className="container">
          <div className={styles.reelHead}>
            <p className={`mono ${styles.kicker}`}>How it works</p>
            <h2 className={styles.reelTitle}>
              From conversation to <em>queryable</em> memory.
            </h2>
            {/* NOTE: the old "Scroll to play…" line is REMOVED — it no longer scrolls. */}
          </div>

          <div className={styles.howGrid}>
            <div className={styles.reelWrap}>
              <FollowReel />
            </div>

            <aside className={styles.writeup}>
              {/* TODO(copy): provisional — finalize in copy pass */}
              <p className={`mono ${styles.writeupKicker}`}>Not quite RAG</p>
              <p className={styles.writeupBody}>
                RAG finds matching text. Follow finds the <em>source</em> — who
                worked it out, in which chat, and what it connects to.
              </p>
              <p className={styles.writeupBody}>
                Less a search box, more a directory of what your team knows and
                where it came from.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className={styles.reelNote}>
            Illustrative animation of the live pipeline — three teammates and
            their AIs, five LLM roles, three tensors, five typed edges, and
            supersession chains that are never overwritten.
          </p>
        </div>
      </section>

      {/* ============ THE SANDBOX (the demo promise, made real) ============ */}
      <section className="section">
        <div className="container">
          <p className={`mono ${styles.kicker}`}>The sandbox</p>
          <h2 className={styles.reelTitle}>
            The shipped dashboard, replicated — <em>live</em>.
          </h2>
          <p className={styles.body}>
            A small, pre-loaded workspace: Maya, Alex, and Sam, three different
            AI tools, one memory. Land on <strong>All items</strong> and see
            the whole week — 16 captured conversations, 7 uploaded files, and
            every fact they produced, newest first. Open a{" "}
            <strong>conversation</strong> and read the full transcript: the
            reasoning, the tool calls, the moment the memory got checked
            before anyone answered. Open a <strong>file</strong> and read the
            PRD, the usability notes, the analytics export the team actually
            indexed. Browse <strong>Facts</strong> with per-entry provenance,
            open the who-knows-what directory Follow keeps automatically, and
            ask it what&apos;s contested, who to ask, or what changed —
            answers come back attributed, with disagreements flagged instead
            of resolved. Then open the <strong>MCP console</strong> and watch
            the machine side: a live model calling Follow&apos;s actual tools —{" "}
            <code>query_index</code>, <code>directory_query</code>,{" "}
            <code>detect_contradictions</code> — with every call and result on
            the wire, straight from the{" "}
            <a
              href="https://github.com/Rishabh117117/workspace-platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              workspace-platform repo
            </a>
            &apos;s contracts.
          </p>
        </div>

        <div className={styles.appBleed}>
          <div className={styles.appBleedInner}>
            <FollowSandbox />
          </div>
        </div>

        <div className="container">
          <p className={`mono ${styles.sandboxFoot}`}>
            <Link href="/work/follow/prototype">open the sandbox full-screen ↗</Link>
          </p>
        </div>
      </section>

      {/* ============ WHAT IT ACCOMPLISHES (outcomes) ============ */}
      <section className="section">
        <div className="container">
          <h2 className={`mono ${styles.kicker}`}>What it accomplishes</h2>
          <p className="lede">
            What a team gets once its AI work shares one memory.
          </p>
          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.no}>01</span>
              <h3>Shared AI memory</h3>
              <p>
                One team memory across collaborators — and across whichever AI
                tool each of them uses. Not a link you send; a layer you all
                query.
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.no}>02</span>
              <h3>Per-paragraph provenance</h3>
              <p>
                Every fact carries who said it, in which chat, and when. Answers
                come back attributed, so you can see and trust where they came
                from.
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.no}>03</span>
              <h3>Contradiction detection</h3>
              <p>
                When two teammates’ AIs disagree, Follow surfaces the conflict
                instead of silently picking one — the contested points stay
                visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROJECT PAGER ============ */}
      <ProjectPager slug="follow" />
      </div>
    </div>
  );
}
