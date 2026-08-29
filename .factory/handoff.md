# Verification handoff — 2026-08-29

**Work order:** `accessible-photo-catalog-verify-3`
**Candidate:** `1b0c344704c4db67f0d9dfb1d5f87f93d978994c`
**Live:** <https://accessible-photo-catalog.sociobot.in/>
**Result:** **FAIL — do not release.**

Independent QA is recorded in
[verification-3.md](verification-3.md). No product code was changed.

## Why it fails

- **P0:** the exact **“Try it with sample data”** action is below the cold first
  viewport at both 1440×900 and 390×844. Mobile also puts the audience sentence
  below the first screen. This directly fails the work order's mandatory
  first-read gate.
- **P1:** 200% text resize creates horizontal overflow on the root and clips
  controls/text in the demo.
- **P1:** several public privacy/free/clear-data/dependency promises are not
  registered in `.factory/claims.json` with one matching claim test.
- **P2:** Escape does not close the settings dialog when a radio/checkbox has
  focus; multiple mobile targets are under 44px; malformed backup JSON exposes
  a parser error instead of a plain recovery message.

## What passed

- The checkout began clean at the candidate. `npm ci` succeeded with zero
  vulnerabilities.
- Every one of the 11 declared claim commands passed separately before other
  QA.
- `npm test` (9), typecheck, lint, production build, and local Playwright (18)
  passed. All 18 Playwright tests also passed against the live deployment.
- The live deployment byte-matches fresh candidate output for HTML, app JS,
  CSS, service worker, manifest, and 404.
- Core demo sorting/export/persistence, boundary and recovery paths, privacy
  request logging, security/caching headers, route crawl, axe, keyboard focus,
  390px layout, reduced motion, offline reload, and service-worker update all
  otherwise passed.
- Fresh mobile Lighthouse: Performance 91, Accessibility 100, Best Practices
  100, SEO 100; LCP 1.3s and CLS 0.006. Initial JS is 31,397 bytes, CSS 20,461
  bytes, and the AVIF hero 47,421 bytes.

## Reproduce

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e
```

Do not treat the earlier deployment-only failure as current: manifest MIME,
headers, caching, routing, offline behavior, and deployment identity all pass.
The current blockers are product/acceptance issues listed above.
