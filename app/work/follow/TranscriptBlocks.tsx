"use client";

import type { FBlock } from "@/lib/followProduct";
import s from "./FollowSandbox.module.css";

/**
 * Renders a captured chat's FBlock[] exactly like the MCP console renders
 * its live wire: user = right bubble, assistant = left with a small
 * tool-name label, thinking = collapsed <details>, tool = the ⚙ card
 * (same classes as McpConsole's toolCard/toolHead/toolArgs/toolRes).
 */

function prettyArgs(args: Record<string, unknown>): string {
  try {
    return JSON.stringify(args, null, 2);
  } catch {
    return String(args);
  }
}

export default function TranscriptBlocks({ blocks, toolLabel }: { blocks: FBlock[]; toolLabel: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "user") {
          return (
            <div key={i} className={`${s.msg} ${s.msgUser}`}>
              {b.text}
            </div>
          );
        }
        if (b.t === "assistant") {
          return (
            <div key={i} className={s.assistantTurn}>
              <span className={s.assistantLabel}>{toolLabel}</span>
              <div className={s.msg}>{b.text}</div>
            </div>
          );
        }
        if (b.t === "thinking") {
          return (
            <details key={i} className={s.thinking}>
              <summary className={s.thinkingSummary}>✳ thinking</summary>
              <p className={s.thinkingBody}>{b.text}</p>
            </details>
          );
        }
        // tool block — visually identical to McpConsole's live wire cards
        return (
          <div key={i} className={`${s.toolCard} ${b.isError ? s.toolCardErr : ""}`}>
            <div className={s.toolHead}>
              <span className={s.toolName}>⚙ {b.name}</span>
              <span className={s.toolTag}>tool call</span>
            </div>
            <pre className={s.toolArgs}>{prettyArgs(b.args)}</pre>
            <div className={s.toolResHead}>→ result</div>
            <pre className={s.toolRes}>{b.result}</pre>
          </div>
        );
      })}
    </>
  );
}
