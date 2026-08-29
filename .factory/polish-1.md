# Polish 1 — adversarial finding closure

**Reviewed candidate:** `36fdefaf6c435b7e7b31199ac0183568344eb000`
**Repair:** `12f7dbfee46043560402008ef3ffd3a508bff686`
**Live check:** <https://accessible-photo-catalog.sociobot.in/> — 2026-08-29

The live root and demo were opened cold after deployment. Root evidence:
[`screenshot-desktop.png`](evidence/polish-1/screenshot-desktop.png),
[`screenshot-mobile.png`](evidence/polish-1/screenshot-mobile.png), and
[`verify.json`](evidence/polish-1/verify.json). Demo evidence:
[`demo/screenshot-desktop.png`](evidence/polish-1/demo/screenshot-desktop.png)
and [`demo/verify.json`](evidence/polish-1/demo/verify.json).

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept exactly one h1 and move it into the populated workspace as visible **Sample photo catalog**. Direct `/demo`, hero navigation, and Back now focus it and announce the route. | `demo exposes and focuses its route heading on direct, linked, and history navigation`; live 18-test run; demo screenshot/verify JSON. |
| F-1-2 | Added Demo, Privacy, and Terms to the shared header on app, legal, and 404 routes, with current-page state. | `shared header navigation and the 404 skip link work on every route`; live 18-test run; root screenshot. |
| F-1-3 | Added `id="main"` to the 404 main landmark and tested activation of the skip link. | `shared header navigation and the 404 skip link work on every route`; live 18-test run. |
| F-1-4 | Added **How it works** with three concrete steps and **What this catalog does not do** with the original-file boundary. | `all routes have metadata, landmarks, one h1, alt text, and no serious axe findings`; live root screenshot; `@claim:local-only` and `@claim:original-files-safe`. |
| F-1-5 | Renamed controls to **Adjust display**, **View keyboard shortcuts**, and **Close display settings**. | `completes a keyboard-only classify, tag, rename, and CSV export route`; live 18-test run. |
| F-1-6 | Rewrote the README opening into two short, plain sentences. | README and `.factory/copy-audit.md`; live product copy remains covered by the live 18-test run. |
| F-1-7 | Split the README keyboard description into short action sentences. | README and `.factory/copy-audit.md`. |
| F-1-8 | Replaced the README IndexedDB wording with the browser-storage outcome. | README and `.factory/copy-audit.md`. |
| F-1-9 | Replaced “semantic controls” and the overloaded shortcut sentence with scan-friendly commands. | README and `@claim:keyboard-workflow` from the fresh clone. |
| F-1-10 | Replaced export implementation jargon with what each exported file contains and how to restore it. | README and `@claim:csv-export` plus `@claim:backup-roundtrip` from the fresh clone. |
| F-1-11 | Replaced “PWA” in visitor copy with the install-and-reopen outcome. | README and `@claim:pwa-install` plus `@claim:offline-reload` from the fresh clone. |
| F-1-12 | Replaced the README namespace syntax with the privacy boundary; retained exact namespace details only in `demo.md`. | README, `demo.md`, and `@claim:demo-isolation` from the fresh clone. |
| F-1-13 | Split the README test summary into two short sentences. | README and `.factory/copy-audit.md`. |
| F-1-14 | Removed the untested Chromium/Firefox/Safari compatibility promise. README now states only Chromium verification. | README; fresh-clone claim matrix; live 18-test Chromium run. |

All findings are closed. There are no deferred minor items.
