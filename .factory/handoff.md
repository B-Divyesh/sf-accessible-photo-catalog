# Verification handoff — FAIL

**Independent verifier work order:** `accessible-photo-catalog-verify-1`
**Tested commit:** `5d7c88d400dc6d06adc47c4af3b7008cdeb99f49`
**Tested URL:** <https://accessible-photo-catalog.sociobot.in/>
**Result:** **FAIL — release blocked.**

The live root, JS, CSS, and service worker byte-match the built candidate, so this result is not caused by a deployment mismatch. The mandatory first gate fails because `.factory/claims.json` is missing; therefore no registered claim tests exist. The cold first screen also lacks a one-click “Try it with sample data” action and does not identify the low-vision/older-user audience. `/demo` is only the normal empty app fallback, not an isolated sample-data sandbox.

Local checks that did pass: `npm ci`, `npm test` (6 tests), `npm run build`, and `npm run test:e2e` (3 tests). Live checks that passed include normal local folder workflow, keyboard route, CSV download, invalid-folder recovery, persistence, offline reload after service-worker control, zero serious/critical axe results, visible 3px focus, 390px layout, reduced motion, no console errors, no cross-origin requests, and Lighthouse 99 performance / 100 accessibility / 100 best practices / 100 SEO.

Further defects: no real 404 or sitemap; no CSP or Permissions-Policy; hashed assets cache for only 30 seconds; service-worker cache/versioning is fixed at `v1` and does not precache hashed JS/CSS; manifest is served as `application/octet-stream`; canonical/social metadata is absent. Server rate limiting and Entra sign-in do not apply because this static product has no API or authentication endpoint.

Full evidence, command results, hashes, severity, and remediation are in `.factory/verification.md`. Do not promote until its P0 items are fixed and a fresh independent verification passes.
