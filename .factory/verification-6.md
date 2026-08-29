# Independent verification 6 — PASS

**Candidate commit:** `6e2e56119ccdfd5412654fbb995641f045232e24`
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Verified:** 2026-08-29
**Verdict:** **PASS — acceptable for release.**

The checkout was clean at the requested commit before `npm ci`. No product code was changed during verification.

## Required first-read and demo gates — PASS

A fresh 1440×900 browser context opened the live root with no prior state. The first screen says what it does, **“Sort local photos with large controls”**; for whom, **“For low-vision people and older family members who need a clear way to sort one photo folder”**; and what to click first, **“Try it with sample data”**. Its adjacent sentence says it opens three sample photos.

That action opens `/demo` in one click. It immediately presents three sample photos and the persistent **“Demo — sample data, nothing is saved”** banner, with **Reset demo** and **Start for real**. The plain-words and isolated-demo gates pass.

## Required claim gate — PASS

`.factory/claims.json` exists and contains 17 claims. From the clean checkout, every exact command in its `test` field was run separately using the local demo entry point; each selected one Chromium test and passed. Complete local and live 32-test runs then passed the same tagged tests again.

| Claim ID | Result |
| --- | --- |
| `demo-isolation` | PASS |
| `local-only` | PASS |
| `keyboard-workflow` | PASS |
| `csv-export` | PASS |
| `browser-persistence` | PASS |
| `preference-persistence` | PASS |
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

The live landing page and README claims were cross-checked against this registry. The local-storage, offline, keyboard, CSV, backup, original-file safety, accessibility, demo, and free-use promises all have registered observable tests.

## Clean local quality gates — PASS

| Command | Result |
| --- | --- |
| `npm ci` | PASS — 178 packages installed; audit reported 0 vulnerabilities |
| `npm test` | PASS — 9 tests |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — produced `dist/` and ran the release verifier |
| `npm run test:e2e` | PASS — 32 Chromium tests in 1.2 minutes |
| `PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e` | PASS — 32 Chromium tests |

The initial application JavaScript is 32,382 B uncompressed / 10,406 B gzip; the CSS is 23,881 B uncompressed / 5,778 B gzip. Both are within the applicable 200 KB JS and 50 KB CSS budgets.

## Independent live exercise — PASS

A separate fresh 390×844 reduced-motion context used `/demo` with keyboard only to classify, tag, queue a filename, and reload offline. It found a 3px visible focus outline, no horizontal overflow (`scrollWidth` = `innerWidth` = 390), a `0s` progress transition under reduced motion, zero cookies, no page or console errors, and only the product origin in the complete request log. An axe scan for WCAG 2 A/AA, 2.1 AA, and 2.2 AA found zero serious or critical violations.

The complete browser suites also exercise malformed backup recovery, dialog Escape, 200% text reflow, 44px mobile targets, route/back navigation, link crawling, complete CSV export, persistence, filters/Undo, and folder selection. The generic `verify-url.sh` named in the attached checklist is not present in this repository; its checks are covered by the live route suite plus the independent semantic, console, request, and axe probes.

## PWA, privacy, headers, performance, and deployment identity — PASS

The live app has a controlling `/sw.js` worker. `registration.update()` retained an active controller and cache `large-type-catalog-dd75c46bf7b2`; a populated demo subsequently reloaded offline with its offline banner and sample data. The standalone manifest declares 192px, 512px, and maskable icons. The live response has a same-origin-only CSP (`connect-src 'self'`), HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive permissions policy. HTML is short-cached; hashed JS/CSS are immutable for one year; `sw.js` is `no-cache`; the manifest has a one-hour cache policy.

Lighthouse 13.4.1 completed a valid mobile report: Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.0 s, LCP 1.3 s, CLS 0, TBT 170 ms, and 95 KiB transferred. It printed a post-report Chromium tab-crash message, but the report was written and independent Playwright checks showed no browser/page error.

Fresh-build and live SHA-256 values match exactly:

| File | SHA-256 |
| --- | --- |
| `index.html` | `1cad12fea4ae32304df943814a2bb4557fc37721fce78063a4f4ea2af5055b11` |
| `assets/app-BT28aSgS.js` | `bf5d2dbcdd3f9a570beba2b94494fc82eb41d44f854c2e2905e9aaf423de4d0a` |
| `assets/style-DwR0pz8P.js` | `78d3d64878827a04b2d755f7ac422d3d38fa076fbe7320eb81547aa0bcef33c1` |
| `assets/style-BigBNpHn.css` | `addaa8422e87263eb6236ac238f9d2496663205b57d866e034fa8e5edae132ce` |
| `sw.js` | `7106525dd4b2d9beaf307db66ae14c60661c786a89082c2eb4f27e73f5ca6c1a` |
| `manifest.webmanifest` | `84833693c3e3f40002eb918c6bebd4f85b2875b4fb7612b8cb728d6536a1ba57` |

This freshly proves the live deployment matches candidate `6e2e561`, including the assets and service worker; no deployment-only failure was reproduced.

## Applicability and findings

This is a static, local-first PWA. It exposes no product server endpoint, sign-in, billing, API allowance, package, or CLI. Rate-limit/429, `Retry-After`, Entra tenant, backend concurrency/persistence, and clean consumer-install checks are not applicable.

| Severity | Findings |
| --- | --- |
| P0 / release-blocking | None |
| P1 / major | None |
| P2 / minor | None |
| P3 / observation | Lighthouse emitted a post-report browser-tab crash despite writing a valid report; no product runtime failure occurred. |
