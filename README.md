# Large Type Catalog

Large Type Catalog is a free, local-first photo triage workspace for low-vision
knowledge workers, older family members, and anyone who finds conventional photo
managers too dense. It shows one large photo at a time and supports a complete
keyboard route for Keep, Review, Reject, tags, notes, and a queued filename.
It never uploads, deletes, moves, or renames the original photos.

Production: <https://accessible-photo-catalog.sociobot.in>
Demo: <https://accessible-photo-catalog.sociobot.in/demo>

## What it does

- Opens one local photo folder with the browser's directory picker.
- Stores local copies and catalog decisions in IndexedDB so work survives a
  refresh and remains available offline.
- Sorts with large semantic controls or keyboard shortcuts: `K` Keep, `R`
  Review, `X` Reject, arrows to navigate, `T` for tags, and `N` for filename.
- Filters by decision, shows nearby photos, and provides an immediate Undo.
- Exports a spreadsheet-friendly CSV sidecar and a JSON metadata backup.
- Offers three text scales, a high-contrast theme, visible focus, live screen
  reader feedback, reduced-motion support, and a 390px mobile layout.
- Installs as a PWA after the first online visit and reloads offline.

Select **Try it with sample data** to open three prepared family photos. Demo
changes use the separate `demo:` browser-storage namespace. **Reset demo**
restores the samples. **Start for real** discards demo data without reading or
changing the real catalog.

Photos remain in the current browser profile. A JSON backup contains metadata,
not image bytes; reopen the matching folder before importing it. See
[Privacy](https://accessible-photo-catalog.sociobot.in/privacy/) for the full
data explanation.

## Develop and verify

Requires Node.js 20.19 or newer.

```sh
npm install
npm run typecheck
npm run dev
npm test
npm run build
npm run test:e2e
```

The exact production build command is `npm run build`. It writes the static
site to `dist/`, with `dist/index.html` at the deploy root. Preview that output
with `npm run preview`.

Playwright is pinned to 1.58.2. The E2E suite covers the full keyboard route,
CSV contents, default and high-contrast axe scans, a 390px viewport, console
errors, demo isolation, PWA installation criteria, and an offline reload. Every
public product claim is listed in `.factory/claims.json` with one tagged browser
test. Run one with `npm run test:e2e -- --grep @claim:offline-reload`.

## Browser notes

Current Chromium, Firefox, and Safari are the target browsers. Directory picker
presentation and support for formats such as HEIC depend on the browser. Browser
storage quotas also vary; very large collections may need to be opened in
smaller folders. Original files remain safe if the browser clears site data.

## Project notes

- `.factory/brief.json` records product scope.
- `.factory/design.md` records the art-deco visual system and generated artwork
  provenance.
- `.factory/demo.md` documents the sample sandbox and storage boundary.
- `.factory/claims.json` maps each public promise to an observable test.
- `.factory/handoff.md` records verification and known v1 gaps.
- `LICENSE` is MIT.

No third-party fonts, analytics, runtime scripts, payment services, or cloud
photo APIs are used.
