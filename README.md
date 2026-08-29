# Large Type Catalog

Large Type Catalog sorts photos for people who need large controls. It is for
low-vision people, older family members, and anyone who finds photo managers
hard to read. It never uploads, deletes, moves, or renames original photos.

Production: <https://accessible-photo-catalog.sociobot.in>
Demo: <https://accessible-photo-catalog.sociobot.in/demo>

## What it does

- Open one photo folder after you choose it.
- Save photos and decisions in this browser. Your work remains after a refresh
  and can work offline.
- Use large buttons or keyboard shortcuts. Press `K` to keep, `R` to review,
  and `X` to reject. Use arrows to move, `T` for tags, and `N` for the export
  filename.
- Filter by decision, view nearby photos, and undo the last decision.
- Export a CSV file with one row for each photo.
- Export a backup file with decisions, tags, notes, and filenames. It does not
  include photos. Open the same folder before restoring a backup.
- Choose three text sizes, high contrast, reduced motion, and keyboard controls.
- After one online visit, install it like an app. It can then reopen offline.

Select **Try it with sample data** to open three prepared family photos. Demo
changes stay in separate browser storage. They never change your real catalog.
**Reset demo** restores the samples. **Start for real** discards demo data.

Photos and catalog data stay in this browser. Clearing this browser's site data
removes them. See [Privacy](https://accessible-photo-catalog.sociobot.in/privacy/)
for the full data explanation.

## Develop and verify

Requires Node.js 20.19 or newer.

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

`npm run build` writes the static site to `dist/`. Preview it with
`npm run preview`. Playwright is pinned to 1.58.2.

Browser tests cover keyboard sorting, CSV export, demo isolation, and offline
reload. They also check the 390px layout, high contrast, accessibility, and
console errors. Every public product claim appears in `.factory/claims.json`
with one tagged browser test. Run one with:

```sh
npm run test:e2e -- --grep @claim:offline-reload
```

## Browser notes

This release is verified in Chromium. Folder selection and formats such as
HEIC depend on the browser. Browser storage limits vary. Open very large
collections in smaller folders. Original files remain safe if the browser
clears site data.

## Project notes

- `.factory/brief.json` records product scope.
- `.factory/design.md` records the art-deco visual system and artwork provenance.
- `.factory/demo.md` documents the sample sandbox and storage boundary.
- `.factory/claims.json` maps each public promise to an observable test.
- `.factory/handoff.md` records verification and known gaps.
- `LICENSE` is MIT.

No third-party fonts, analytics, runtime scripts, payment services, or cloud
photo APIs are used.
