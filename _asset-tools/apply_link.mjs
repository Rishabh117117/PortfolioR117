#!/usr/bin/env node
/* apply_link — mint one tracking link per job application.
 *
 * The problem this solves: analytics can tell you a visit happened, never who
 * it was. No tool can, including Google Analytics — anonymous web traffic has
 * no name attached. But if each application carries its own link, the source
 * that shows up in Umami's UTM report maps back to a specific studio, because
 * you know who you handed that link to. That's the honest way to answer "did
 * they open it": you're distinguishing links you sent, not identifying people.
 *
 *   node _asset-tools/apply_link.mjs "Pentagram"
 *   node _asset-tools/apply_link.mjs "Pentagram" --role "Design Engineer"
 *   node _asset-tools/apply_link.mjs "IDEO" --path /work/follow
 *   node _asset-tools/apply_link.mjs --list
 *
 * THE LEDGER LIVES OUTSIDE THE REPO, deliberately. PortfolioR117 is public, and
 * a file listing every company Rishabh has applied to has no business being in
 * it. Default location is Desktop\Claude\portfolio-applications.json, one level
 * above the repo; override with APPLY_LEDGER if you want it elsewhere.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..");
const LEDGER = process.env.APPLY_LEDGER || resolve(REPO, "..", "portfolio-applications.json");
const SITE = (process.env.SITE_URL || "https://rishabhsalian.com").replace(/\/+$/, "");

/* utm_source has to survive being pasted into an application form, a PDF, and
   whatever mail client mangles it, so: lowercase, ascii, hyphens only. */
const STRIP_DIACRITICS = /[\u0300-\u036f]/g;
const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(STRIP_DIACRITICS, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

const load = () => {
  if (!existsSync(LEDGER)) return [];
  try {
    const parsed = JSON.parse(readFileSync(LEDGER, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    /* A corrupt ledger should not cost you the link you came here for. Say so
       and carry on with an empty one rather than throwing. */
    console.error(`! ${LEDGER} is unreadable — starting a fresh list in memory.`);
    return [];
  }
};

const argv = process.argv.slice(2);

if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
  console.log(
    [
      "",
      "  apply_link — one tracking link per application",
      "",
      '    node _asset-tools/apply_link.mjs "Company name"',
      '      --role "Design Engineer"     tags the link with the role',
      "      --path /work/follow          land them on a specific page",
      "      --list                       show every link minted so far",
      "",
      `  ledger: ${LEDGER}`,
      "",
    ].join("\n"),
  );
  process.exit(0);
}

if (argv.includes("--list")) {
  const rows = load();
  if (rows.length === 0) {
    console.log(`\n  No links minted yet.\n  ledger: ${LEDGER}\n`);
    process.exit(0);
  }
  console.log(`\n  ${rows.length} link${rows.length === 1 ? "" : "s"} minted\n`);
  for (const r of rows) {
    console.log(`  ${r.date}  ${r.company}${r.role ? `  ·  ${r.role}` : ""}`);
    console.log(`              ${r.url}\n`);
  }
  console.log(`  ledger: ${LEDGER}\n`);
  console.log("  Match utm_source against the UTM report in Umami to see which opened.\n");
  process.exit(0);
}

/* One pass, so a value that happens to repeat elsewhere in argv can't confuse
   an indexOf-based lookup: --role and --path swallow the token after them, and
   the first token left standing is the company. */
const opts = { role: "", path: "" };
const loose = [];
for (let i = 0; i < argv.length; i += 1) {
  const a = argv[i];
  if (a === "--role" || a === "--path") {
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      opts[a.slice(2)] = next;
      i += 1;
    }
  } else if (!a.startsWith("--")) {
    loose.push(a);
  }
}

const company = loose[0];

if (!company) {
  console.error('! Give a company name, e.g. node _asset-tools/apply_link.mjs "Pentagram"');
  process.exit(1);
}

const role = opts.role;
const path = opts.path || "/";
const source = slugify(company);

if (!source) {
  console.error(`! "${company}" slugified to nothing usable. Try plain letters and numbers.`);
  process.exit(1);
}

const url = new URL(path.startsWith("/") ? path : `/${path}`, SITE);
url.searchParams.set("utm_source", source);
url.searchParams.set("utm_medium", "application");
if (role) url.searchParams.set("utm_campaign", slugify(role));

const date = new Date().toISOString().slice(0, 10);
const rows = load();

/* Re-minting for the same company and role returns the SAME link rather than a
   duplicate row — you might come back to this after sending the application,
   and a second link would split that studio's traffic across two sources. */
const existing = rows.find((r) => r.source === source && (r.role || "") === role);
if (existing) {
  console.log(`\n  Already minted ${existing.date}\n\n  ${existing.url}\n`);
  process.exit(0);
}

rows.push({ date, company, role, source, url: url.toString() });
writeFileSync(LEDGER, `${JSON.stringify(rows, null, 2)}\n`, "utf8");

console.log(`\n  ${company}${role ? ` · ${role}` : ""}\n\n  ${url.toString()}\n`);
console.log(`  Logged to ${LEDGER}`);
console.log(`  In Umami this shows up under UTM → source "${source}".\n`);
