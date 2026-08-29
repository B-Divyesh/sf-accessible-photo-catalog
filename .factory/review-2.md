# Adversarial first-read review 2 — FAIL

**Reviewed:** 2026-08-29  
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>  
**Reviewed commit:** `64f43d504c515a60f1fdbfc7bae1b28a71dcbffb`

## Verdict

**FAIL.** The first screen is clear, the one-click sample is useful, every
registered claim test passes, and the previous review's findings are fixed.
The product still has one blocking honesty defect: it says decisions are
written only to an export while the classification code also saves them in
IndexedDB. There are also unregistered public claims, a stale data-deletion
instruction, metaphor and jargon in the interface, and a demo-order defect.
A PASS requires zero findings and no untested claims.

## Cold first screen

Fresh Chromium contexts opened the live root at 390×844 and 1440×900. I did
not scroll before answering:

- **What does it do?** It sorts photos from one local folder with large
  controls.
- **For whom?** The page says, “For low-vision people and older family members
  who need a clear way to sort one photo folder.”
- **What should I click first?** **Try it with sample data**. The adjacent copy
  says, “The sample opens at once.”

All three answers are present in the first viewport at both sizes. The three
facts are also visible, and neither viewport has horizontal overflow. This part
is not blocking.

## Copy audit

Counts treat hyphenated terms and version numbers as one word. Headings,
labels, links, and actions are included because they must also make sense out
of context. No item exceeds 22 words and no banned marketing adjective appears.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to catalog | 3 | Pass |
| Private photo sorter | 3 | Pass |
| Large Type Catalog | 3 | Pass |
| Demo | 1 | Pass: navigation |
| Privacy | 1 | Pass: navigation |
| Terms | 1 | Pass: navigation |
| Local photo sorting | 3 | Pass |
| Sort local photos with large controls | 6 | Pass |
| For low-vision people and older family members who need a clear way to sort one photo folder. | 18 | Pass |
| Try it with sample data | 6 | Pass |
| Choose your photo folder | 4 | Pass |
| The sample opens at once. | 5 | Flag: F-2-5 |
| Your folder opens only after you choose it. | 8 | Flag: F-2-4 |
| Stays on this device | 4 | Flag: F-2-3 |
| Full keyboard route | 3 | Flag: F-2-6 |
| Works offline | 2 | Pass: `offline-reload` |
| How it works | 3 | Pass |
| Sort a folder in three steps | 6 | Pass |
| Choose a folder. | 3 | Pass |
| Open photos from this device. | 5 | Flag: F-2-4 |
| Mark each photo. | 3 | Pass |
| Keep, review, or reject it. | 5 | Pass |
| Export decisions. | 2 | Pass: `csv-export` |
| Save a CSV file when you finish. | 8 | Pass: `csv-export` |
| Privacy | 1 | Pass: section label |
| What this catalog does not do | 6 | Pass |
| It does not upload, delete, move, or rename your original photos. | 11 | Pass: `local-only`, `original-files-safe` |
| Read the privacy details | 4 | Pass |
| Photos and catalog data stay in this browser. | 8 | Flag: F-2-3 |
| Built by Param Factory | 4 | Pass |
| Original generated artwork | 3 | Pass: provenance is recorded in `.factory/design.md` |

The visible landing actions are **Try it with sample data**, **Choose your
photo folder**, and **Read the privacy details**. They name their results. The
header items are navigation links, not action buttons.

### README

Code blocks are excluded; commands are not prose sentences.

| Copy unit | Words | Result |
| --- | ---: | --- |
| Large Type Catalog | 3 | Pass |
| Large Type Catalog sorts photos for people who need large controls. | 11 | Pass |
| It is for low-vision people, older family members, and anyone who finds photo managers hard to read. | 17 | Pass |
| It never uploads, deletes, moves, or renames original photos. | 9 | Pass: `local-only`, `original-files-safe` |
| Production | 1 | Pass |
| Demo | 1 | Pass |
| What it does | 3 | Pass |
| Open one photo folder from this device. | 7 | Flag: F-2-4 |
| Save photos and decisions in this browser. | 7 | Pass: `browser-persistence` |
| Your work remains after a refresh and can work offline. | 10 | Pass: `browser-persistence`, `offline-reload` |
| Use large buttons or keyboard shortcuts. | 6 | Pass: `keyboard-workflow`, `accessible-display` |
| Press K to keep, R to review, and X to reject. | 11 | Pass: `keyboard-workflow` |
| Use arrows to move, T for tags, and N for the export filename. | 13 | Pass: `keyboard-workflow` |
| Filter by decision, view nearby photos, and undo the last decision. | 11 | Flag: F-2-4 |
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
| Photos remain in the current browser profile. | 7 | Flag: F-2-3 |
| See Privacy for the full data explanation. | 7 | Pass |
| Develop and verify | 3 | Pass |
| Requires Node.js 20.19 or newer. | 5 | Pass: developer prerequisite |
| npm run build writes the static site to dist/. | 9 | Pass: developer instruction |
| Preview it with npm run preview. | 6 | Pass: developer instruction |
| Playwright is pinned to 1.58.2. | 5 | Pass: developer instruction |
| Browser tests cover keyboard sorting, CSV export, demo isolation, and offline reload. | 12 | Pass: verified below |
| They also check the 390px layout, high contrast, accessibility, and console errors. | 12 | Pass: verified below |
| Every public product claim appears in .factory/claims.json with one tagged browser test. | 13 | Flag: contradicted by F-2-4 |
| Run one with: | 3 | Pass |
| Browser notes | 2 | Pass |
| This release is verified in Chromium. | 6 | Pass: verified below |
| Folder selection and formats such as HEIC depend on the browser. | 11 | Pass: limitation, not a support promise |
| Browser storage limits vary. | 4 | Pass: limitation |
| Open very large collections in smaller folders. | 7 | Pass |
| Original files remain safe if the browser clears site data. | 10 | Pass: `original-files-safe` |
| Project notes | 2 | Pass |
| .factory/brief.json records product scope. | 4 | Pass |
| .factory/design.md records the art-deco visual system and artwork provenance. | 9 | Pass |
| .factory/demo.md documents the sample sandbox and storage boundary. | 8 | Pass |
| .factory/claims.json maps each public promise to an observable test. | 9 | Flag: contradicted by F-2-4 |
| .factory/handoff.md records verification and known gaps. | 6 | Pass |
| LICENSE is MIT. | 3 | Pass |
| No third-party fonts, analytics, runtime scripts, payment services, or cloud photo APIs are used. | 14 | Pass: `private-runtime` |

### Terminology and other interface copy

The intended terms are **photo**, **folder**, **catalog**, **decision**,
**export filename**, **backup**, and **demo**. Storage is not named consistently:
the public copy alternates among **device**, **browser**, and **browser profile**
(F-2-3).

Additional interface strings fail the same plain-word rules:

| Exact copy and location | Words | Result |
| --- | ---: | --- |
| Nothing is deleted or renamed. Decisions are written only to your export. — demo decision controls | 12 | Flag: F-2-1 |
| Display → Clear saved catalog removes browser copies and decisions. — Privacy, Your control | 8 | Flag: F-2-2 |
| Sidecar details — photo details panel | 2 | Flag: F-2-7 |
| Use the night platform palette — display dialog | 5 | Flag: F-2-8 |
| No photos at this stop — empty filter state | 5 | Flag: F-2-9 |
| Start sorting — keyboard-help close button | 2 | Flag: F-2-10 |

## Demo and sandbox

The demo entry is one click from the hero and `/demo` works directly. The first
screen already shows `family-picnic.svg`, “Photo 1 of 3,” Keep/Review/Reject,
tags, a note, and an export filename. The persistent banner and both **Reset
demo** and **Start for real** controls are present.

In a fresh context I placed `REAL-MARKER` in the normal `catalog-folder` key,
entered the demo, edited sample data, reloaded, reset, and checked storage.
Only `demo:catalog-folder` and `demo:large-type-catalog` were used for the
sample. The real marker remained unchanged. Reset restored the original note,
and Start for real is covered by the independent `demo-isolation` run.

The live request log contained only the product origin and browser-local
`blob:` image URLs. No catalog request left the origin. One reproducible demo
defect remains: immediately after reset, Photo 1 is `family-picnic.svg`; after
reload, Photo 1 becomes `coastal-train.svg` (F-2-11).

## Registered claims

I cloned commit `64f43d5` into a new temporary directory, ran `npm ci`, then ran
each exact command from `.factory/claims.json` separately. All 14 selected one
test and passed.

| Claim | Result | Observed evidence |
| --- | --- | --- |
| `demo-isolation` | Pass | Sample work stayed under demo keys; Reset and Start for real behaved as asserted. |
| `local-only` | Pass | Classify, tag, and CSV requests stayed same-origin. |
| `keyboard-workflow` | Pass | Keyboard-only classification, navigation, tags, and queued name completed. |
| `csv-export` | Pass | Download contained the header and three complete sample rows. |
| `browser-persistence` | Pass | A decision and note survived reload. |
| `pwa-install` | Pass | Manifest, icons, standalone display, and controlling service worker were present. |
| `offline-reload` | Pass | The populated demo reloaded offline. |
| `backup-roundtrip` | Pass | Photo-free JSON exported and restored metadata. |
| `original-files-safe` | Pass | Fixture SHA-256 did not change after import, classification, and queued rename. |
| `accessible-display` | Pass | 390px, largest text, high contrast, reduced motion, focus, and axe checks passed. |
| `filter-undo` | Pass | Decision filtering and Undo restored the previous state. |
| `private-runtime` | Pass | No account, payment gate, cookie, third-party resource, or cross-origin request appeared. |
| `clear-data` | Pass | Clear removed demo photo records and decisions. |
| `free-use` | Pass | The primary workflow and export completed without sign-in or payment. |

No registered claim test failed. F-2-4 lists public capability claims that have
no corresponding claim entry and therefore remain untested under the claims
contract.

## History check

I read `.factory/review-1.md`, `.factory/polish-1.md`, and the current handoff.
Each prior finding was checked on the live site and against the current source.

| Earlier finding | Status confirmed in round 2 |
| --- | --- |
| F-1-1 | Fixed: `/demo` has one visible “Sample photo catalog” h1; direct, linked, and Back navigation focus it. Source moves the shared `#page-title` into the workspace. |
| F-1-2 | Fixed: Demo, Privacy, and Terms are in the shared header on root, demo, legal, and 404 routes. |
| F-1-3 | Fixed: 404 `<main id="main">` receives the skip-link fragment; the live route test passes. |
| F-1-4 | Fixed: “How it works” and “What this catalog does not do” appear after the live preview. |
| F-1-5 | Fixed as written: buttons now read “Adjust display,” “View keyboard shortcuts,” and “Close display settings.” The stale Privacy instruction is a new F-2-2. |
| F-1-6 | Fixed: the README introduction is two plain sentences, 11 and 17 words. |
| F-1-7 | Fixed: the keyboard description is split into short action sentences. |
| F-1-8 | Fixed: visitor copy describes browser storage; IndexedDB is confined to technical/privacy documentation. |
| F-1-9 | Fixed: “semantic controls” is gone and shortcuts are split into readable sentences. |
| F-1-10 | Fixed in README: CSV contents and backup contents are explained without “sidecar” or “image bytes.” The remaining interface jargon is new F-2-7. |
| F-1-11 | Fixed: README says “install it like an app,” not “PWA.” |
| F-1-12 | Fixed: README explains separate demo storage without key-prefix jargon. |
| F-1-13 | Fixed: test coverage is split into two 12-word sentences. |
| F-1-14 | Fixed: the unsupported Firefox/Safari promise is gone; README states Chromium verification only. |

No earlier ID is reopened.

## Structure, accessibility, and identity

- `/`, `/demo`, `/privacy/`, `/terms/`, and `/404.html` returned 200. A new
  unknown URL returned the designed 404 page with HTTP 404 and a working way
  home.
- Every route has the required title pattern, one visible h1, `lang=en`, main
  landmark, description, canonical, OG/Twitter metadata, favicon, shared
  header, and footer. The 1200×630 social card and 180×180 touch icon have the
  declared dimensions.
- The sitemap lists all four public routes. The internal-link crawl and the
  live 27-test suite passed. Direct demo loading, Back, route focus, and the 404
  skip link passed.
- `/opt/fleet/lib/verify-url.sh` passed the root and demo with no console
  errors, missing alt text, or unlabeled buttons. The live axe checks reported
  no serious findings.
- The first-load app JavaScript is 31,869 bytes (10.28 kB gzip), below the
  product limit. `npm test`, typecheck, lint, and build pass; `dist/` is
  produced.
- The art-deco observation-deck composition, clipped geometry, cream/navy/red
  palette, and original poster/sample art are visibly distinct from a generic
  SaaS template. Reduced-motion and high-contrast behavior passed the live
  suite.

## Missed leverage

No AI feature is warranted. The job is deterministic local photo sorting, and
sending photos or descriptions to a model would add privacy and key-management
cost without completing a missing core step. CSV export and JSON backup/import
already provide the obvious portable-output path. Cloud sync would contradict
the stated local-only scope unless the product and privacy model were expanded.

## Findings

### F-2-1 — BLOCKING — The workspace gives a false account of where decisions are saved

**Exact quote/location:** Under the live demo classification controls:
“Nothing is deleted or renamed. Decisions are written only to your export.”

**Evidence:** `classify()` calls `savePhoto(photo)`, which writes every decision
to the active IndexedDB photo store. The `browser-persistence` claim also proves
that decisions survive reload. They are not written only to an export.

**Why this fails:** A visitor deciding whether to use a private photo tool can
reasonably read this as “my decisions are not stored in the browser.” The
sentence contradicts both implementation and the product's own persistence
copy.

**Concrete fix:** Replace it with: “Original photos are not deleted or renamed.
Your decisions are saved in this browser and included in exports.” Keep the
existing `browser-persistence` and `original-files-safe` tests attached to the
new statement.

### F-2-2 — Major — Privacy points to a control that no longer exists

**Exact quote/location:** `/privacy/`, **Your control**: “Display → Clear saved
catalog removes browser copies and decisions.” The actual button is **Adjust
display**.

**Why this fails:** The privacy page gives the wrong path to delete locally
stored photos and decisions. This is the most important recovery/control action
for a local photo catalog.

**Concrete fix:** Write: “In the catalog, choose **Adjust display**, then
**Clear saved catalog**.” Add a route test that starts from this instruction and
confirms those exact accessible names are present.

### F-2-3 — Major — Storage-boundary terms are inconsistent and one is imprecise

**Exact quotes/locations:** First-screen fact “Stays on this device”; landing
footer “Photos and catalog data stay in this browser”; README “Photos remain in
the current browser profile.”

**Why this fails:** “On this device” can imply the catalog is shared across
browsers, while “browser profile” is technical language for the intended
audience. The actual boundary is the current browser's storage.

**Concrete fix:** Use one phrase everywhere: “Photos and catalog data stay in
this browser.” In README, add “Clearing this browser's site data removes them”
where the limitation is explained.

### F-2-4 — Major — Public capabilities are absent from `claims.json`

**Exact quotes/locations:** Landing: “Your folder opens only after you choose
it” and “Open photos from this device.” README: “Open one photo folder from
this device” and “Filter by decision, view nearby photos, and undo the last
decision.”

**Why this fails:** `original-files-safe` happens to import a fixture and
`filter-undo` tests two parts of the latter sentence, but no registered claim
states and tests successful folder opening, user-initiated picker behavior, or
nearby-photo navigation. The README assertion that every public promise is
registered is therefore false.

**Concrete fix:** Add a `folder-open` claim whose one tagged test opens a
fixture folder only after the chooser action and confirms all supported sample
photos appear. Expand `filter-undo` to claim nearby-photo navigation and assert
that selecting a nearby thumbnail changes the current photo, or remove “view
nearby photos” from README.

### F-2-5 — Minor — “At once” is an unmeasured speed slogan

**Exact quote/location:** First-screen action note: “The sample opens at once.”

**Why this fails:** It does not tell the visitor what opens and makes a speed
promise without a threshold or claim test.

**Concrete fix:** Replace it with: “It opens three sample photos.”

### F-2-6 — Minor — “Full keyboard route” is factory jargon

**Exact quote/location:** First-screen fact: “Full keyboard route.”

**Why this fails:** “Route” is not the user's task and depends on the product's
transit metaphor. The fact should say what works.

**Concrete fix:** Replace it with: “Works with a keyboard.”

### F-2-7 — Minor — “Sidecar details” is unexplained technical jargon

**Exact quote/location:** Heading above tags, export filename, and note:
“Sidecar details.”

**Why this fails:** A first-time photo sorter cannot infer that “sidecar” means
information saved alongside exported photo decisions.

**Concrete fix:** Rename the heading to **Photo details**. On Privacy and Terms,
replace “sidecar” with “CSV file” or “exported catalog data.”

### F-2-8 — Minor — The contrast description is metaphor, not an outcome

**Exact quote/location:** Display dialog: “Use the night platform palette.”

**Why this fails:** It is brand lore and does not explain the visual change or
accessibility result.

**Concrete fix:** Replace it with: “Use light text on a near-black background.”

### F-2-9 — Minor — The empty-filter heading uses the transit metaphor

**Exact quote/location:** Filter empty state: “No photos at this stop.”

**Why this fails:** The heading does not name the empty condition. A screen
reader heading list gives no indication that a filter caused it.

**Concrete fix:** Replace it with: “No photos match this filter.” Keep the next
sentence, “Choose another decision filter to continue.”

### F-2-10 — Minor — The keyboard-help close button names an action it does not perform

**Exact quote/location:** Keyboard help dialog button: “Start sorting.”

**Why this fails:** Activating it only closes the dialog; it does not start a
new operation or move to a first photo.

**Concrete fix:** Rename it **Close keyboard shortcuts**.

### F-2-11 — Minor — The demo changes its photo order after reload

**Exact location/evidence:** After **Reset demo**, Photo 1 is
`family-picnic.svg`. Reloading `/demo` changes Photo 1 to `coastal-train.svg`.
`makeDemoPhotos()` seeds family/picnic first, while `loadPhotos()` sorts by
`relativePath`.

**Why this fails:** The same reset sample has two different orders. This makes
offline/reload demonstrations harder to follow and makes “Photo 1” unstable.

**Concrete fix:** Sort the seeded demo records with the same comparator before
the first render, or store an explicit stable order. Add a test that records all
three names after Reset and confirms the same sequence after online and offline
reloads.

## What would make this perfect

Correct the false decision-storage sentence first. Then repair the deletion
instruction, register the uncovered folder/nearby capabilities, use one precise
storage term, replace the remaining transit/technical copy with literal labels,
and keep the demo order stable across reload. Rerun all 14 claim commands from
a clean clone plus the live route, request-log, axe, mobile, and offline checks.
Only a zero-finding rerun should receive PASS.
