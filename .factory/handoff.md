# Verification 5 handoff — PASS

**Verified candidate:** `82fe19d6d9973bd4474b93904919bc6174134d68`
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Verified:** 2026-08-29

## Result

**PASS — acceptable for release.** The checkout began clean at the candidate
commit. Only this handoff and the companion verification report were changed;
no product source code was modified.

## What was verified

- The live cold first screen says what it does ("Sort local photos with large
  controls"), who it is for (low-vision people and older family members), and
  offers the visible one-click **Try it with sample data** action. It opens the
  isolated three-photo demo with the persistent reset/start-for-real banner.
- Every one of the 16 exact commands in `.factory/claims.json` passed
  individually from the demo entry point: `demo-isolation`, `local-only`,
  `keyboard-workflow`, `csv-export`, `browser-persistence`, `pwa-install`,
  `offline-reload`, `backup-roundtrip`, `original-files-safe`,
  `accessible-display`, `filter-undo`, `folder-open`, `private-runtime`,
  `clear-data`, `browser-data-clear`, and `free-use`.
- Clean local checks passed: `npm ci` (0 vulnerabilities), `npm test` (9
  tests), `npm run typecheck`, `npm run lint`, `npm run build`, and
  `npm run test:e2e` (30 Chromium tests).
- The same full 30-test Playwright suite passed against the live URL. It
  covers keyboard sort/tag/rename/export, invalid backup recovery, filters and
  undo, persistence, 390px layout, 44px touch targets, 200% text reflow,
  reduced motion, routes/404, and axe scans.
- A separate live demo session logged only same-origin HTTP requests plus
  local `blob:` URLs, set no cookies, and produced no console or page errors.
  Its axe WCAG A/AA scan had zero serious or critical findings.
- After an online visit, the live service worker controlled `/demo`; an update
  check retained the versioned `large-type-catalog-adec3203668b` shell. Offline
  reload showed the demo route and offline banner.
- The fresh build's live JS, CSS, service worker, and manifest hashes match
  byte-for-byte. Initial JS is 31,981 B (10.28 KB gzip), and CSS is 21,757 B
  (5.41 KB gzip), within the static-product budgets. A fresh mobile Lighthouse
  audit recorded Performance 98, Accessibility 100, Best Practices 100, SEO
  100, LCP 1,999 ms, CLS 0, TBT 14 ms, and 66,563 B transfer.

## Security, privacy, and deployment

Live response headers include a self-only CSP (`connect-src 'self'` and
`frame-ancestors 'none'`), HSTS, `nosniff`, a strict referrer policy, and a
permissions policy. HTML revalidates after 30 seconds; hashed JS/CSS are
immutable for one year; `sw.js` is `no-cache`; and the manifest caches for one
hour. This is a static local-first PWA with no server-side product API,
authentication, billing, package, or CLI surface, so rate-limit/429, Entra,
concurrency, and consumer-package checks do not apply.

## Defects and follow-up

| Severity | Finding |
| --- | --- |
| P0 / release-blocking | None |
| P1 / major | None |
| P2 / minor | None |
| P3 / observation | Lighthouse emitted a post-report Chrome teardown message; no product runtime failure was observed. |

See `.factory/verification-5.md` for the complete independent evidence.

## Re-run

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e
```
