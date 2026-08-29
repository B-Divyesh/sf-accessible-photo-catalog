# Independent verification handoff — PASS

**Independent verifier work order:** `accessible-photo-catalog-verify-2`
**Tested commit:** `49d2c4721553b230e8e16af5e34441012f4914e6`
**Tested URL:** <https://accessible-photo-catalog.sociobot.in/>
**Result:** **PASS — ready for release.**

Fresh independent evidence is recorded in
[`.factory/verification-2.md`](verification-2.md). All 11 registered claim
commands passed from the clean candidate checkout. The live deployment
byte-matches the candidate build and passed the first-read, demo, keyboard,
privacy, responsive/accessibility, offline, and service-worker-update checks.
No product defects remain open. The Lighthouse CLI could not complete in this
container because its Puppeteer/Chromium connection closed; this was a tooling
limitation, not a product failure.

---

# Repair handoff — Large Type Catalog

Work order: `accessible-photo-catalog-repair-1`

Verifier report: `c595d5c9c4d3cb0b54699fcaccaf96254d23c36b`

Failed candidate: `5d7c88d400dc6d06adc47c4af3b7008cdeb99f49`

Repaired through: `49d2c47` plus this handoff commit

Completed: 2026-08-29

Artifact: static offline PWA in `dist/`

Live: <https://accessible-photo-catalog.sociobot.in/>

## What was repaired

- Added `.factory/claims.json` with 11 public claims. Each claim has exactly one
  `@claim:<id>` Playwright test that starts from a clean `/demo` sandbox. A unit
  contract rejects missing, duplicate, unregistered, or multiply tested claims.
- Added a one-click **Try it with sample data** route. `/demo` seeds three
  bundled photo scenes with decisions, tags, and notes. It uses the separate
  `demo:large-type-catalog` IndexedDB database and `demo:` local-storage keys.
  Reset restores photo data and display preferences. Start for real clears only
  demo data. `.factory/demo.md` documents the boundary.
- Rewrote the first screen to name low-vision people and older family members,
  expose both demo and real-folder actions, and use a six-word task headline.
  `.factory/copy-audit.md` records the first-screen word counts and terminology.
- Added `404.html`, `sitemap.xml`, complete canonical/Open Graph/Twitter
  metadata, a 1200×630 product social card, and a 180×180 Apple touch icon.
- Added Azure Static Web Apps routing and response policy. Unknown routes now
  return the designed page with HTTP 404. Live responses send CSP,
  Permissions-Policy, Referrer-Policy, and `nosniff`. Hashed assets use
  `public, max-age=31536000, immutable`.
- Worked around Azure's generic `.webmanifest` MIME handling with an explicit
  rewrite to an identical `manifest.json`. The public standard URL now returns
  `application/json` instead of `application/octet-stream`.
- Replaced the fixed `large-type-catalog-v1` service-worker cache with a build
  digest. Each build precaches the current hashed JS/CSS, legal pages, demo
  route, sample photos, icons, and fallbacks. Activation removes old product
  caches, claims clients, and announces an applied update.
- Added a real ESLint gate and build verification for required files, bundle
  budgets, policy presence, hashed asset precaching, and service-worker version.
- Preserved the passing real-folder workflow, keyboard shortcuts, undo,
  persistence, CSV/JSON export, high contrast, text sizes, and offline behavior.

## Clean local verification

Run:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Results in the work-order container:

- `npm ci`: 178 packages installed; 0 vulnerabilities.
- `npm run lint`: pass, 0 errors.
- `npm run typecheck`: pass.
- `npm test`: 9/9 Vitest unit and release-contract tests passed.
- `npm run build`: pass; `dist/index.html` and all static routes produced.
- Release build: initial app JS 29,549 bytes (9.64 KB gzip); CSS 18,747
  bytes (4.89 KB gzip). The generated cache is
  `large-type-catalog-17152ef9bc6b` and includes both hashed bundles.
- `npm run test:e2e`: 16/16 Chromium tests passed. Coverage includes the real
  folder flow, all 11 claims, desktop, 390×844, keyboard, visible focus,
  reduced motion, default/high contrast axe scans, metadata, link crawl,
  persistence, update/install criteria, and offline reload.
- Every command listed in `.factory/claims.json` was also run separately:
  11/11 commands passed with exactly one matching test each.
- Visual inspection: desktop landing, desktop populated demo, and 390px
  populated demo reviewed. Mobile horizontal overflow is 0 px.
- Factory `verify-url.sh` against the local build: 200, no console errors,
  title present, `lang=en`, one `h1`, `main` present, zero missing image alts,
  and zero unlabeled buttons.
- Local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; LCP 1.8 s, CLS 0, TBT 0 ms.

## Deployment and live evidence

The repair commits were pushed to `origin/main`. The final static build was
deployed with:

```sh
/opt/fleet/lib/deploy-static.sh accessible-photo-catalog /work/repo/dist
```

Azure deployment `14b0730e-db8d-425c-9a48-b081d5d3b7f6` succeeded to the
existing Central US Static Web App and its Ready custom domain.

- Full live Playwright matrix:
  `PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e`
  passed 16/16 tests, including all claims, offline reload, mobile, axe, privacy
  request logging, and the keyboard-only real-folder route.
- Live `verify-url.sh`: HTTP 200 in 561 ms, no console errors, title and language
  present, one `h1`, `main` present, zero missing alts, zero unlabeled buttons.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.4 s, CLS 0, TBT 30 ms.
- `/demo`, `/privacy/`, `/terms/`, and `/sitemap.xml` return 200.
  `/not-a-real-page` returns 404 with the designed page.
- `/manifest.webmanifest` returns `Content-Type: application/json`.
- Root responses include the required CSP and Permissions-Policy. Hashed app
  JS/CSS return the one-year immutable cache policy.
- Local/live SHA-256 values match exactly:
  - `index.html`: `7a1baa700fc93a5fe85396c15a63cfd5ae93caba1559c296fa013410301a6626`
  - `sw.js`: `dd07114a6eef8084d91d60b0799132322737d89f2b7aab7e275059221ae59a12`
  - `app-D-RcAcGC.js`: `005a31130b50a448ec4033a8ec0f7000e8af8f20366771232fc17b4153e2dcfa`
  - `style-B9uyqlZt.css`: `9fe67ef4aa82527d6beeb9ce12f9488eace6ce0111aff2d50f431d05cc3bf058`

## Known limits

- Browser pages cannot rename or delete arbitrary source files. The product
  intentionally queues filenames and decisions for sidecar export.
- HEIC/HEIF display still depends on browser decoding support. Those entries
  remain available for metadata export when preview decoding fails.
- IndexedDB quotas vary by browser. Very large libraries may need smaller
  folder batches.
- JSON backup restores metadata after the matching folder is reopened. It does
  not contain photo bytes.
- Rate limiting and sign-in identity checks do not apply: this static,
  local-first product has no API, authentication, analytics, or payment path.
