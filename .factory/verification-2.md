# Independent verification — PASS

**Candidate:** `49d2c4721553b230e8e16af5e34441012f4914e6`
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Verified:** 2026-08-29
**Verdict:** **PASS — acceptable for release.**

This replaces the earlier failed verification. The candidate was tested from a
clean detached checkout of the specified SHA. The live deployment is this
candidate: fresh local production output byte-matches the served `index.html`,
app JS, CSS, bootstrap JS, generated service worker, and manifest. The
previous deployment-only failure is resolved: `/manifest.webmanifest` returns
HTTP 200 with `Content-Type: application/json`.

## First-read test

Cold live root showed the title **“Large Type Catalog — Sort local photos
clearly”**, the h1 **“Sort local photos with large controls”**, and the plain
audience sentence **“For low-vision people and older family members who need a
clear way to sort one photo folder.”** The first action is the visible,
one-click **“Try it with sample data”** link, with the adjacent explanation
that the sample opens immediately. The first screen therefore says what the
product does, for whom, and what to click first in plain words. It also has the
required three facts: local-only, keyboard route, and offline use.

## Required claim gate — all PASS

After `npm ci`, every command listed in `.factory/claims.json` was run against
the clean candidate's `/demo` entry point. Each ran one Chromium test and
passed:

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

The registry exists, has 11 unique claims, and the unit release-contract test
confirmed exactly one matching `@claim:<id>` test for each. The README and
live copy were cross-checked against the registry; its local-only, keyboard,
export, persistence, install/offline, backup, display, demo, and original-file
promises are covered by those tests.

## Clean local quality gates

| Command | Result |
| --- | --- |
| `npm ci` | PASS — 179 packages audited, 0 vulnerabilities |
| `npm test` | PASS — 9 assertions in 2 Vitest files |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS — `dist/` produced and release verifier passed |
| `npm run test:e2e` | PASS — 16 Chromium tests; `test-results/.last-run.json` reports `passed` |

Production output is within the static budgets: initial app JS is 29,549 B
(9.64 KB gzip) and CSS is 18,747 B (4.89 KB gzip), well below 200 KB and 50 KB.

## Live end-to-end and deployment checks

- The demo starts with three realistic sample photos and the persistent
  **“Demo — sample data, nothing is saved”** banner. Reset restores samples;
  Start for real discards demo data.
- Keyboard-only live exercise passed: reject, tag, rename queue, navigation,
  and CSV export. The export contained four lines (header plus all three
  samples); a queued `coast/rail:2026` name was safely normalized to
  `coast-rail-2026.svg`.
- Invalid folder recovery passed: a folder containing only `notes.txt` remained
  on the empty state and announced the supported image formats. Filtering,
  Undo, and Show all photos recovered correctly. No console or page errors
  occurred in these live flows.
- The privacy request log recorded 28 requests during the complete demo flow;
  every request was same-origin. The response CSP limits `connect-src` to
  `'self'`; no analytics, third-party script, font, or API request was seen.
- Live headers include CSP with `frame-ancestors 'none'`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, Permissions-Policy,
  and HSTS. Hashed JS/CSS use `Cache-Control: public, max-age=31536000,
  immutable`; `/sw.js` is `no-cache`.
- Service-worker/PWA checks passed. The generated worker has the build cache
  `large-type-catalog-17152ef9bc6b` and precaches the app shell, demo route,
  three sample files, icons, legal pages, offline page, and hashed assets.
  From a fresh context, an online root visit followed by an offline `/demo`
  loaded all three samples and the offline banner. A simulated old named cache
  was removed on registration and the live UI displayed **“The catalog was
  updated and is ready offline.”**
- All discovered internal links across root, demo, privacy, terms, and 404
  resolved HTTP 200 (fragment links included). An unknown path returns the
  designed 404 with HTTP 404.
- No server-side product endpoint or sign-in flow exists, so rate-limit/429 and
  Entra tenant checks are not applicable.

## Accessibility and responsive checks

Live `/`, `/demo`, `/privacy/`, `/terms/`, and `/404.html` each have a correct
title, `lang="en"`, one main landmark, exactly one h1, a canonical URL, and no
image without `alt`. Axe 4.10.2 found zero serious or critical WCAG 2.0/2.1/2.2
A/AA findings on every route and on the demo workspace.

At 390×844 with reduced motion, the demo supported the largest 26px text scale
and high contrast without horizontal overflow; the progress transition was
`0s`. Keyboard Tab showed a visible solid 3px focus ring. Dialog and shortcut
flows were also exercised by the passing keyboard and display claim tests.

## Defects

No release-blocking, high, medium, or low severity product defects were found.

### Verification-environment note (not a product defect)

The fresh Lighthouse CLI attempt could not complete because its bundled
Puppeteer connection to the preinstalled Chromium closed during collection.
This is recorded as a tooling limitation, not a product finding: the exact
production build verified the bundle budgets, and fresh Playwright checks
covered the live console, headers, accessibility, responsive layout, reduced
motion, privacy requests, and PWA behavior.
