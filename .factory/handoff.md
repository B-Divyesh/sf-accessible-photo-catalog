# Build handoff — Large Type Catalog

Work order: `accessible-photo-catalog-build-1`  
Completed: 2026-08-28  
Deploy type: static PWA, output in `dist/`

## What was built

- A complete one-folder photo triage workflow with an oversized current-photo
  viewer, nearby-photo rail, All/Unreviewed/Keep/Review/Reject filters, progress,
  and explicit state totals.
- Keyboard-first classification (`K`, `R`, `X`, arrows), direct tag and queued
  filename shortcuts (`T`, `N`), optional notes, immediate announcements, and
  reversible classification through Undo. Reject never deletes a file.
- CSV sidecar export containing original path/name, queued name, decision, tags,
  note, and modification time. JSON metadata backup/import is available under
  Display; the matching folder must be open before import because backups do not
  embed private photo bytes.
- IndexedDB persistence for photo blobs and metadata, local display preferences,
  clear-data confirmation, quota/unsupported-file errors, an image decode error
  state, and useful empty/filter-empty states.
- Installable offline PWA with versioned app-shell cache, cache-first local
  assets, navigation fallback, skipWaiting/clientsClaim, an in-app update notice,
  192/512/maskable icons, and an installed start URL.
- Product-specific art-deco “observation deck” UI with standard and night/high-
  contrast palettes, three text scales, 48px targets, designed focus rings,
  reduced motion, and intentional 390px behavior.
- Original generated empty-state artwork, manually inspected for text, brands,
  anatomy, seams, and misleading capability. Shipped as AVIF (47 KB), WebP
  (82 KB), and JPEG (179 KB); source prompt and provenance are in
  `.factory/design.md` and `assets/src/`.
- Static `/privacy/` and `/terms/` pages, manifest, offline fallback, README,
  MIT license, and permissive robots file. There is no analytics, tracking,
  account, payment, CDN, remote font, or photo upload.

## Verification

Run from a clean checkout:

```sh
npm install
npm test
npm run build
npm run test:e2e
```

Results on the work-order container:

- `npm test`: 6/6 Vitest unit tests passed.
- `npm run build`: passed; `dist/index.html` exists.
- `npm run test:e2e`: 3/3 Playwright Chromium tests passed using the pinned
  1.58.2 browser contract.
- E2E covers a keyboard-only folder → Keep → tag → queued rename → CSV route,
  verifies exported content, asserts no horizontal overflow at 390×844, asserts
  no page console errors, and reloads under `context.setOffline(true)`.
- Axe integration: zero serious or critical violations on the empty state,
  active catalog, and high-contrast active catalog.
- Manual screenshot review: desktop empty/active and 390px high-contrast active
  states inspected; corrected hidden-state leakage and stale image errors found
  during this review.
- Mobile Lighthouse 12.8.2 against the production build: Performance **99**,
  Accessibility **100**, Best Practices **100**, SEO **100**; LCP **2.0 s**,
  CLS **0**, total blocking time **80 ms**, FCP **1.1 s**.
- Desktop Lighthouse: Performance **100**, Accessibility **100**, CLS **0**,
  LCP **0.4 s**.
- Production bundles: 26.7 KB JS (8.7 KB gzip), 17.6 KB CSS (4.7 KB gzip),
  no fonts. All are comfortably inside the 200/50/120 KB budgets.

## Known gaps and next steps

- The browser does not grant a web page permission to rename or delete arbitrary
  originals, so v1 intentionally queues names and decisions for sidecar export.
- HEIC/HEIF files can be cataloged but only display in browsers with native
  decoding support; the entry and its export row remain available on decode
  failure.
- IndexedDB quotas vary by browser and device. A very large/high-resolution
  library may need smaller folder batches; surface quota estimates and optional
  OPFS streaming in a future version if tester collections exceed available
  storage.
- JSON import restores metadata only after the corresponding folder is reopened;
  this is the privacy-preserving tradeoff for not embedding image bytes.
- The product success measure still requires the planned moderated study with
  five low-vision testers completing a 50-photo exercise. Instrumentation was
  intentionally not added; collect feedback directly rather than tracking users.
