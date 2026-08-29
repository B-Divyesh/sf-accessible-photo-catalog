# Independent verification 4 — PASS

**Candidate commit:** `fd82bc36846f6f6794b0e159e9686420d4580714`

**Live URL:** <https://accessible-photo-catalog.sociobot.in/>

**Verified:** 2026-08-29
**Verdict:** **PASS — acceptable for release.**

The checkout was clean and at the specified commit before `npm ci`. No
product source code was changed.

## Mandatory cold first-read test — PASS

A new 1440×900 browser context opened the live root cold. Its first screen
plainly says what it does: **“Sort local photos with large controls.”** It says
who it is for: **“For low-vision people and older family members who need a
clear way to sort one photo folder.”** The visible one-click first action is
**“Try it with sample data”**, immediately followed by **“The sample opens at
once.”**

That link opens `/demo`, which has three prepared sample photos and the
persistent **“Demo — sample data, nothing is saved”** banner with Reset demo
and Start for real controls. The plain-words and isolated-demo acceptance
conditions pass.

## Mandatory claim gate — PASS

Immediately after the clean install, I ran every exact `test` command in
`.factory/claims.json` separately. Each selected one passing Chromium test
against the demo entry point.

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
| `private-runtime` | PASS |
| `clear-data` | PASS |
| `free-use` | PASS |

The registry has 14 claims, and the release-contract unit test passed. Landing
copy, README, privacy, and terms were cross-checked: their demo, local-only,
keyboard, export, persistence, offline/PWA, backup, file-safety, display,
privacy/runtime, clear-data, and no-payment promises have tagged coverage.

## Clean local quality gates — PASS

| Command | Result |
| --- | --- |
| `npm ci` | PASS — 178 packages installed; audit reports 0 vulnerabilities |
| `npm test` | PASS — 9 assertions in 2 Vitest files |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — `dist/` produced and release verifier passed |
| `npm run test:e2e` | PASS — 27 Chromium tests |

The exact production build has 31,869 B initial JavaScript (10.28 KB gzip)
and 21,757 B CSS (5.41 KB gzip), below the 200 KB and 50 KB limits.
Lighthouse 12.8.2 against the live mobile configuration reported Performance
99, Accessibility 100, Best Practices 100, LCP 1.268 s, CLS 0, and 96,866 B
total transfer.

## Live deployment, end-to-end, and privacy — PASS

`PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run
test:e2e` passed all 27 tests. It covers normal keyboard
classify/tag/rename/CSV export, filters and undo, persistence, 390px layout,
44px targets, 200% text resize, high contrast, reduced motion, malformed JSON
recovery, routes/404, and offline reload.

Manual Playwright use of live `/demo` completed the same keyboard workflow
and logged 47 requests. Every request origin was exactly
`https://accessible-photo-catalog.sociobot.in`; there were no cookies,
console errors, or page errors. The response CSP restricts `connect-src` to
`'self'`.

`verify-url.sh` passed both `/` and `/demo`: HTTP 200, title, `lang=en`,
one h1, main landmark, complete image alt text, labelled buttons, and zero
console errors. Live axe scans found zero serious or critical WCAG 2 A/AA, 2.1
AA, or 2.2 AA findings. At 390px with reduced motion, focus had a visible 3px
outline, document width was 390px, and the progress transition was `0s`.

## PWA, headers, caching, and deployment identity — PASS

The live manifest is standalone and provides 192px, 512px, and maskable
icons. After an online demo visit, the active worker was
`https://accessible-photo-catalog.sociobot.in/sw.js`; it controlled the page,
was activated after `registration.update()`, and used the versioned
`large-type-catalog-32df52486c25` shell. A fresh controlled context reloaded
`/demo` offline and displayed **Photo 1 of 3** with the offline banner.

Live headers include HSTS, CSP with `frame-ancestors 'none'`,
`X-Content-Type-Options: nosniff`, Referrer-Policy, and Permissions-Policy.
HTML has short revalidation; hashed JS/CSS have
`public, max-age=31536000, immutable`; `sw.js` is `no-cache`; and the
manifest is JSON with a one-hour cache policy.

Live candidate bytes match the fresh build:

| File | SHA-256 |
| --- | --- |
| `assets/app-Dmv4Hvli.js` | `61dd9302f7e482ea594568a28accc616e2f93a1efbbc3520f0dbe89eec944031` |
| `assets/style-DPCX1h-2.css` | `5f9790a874094714b03bdc809367cbf6b0391f6a9f9b74021f96e3cd33f89984` |

The live deployment therefore matches the specified candidate, not an earlier
deployment-only failure.

## Defects by severity

| Severity | Findings |
| --- | --- |
| P0 / release-blocking | None |
| P1 / major | None |
| P2 / minor | None |
| P3 / observation | None |

This static local-first PWA has no server-side product API, authentication,
billing, package, or CLI surface. Rate-limit/429, Entra, backend concurrency,
and consumer-package checks are not applicable.
