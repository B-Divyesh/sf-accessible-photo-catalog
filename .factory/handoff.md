# Polish 3 handoff — PASS

**Base:** `f562208e40c37ac45dc18d6dd6bedd43f9be4def`

**Repair:** `be3a66d9fcd5d8eee09ccdaa26affc336b6ba378`

**Deployment:** `2319b363-4ec7-4d23-9362-d0a3995573b8`

**Live:** <https://accessible-photo-catalog.sociobot.in/>

**Verified:** 2026-08-29

## Delivered

- Closed F-3-1 through F-3-6 and rechecked all 25 earlier findings.
- Put the sample image and `coastal-train.svg` inside the initial 390×844 demo
  viewport while retaining the demo banner, Reset, Start for real, and 44px
  targets.
- Strengthened demo isolation with a byte-for-byte real IndexedDB marker check.
- Added the registered `preference-persistence` claim and its single tagged
  sandbox test.
- Rebuilt `/offline.html` as a real Vite route with the shared shell, metadata,
  focus behavior, legal links, and service-worker precaching.
- Removed unprovable log-retention and future-policy wording from Privacy.
- Updated the copy audit, demo notes, claims registry, release version, and the
  97-character verb-first catalog description.
- Preserved the art-deco observation-deck identity and static offline-PWA class.

## Exact verification

- Clean no-hardlink clone of `be3a66d`: `npm ci` passed with 0 vulnerabilities.
- All 17 `.factory/claims.json` commands passed separately, one test each.
- `npm test`: 9/9 passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed and produced `dist/`.
- Clean-clone `npm run test:e2e`: 32/32 passed.
- Live `PLAYWRIGHT_BASE_URL=... npm run test:e2e`: 32/32 passed.
- Integrated axe: zero serious or critical findings across all route states.
- `verify-url.sh`: root, demo, Privacy, offline, and 404 passed with no console
  errors, one `h1`, `lang=en`, a main landmark, and complete image alternatives.
- Live privacy/request probe: only
  `https://accessible-photo-catalog.sociobot.in` appeared as a request origin;
  no page or console error occurred.
- Offline reload, service-worker control, standalone manifest, 200% text reflow,
  reduced motion, high contrast, dialog Escape, 44px targets, and malformed
  backup recovery all passed in the browser suite.
- Production size: 32,382 B JS and 23,881 B CSS uncompressed.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; FCP 0.966 s, LCP 1.352 s, TBT 28 ms, CLS 0, 97,455 B transferred.
- Live and `dist/` SHA-256 matched for `index.html`, `offline.html`, app JS,
  CSS, `sw.js`, and `manifest.webmanifest`. An unknown live route returned 404.

Run locally with `npm ci && npm test && npm run build && npm run test:e2e`.
The full finding-to-evidence map is in `.factory/polish-3.md`.

## Known gaps and next steps

None identified. No review finding of any severity remains unresolved.
