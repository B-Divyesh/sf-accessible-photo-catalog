# Polish 2 — full adversarial finding closure

**Base reviewed:** `fd82bc36846f6f6794b0e159e9686420d4580714`  
**Repair branch base:** `d501c37574ceadc3652290cb597aba7f887ad305`  
**Local visual evidence:** [`root-desktop.png`](evidence/polish-2/root-desktop.png), [`demo-mobile.png`](evidence/polish-2/demo-mobile.png)

Every finding in `review-1.md` and `review-2.md` was rechecked. The first
review's repairs remain in the product and are protected by the listed tests.
The second review's unresolved findings are repaired in this round.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the visible workspace `h1`, focused it after direct demo, linked demo, and Back navigation, and announced the route. | `demo exposes and focuses its route heading on direct, linked, and history navigation`; demo screenshot. |
| F-1-2 | Kept Demo, Privacy, and Terms in the shared header on app, legal, and 404 routes. | `shared header navigation and the 404 skip link work on every route`. |
| F-1-3 | Kept `#main` on the designed 404 page. | `shared header navigation and the 404 skip link work on every route`. |
| F-1-4 | Kept the landing page's three-step workflow and original-file boundary. | root screenshot; `@claim:local-only`; `@claim:original-files-safe`. |
| F-1-5 | Kept result-naming display and keyboard-help controls. | `completes a keyboard-only classify, tag, rename, and CSV export route`. |
| F-1-6 | Kept the README opening as short, plain sentences. | `README.md`; `.factory/copy-audit.md`. |
| F-1-7 | Kept the README keyboard guidance split into scan-friendly actions. | `README.md`; `@claim:keyboard-workflow`. |
| F-1-8 | Kept browser-storage outcomes in visitor README copy. | `README.md`; `@claim:browser-persistence`; `@claim:offline-reload`. |
| F-1-9 | Kept literal button and keyboard language in the README. | `README.md`; `@claim:keyboard-workflow`. |
| F-1-10 | Kept CSV/backup explanations in ordinary language. | `README.md`; `@claim:csv-export`; `@claim:backup-roundtrip`. |
| F-1-11 | Kept install/offline outcomes instead of visitor-facing PWA jargon. | `README.md`; `@claim:pwa-install`; `@claim:offline-reload`. |
| F-1-12 | Kept demo storage details out of visitor copy and in `demo.md`. | `README.md`; `demo.md`; `@claim:demo-isolation`. |
| F-1-13 | Kept the README browser-test summary as two short sentences. | `README.md`; `.factory/copy-audit.md`. |
| F-1-14 | Kept only the Chromium verification statement. | `README.md`; Chromium complete suite. |
| F-2-1 | Replaced the false export-only statement with truthful browser saving plus export inclusion. | `@claim:browser-persistence`; `@claim:original-files-safe`; demo screenshot. |
| F-2-2 | Updated Privacy to name **Adjust display** then **Clear saved catalog**. | `privacy gives the current path for clearing saved catalog data`; `@claim:clear-data`. |
| F-2-3 | Standardized public storage wording to “Photos and catalog data stay in this browser”; added and tested browser-site-data clearing. | `@claim:local-only`; `@claim:browser-data-clear`; root screenshot. |
| F-2-4 | Added `folder-open` with one isolated test, and expanded `filter-undo` to test nearby photo selection. | `@claim:folder-open`; `@claim:filter-undo`; `.factory/claims.json`. |
| F-2-5 | Replaced the unmeasured “at once” promise with “It opens three sample photos.” | `@claim:demo-isolation`; root screenshot. |
| F-2-6 | Replaced “Full keyboard route” with “Works with a keyboard.” | `@claim:keyboard-workflow`; root screenshot. |
| F-2-7 | Renamed “Sidecar details” to “Photo details” and removed sidecar wording from legal copy. | `completes a keyboard-only classify, tag, rename, and CSV export route`; route axe test. |
| F-2-8 | Replaced the palette metaphor with the high-contrast outcome. | `@claim:accessible-display`. |
| F-2-9 | Replaced the transit-metaphor filter heading with “No photos match this filter.” | `@claim:filter-undo`. |
| F-2-10 | Renamed the help close action to **Close keyboard shortcuts**. | `completes a keyboard-only classify, tag, rename, and CSV export route`. |
| F-2-11 | Applied one relative-path comparator to seeded and loaded demo photos, producing coastal → family → garden on reset, online reload, and offline reload. | `@claim:demo-isolation`. |

The independent local run completed all 16 claim commands, 30 Chromium browser
tests, unit/release tests, typecheck, lint, and production build. Deployment
and cold live checks are recorded in `handoff.md` after the work-order deploy.
