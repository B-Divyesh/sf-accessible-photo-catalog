# Adversarial first-read review 1 — FAIL

**Reviewed:** 2026-08-29  
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>  
**Reviewed commit:** `36fdefaf6c435b7e7b31199ac0183568344eb000`

## Verdict

**FAIL.** The main job is clear and the one-click demo and all registered
claims work. However, the demo route has no exposed page heading and does not
move keyboard focus on arrival or Back; the site skeleton is incomplete; the
404 skip link is broken; and public copy has plain-language and claim-registry
gaps. A PASS requires zero findings.

## Cold first screen

Fresh Chromium contexts were opened at 390×844 and 1440×1000 before scrolling.

- **What it does:** Sorts photos from one local folder, one large photo at a
  time.
- **Who it is for:** “For low-vision people and older family members who need
  a clear way to sort one photo folder.”
- **What to click first:** “Try it with sample data.” The adjacent note says,
  “The sample opens at once.”

All three answers are available from the first screen at both sizes. This is
not a first-screen blocking finding. The 390px capture had no horizontal
overflow and presented a distinct art-deco observation-deck visual system,
rather than a generic SaaS template.

## Demo and sandbox check

Selecting **Try it with sample data** opened `/demo` in one navigation. Its
first screen showed Photo 1 of 3, an actual family-picnic sample, decisions,
tags, notes, and sorting controls. The persistent banner read exactly “Demo —
sample data, nothing is saved” and provided **Reset demo** and **Start for
real**.

A fresh browser context created only IndexedDB database
`demo:large-type-catalog` and `demo:catalog-folder`; no real-catalog keys were
present. The reset/discard behavior passed the registered isolation test. The
request log for loading, classifying, tagging, and exporting the demo contained
only the product origin (and a browser-local `blob:` URL). This confirms the
observed demo flow did not persist to real storage or send catalog data away.

## Registered claims

Each command in `.factory/claims.json` was run independently against the live
site, with Playwright creating a fresh browser context for its test. All 11
passed.

| Claim id | Result | Observable evidence |
| --- | --- | --- |
| `demo-isolation` | Pass | Separate keys survive demo work; Reset restores samples; Start for real clears demo keys. |
| `local-only` | Pass | Classify, tag, and CSV export requests stayed same-origin. |
| `keyboard-workflow` | Pass | Keyboard classified, tagged, queued a filename, and navigated. |
| `csv-export` | Pass | Download had the header and three sample rows. |
| `browser-persistence` | Pass | Decision and note survived reload. |
| `pwa-install` | Pass | Manifest identity/icons and controlling service worker were observed. |
| `offline-reload` | Pass | Populated demo reloaded while the browser context was offline. |
| `backup-roundtrip` | Pass | Photo-free JSON exported, reset, and restored decisions. |
| `original-files-safe` | Pass | Fixture file SHA-256 was unchanged after sorting and queuing a name. |
| `accessible-display` | Pass | 390px, reduced motion, largest text, high contrast, focus, and axe check passed. |
| `filter-undo` | Pass | A decision filter worked and Undo restored the prior state. |

`npm test` passed 9/9 unit/release tests. `npm run build` produced `dist/` and
passed its release check. The local complete Playwright run reached all 16
tests without a reported test failure.

## History check

The repository has no earlier `.factory/review-*.md` or
`.factory/polish-*.md` files. I read the earlier handoff and both verification
records. They contain no numbered finding IDs to retest. The earlier claimed
repairs for the demo, claims, offline flow, mobile width, 404 response,
metadata, and service worker were checked live and are present as described.

## Structure and route check

`/`, `/demo`, `/privacy/`, `/terms/`, and `/404.html` returned 200. An unknown
route returned the designed 404 page with HTTP 404. Titles, descriptions,
canonical links, OG/Twitter images, favicon links, `lang=en`, one DOM `h1`,
`main`, footer legal links, CSP, and same-origin asset policy were observed.
All discovered internal links returned 200 (fragment links resolved at the
document level). The one exception is the broken skip-link target described in
F-1-3. The deployed `sitemap.xml` lists the four public routes.

No AI feature is missing: the brief describes a local sorting utility, and an
AI step would not improve its core job enough to justify sending photo data or
adding optional key setup. CSV and JSON export already cover the obvious
portable-output need. Sync would conflict with the stated local-first scope.

## Copy audit

### Landing page

All first-screen copy units, including controls and facts, are below. Counts
treat hyphenated words as one word. `Flag` means a finding is listed below.

| Copy unit | Words | Result |
| --- | ---: | --- |
| Private photo sorter | 3 | Pass |
| No folder open | 3 | Pass |
| Choose folder | 2 | Pass |
| Export CSV | 2 | Pass |
| Display | 1 | Flag: F-1-5 |
| Keys | 1 | Flag: F-1-5 |
| Local photo sorting | 3 | Pass |
| Sort local photos with large controls | 6 | Pass |
| For low-vision people and older family members who need a clear way to sort one photo folder. | 18 | Pass |
| Try it with sample data | 6 | Pass |
| Choose your photo folder | 4 | Pass |
| The sample opens at once. | 5 | Pass |
| Your folder opens only after you choose it. | 8 | Pass |
| Stays on this device | 4 | Pass; registered by `local-only` |
| Full keyboard route | 3 | Pass; registered by `keyboard-workflow` |
| Works offline | 2 | Pass; registered by `offline-reload` |
| Photos and catalog data stay in this browser. | 8 | Pass; registered by `local-only` |
| Demo | 1 | Pass |
| Privacy | 1 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated artwork | 3 | Pass |

### README

The audit includes every prose sentence and product-facing bullet. Commands,
URLs, headings, filenames, and section labels are not sentences.

| Sentence | Words | Result |
| --- | ---: | --- |
| Large Type Catalog is a free, local-first photo triage workspace for low-vision knowledge workers, older family members, and anyone who finds conventional photo managers too dense. | 26 | Flag: F-1-6 |
| It shows one large photo at a time and supports a complete keyboard route for Keep, Review, Reject, tags, notes, and a queued filename. | 24 | Flag: F-1-7 |
| It never uploads, deletes, moves, or renames the original photos. | 8 | Pass; registered by `local-only` and `original-files-safe` |
| Opens one local photo folder with the browser's directory picker. | 10 | Pass |
| Stores local copies and catalog decisions in IndexedDB so work survives a refresh and remains available offline. | 17 | Flag: F-1-8 |
| Sorts with large semantic controls or keyboard shortcuts: K Keep, R Review, X Reject, arrows to navigate, T for tags, and N for filename. | 24 | Flag: F-1-9 |
| Filters by decision, shows nearby photos, and provides an immediate Undo. | 10 | Pass; registered by `filter-undo` |
| Exports a spreadsheet-friendly CSV sidecar and a JSON metadata backup. | 9 | Flag: F-1-10 |
| Offers three text scales, a high-contrast theme, visible focus, live screen reader feedback, reduced-motion support, and a 390px mobile layout. | 20 | Pass; registered by `accessible-display` |
| Installs as a PWA after the first online visit and reloads offline. | 12 | Flag: F-1-11 |
| Select Try it with sample data to open three prepared family photos. | 12 | Pass; registered by `demo-isolation` |
| Demo changes use the separate demo: browser-storage namespace. | 8 | Flag: F-1-12 |
| Reset demo restores the samples. | 4 | Pass; registered by `demo-isolation` |
| Start for real discards demo data without reading or changing the real catalog. | 13 | Pass; registered by `demo-isolation` |
| Photos remain in the current browser profile. | 7 | Pass; registered by `local-only` |
| A JSON backup contains metadata, not image bytes; reopen the matching folder before importing it. | 14 | Flag: F-1-10 |
| See Privacy for the full data explanation. | 8 | Pass |
| Requires Node.js 20.19 or newer. | 5 | Pass: developer prerequisite |
| The exact production build command is npm run build. | 9 | Pass: developer instruction |
| It writes the static site to dist/, with dist/index.html at the deploy root. | 12 | Pass: developer instruction |
| Preview that output with npm run preview. | 6 | Pass: developer instruction |
| Playwright is pinned to 1.58.2. | 5 | Pass: developer instruction |
| The E2E suite covers the full keyboard route, CSV contents, default and high-contrast axe scans, a 390px viewport, console errors, demo isolation, PWA installation criteria, and an offline reload. | 29 | Flag: F-1-13 |
| Every public product claim is listed in .factory/claims.json with one tagged browser test. | 13 | Pass: developer instruction |
| Run one with npm run test:e2e -- --grep @claim:offline-reload. | 7 | Pass: developer instruction |
| Current Chromium, Firefox, and Safari are the target browsers. | 7 | Flag: F-1-14 |
| Directory picker presentation and support for formats such as HEIC depend on the browser. | 13 | Pass: limitation |
| Browser storage quotas also vary; very large collections may need to be opened in smaller folders. | 15 | Pass: limitation |
| Original files remain safe if the browser clears site data. | 9 | Pass; registered by `original-files-safe` |
| No third-party fonts, analytics, runtime scripts, payment services, or cloud photo APIs are used. | 11 | Pass; observed requests were same-origin and covered by `local-only` |

## Findings

### F-1-1 — BLOCKING — `/demo` has no exposed page heading and route focus stays on the body

**Location / evidence:** On the live `/demo` route, the only `h1` is “Sort
local photos with large controls,” but it is inside the hidden empty state and
has a 0×0 rendered rectangle. The visible first heading is `h2`, “Photo 1 of
3.” Direct navigation to `/demo` left `document.activeElement` on `BODY`; click
through from `/` and browser Back also left focus on `BODY`.

**Why this fails:** A keyboard or screen-reader visitor arrives at a populated
demo without a page-level name or announced route change. It violates the
required “one h1 = headline” and route-focus contract despite passing a DOM
count test.

**Concrete fix:** Render a visible, plain `h1` for the populated workspace,
for example “Sample photo catalog,” with “Photo 1 of 3” as an `h2`. On initial
`/demo` load and every history route change, move focus to that `h1` (or the
new `main` with a clear name) and announce it through the live region. Add a
Playwright test that asserts the `/demo` h1 is visible and focused after direct
load, after hero navigation, and after Back.

### F-1-2 — Major — Header omits the required site navigation

**Location / evidence:** At `/`, `/demo`, `/privacy/`, `/terms/`, and
`/404.html`, the header contains only the wordmark/home link. Demo, Privacy,
and Terms appear only in the footer. On the phone, those links require reaching
the bottom of the full landing screen.

**Why this fails:** The required consistent header navigation is absent. A
visitor seeking the demo or privacy terms cannot use the site header, and the
legal routes do not carry the same navigation skeleton as the product route.

**Concrete fix:** Add a compact, visible header `nav` on every route with
**Demo** and **Privacy** (and optionally **Terms**, within the four-link cap).
Keep the wordmark as Home and preserve 44px targets. Add route tests for the
header links and current-page state.

### F-1-3 — Major — The 404 skip link has no destination

**Location / evidence:** `404.html` renders `<a class="skip-link"
href="#main">Skip to main content</a>`, while its `<main>` has no `id="main"`.

**Why this fails:** Keyboard users activating the skip link stay at the top
instead of reaching the error explanation and recovery action.

**Concrete fix:** Add `id="main"` to the 404 `<main>` and test that activating
the skip link moves focus/location to it.

### F-1-4 — Major — The landing page lacks the required explanation sections

**Location / evidence:** The landing route goes from the first-screen preview
directly to the footer. It has no “How it works” section with three steps and
no plainly labelled section explaining what the product does not do.

**Why this fails:** The first screen says the product sorts photos, but a
visitor cannot confirm the workflow and original-file boundary without opening
a folder or finding the Privacy route. This misses the standard site skeleton.

**Concrete fix:** Add a concise “How it works” section: “1. Choose a folder.
2. Keep, review, or reject each photo. 3. Export your decisions.” Add a “What
this catalog does not do” section: “It does not upload, delete, move, or rename
your original photos.” Map the latter sentence to the existing registered
claims and ensure the section remains readable at 390px.

### F-1-5 — Minor — Three buttons do not name their result

**Location / evidence:** Landing header buttons read “Display” and “Keys”; the
settings dialog closes with “Done.”

**Why this fails:** These are labels or generic completion language, not
result-naming verbs. A first-time visitor cannot predict what “Keys” opens.

**Concrete fix:** Rename them to **Adjust display**, **View keyboard
shortcuts**, and **Save display settings** (or **Close display settings** if
nothing needs saving). Update accessible names and relevant keyboard tests.

### F-1-6 — Minor — README opening sentence is too long and uses unexplained jargon

**Location / evidence:** “Large Type Catalog is a free, local-first photo
triage workspace for low-vision knowledge workers, older family members, and
anyone who finds conventional photo managers too dense.” (26 words.)

**Why this fails:** “Local-first,” “triage,” “workspace,” and “dense” make the
opening harder to understand than the product itself.

**Concrete fix:** Replace it with: “Large Type Catalog sorts photos for people
who need large controls. It is for low-vision people, older family members, and
anyone who finds photo managers hard to read.”

### F-1-7 — Minor — README keyboard sentence exceeds the 22-word limit

**Location / evidence:** “It shows one large photo at a time and supports a
complete keyboard route for Keep, Review, Reject, tags, notes, and a queued
filename.” (24 words.)

**Why this fails:** It combines the view, decisions, notes, tags, and a new
term in one sentence.

**Concrete fix:** Replace it with: “It shows one photo at a time. Use the
keyboard to keep, review, or reject photos. Add tags, notes, and an export
filename.”

### F-1-8 — Minor — README names IndexedDB instead of the useful outcome

**Location / evidence:** “Stores local copies and catalog decisions in
IndexedDB so work survives a refresh and remains available offline.”

**Why this fails:** “IndexedDB” is browser implementation jargon for a
first-time photo sorter.

**Concrete fix:** Replace it with: “Saves your photos and decisions in this
browser. Your work is still here after a refresh and can work offline.”

### F-1-9 — Minor — README keyboard bullet is too long and says “semantic controls”

**Location / evidence:** “Sorts with large semantic controls or keyboard
shortcuts: K Keep, R Review, X Reject, arrows to navigate, T for tags, and N
for filename.” (24 words.)

**Why this fails:** “Semantic controls” is implementation language and the
shortcut list is difficult to scan as one sentence.

**Concrete fix:** Replace it with: “Use large buttons or keyboard shortcuts.
Press K to keep, R to review, and X to reject. Use arrows to move, T for tags,
and N for the export filename.”

### F-1-10 — Minor — README uses unexplained export jargon

**Location / evidence:** “Exports a spreadsheet-friendly CSV sidecar and a
JSON metadata backup.” Also: “A JSON backup contains metadata, not image
bytes; reopen the matching folder before importing it.”

**Why this fails:** “Sidecar,” “metadata,” and “image bytes” do not tell a
photo sorter what they receive or need to do.

**Concrete fix:** Replace with: “Export a CSV file with one row for each photo.
Export a backup file with your decisions, tags, notes, and filenames. It does
not include the photos. Open the same folder before restoring a backup.”

### F-1-11 — Minor — README says “PWA” rather than the visitor outcome

**Location / evidence:** “Installs as a PWA after the first online visit and
reloads offline.”

**Why this fails:** “PWA” is unexplained technical shorthand.

**Concrete fix:** Replace with: “After one online visit, you can install it
like an app. It can then reopen offline.”

### F-1-12 — Minor — README exposes storage-namespace implementation jargon

**Location / evidence:** “Demo changes use the separate `demo:`
browser-storage namespace.”

**Why this fails:** The visitor needs the privacy boundary, not the storage-key
syntax.

**Concrete fix:** Replace with: “Demo changes stay in separate browser storage.
They never change your real catalog.” Keep the exact key prefix in
`.factory/demo.md` for verifiers.

### F-1-13 — Minor — README test-summary sentence is over 22 words and overloaded

**Location / evidence:** “The E2E suite covers the full keyboard route, CSV
contents, default and high-contrast axe scans, a 390px viewport, console
errors, demo isolation, PWA installation criteria, and an offline reload.”
(29 words.)

**Why this fails:** The sentence makes the verification promise difficult to
read and mixes implementation terms with outcomes.

**Concrete fix:** Replace with: “The browser tests cover keyboard sorting, CSV
export, demo isolation, and offline reload. They also check the 390px layout,
high contrast, accessibility, and console errors.”

### F-1-14 — BLOCKING — README has an unlisted browser-support claim

**Location / evidence:** “Current Chromium, Firefox, and Safari are the target
browsers.” No claim in `.factory/claims.json` covers multi-browser behavior;
the configured project and completed tests use Chromium only.

**Why this fails:** This is a visitor-relevant compatibility claim without the
required registered, observable test. The `accessible-display` claim only
proves Chromium in this review.

**Concrete fix:** Either remove the sentence and state the verified browser
only, or add a `browser-support` claim with a clean-demo test matrix for the
supported engines and observable workflow criteria. Do not claim Safari support
unless that engine is actually run in CI.

## What would make this perfect

Keep the current clear first screen, isolated sample workflow, real sample
photos, local-only request behavior, keyboard route, exports, offline reload,
and art-deco visual identity. Add an exposed/focused workspace heading,
consistent header navigation, the missing landing explanation sections, the
404 target, and the copy/claim corrections above. Then rerun every registered
claim from fresh contexts plus tests for h1 visibility, focus restoration,
header navigation, the 404 skip link, and any retained multi-browser claim.
