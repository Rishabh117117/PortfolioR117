import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workspace MCP",
  description:
    "Home page for Rishabh Workspace MCP, a personal self-hosted connector between Rishabh Salian's AI assistant and his own Google Workspace.",
  robots: { index: false, follow: false },
};

/**
 * WORKSPACE MCP — utility page, not portfolio content.
 * Google's OAuth consent screen for the private "Rishabh Workspace MCP" app
 * requires a home page URL and a privacy policy URL on a domain Rishabh
 * owns. These two routes replace the tiny `app-pages` Railway service that
 * served static HTML for the same purpose (gws-mcp repo, DECISIONS D8/D10).
 * noindex on purpose; not in sitemap.ts; renders inside the normal shell.
 */
export default function WorkspaceMcpPage() {
  return (
    <div className="section">
      <div className="containerText">
        <p className="kicker">Workspace MCP</p>
        <h1 className="pageTitle">Rishabh Workspace MCP</h1>
        <p className="lede">
          A personal, self-hosted connector that lets Rishabh Salian&rsquo;s own
          AI assistant (Claude) read and edit his Google Docs, Sheets, Slides,
          Drive, Gmail, Calendar, Tasks and Forms on his instruction.
        </p>
        <p style={{ color: "var(--soft)", maxWidth: "60ch", marginTop: 12 }}>
          It is not a public product and has no users other than its owner.
        </p>
        <p className="mono" style={{ marginTop: 24 }}>
          <Link href="/workspace-mcp/privacy">Privacy policy</Link>
          <span aria-hidden="true"> &middot; </span>
          Contact:{" "}
          <a href="mailto:darshulrishabh@gmail.com">darshulrishabh@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
