# Adversarial first-read review 4 — PASS

**Reviewed:** 2026-08-29
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Repository commit reviewed:** `0ef3a3b63bb206371256fc054e64ccdda9ae2cab`

## Verdict

**PASS.** There are zero blocking, major, or minor findings. The cold first
screen is understandable on phone and desktop; the one-click demo is visible,
isolated, and resettable; all registered claim commands pass from a clean
clone; and every finding from review rounds 1–3 remains fixed in both the live
site and the current source.

## Cold first screen

Fresh Chromium contexts, with no existing browser storage, opened `/` at
390×844 and 1440×900. Before scrolling, the answers were the same at both
sizes:

- **What it does:** “Sort local photos with large controls.”
- **For whom:** “For low-vision people and older family members who need a
  clear way to sort one photo folder.”
- **What to click first:** **Try it with sample data**. The adjacent copy says,
  “It opens three sample photos.”

All three answers, the three privacy/access facts, and the primary action fit
the initial 390px viewport. `scrollWidth` did not exceed `innerWidth`. The
large, poster-like observation-deck artwork, clipped rules, cream/navy/red
palette, and transit-sign type are visibly distinct from a generic SaaS
template and match `.factory/design.md`.

## Copy audit

Counts split on whitespace; hyphenated words and version values count as one.
Headings, labels, links, actions, and image alternatives are included because
they also need to make sense when encountered alone. There are no sentences
over 22 words, banned marketing terms, unexplained jargon, inconsistent core
terms, information-free headings, or non-result action buttons. No rewrite is
needed.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to catalog | 3 | Pass |
| Private photo sorter | 3 | Pass |
| Large Type Catalog | 3 | Pass |
| Demo / Privacy / Terms | 1 each | Pass: navigation |
| Local photo sorting | 3 | Pass |
| Sort local photos with large controls | 6 | Pass: job headline |
| For low-vision people and older family members who need a clear way to sort one photo folder. | 18 | Pass |
| Try it with sample data | 6 | Pass: result-naming action |
| Choose your photo folder | 4 | Pass: result-naming action |
| It opens three sample photos. | 5 | Pass: `demo-isolation` |
| Your folder opens only after you choose it. | 8 | Pass: `folder-open` |
| Photos and catalog data stay in this browser. | 8 | Pass: `local-only` |
| Works with a keyboard | 4 | Pass: `keyboard-workflow` |
| Works offline | 2 | Pass: `offline-reload` |
| Art-deco observation desk with blank photographs traveling along three sorting lanes | 11 | Pass: useful image alternative |
| How it works | 3 | Pass: section name |
| Sort a folder in three steps | 6 | Pass |
| Choose a folder. | 3 | Pass |
| Open photos after you choose a folder. | 7 | Pass: `folder-open` |
| Mark each photo. | 3 | Pass |
| Keep, review, or reject it. | 5 | Pass: `keyboard-workflow` |
| Export decisions. | 2 | Pass: `csv-export` |
| Save a CSV file when you finish. | 8 | Pass: `csv-export` |
| What this catalog does not do | 6 | Pass: section name |
| It does not upload, delete, move, or rename your original photos. | 11 | Pass: `local-only`, `original-files-safe` |
| Read the privacy details | 4 | Pass: result-naming link |
| Built by Param Factory · v1.1.2 · Original generated artwork | 8 | Pass: factual attribution; provenance is recorded in `design.md` |

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Large Type Catalog sorts photos for people who need large controls. | 11 | Pass |
| It is for low-vision people, older family members, and anyone who finds photo managers hard to read. | 17 | Pass |
| It never uploads, deletes, moves, or renames original photos. | 9 | Pass: `local-only`, `original-files-safe` |
| Open one photo folder after you choose it. | 8 | Pass: `folder-open` |
| Save photos and decisions in this browser. | 7 | Pass: `browser-persistence` |
| Your work remains after a refresh and can work offline. | 10 | Pass: `browser-persistence`, `offline-reload` |
| Use large buttons or keyboard shortcuts. | 6 | Pass: `accessible-display`, `keyboard-workflow` |
| Press K to keep, R to review, and X to reject. | 11 | Pass: `keyboard-workflow` |
| Use arrows to move, T for tags, and N for the export filename. | 13 | Pass: `keyboard-workflow` |
| Filter by decision, view nearby photos, and undo the last decision. | 11 | Pass: `filter-undo` |
| Export a CSV file with one row for each photo. | 10 | Pass: `csv-export` |
| Export a backup file with decisions, tags, notes, and filenames. | 10 | Pass: `backup-roundtrip` |
| It does not include photos. | 5 | Pass: `backup-roundtrip` |
| Open the same folder before restoring a backup. | 8 | Pass: `backup-roundtrip` |
| Choose three text sizes, high contrast, reduced motion, and keyboard controls. | 11 | Pass: `accessible-display` |
| After one online visit, install it like an app. | 9 | Pass: `pwa-install` |
| It can then reopen offline. | 5 | Pass: `offline-reload` |
| Select Try it with sample data to open three prepared family photos. | 12 | Pass: `demo-isolation` |
| Demo changes stay in separate browser storage. | 7 | Pass: `demo-isolation` |
| They never change your real catalog. | 6 | Pass: `demo-isolation` |
| Reset demo restores the samples. | 5 | Pass: `demo-isolation` |
| Start for real discards demo data. | 6 | Pass: `demo-isolation` |
| Photos and catalog data stay in this browser. | 8 | Pass: `local-only` |
| Clearing this browser's site data removes them. | 7 | Pass: `browser-data-clear` |
| See Privacy for the full data explanation. | 7 | Pass |
| Requires Node.js 20.19 or newer. | 5 | Pass: developer prerequisite |
| npm run build writes the static site to dist/. | 9 | Pass: developer instruction |
| Preview it with npm run preview. | 6 | Pass: developer instruction |
| Playwright is pinned to 1.58.2. | 5 | Pass: dependency fact |
| Browser tests cover keyboard sorting, CSV export, demo isolation, and offline reload. | 12 | Pass: test suite confirms this |
| They also check the 390px layout, high contrast, accessibility, and console errors. | 12 | Pass: test suite confirms this |
| Every public product claim appears in `.factory/claims.json` with one tagged browser test. | 13 | Pass: release unit test and this audit confirm it |
| This release is verified in Chromium. | 6 | Pass: stated test scope |
| Folder selection and formats such as HEIC depend on the browser. | 11 | Pass: useful limitation |
| Browser storage limits vary. | 4 | Pass: useful limitation |
| Open very large collections in smaller folders. | 7 | Pass: usable recovery advice |
| Original files remain safe if the browser clears site data. | 10 | Pass: `original-files-safe` |
| `.factory/brief.json` records product scope. | 4 | Pass: repository fact |
| `.factory/design.md` records the art-deco visual system and artwork provenance. | 9 | Pass: repository fact |
| `.factory/demo.md` documents the sample sandbox and storage boundary. | 8 | Pass: repository fact |
| `.factory/claims.json` maps each public promise to an observable test. | 9 | Pass: repository fact |
| `.factory/handoff.md` records verification and known gaps. | 6 | Pass: repository fact |
| LICENSE is MIT. | 3 | Pass: repository fact |
| No third-party fonts, analytics, runtime scripts, payment services, or cloud photo APIs are used. | 14 | Pass: `private-runtime` |

Headings such as **How it works**, **What this catalog does not do**, and
**Photo details** name their sections directly. The core terminology remains
consistent: folder, catalog, decision, export filename, backup, and demo.

## Demo and sandbox

**Try it with sample data** reached `/demo` in one click. A fresh 390×844
context immediately showed the persistent **Demo — sample data, nothing is
saved** banner, **Reset demo**, **Start for real**, the realistic coastal-train
sample, and `coastal-train.svg` without scrolling. Its image began at y=203
and its filename ended at y=517, within the 844px viewport. Desktop likewise
opened directly into the populated catalog.

The demo uses the separate `demo:large-type-catalog` IndexedDB database and
`demo:` local-storage keys. The registered isolation check seeds a real
catalog record with a blob, fingerprints its metadata and bytes, modifies and
resets demo data, chooses **Start for real**, and confirms the real record is
unchanged while the demo store is empty. Reset restored the ordered samples
coastal train, family picnic, then garden birthday. The direct `?demo=1` entry
also entered the sandbox.

A separate fresh live probe classified, tagged, exported, reset, and exited
the demo. It recorded 23 requests, all to
`https://accessible-photo-catalog.sociobot.in`, no cookies, and no page or
console errors. The browser test covers the same flow plus offline reload.

## Registered claims and local gates

A no-hardlink clean clone was made in `/tmp`, then `npm ci` completed with
zero vulnerabilities. Each exact command listed in `.factory/claims.json` was
run separately. All 17 selected one tagged test and passed:

| Claim IDs | Result |
| --- | --- |
| `demo-isolation`, `local-only`, `keyboard-workflow`, `csv-export` | Pass |
| `browser-persistence`, `preference-persistence`, `pwa-install`, `offline-reload` | Pass |
| `backup-roundtrip`, `original-files-safe`, `accessible-display`, `filter-undo` | Pass |
| `folder-open`, `private-runtime`, `clear-data`, `browser-data-clear`, `free-use` | Pass |

The clean clone also passed `npm test` (9 tests), `npm run typecheck`,
`npm run lint`, `npm run build`, and the full 32-test browser suite. The build
produced `dist/`; its initial app JavaScript was 32,382 B (10.42 kB gzip) and
its CSS was 23,881 B (5.76 kB gzip).

`PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run
test:e2e` also passed all 32 live Chromium tests. This includes the tagged
claim suite, phone first-read and demo viewport checks, keyboard workflow,
focus, reduced motion, 200% reflow, malformed-backup recovery, route metadata,
link checks, accessibility scans, and offline reload.

The landing and README claims above all map to an applicable registered claim.
Repository and development instructions are identified as such rather than
visitor-facing product promises. There are no unlisted product claims.

## History check

Every earlier finding was checked on the live product and in the current code,
not merely accepted from the closure notes.

| Earlier finding | Live and code confirmation |
| --- | --- |
| F-1-1 | Visible demo `h1` is focused after direct, hero, and Back navigation. |
| F-1-2 | Shared headers contain Home, Demo, Privacy, and Terms. |
| F-1-3 | The 404 skip link targets and focuses `main#main`. |
| F-1-4 | Landing has three workflow steps and the original-file boundary. |
| F-1-5 | Controls say Adjust display, View keyboard shortcuts, and Close display settings. |
| F-1-6 | README opening is two short plain sentences. |
| F-1-7 | README keyboard instructions are separated into short actions. |
| F-1-8 | Visitor copy says browser storage, not IndexedDB. |
| F-1-9 | “Semantic controls” is absent; shortcut copy is literal. |
| F-1-10 | README describes CSV and backup contents plainly. |
| F-1-11 | Visitor copy says install it like an app, not PWA. |
| F-1-12 | README describes demo isolation without namespace jargon. |
| F-1-13 | README test summary remains two short sentences. |
| F-1-14 | README limits verification to Chromium. |
| F-2-1 | Workspace truthfully says decisions save in this browser and export. |
| F-2-2 | Privacy names Adjust display then Clear saved catalog. |
| F-2-3 | Public storage boundary consistently says “this browser.” |
| F-2-4 | `folder-open` and nearby-navigation coverage are registered and passing. |
| F-2-5 | Hero says it opens three sample photos; no speed slogan remains. |
| F-2-6 | The fact says Works with a keyboard. |
| F-2-7 | Interface heading is Photo details; public sidecar jargon is absent. |
| F-2-8 | High contrast describes the actual near-black/light-text outcome. |
| F-2-9 | Filter state says No photos match this filter. |
| F-2-10 | Help action says Close keyboard shortcuts. |
| F-2-11 | Reset and reload preserve the coastal → family → garden order. |
| F-3-1 | 390px demo shows a sample image and filename before scrolling. |
| F-3-2 | Isolation test snapshots the real IndexedDB blob and metadata. |
| F-3-3 | `preference-persistence` is registered and reload-tested. |
| F-3-4 | `/offline.html` has the shared skeleton, metadata, focus, and `noindex`. |
| F-3-5 | The unprovable host-log retention statement is gone. |
| F-3-6 | The future-policy promise is gone; the dated current policy remains. |

## Structure, routes, and accessibility

`/`, `/demo`, `/privacy/`, `/terms/`, `/offline.html`, and `/404.html` all
returned 200. An unknown route returned the designed 404 document with HTTP
404. Every checked route has one `h1`, a `main` landmark, `lang="en"`, its
route-specific title, description, canonical, Open Graph/Twitter metadata,
favicon, consistent header/footer, Privacy and Terms links, and a skip link.
The offline page is intentionally `noindex`; the sitemap lists the indexable
routes. A crawl of every discovered internal anchor returned HTTP 200.

The live root response carries a self-only CSP, `frame-ancestors 'none'` as a
response header, `X-Content-Type-Options: nosniff`, a strict referrer policy,
and restrictive camera/geolocation/microphone permissions. No external
runtime resource loaded in the demo. The installed service worker, manifest,
and offline demo reload passed their claim tests. Axe scans under WCAG 2 A/AA,
2.1 AA, and 2.2 AA reported no serious or critical violations; the live suite
also checks visible focus, 44px phone targets, reduced motion, dialogs, and
200% text reflow.

No AI feature is missing. The brief's core job is deterministic, private local
photo sorting. Adding a photo-sending model feature would weaken the stated
privacy boundary without filling an implied missing step. CSV export and JSON
backup/import provide the relevant portability paths; cloud sync would expand
the product beyond the local-browser scope.

## What would make this perfect

No corrective product work is outstanding. Preserve the current checks when
changing copy, storage, service-worker behavior, or routes: rerun each tagged
claim from a clean clone and the live 390px demo/request probe so this PASS
does not regress.
