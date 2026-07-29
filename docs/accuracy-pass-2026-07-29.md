# Accuracy pass, 2026-07-29

Branch `fix/follow-accuracy`, off `origin/main` at `afde370`.

Every figure below is traceable to a command run in this session. Where a claim
could not be verified it was flagged, not edited. The CV was out of scope and
was not touched.

**Verification base.** The Follow repo was verified at `main` = `263e39a`
(worktree `wt-mergecheck`). A recursive diff against the public mirror clone
(`follow-public`, tracking `github.com/Rishabh117117/Follow`) showed no source
differences that affect any figure here, and both report 165 test files. So the
numbers describe what a visitor to the public repo actually gets.

---

## 1. Per file, what changed and why

### Commit `4025546` — dead source link

| File | Change | Why |
|---|---|---|
| `app/work/follow/page.tsx` | `github.com/Rishabh117117/workspace-platform` → `.../Follow`; link text `workspace-platform ↗` → `Follow ↗` | The old URL 404s. This is the demo tech-line under the sandbox. |
| `app/work/follow/McpConsole.tsx` | Same URL swap; text `source: workspace-platform ↗` → `source: Follow ↗` | The link labelled "source", the one the brief called out. |
| `lib/followMcp.ts` | Header-comment URL updated, with a note that the old URL 404s | Comment carried the dead URL. |
| `CLAUDE.md`, `docs/DECISIONS.md` | Prose name updated, historical name retained alongside | These are dated changelog entries. Rewriting them outright would falsify the record, so both names appear. |

### Commit `abcd27f` — Under the hood rewrite

| File | Change | Why |
|---|---|---|
| `app/work/follow/page.tsx` | `Stack` line rewritten to describe the monorepo; `Testing` line `≈2,100` → `≈1,350 … across 165 files as of July 2026`, plus Vitest named | The test figure was wrong by ~750. The stack line described a server and a sandbox for a repo that ships four clients. |

### Commit `6fc4db5` — About page

| File | Change | Why |
|---|---|---|
| `app/about/page.tsx` | Hardcoded four-link work list replaced with `FLAGSHIPS.map(...)` | Order had drifted from the home grid. Deriving it means the four surfaces cannot drift apart again. |
| `app/about/AboutPhotos.tsx` | Three `<img>` → `next/image` with `fill`; `MAIN_SIZES` / `SM_SIZES` added | Only images on the site bypassing `next/image`. |

### Outside the repo (Task 6)

| Target | Change |
|---|---|
| `Rishabh117117/Follow` | Description set; 15 topics added (was empty on both) |
| `Rishabh117117/git_test` | Archived (public, last touched 2022-12-21) |
| `Rishabh117117/odin-recipes` | Archived (public, last touched 2022-12-22) |

---

## 2. Task 2 verification table

**Method note.** The brief said to run `pnpm test`. It does not work: `turbo.json`
defines no `test` task, so the root script fails with
`Could not find task 'test' in project`. Tests were run per workspace with
`pnpm vitest run` in each of the four workspaces that declare a test script.
(`--reporter=basic` also had to be dropped: it was removed in vitest 4, which
three of the four workspaces use.)

| Claim on site | Command run | Output | Verdict |
|---|---|---|---|
| "≈2,100 automated tests" | `cd packages/api && pnpm vitest run` | `Test Files 91 passed (91)` / `Tests 834 passed (834)` | **Corrected** |
| | `cd apps/web && pnpm vitest run` | `Test Files 6 failed \| 55 passed (61)` / `Tests 13 failed \| 481 passed (494)` | |
| | `cd apps/gws-extension && pnpm vitest run` | `Test Files 9 passed (9)` / `Tests 38 passed (38)` | |
| | `cd apps/desktop-agent && pnpm vitest run` | `Test Files 4 passed (4)` / `Tests 27 passed (27)` | |
| | **totals** | **165 files, 1,393 tests, 1,380 passing** | now `≈1,350 … as of July 2026` |
| 165 test files | `find . -name '*.test.ts*' -o -name '*.spec.ts*' \| wc -l` | `165` in the mirror and `165` at main | **Confirmed** |
| Hono, JSON-RPC at /mcp | `grep -n '"hono"' packages/api/package.json` | `"hono": "^4.6.0"` | **Confirmed** |
| | `grep -rn "'/mcp'" packages/api/src` | `packages/api/src/app.ts:132: app.route('/mcp', mcpRoutes)` | |
| Five LLM roles, Editor flag-gated | `ls packages/api/src/services/pipeline/` | `reporter.ts analyst.ts editor.ts archivist.ts profiler.ts` all present | **Confirmed** |
| | `grep -rn "pipeline-editor-llm"` | `archivist.ts:492: if (!isServerFeatureActive('pipeline-editor-llm')) return`, plus `config/server-vault.ts:77` and `db/schema/semantic-index.ts:142` | |
| "Next.js sandbox client" | `ls apps` + per-app LOC count | `web` 258 files/47,430 LOC · `gws-extension` 77/13,887 · `extension` 55/8,449 · `mobile` 26/3,623 · `desktop-agent` 12/1,182 · `gws-addon` 5/787 | **Corrected** |
| deployed on Railway | `ls railway.json` | present at repo root | **Confirmed** |
| 12 MCP tools *(added)* | `cat packages/api/src/mcp/tools/index.ts` | `mcpTools` array has exactly 12 entries | **Confirmed** |
| Vitest *(added)* | `grep '"vitest"' packages/api/package.json apps/web/package.json` | `^4.0.18` in both | **Confirmed** |
| Turborepo + pnpm workspaces *(added)* | `grep '"turbo"' package.json`; `cat pnpm-workspace.yaml` | `"turbo": "^2.3.0"`; packages `apps/*`, `packages/*` | **Confirmed** |

### On the number chosen

Measured total is 1,393; passing is 1,380. The site says **≈1,350**, which is
below both, so it stays true whether tests are added or removed, and it carries
"as of July 2026". It also agrees with the Follow repo's own README, which
independently says `Vitest (~1,350 tests)`. Nothing rounds up.

The copy claims tests *exist*. It does not claim they all pass, because 13 do
not.

### On the stack line

Six apps is accurate as a count, but not all six are products. The rewrite names
the four substantial clients and calls mobile a "shell", which is the word the
repo's own README uses ("Expo mobile client shell"). `gws-addon` (5 files, an
Apps Script project) is left out rather than padding the list.

---

## 3. Sitewide claim audit

### External links

Every external URL in `app/`, `lib/`, `components/`, `public/`, deduplicated:

| URL | Status | Verdict |
|---|---|---|
| `https://github.com/Rishabh117117/Follow` | 200 | OK (this pass) |
| `https://github.com/Rishabh117117` | 200 | OK |
| `https://rishabhsalian.com` | 200 | OK |
| `https://www.linkedin.com/in/rishabh-salian117` | 999 | **Flagged, see below** |
| `https://github.com/Rishabh117117/workspace-platform` | 404 | Removed from the site this pass |
| `https://api.anthropic.com/v1/messages` | n/a | POST endpoint in `/api/ask`, not a user-facing link |
| `https://openrouter.ai/api/v1/chat/completions` | n/a | POST endpoint in `/api/ask`, not a user-facing link |

`mailto:` targets all resolve to `SOCIALS.email`, except `app/layout.tsx:81`,
which hardcodes the same address in the JSON-LD block instead of reading
`SOCIALS`. Same value today; noted under §5 as a drift risk, not changed.

### Hard numbers

| File:line | Claim | Source of truth | Verdict |
|---|---|---|---|
| `app/work/follow/page.tsx:720` | "12 tools" | `mcpTools` registry | Verified |
| `app/work/follow/page.tsx:733` | "≈1,350 … 165 files" | vitest run, this session | Verified |
| `app/work/follow/page.tsx:723` | "five LLM roles" | pipeline dir listing | Verified |
| `app/layout.tsx:52` | "four interactive, working prototypes" | 4 `/prototype` routes exist and build | Verified |
| `app/page.tsx:69` | "the four working demos in the grid" | same | Verified |
| `app/archive/page.tsx:16` | "seven product, UX and graphic-design projects" | `ARCHIVE.length === 7` | Verified |
| `components/Footer/Footer.tsx:34` | "all 11 projects + CV" | 4 flagships + 7 archive = 11 | Verified (and it is inside a deferred-feature comment, not visible copy) |
| `app/work/healthy-materials/page.tsx:120` | "around 37% of global energy-related CO₂ emissions" | Footnote 1 cites UNEP, *Global Status Report for Buildings and Construction* | Cited, consistent with the published figure |
| `lib/greenerHours.ts:35,37` | 945 TWh by 2030; 415 TWh in 2024 | `SCALE_SOURCE` cites IEA *Energy and AI* (Apr 2025) and Shehabi et al., LBNL (Dec 2024) | Cited, consistent |
| `app/work/follow/page.tsx:174,294` | "4 peers"; "4 teams · 12 participants" | Rishabh's own primary research | **Owner-attested, cannot verify** |
| `app/work/housing-works/Timeline.tsx:52` | "workshop · 6 participants" | his own field work | **Owner-attested** |
| `lib/housingWorks.ts:82` | "52 hybrid, 23 remote, 6 in person" | his own survey | **Owner-attested** |
| `app/work/housing-works/page.tsx:621` | "under $2,700 a year" | his own proposal costing | **Owner-attested** |
| `lib/projects.ts` | archive years "2019–23"; early art "2016"; ISDI "2021" | biography | **Owner-attested** |

Everything else carrying a digit is demo or mock data inside the four sandboxes
(`lib/hmPackages.ts`, `lib/hwWorkshops.ts`, `lib/followSandbox.ts`,
`lib/followDocs.ts`, the Greener Hours sim), or CSS/SVG geometry. The sandboxes
already carry on-product honesty strips labelling their figures illustrative, so
they are not factual claims. One that looks like a claim but is not:
`ArchiveReader.tsx:53`'s `-42%` is an IntersectionObserver `rootMargin`.

---

## 4. Date consistency report (no edits made)

| File:line | Exact current wording |
|---|---|
| `app/page.tsx:95` | `Brooklyn, NY · open to internships now · full-time from early 2027` |
| `app/page.tsx:197` | `I graduate this December: open to internships this fall, and Design Engineer & Product roles from early 2027.` |
| `app/about/page.tsx:376` | `<strong>Parsons</strong> MS · exp. Fall 2026` |
| `app/about/page.tsx:233` | SVG node label `Graduating` |
| `app/about/page.tsx:234` | SVG node sub-label `MS · Fall ’26` |
| `app/about/page.tsx:442` | `Brooklyn, NY. Open to fall internships now, to Design Engineer and Product roles from early 2027, and always to conversations about Follow.` |
| `app/about/page.tsx:118` | journey `aria-label`, ends `…and graduating in Fall 2026.` |
| `app/work/follow/page.tsx:62` | `Capstone · MS Strategic Design & Management, Parsons · Spring 2026` (project term, not a graduation date) |

**Findings.**

1. No page metadata, OG description, or JSON-LD block states a graduation or
   availability date. That layer cannot drift independently, because it says
   nothing. `app/layout.tsx:52` mentions the degree and city only.
2. The dates are not in conflict. "Fall 2026" and "this December" both land in
   December 2026, and "full-time from early 2027" follows from that. What varies
   is the *form*: the homepage says "this December", About says "Fall 2026". A
   reader who sees "Fall 2026" alone may read September. Worth aligning on one
   phrasing when the date is settled.
3. The availability phrasing has three variants for the same fact: "open to
   internships now", "open to internships this fall", "Open to fall internships
   now".
4. Both "graduating" statements are relative to today. "I graduate this
   December" silently becomes wrong on 1 Jan 2027; the About entry is
   absolute and does not.

Changed nothing here, per the brief.

---

## 5. Flagged, deliberately not changed

1. **LinkedIn URL returns 999.** That is LinkedIn's anti-bot status, not
   necessarily a dead link, but it means the URL cannot be confirmed
   automatically. Loading it in a logged-out browser redirects to a signup wall
   rather than the profile, so that does not confirm it either. It was verified
   in-browser on 2026-07-03. Given that a placeholder LinkedIn URL is one of the
   two bugs that prompted this brief, **worth Rishabh opening it once in a
   logged-out window** to confirm. Not edited.

2. **13 failing tests in the Follow repo** (`apps/web`, 6 files). All are
   assertions that read a component's own source as a string and check it
   contains a substring, e.g. `expected '…ItemsView…' to contain "it: 'conv'"`.
   They broke when the components were refactored. Different repo, so out of
   scope here, but the public repo currently has a red suite and recruiters can
   run it.

3. **Root `pnpm test` is broken in the Follow repo.** `turbo.json` has no `test`
   task. Anyone following the README's commands hits an error rather than a
   suite. One-line fix in that repo, not this one.

4. **`docs/ARCHITECTURE.md` in the Follow repo says "~1250 tests"** while its
   README and `CODEBASE-WALKTHROUGH.md` say ~1,350. Stale by roughly one
   sprint. Other repo.

5. **`app/layout.tsx:81` hardcodes the email** inside `PERSON_LD` instead of
   using `SOCIALS.email`, which every other call site reads. The values agree
   today. This is exactly the shape of the bugs this brief exists to catch, but
   fixing it was outside the four tasks.

6. **The lightbox image in `AboutPhotos.tsx`** still uses a plain `<img>` with an
   inline eslint-disable. It loads the `-lg` zoom variant on click. The brief
   scoped the conversion to the three cluster tiles, so it was left alone.

7. **Owner-attested research figures** (§3) cannot be verified from any repo.
   They are Rishabh's own field notes and were left untouched.

8. **`Follow` repo has no homepage URL set.** Pointing it at
   `rishabhsalian.com/work/follow` would close the loop for a recruiter who
   arrives at the repo first. Not done, because the brief authorized a
   description and topics only.

---

## 6. Gates

| Gate | Result |
|---|---|
| `npm run typecheck` | pass, exit 0 |
| `npm run build` | pass, exit 0, 27/27 routes; `/about` 5.24 kB, `/work/follow` 10.9 kB |
| `npm run lint` | pass, exit 0; warnings are the pre-existing `no-img-element` set in other components. `AboutPhotos.tsx` no longer appears among them. |
| Live check, `/work/follow` | Both repo links resolve to `/Follow`; the string `workspace-platform` and the string `2,100` are both absent from the DOM; no console errors |
| Live check, `/about` | Work list renders Follow, Healthy Materials, Housing Works, Greener Hours; all three tiles serve through `/_next/image`; `object-fit` and the object-position nudges intact |
