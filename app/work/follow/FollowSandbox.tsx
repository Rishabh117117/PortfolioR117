"use client";

import { useCallback, useMemo, useState } from "react";
import {
  F_WORKSPACE,
  F_HONESTY,
  F_ENTRIES,
  fMember,
  fTopics,
  fDirectory,
  followContext,
  type FEntry,
} from "@/lib/followSandbox";
import { FOLLOW_MCP_TOOLS } from "@/lib/followMcp";
import FollowAskDock from "./FollowAskDock";
import McpConsole from "./McpConsole";
import s from "./FollowSandbox.module.css";

/**
 * The Follow team-memory sandbox (D-02: self-contained) — the page's demo
 * promise made real: step into a pre-loaded workspace, browse the shared
 * memory with per-entry provenance (who · tool · chat · when), see the two
 * genuinely contested pairs flagged instead of resolved, and ask Follow
 * questions the live model answers from this memory (/api/ask, demo "follow").
 */

type View = "memory" | "directory" | "mcp";

const KIND_LABEL: Record<FEntry["kind"], string> = {
  decision: "decision",
  finding: "finding",
  constraint: "constraint",
};

export default function FollowSandbox() {
  const [view, setView] = useState<View>("memory");
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [contestedOnly, setContestedOnly] = useState(false);
  // the memory is mutable: the MCP console's save_conversation writes to it
  const [entries, setEntries] = useState<FEntry[]>(F_ENTRIES);
  const addEntry = useCallback((e: FEntry) => setEntries((prev) => [...prev, e]), []);

  const topics = useMemo(() => fTopics(entries), [entries]);
  const directory = useMemo(() => fDirectory(entries), [entries]);
  const context = useMemo(() => followContext(entries), [entries]);
  const contestedCount = entries.filter((e) => e.contradicts).length / 2;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    // newest first: reverse of authored order (authored Mon→today)
    return [...entries].reverse().filter((e) => {
      if (contestedOnly && !e.contradicts) return false;
      if (topicFilter && e.topic !== topicFilter) return false;
      if (!q) return true;
      const m = fMember(e.memberId);
      return (
        e.claim.toLowerCase().includes(q) ||
        e.topic.includes(q) ||
        e.chat.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.tool.toLowerCase().includes(q)
      );
    });
  }, [entries, query, topicFilter, contestedOnly]);

  return (
    <div className={s.frame}>
      <div className={s.chrome} aria-hidden="true">
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ {F_WORKSPACE.url}</span>
      </div>

      <div className={s.topbar}>
        <div className={s.brand}>
          <span className={s.brandName}>
            Follow<span className={s.brandDot}>.</span>
          </span>
          <sup className={s.brandSup}>sandbox</sup>
        </div>
        <div className={s.workspace}>
          <span className={s.wsName}>{F_WORKSPACE.name}</span>
          <span className={s.wsMeta}>{F_WORKSPACE.meta}</span>
        </div>
        <div className={s.topRight}>
          <span className={s.syncPill}>
            <span className={s.syncDot} aria-hidden="true" />
            memory synced · {entries.length} entries
          </span>
          <button
            type="button"
            className={`${s.contestedPill} ${contestedOnly ? s.contestedPillOn : ""}`}
            aria-pressed={contestedOnly}
            onClick={() => {
              setContestedOnly((v) => !v);
              setView("memory");
            }}
            title="Show only entries where teammates' AIs disagree"
          >
            ⚡ {contestedCount} contested
          </button>
        </div>
      </div>

      <div className={s.body}>
        {/* ---------------- rail ---------------- */}
        <aside className={s.rail}>
          <nav aria-label="Sandbox views">
            <p className={s.railLabel}>views</p>
            <ul className={s.viewList}>
              <li>
                <button
                  type="button"
                  className={`${s.viewBtn} ${view === "memory" ? s.viewOn : ""}`}
                  aria-current={view === "memory" ? "true" : undefined}
                  onClick={() => setView("memory")}
                >
                  <span>Team memory</span>
                  <span className={s.viewCount}>{entries.length}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`${s.viewBtn} ${view === "directory" ? s.viewOn : ""}`}
                  aria-current={view === "directory" ? "true" : undefined}
                  onClick={() => setView("directory")}
                >
                  <span>Who knows what</span>
                  <span className={s.viewCount}>{directory.length}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`${s.viewBtn} ${view === "mcp" ? s.viewOn : ""}`}
                  aria-current={view === "mcp" ? "true" : undefined}
                  onClick={() => setView("mcp")}
                >
                  <span>MCP console</span>
                  <span className={s.viewCount}>{FOLLOW_MCP_TOOLS.length}</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className={s.team}>
            <p className={s.railLabel}>the team</p>
            {directory.map((d) => (
              <div key={d.member.id} className={s.teamRow}>
                <span className={`${s.avatar} ${s[`tool${d.member.tool}`]}`} aria-hidden="true">
                  {d.member.name[0]}
                </span>
                <span className={s.teamWho}>
                  <span className={s.teamName}>{d.member.name}</span>
                  <span className={s.teamTool}>{d.member.tool}</span>
                </span>
                <span className={s.teamCount}>{d.entryCount}</span>
              </div>
            ))}
          </div>

          <div className={s.stats}>
            <p className={s.railLabel}>this workspace</p>
            <div className={s.statRow}>
              <span className={s.statName}>Entries captured</span>
              <span className={s.statVal}>{entries.length}</span>
            </div>
            <div className={s.statRow}>
              <span className={s.statName}>Topics tracked</span>
              <span className={s.statVal}>{topics.length}</span>
            </div>
            <div className={s.statRow}>
              <span className={s.statName}>Contested pairs</span>
              <span className={`${s.statVal} ${s.statHot}`}>{contestedCount}</span>
            </div>
            <div className={s.statRow}>
              <span className={s.statName}>Last capture</span>
              <span className={s.statVal}>today</span>
            </div>
          </div>
        </aside>

        {/* ---------------- main ---------------- */}
        <section className={s.main} aria-label="Follow sandbox">
          {view === "memory" && (
            <>
              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>Team memory</h3>
                <p className={s.mainBlurb}>
                  Every entry keeps its provenance — who worked it out, in which AI, in which
                  thread. Conflicts stay visible.
                </p>
              </header>
              <input
                className={s.search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the memory — claims, people, threads…"
                aria-label="Search the team memory"
              />
              <div className={s.topicRow}>
                {topics.map((t) => (
                  <button
                    key={t.topic}
                    type="button"
                    className={`${s.topicChip} ${topicFilter === t.topic ? s.topicOn : ""}`}
                    aria-pressed={topicFilter === t.topic}
                    onClick={() => setTopicFilter(topicFilter === t.topic ? null : t.topic)}
                  >
                    {t.topic}
                    {t.contested && <span className={s.topicZap}> ⚡</span>}
                    <span className={s.topicCount}>{t.count}</span>
                  </button>
                ))}
              </div>

              {shown.length === 0 && <p className={s.empty}>Nothing in memory matches that.</p>}
              {shown.map((e) => {
                const m = fMember(e.memberId);
                const other = e.contradicts ? entries.find((x) => x.id === e.contradicts) : null;
                const otherM = other ? fMember(other.memberId) : null;
                return (
                  <article key={e.id} className={`${s.entry} ${e.contradicts ? s.entryHot : ""}`}>
                    <p className={s.claim}>{e.claim}</p>
                    <div className={s.provRow}>
                      <span className={`${s.avatar} ${s.avatarSm} ${s[`tool${m.tool}`]}`} aria-hidden="true">
                        {m.name[0]}
                      </span>
                      <span className={s.prov}>
                        {m.name} · {m.tool} · “{e.chat}” · {e.when}
                      </span>
                      <span className={`${s.kind} ${s[`kind_${e.kind}`]}`}>{KIND_LABEL[e.kind]}</span>
                      <span className={s.topicTag}>{e.topic}</span>
                    </div>
                    {other && otherM && (
                      <p className={s.conflict}>
                        <span className={s.conflictBadge}>⚡ contested</span>
                        disagrees with {otherM.name}&apos;s “{other.chat}” ({other.when}) — Follow keeps
                        both sides on the record instead of picking one.
                      </p>
                    )}
                  </article>
                );
              })}
            </>
          )}

          {view === "directory" && (
            <>
              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>Who knows what</h3>
                <p className={s.mainBlurb}>
                  The transactive-memory directory Follow maintains automatically — retrieval by
                  knowing whom to ask.
                </p>
              </header>
              {directory.map((d) => (
                <article key={d.member.id} className={s.person}>
                  <header className={s.personHead}>
                    <span className={`${s.avatar} ${s.avatarLg} ${s[`tool${d.member.tool}`]}`} aria-hidden="true">
                      {d.member.name[0]}
                    </span>
                    <div>
                      <h4 className={s.personName}>{d.member.name}</h4>
                      <p className={s.personMeta}>
                        {d.member.role} · works in {d.member.tool} · last active {d.lastActive}
                      </p>
                    </div>
                    <span className={s.personCount}>{d.entryCount} entries</span>
                  </header>
                  <div className={s.personTopics}>
                    {d.topics.map((t) => (
                      <button
                        key={t.topic}
                        type="button"
                        className={s.personTopic}
                        onClick={() => {
                          setView("memory");
                          setTopicFilter(t.topic);
                          setQuery(d.member.name);
                        }}
                        title={`See ${d.member.name}'s ${t.topic} entries`}
                      >
                        {t.topic} <span className={s.topicCount}>{t.count}</span>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
              <p className={s.dirFoot}>
                Expertise is derived live from the memory — nobody fills in a profile.
              </p>
            </>
          )}

          {/* stays MOUNTED across view switches so the tool wire survives a
              hop to Team memory (to see a saved entry) and back */}
          <div className={view === "mcp" ? s.mcpWrap : s.mcpHidden}>
            <header className={s.mainHead}>
              <h3 className={s.mainTitle}>MCP console</h3>
              <p className={s.mainBlurb}>
                Follow is headless by design — the shipped server exposes these tools over
                JSON-RPC at /mcp, to people and machines alike. Same names, schemas, and
                response shapes here.
              </p>
            </header>
            <McpConsole entries={entries} addEntry={addEntry} />
          </div>
        </section>

        {/* ---------------- Ask Follow dock ---------------- */}
        <FollowAskDock context={context} />
      </div>

      <div className={s.honesty}>
        <span>{F_HONESTY}</span>
        <span className={s.honestyRight}>answers run on a live model API via a server-side proxy</span>
      </div>
    </div>
  );
}
