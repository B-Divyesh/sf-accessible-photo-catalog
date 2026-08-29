# Adversarial first-read review 3 — FAIL

**Reviewed:** 2026-08-29  
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>  
**Reviewed commit:** `0e65fded3b9b853f9d4766622786360f63aa0e22`

## Verdict

**FAIL.** The cold landing page is clear, all 16 registered claim commands pass
from a clean clone, the full live suite passes, and every finding from reviews
1 and 2 remains fixed. The sample is still weak on the required phone viewport:
after one click, no sample photo, filename, tag, or note appears before the
first scroll. The claims suite also leaves the real IndexedDB store unprotected,
two privacy statements are unlisted or untestable, and the public offline page
does not use the required site structure. A PASS requires zero findings.

## Cold first screen

Fresh Chromium contexts opened the live root at 390×844 and 1440×900. I did
not scroll before recording these answers.

- **What does it do?** It sorts photos from one local folder with large
  controls.
- **For whom?** “For low-vision people and older family members who need a
  clear way to sort one photo folder.”
- **What should I click first?** **Try it with sample data**. The next sentence
  says, “It opens three sample photos.”

All three answers are present in the first viewport at both sizes. The phone
view has no horizontal overflow and also shows the privacy, keyboard, and
offline facts. This gate passes.

## Copy audit

Counts split on whitespace; hyphenated terms and version numbers count as one
word. Repeated navigation and footer text is grouped by identical wording.
Code blocks and bare URL values in the README are not sentences. Headings,
labels, and actions are included because they must make sense independently.

### Landing page

| Exact copy | Words | Check |
| --- | ---: | --- |
| Skip to catalog | 3 | Pass |
| Private photo sorter | 3 | Pass |
| Large Type Catalog | 3 | Pass |
| Demo | 1 | Pass: navigation |
| Privacy | 1 | Pass: navigation and section label |
| Terms | 1 | Pass: navigation |
| Local photo sorting | 3 | Pass |
| Sort local photos with large controls | 6 | Pass: job headline |
| For low-vision people and older family members who need a clear way to sort one photo folder. | 18 | Pass |
| Try it with sample data | 6 | Pass |
| Choose your photo folder | 4 | Pass |
| It opens three sample photos. | 5 | Pass: `demo-isolation` |
| Your folder opens only after you choose it. | 8 | Pass: `folder-open` |
| Photos and catalog data stay in this browser | 8 | Pass: `local-only`; repeated with punctuation in the footer |
| Works with a keyboard | 4 | Pass: `keyboard-workflow` |
| Works offline | 2 | Pass: `offline-reload` |
| Art-deco observation desk with blank photographs traveling along three sorting lanes | 11 | Pass: image alt text describes the original artwork |
| How it works | 3 | Pass |
| Sort a folder in three steps | 6 | Pass |
| Choose a folder. | 3 | Pass |
| Open photos after you choose a folder. | 7 | Pass: `folder-open` |
| Mark each photo. | 3 | Pass |
| Keep, review, or reject it. | 5 | Pass |
| Export decisions. | 2 | Pass: `csv-export` |
| Save a CSV file when you finish. | 8 | Pass: `csv-export` |
| What this catalog does not do | 6 | Pass |
| It does not upload, delete, move, or rename your original photos. | 11 | Pass: `local-only`, `original-files-safe` |
| Read the privacy details | 4 | Pass |
| Built by Param Factory · v1.1.1 · Original generated artwork | 8 | Pass: provenance is in `.factory/design.md` |

No landing sentence exceeds 22 words. There are no banned marketing words,
metaphor headings, inconsistent task terms, or non-result action buttons in
the cold landing state.

### README

| Exact copy | Words | Check |
| --- | ---: | --- |
| Large Type Catalog | 3 | Pass: document title |
| Large Type Catalog sorts photos for people who need large controls. | 11 | Pass |
| It is for low-vision people, older family members, and anyone who finds photo managers hard to read. | 17 | Pass |
| It never uploads, deletes, moves, or renames original photos. | 9 | Pass: `local-only`, `original-files-safe` |
| Production | 1 | Pass: URL label |
| Demo | 1 | Pass: URL label |
| What it does | 3 | Pass |
| Open one photo folder after you choose it. | 8 | Pass: `folder-open` |
| Save photos and decisions in this browser. | 7 | Pass: `local-only`, `browser-persistence` |
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
| They never change your real catalog. | 6 | Copy passes; automated coverage gap is F-3-2 |
| Reset demo restores the samples. | 5 | Pass: `demo-isolation` |
| Start for real discards demo data. | 6 | Pass: `demo-isolation` |
| Photos and catalog data stay in this browser. | 8 | Pass: `local-only` |
| Clearing this browser's site data removes them. | 7 | Pass: `browser-data-clear` |
| See Privacy for the full data explanation. | 7 | Pass |
| Develop and verify | 3 | Pass |
| Requires Node.js 20.19 or newer. | 5 | Pass: developer prerequisite |
| npm run build writes the static site to dist/. | 9 | Pass: developer instruction |
| Preview it with npm run preview. | 6 | Pass: developer instruction |
| Playwright is pinned to 1.58.2. | 5 | Pass: dependency fact |
| Browser tests cover keyboard sorting, CSV export, demo isolation, and offline reload. | 12 | Pass: verified below |
| They also check the 390px layout, high contrast, accessibility, and console errors. | 12 | Pass: verified below |
| Every public product claim appears in .factory/claims.json with one tagged browser test. | 13 | Flag: contradicted by F-3-3 and F-3-5 |
| Run one with: | 3 | Pass |
| Browser notes | 2 | Pass |
| This release is verified in Chromium. | 6 | Pass: verified below |
| Folder selection and formats such as HEIC depend on the browser. | 11 | Pass: limitation |
| Browser storage limits vary. | 4 | Pass: limitation |
| Open very large collections in smaller folders. | 7 | Pass: concrete recovery advice |
| Original files remain safe if the browser clears site data. | 10 | Pass: `original-files-safe` |
| Project notes | 2 | Pass |
| .factory/brief.json records product scope. | 4 | Pass |
| .factory/design.md records the art-deco visual system and artwork provenance. | 9 | Pass |
| .factory/demo.md documents the sample sandbox and storage boundary. | 8 | Pass |
| .factory/claims.json maps each public promise to an observable test. | 9 | Flag: contradicted by F-3-3 and F-3-5 |
| .factory/handoff.md records verification and known gaps. | 6 | Pass |
| LICENSE is MIT. | 3 | Pass: repository fact |
| No third-party fonts, analytics, runtime scripts, payment services, or cloud photo APIs are used. | 14 | Pass: `private-runtime` |

No README sentence exceeds 22 words or uses a banned marketing adjective. The
terminology is consistent: **folder** is the chosen directory, **catalog** is
the saved photo set, **decision** is Keep/Review/Reject/Unreviewed, **export
filename** is a queued name, **backup** is photo-free reusable data, and
**demo** is the isolated sample.

## Demo and sandbox

The hero action opens `/demo` in one click. The persistent banner reads
“Demo — sample data, nothing is saved,” followed by “Changes stay in a
separate demo catalog,” with **Reset demo** and **Start for real**.

At 1440×900, the first viewport shows the coastal-train sample, its Review
status, tags, and sorting controls. At 390×844, only the banner, header/actions,
“Sample photo catalog,” “Photo 1 of 3,” the filter, and the top of the decision
count appear. Measured without scrolling, the current image starts at y=942,
the filename at y=1325, tags at y=1810, and note at y=2253. F-3-1 records this
blocking phone-demo failure.

In an independent fresh context, I seeded `large-type-catalog` with a valid
real photo marker and set an unprefixed real folder marker. I then entered the
demo, classified a sample, reset it, and selected **Start for real**. The real
store still contained exactly one marker, the real folder label was unchanged,
the demo photo store contained zero rows, and no `demo:` localStorage keys
remained. Reset restored the three samples. The observed implementation is
isolated, but F-3-2 records that the registered test does not protect the real
photo store.

The same flow logged 31 requests, all to
`https://accessible-photo-catalog.sociobot.in`; no cross-origin request,
console error, or page error occurred. The registered offline test also passed
from a fresh context after the service worker controlled `/demo`.

## Registered claims

I cloned commit `0e65fde` with `--no-hardlinks` into a new temporary directory,
ran `npm ci`, and ran every exact `test` command from `.factory/claims.json`
separately. All 16 commands selected one test and passed.

| Claim id | Result | Observable check |
| --- | --- | --- |
| `demo-isolation` | Pass | Reset, stable sample order, separate preferences, offline reload, and Start for real completed. See F-3-2 for the real-IndexedDB assertion gap. |
| `local-only` | Pass | Classify, tag, and export requests stayed same-origin. |
| `keyboard-workflow` | Pass | Classification, tags, queued name, and navigation worked by keyboard. |
| `csv-export` | Pass | Download contained the header and three complete sample rows. |
| `browser-persistence` | Pass | Decision and note survived reload. |
| `pwa-install` | Pass | Manifest identity/icons and a controlling service worker were present. |
| `offline-reload` | Pass | The populated demo reloaded offline. |
| `backup-roundtrip` | Pass | Photo-free JSON exported and restored metadata. |
| `original-files-safe` | Pass | Fixture SHA-256 did not change after sorting and queueing a name. |
| `accessible-display` | Pass | 390px layout, largest text, high contrast, reduced motion, focus, and axe checks passed. |
| `filter-undo` | Pass | Nearby navigation, filtering, and Undo worked. |
| `folder-open` | Pass | The workspace stayed closed until a fixture folder was chosen, then showed both photos. |
| `private-runtime` | Pass | No account, payment gate, cookies, third-party resources, or cross-origin requests appeared. |
| `clear-data` | Pass | Clear saved catalog emptied the active demo photo store. |
| `browser-data-clear` | Pass | Browser site-data clearing removed the demo store and preferences. |
| `free-use` | Pass | The main flow and export completed without sign-in or payment. |

The exact commands passed, so there is no failing registered-claim test.
F-3-3 and F-3-5 identify public privacy claims with no claim entry, and F-3-2
identifies a material assertion missing from the listed isolation test.

## History check

I read `review-1.md`, `review-2.md`, `polish-1.md`, `polish-2.md`, and the
current handoff. Each earlier finding was checked against the live site and
current source. No earlier ID is reopened.

| Earlier finding | Live and code confirmation |
| --- | --- |
| F-1-1 | Fixed: `/demo` exposes and focuses the visible “Sample photo catalog” h1 on direct, linked, and Back navigation; the live route test passed. |
| F-1-2 | Fixed: Demo, Privacy, and Terms remain in the shared header on the root, demo, legal, and 404 routes. |
| F-1-3 | Fixed: the 404 skip link targets `main#main`; keyboard activation passed live. |
| F-1-4 | Fixed: “How it works” and “What this catalog does not do” remain on the landing page. |
| F-1-5 | Fixed: controls read “Adjust display,” “View keyboard shortcuts,” and “Close display settings.” |
| F-1-6 | Fixed: the README opening remains two short, plain sentences. |
| F-1-7 | Fixed: the README keyboard description remains split into short actions. |
| F-1-8 | Fixed: README visitor copy describes browser storage rather than IndexedDB. |
| F-1-9 | Fixed: “semantic controls” is absent; shortcut sentences remain readable. |
| F-1-10 | Fixed: README export copy states what CSV and backup files contain. |
| F-1-11 | Fixed: README says “install it like an app,” not “PWA.” |
| F-1-12 | Fixed: README does not expose the `demo:` namespace syntax. |
| F-1-13 | Fixed: the test summary remains two 12-word sentences. |
| F-1-14 | Fixed: README claims Chromium verification only; no Firefox/Safari promise remains. |
| F-2-1 | Fixed: the workspace says decisions are saved in this browser and included in exports; `savePhoto` matches it. |
| F-2-2 | Fixed: Privacy names “Adjust display,” then “Clear saved catalog”; the live route test passed. |
| F-2-3 | Fixed: public storage-boundary copy consistently says photos and catalog data stay in this browser. |
| F-2-4 | Fixed: `folder-open` is registered, and `filter-undo` tests nearby-photo navigation. |
| F-2-5 | Fixed: the hero says “It opens three sample photos”; “at once” is absent. |
| F-2-6 | Fixed: the fact says “Works with a keyboard”; “Full keyboard route” is absent. |
| F-2-7 | Fixed: “Photo details” replaces “Sidecar details”; “sidecar” is absent from public copy. |
| F-2-8 | Fixed: high contrast is explained as light text on a near-black background. |
| F-2-9 | Fixed: the empty state says “No photos match this filter.” |
| F-2-10 | Fixed: the help action says “Close keyboard shortcuts.” |
| F-2-11 | Fixed: reset, online reload, and offline reload preserve coastal → family → garden order. |

## Structure, accessibility, links, and identity

- `/`, `/demo`, `/privacy/`, `/terms/`, and `/404.html` return 200. A new
  unknown path returns the designed 404 with HTTP 404.
- Those five checked routes have the required title pattern, description,
  canonical, OG/Twitter data, favicon, `lang=en`, one h1, main landmark, shared
  header/footer, and legal navigation. F-3-4 covers the omitted `/offline.html`
  route.
- Every anchor discovered on those routes resolved with HTTP 200. There are no
  external links. The sitemap lists root, demo, privacy, and terms.
- Direct demo loading, browser Back, route-heading focus, and the 404 skip link
  passed the live suite.
- `/opt/fleet/lib/verify-url.sh` passed root and demo with one h1, `lang`, main,
  alt text, labelled buttons, and no console errors. The Playwright axe scans
  for WCAG 2 A/AA, 2.1 AA, and 2.2 AA reported no serious or critical findings.
- The live 30-test Chromium suite passed. It also checks 390px overflow, 200%
  text reflow, 44px targets, reduced motion, dialogs, and invalid-backup errors.
- The live response carries a self-only CSP, HSTS, `nosniff`, strict referrer
  policy, and restricted camera/geolocation/microphone permissions.
- The art-deco poster composition, clipped borders, cream/navy/signal palette,
  and original observation-deck/sample artwork are visibly product-specific,
  not a generic centered SaaS hero with feature cards or gradient blobs.

Clean-clone `npm test` passed 9 tests; typecheck, lint, and build passed. The
build produced `dist/`, with 31,981 bytes of initial JavaScript (10.28 KB gzip)
and 21,757 bytes of CSS (5.41 KB gzip).

## Missed leverage

No AI feature is warranted for the brief's deterministic, private photo
sorting job. Sending photos or descriptions to a model would add a privacy and
key-management cost without filling a required step. CSV export and JSON
backup/import already cover portable output. Cloud sync would change the stated
local-browser storage boundary. No missed-leverage finding is raised.

## Findings

### F-3-1 — BLOCKING — The phone demo does not show realistic sample data before scrolling

**Exact location/evidence:** Live `/demo`, fresh 390×844 context after selecting
**Try it with sample data**. The viewport ends at the decision-count row. The
sample image starts at y=942, `coastal-train.svg` at y=1325, its tags at y=1810,
and its note at y=2253. The only sample indicators before scrolling are
“3 photos · 1 left,” “Sample photo catalog,” and “Photo 1 of 3.”

**Why this fails:** The required first screen after the one-click action must
already show the product being used with realistic sample data. A phone visitor
sees setup chrome and generic counts, not a photo or any realistic family-photo
detail. The desktop demo passes, but the required 390px path does not.

**Concrete fix:** On the populated 390px demo, keep the persistent demo banner
but compact the masthead and catalog actions so the current sample image and
its filename appear within the first 844 CSS pixels. Move secondary actions
below the viewer or into a labelled disclosure. Add a Playwright assertion that
the current image and a realistic sample identifier intersect the initial
390×844 viewport without scrolling.

### F-3-2 — Major — The isolation claim test never protects the real IndexedDB photo store

**Exact location/evidence:** `.factory/claims.json`, `demo-isolation`, claims
that sample work uses separate storage and the sandbox says to confirm real
keys remain separate. `tests/e2e/claims.spec.ts` seeds only
`localStorage['catalog-folder'] = 'real-family-archive'`. It never inserts a
record into `large-type-catalog` or asserts that record survives demo edits,
Reset, and **Start for real**.

**Why this fails:** IndexedDB is where real photos and decisions live. If demo
mode accidentally pointed at the real database, the registered claim test
could clear or overwrite real catalog records and still pass. The independent
manual probe confirmed the current code behaves correctly, but the required
claim remains incompletely tested.

**Concrete fix:** Seed a valid marker photo in `large-type-catalog`, record the
store contents, exercise demo classification, Reset, and **Start for real**,
then assert the real store is byte-for-byte unchanged. Also assert the demo
store is empty after leaving demo mode. Keep the existing localStorage marker
assertions.

### F-3-3 — Major — Privacy makes an unlisted storage-persistence claim

**Exact quote/location:** `/privacy/`, **What is stored**: “Local storage holds
your display preferences and folder label.” No `.factory/claims.json` entry
states or tests this behavior.

**Why this fails:** This is a data-storage statement a privacy-conscious user
can rely on. `accessible-display` changes settings but does not reload and
prove persistence; `demo-isolation` resets preferences but does not register
this public claim.

**Concrete fix:** Add a `preference-persistence` claim and one tagged demo test
that changes text size and contrast, records the demo folder label, reloads,
and confirms all three values. Confirm that only `demo:` keys are used in the
sandbox. Alternatively remove the sentence.

### F-3-4 — Major — The public offline route lacks the shared site structure and metadata

**Exact location/evidence:** Live `/offline.html` returns 200 with title
“Offline — Large Type Catalog,” but its body contains only `<main>`. It has no
skip link, wordmark/header navigation, footer, Privacy or Terms links,
canonical, Open Graph/Twitter data, or favicon. It is not marked `noindex` and
is absent from the sitemap and route tests.

**Why this fails:** This is a reachable product route and the page most likely
to be seen during a failed offline first visit. It breaks the required
consistent header/footer and metadata skeleton and gives a privacy-seeking
visitor no legal route while disconnected.

**Concrete fix:** Give `/offline.html` the shared wordmark/header and footer
with Privacy and Terms, a skip link, canonical, favicon, and product-derived
OG/Twitter data. If it should not appear in search, add `noindex` and keep it
out of the sitemap. Add it to the metadata, axe, focus, and link-crawl route
matrix.

### F-3-5 — Major — Privacy makes an unlisted and unverified log-retention claim

**Exact quote/location:** `/privacy/`, **What leaves your device**: “The host
may keep short-lived access logs needed to deliver the app. These logs can
include an IP address, requested page, and time.” No claim entry or test covers
the “short-lived” retention boundary or the stated contents.

**Why this fails:** Log retention is a privacy fact a visitor may use to decide
whether to open private photos. The browser request log can prove that catalog
data is not sent, but it cannot prove how long the host retains access logs.

**Concrete fix:** Remove “short-lived” unless deployment policy supplies a
specific duration and a testable retention control. A plain replacement is:
“Loading this site sends standard page requests to the host. Your photos and
catalog details are not included.” Map the second sentence to `local-only` and
add an infrastructure-backed claim only if a retention period is published.

### F-3-6 — Minor — Privacy includes an untestable future-policy promise

**Exact quote/location:** `/privacy/`, **Contact and changes**: “Material
privacy changes will be dated on this page.” It has no claims entry and cannot
be proved in the demo sandbox.

**Why this fails:** The sentence promises future editorial behavior rather
than giving the visitor a current, verifiable fact.

**Concrete fix:** Delete the sentence. Keep the concrete “Last updated” date,
which already tells the visitor when the current policy changed.

## What would make this perfect

Bring a real sample photo and filename into the initial 390×844 demo viewport.
Protect the real IndexedDB store in the automated demo-isolation claim, add or
remove the unlisted privacy storage statement, replace the unverified log and
future-change promises, and bring `/offline.html` into the shared route
skeleton and test matrix. Then rerun every registered claim individually from
a clean clone, the complete live suite, the no-scroll phone demo assertion,
the request/storage probe, and a crawl that includes the offline route. A PASS
requires that rerun to produce zero findings.
