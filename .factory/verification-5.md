# Independent verification 5 — PASS

**Candidate commit:** `82fe19d6d9973bd4474b93904919bc6174134d68`
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Verified:** 2026-08-29
**Verdict:** **PASS — acceptable for release.**

The checkout was clean and already at the requested commit before `npm ci`.
No product code was changed. This report and `.factory/handoff.md` are the
only verification changes.

## Required cold first-read test — PASS

A new 1440×900 Playwright context opened the live root with no prior browser
state. The visible first screen says:

- What it does: **“Sort local photos with large controls.”**
- Who it is for: **“For low-vision people and older family members who need a
  clear way to sort one photo folder.”**
- What to click: **“Try it with sample data.”** Its adjacent explanation says
  it opens three sample photos; the real-folder option is also visible.

The action opened `/demo`, with **“Demo — sample data, nothing is saved”**,
**Reset demo**, and **Start for real**. The sample catalog immediately showed
three realistic photos. The first-read and one-click isolated-demo gates pass.

## Required claim gate — PASS

Immediately after the clean install, every exact `test` entry in
`.factory/claims.json` was run separately. Each chose one Chromium test and
passed against the shipped demo entry point:

| Claim ID | Result |
| --- | --- |
| `demo-isolation` | PASS |
| `local-only` | PASS |
| `keyboard-workflow` | PASS |
| `csv-export` | PASS |
| `browser-persistence` | PASS |
| `pwa-install` | PASS |
| `offline-reload` | PASS |
| `backup-roundtrip` | PASS |
| `original-files-safe` | PASS |
| `accessible-display` | PASS |
| `filter-undo` | PASS |
| `folder-open` | PASS |
| `private-runtime` | PASS |
| `clear-data` | PASS |
| `browser-data-clear` | PASS |
| `free-use` | PASS |

The claim assertions cover demo isolation, no uploads, keyboard sorting,
complete CSV rows, persistence, install/offline behavior, metadata-only
backup, original-file safety, contrast/text/motion/mobile accessibility,
filter/undo, explicit folder selection, private runtime, deletion, browser
site-data deletion, and free use.

## Clean local quality gates — PASS

| Command | Result |
| --- | --- |
| `npm ci` | PASS — 178 packages installed; audit reported 0 vulnerabilities |
| `npm test` | PASS — 9 Vitest tests |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — `dist/` produced; release verifier passed |
| `npm run test:e2e` | PASS — 30 Chromium tests |

The exact production build measured 31,981 B initial JS (10.28 KB gzip) and
21,757 B CSS (5.41 KB gzip): below the 200 KB JS and 50 KB CSS budgets.

## Live end-to-end, accessibility, and privacy — PASS

`PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run
test:e2e` passed all 30 tests. This independently exercises normal and
boundary paths: keyboard keep/reject/tag/rename/CSV export; malformed JSON
backup recovery; filter/undo; direct demo and history navigation; persistence;
390px no-overflow; 44px targets; 200% text; dialog Escape; reduced motion;
route metadata/404; and offline reload.

A separate fresh 390px, reduced-motion live demo run completed keyboard
classification, tagging, queued naming, CSV download, controlled-worker
reload, and offline reload. It logged only the product origin's HTTP resources
and browser-local `blob:` URLs; no cookie was set; no page or console error
occurred; and an axe WCAG 2 A/AA, 2.1 AA, and 2.2 AA scan had **zero serious
or critical findings**. The checked focus outline is at least 3px; the suite
also verifies the screen-reader route heading focus and landmark structure.

## Headers, PWA, cache, and deployment identity — PASS

The live root returned 200 with HSTS, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, a restrictive permissions
policy, and CSP:

```text
default-src 'self'; ...; connect-src 'self'; ...; frame-ancestors 'none'; ...
```

HTML uses `public, must-revalidate, max-age=30`; the hashed app script uses
`public, max-age=31536000, immutable`; `sw.js` is `no-cache`; and the manifest
has a one-hour cache policy. The live manifest is standalone with 192px, 512px
and maskable icons. `registration.update()` left the active, controlling live
worker at `/sw.js` and cache `large-type-catalog-adec3203668b`; an offline demo
reload retained the route and offline banner.

Fresh-build and live SHA-256 values match exactly:

| File | SHA-256 |
| --- | --- |
| `assets/app-DvNzoS-S.js` | `c63e9d82526121cf23b889acf875b462f0c15a760fc9a1b5ce20c348c2cecb9a` |
| `assets/style-DPCX1h-2.css` | `5f9790a874094714b03bdc809367cbf6b0391f6a9f9b74021f96e3cd33f89984` |
| `sw.js` | `5e1dc09feb070cae723c45799da82b0d2c0a160384588ed494613b99c529b4f8` |
| `manifest.webmanifest` | `84f13b082d3f88ad562a96b47a6b0f450d46cc22e230422a49973631db85b0d5` |

This proves the live deployment is the requested candidate, not a prior
deployment-only failure.

A fresh Lighthouse 13.4.1 mobile audit recorded Performance 98,
Accessibility 100, Best Practices 100, SEO 100, FCP/LCP 1,999 ms, CLS 0,
TBT 14 ms, and 66,563 B transferred. Lighthouse emitted a browser-tab crash
message during post-report Chrome teardown, but had already written the valid
complete report; repeated Playwright loading and the full live suite had no
browser/page errors.

## Applicability and defects

This is static, local-first software. It exposes no product server endpoint,
sign-in flow, billing path, backend persistence boundary, package, or CLI;
therefore server 429/`Retry-After`, Entra tenant, concurrency, and clean
consumer-install checks are not applicable.

| Severity | Findings |
| --- | --- |
| P0 / release-blocking | None |
| P1 / major | None |
| P2 / minor | None |
| P3 / observation | Lighthouse's post-report browser teardown message only; no product runtime failure observed. |
