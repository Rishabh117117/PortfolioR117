import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy · Workspace MCP",
  description:
    "Privacy policy for Rishabh Workspace MCP, a private self-hosted tool that connects Rishabh Salian's AI assistant to his own Google Workspace account.",
  robots: { index: false, follow: false },
};

/* Privacy policy for the private "Rishabh Workspace MCP" Google OAuth app.
   Text is unchanged from the version first published 19 September 2026 on
   the retired app-pages service; only the host moved (see /workspace-mcp). */

const h2: React.CSSProperties = {
  fontSize: "var(--fs-h3)",
  lineHeight: 1.3,
  margin: "28px 0 8px",
};
const p: React.CSSProperties = { color: "var(--soft)", maxWidth: "62ch" };

export default function WorkspaceMcpPrivacyPage() {
  return (
    <div className="section">
      <div className="containerText">
        <p className="kicker">Workspace MCP</p>
        <h1 className="pageTitle">Privacy policy</h1>
        <p className="mono" style={{ color: "var(--soft)", marginTop: 12 }}>
          Rishabh Workspace MCP. Last updated 19 September 2026.
        </p>

        <h2 style={h2}>What this app is</h2>
        <p style={p}>
          A private, self-hosted tool operated by Rishabh Salian for his own
          use. It connects his AI assistant to his own Google Workspace account
          through Google&rsquo;s official APIs. There are no other users.
        </p>

        <h2 style={h2}>What data it accesses</h2>
        <p style={p}>
          Only the Google account data the owner authorises at sign-in (Google
          Docs, Sheets, Slides, Drive, Gmail, Calendar, Tasks and Forms), and
          only when the owner asks the assistant to read or change something.
        </p>

        <h2 style={h2}>How data is stored</h2>
        <p style={p}>
          OAuth tokens are stored encrypted on the owner&rsquo;s private server.
          Document contents are processed in memory to complete a request and
          are not retained by this app. No analytics, advertising or tracking
          of any kind.
        </p>

        <h2 style={h2}>Sharing</h2>
        <p style={p}>
          Data is never sold or shared with third parties. It moves only
          between Google&rsquo;s APIs, this server, and the owner&rsquo;s AI
          assistant session.
        </p>

        <h2 style={h2}>Google API Services User Data Policy</h2>
        <p style={p}>
          Use of information received from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
            target="_blank"
            rel="noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 style={h2}>Revoking access</h2>
        <p style={p}>
          Access can be revoked at any time at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
          >
            myaccount.google.com/permissions
          </a>
          , which invalidates stored tokens.
        </p>

        <h2 style={h2}>Contact</h2>
        <p style={p}>
          <a href="mailto:darshulrishabh@gmail.com">darshulrishabh@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
