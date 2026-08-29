# Repair handoff — 2026-08-29

**Work order:** `accessible-photo-catalog-repair-2`

**Verifier report:** `3fe1b5e26705070704a38c7e3c499ce6fffb8af6`

**Repaired candidate:** `1b0c344704c4db67f0d9dfb1d5f87f93d978994c`

**Repair commit:** `71aa6d0007b924487148f89b53dc90f6558c4b55`

**Version:** `1.1.1`

**Deployment:** `24e9ce96-7049-4669-a9e0-b3eb83fa661c`

**Live:** <https://accessible-photo-catalog.sociobot.in/>

**Result:** PASS — no known release blockers.

## Repairs

- Reworked the cold landing composition so the audience, exact sample-data
  action, explanation, and three facts fit at 1440×900 and 390×844 without
  scrolling. The root header now removes workspace-only controls, and the
  copy precedes the original observation-deck artwork.
- Made headings, navigation arrows, shortcut labels, the workspace, and nearby
  section reflow at 200% text size without horizontal overflow or clipped text.
- Raised every visible mobile interaction target to at least 44×44 CSS pixels.
  Removing deferred containment from the nearby-photo strip also prevents it
  from overlapping the enlarged footer targets.
- Escape now closes the dialog containing the focused radio, checkbox, or
  other control before the global editing-shortcut handler runs.
- Malformed and unsupported JSON backups now receive plain recovery messages;
  raw parser details are not shown.
- Registered `private-runtime`, `clear-data`, and `free-use` in
  `.factory/claims.json`, each with one observable demo-sandbox test. All 14
  public claims now have exactly one tagged test.
- Added a short hidden initialization state to eliminate first-load layout
  movement. The PWA manifest, visible build labels, and package are versioned
  `1.1.1`.

## Exact regression coverage

`tests/e2e/catalog.spec.ts` now asserts both first viewports by bounding box,
root and populated-demo reflow at a 36px root font, dialog Escape from the
Largest radio, every visible 390px target size, and malformed-JSON recovery.
`tests/e2e/claims.spec.ts` verifies runtime requests/cookies/account and payment
gates, IndexedDB removal after clearing, and a complete no-payment workflow.

## Verification evidence

From a clean install in `/work/repo`:

```text
npm ci                 PASS — 178 packages, 0 vulnerabilities
npm test               PASS — 9 tests
npm run typecheck      PASS
npm run lint           PASS
npm run build          PASS — dist/ produced
npm run test:e2e       PASS — 27 Chromium tests
```

All 14 commands listed in `.factory/claims.json` were also run separately and
each selected exactly one passing test. Local and live suites cover the real
folder flow, demo isolation, persistence, JSON/CSV export, keyboard-only use,
390px mobile, 200% text, high contrast, reduced motion, axe WCAG A/AA checks,
privacy request logging, installability, offline reload, and route/404 crawl.

The production build contains 31,869 bytes of initial app JavaScript and
21,757 bytes of CSS; the original AVIF hero remains 47,421 bytes. Local
Lighthouse 12.8.2 scored 100 Performance, 100 Accessibility, 100 Best
Practices, and 100 SEO (FCP 1.06s, LCP 1.66s, CLS 0, TBT 22ms). Evidence is in
`.factory/evidence/repair-2/`.

## Live verification

- `PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e`
  passed all 27 tests after deployment.
- `verify-url.sh` passed `/` and `/demo`: HTTP 200, no console errors, one h1,
  `lang=en`, a main landmark, complete image alt text, and labeled buttons.
- Live Lighthouse scored 100/100/100/100 (FCP 0.95s, LCP 1.35s, CLS 0,
  TBT 23ms).
- Fresh local and live SHA-256 values match for `index.html`, the manifest,
  service worker, app JavaScript, and CSS. The app JS hash is
  `61dd9302f7e482ea594568a28accc616e2f93a1efbbc3520f0dbe89eec944031`.
- Response checks passed: CSP and security headers are present, hashed assets
  are immutable for one year, `sw.js` is `no-cache`, the manifest is JSON, and
  an unknown route returns the designed page with HTTP 404.
- An update simulation removed `large-type-catalog-verifier-old`, retained only
  `large-type-catalog-32df52486c25`, controlled the demo, and restored photo 1
  of 3 without console errors. Offline reload also passed in both full suites.

This artifact remains a static, local-first PWA with no backend, package
consumer, account, billing call, or AI endpoint. Rate-limit, authentication,
and package-consumer checks are therefore not applicable.

## Run and deploy

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
/opt/fleet/lib/deploy-static.sh accessible-photo-catalog dist
```

Known gaps: none.
