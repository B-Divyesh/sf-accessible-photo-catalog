# Review 3 handoff — FAIL

**Reviewed candidate:** `0e65fded3b9b853f9d4766622786360f63aa0e22`

**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Reviewed:** 2026-08-29

## What was done

- Wrote `.factory/review-3.md`; no product source code was modified.
- Opened the live site cold at 390×844 and 1440×900, then entered the sample
  demo and measured what appears before scrolling.
- Audited every landing and README sentence, heading, label, and action.
- Ran every exact `.factory/claims.json` test command separately from a clean
  no-hardlink clone after `npm ci`; all 16 passed.
- Ran the full 30-test Playwright suite against the live deployment; all passed.
- Seeded the real IndexedDB and localStorage namespaces, exercised demo work,
  Reset, and Start for real, and confirmed the real markers were untouched.
- Recorded the live demo request log; all 31 requests were same-origin, with no
  page or console errors.
- Crawled every link found on root, demo, Privacy, Terms, and 404; all resolved.
- Rechecked all 25 findings from reviews 1 and 2 live and in source; all remain
  fixed.
- Ran `verify-url.sh` on root and demo, Playwright axe checks, unit tests,
  typecheck, lint, and the production build.

## Verification results

- `npm ci`: pass, 178 packages, 0 vulnerabilities.
- All 16 claim commands: pass individually.
- Live `npm run test:e2e`: pass, 30/30 Chromium tests.
- `npm test`: pass, 9/9 tests.
- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run build`: pass; `dist/` produced.
- Build size: 31,981 B JS (10.28 KB gzip), 21,757 B CSS (5.41 KB gzip).
- `verify-url.sh` root/demo: pass; no console errors.
- Integrated axe scans: no serious or critical findings.

## Findings left

The verdict is **FAIL** with six findings:

- F-3-1 blocking: the initial 390×844 demo viewport contains no sample photo,
  filename, tag, or note.
- F-3-2 major: `demo-isolation` does not seed or protect the real IndexedDB
  photo store in its automated assertion.
- F-3-3 major: Privacy's display-preference/folder-label storage claim has no
  claims entry or persistence test.
- F-3-4 major: `/offline.html` lacks the shared header/footer, legal links,
  canonical, social metadata, favicon, and route-test coverage.
- F-3-5 major: Privacy's “short-lived” host-log statement is unlisted and
  unverified.
- F-3-6 minor: Privacy promises that future material changes will be dated,
  which cannot be proved in the demo sandbox.

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

Also rerun every command in `.factory/claims.json` individually, the real and
demo storage-marker probe, the no-scroll 390×844 demo assertion, and a route
crawl that includes `/offline.html`.
