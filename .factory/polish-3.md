# Polish 3 — cumulative finding closure

**Reviewed candidate:** `f562208e40c37ac45dc18d6dd6bedd43f9be4def`

**Repair commit:** `be3a66d9fcd5d8eee09ccdaa26affc336b6ba378`

**Deployment:** `2319b363-4ec7-4d23-9362-d0a3995573b8`

**Live URL:** <https://accessible-photo-catalog.sociobot.in/>

**Cold live recheck:** 2026-08-29

Evidence shortcuts used below:

- **R:** [`live-root/first-screen-mobile.png`](evidence/polish-3/live-root/first-screen-mobile.png)
- **D:** [`live-demo/first-screen-mobile.png`](evidence/polish-3/live-demo/first-screen-mobile.png)
- **P:** [`live-privacy/screenshot-mobile.png`](evidence/polish-3/live-privacy/screenshot-mobile.png)
- **O:** [`live-offline/screenshot-mobile.png`](evidence/polish-3/live-offline/screenshot-mobile.png)
- **N:** [`live-404/screenshot-mobile.png`](evidence/polish-3/live-404/screenshot-mobile.png)

## Every cumulative finding

| Finding | Change made or retained | Evidence |
| --- | --- | --- |
| F-1-1 | Retained one visible workspace `h1`, route announcement, and focus after direct, linked, and history navigation. | `demo exposes and focuses its route heading on direct, linked, and history navigation`; **D**; live `/demo` passed. |
| F-1-2 | Retained Demo, Privacy, and Terms in every shared header. | `shared header navigation and skip links work on every static route`; **R**, **O**; all live routes passed. |
| F-1-3 | Retained `main#main` and working focus on the designed 404. | `shared header navigation and skip links work on every static route`; **N**; unknown live URL returned HTTP 404. |
| F-1-4 | Retained the three-step workflow and original-file boundary on the landing page. | `keeps the complete first-read content in the mobile first viewport`; **R**; live `/` passed. |
| F-1-5 | Retained **Adjust display**, **View keyboard shortcuts**, and **Close display settings**. | `completes a keyboard-only classify, tag, rename, and CSV export route`; **D**; live `/demo` passed. |
| F-1-6 | Retained the short plain-language README introduction. | `.factory/copy-audit.md`; **R**; live wording matched the documented product description. |
| F-1-7 | Retained the split, short keyboard instructions in README. | `@claim:keyboard-workflow`; **D**; live keyboard workflow passed. |
| F-1-8 | Retained outcome-focused browser-storage wording instead of implementation jargon. | `@claim:browser-persistence`; **P**; live reload persistence passed. |
| F-1-9 | Retained ordinary button and shortcut language. | `@claim:keyboard-workflow`; **D**; live keyboard workflow passed. |
| F-1-10 | Retained plain CSV and backup explanations. | `@claim:csv-export` and `@claim:backup-roundtrip`; **P**; both live exports passed. |
| F-1-11 | Retained “install it like an app” and offline outcome wording. | `@claim:pwa-install` and `@claim:offline-reload`; **R**; live service-worker checks passed. |
| F-1-12 | Retained plain demo-isolation wording; technical key names remain only in `demo.md`. | `@claim:demo-isolation`; **D**; live `/demo` and `/?demo=1` passed. |
| F-1-13 | Retained two short README test-summary sentences. | `.factory/copy-audit.md`; **R**; full clean-clone suite passed. |
| F-1-14 | Retained the Chromium-only verification statement; no unsupported browser claim remains. | 32-test Chromium suite; **R**; live suite passed. |
| F-2-1 | Retained the truthful statement that decisions are saved in this browser and included in exports. | `@claim:browser-persistence`; **D**; live reload restored the decision. |
| F-2-2 | Retained the exact Privacy deletion path: **Adjust display** then **Clear saved catalog**. | `privacy gives the current path for clearing saved catalog data`; **P**; live `/privacy/` passed. |
| F-2-3 | Retained one boundary phrase: “Photos and catalog data stay in this browser.” | `@claim:local-only`; **R**, **P**; live requests stayed same-origin. |
| F-2-4 | Retained registered folder opening and nearby-photo navigation coverage. | `@claim:folder-open` and `@claim:filter-undo`; **D**; live tests passed. |
| F-2-5 | Retained the measurable action note “It opens three sample photos.” | `@claim:demo-isolation`; **R**; live demo opened three records. |
| F-2-6 | Retained “Works with a keyboard.” | `@claim:keyboard-workflow`; **R**; live workflow passed. |
| F-2-7 | Retained **Photo details** and removed public “sidecar” wording. | `completes a keyboard-only classify, tag, rename, and CSV export route`; **D**; live UI passed. |
| F-2-8 | Retained the literal high-contrast explanation. | `@claim:accessible-display`; **D**; live high-contrast axe check passed. |
| F-2-9 | Retained “No photos match this filter.” | `@claim:filter-undo`; **D**; live empty-filter state passed. |
| F-2-10 | Retained **Close keyboard shortcuts**. | `completes a keyboard-only classify, tag, rename, and CSV export route`; **D**; live dialog test passed. |
| F-2-11 | Retained one comparator for coastal → family → garden across reset and reload. | `@claim:demo-isolation`; **D**; live online and offline order passed. |
| F-3-1 | Reordered the 390px workspace so the sample viewer comes before filters and secondary tools. The tools move below the viewer without duplication. | `shows a real sample photo and filename in the first 390px demo viewport`; **D**; live image y=203–487 and filename ended at y=517 in 844px. |
| F-3-2 | The isolation claim now seeds a valid real IndexedDB photo, fingerprints its metadata and blob bytes, edits/resets/exits demo, and proves the real record is unchanged and demo store empty. | `@claim:demo-isolation`; **D**; clean-clone and live claim runs passed. |
| F-3-3 | Added `preference-persistence`; it changes text size and contrast, reloads, checks the folder label, and permits only `demo:` keys. | `@claim:preference-persistence`; **P**; clean-clone and live claim runs passed. |
| F-3-4 | Rebuilt `/offline.html` with the shared header/footer, legal links, skip link, canonical, icons, social metadata, `noindex`, focus, and art-deco styles. It is now a Vite route and precached. | `all routes have metadata...`, `every shared navigation...`, and `shared header navigation...`; **O**; live `/offline.html` passed. |
| F-3-5 | Removed the unprovable retention statement. Privacy now says page requests reach the host while photos and catalog details do not. | `@claim:local-only` and `@claim:private-runtime`; **P**; live request origins were product-origin only. |
| F-3-6 | Deleted the future-policy promise and kept only the concrete last-updated date. | Route metadata/axe test; **P**; live `/privacy/` contains no future-change promise. |

## Verification

A no-hardlink clean clone at `be3a66d` ran `npm ci`, then every one of the 17
claim commands separately. Each command selected exactly one test and passed.
The same clone passed 9 unit/release tests, typecheck, lint, build, and all 32
browser tests. The live deployment then passed the same 32-test suite.

`verify-url.sh` passed root, demo, Privacy, offline, and 404 with zero console
errors. Integrated axe scans found no serious or critical WCAG A/AA findings.
Live Lighthouse scored 100 for Performance, Accessibility, Best Practices, and
SEO; LCP was 1.352 s, TBT 28 ms, CLS 0, and transfer was 97,455 bytes. Fresh
build and live SHA-256 values matched for HTML, app JS, CSS, service worker, and
manifest.

No finding from reviews 1, 2, or 3 remains open.
