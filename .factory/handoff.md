# Polish handoff — 2026-08-29

**Work order:** `accessible-photo-catalog-polish-1`
**Repair commit:** `12f7dbfee46043560402008ef3ffd3a508bff686`
**Deployment:** Azure Static Web Apps deployment `6fcb1748-89ed-42d8-8294-6fd61cdd3819`
**Live:** <https://accessible-photo-catalog.sociobot.in/>
**Result:** PASS — no known gaps.

## Completed work

- Resolved all 14 findings in `review-1.md`; the detailed finding-to-evidence
  map is in [polish-1.md](polish-1.md).
- Kept the art-deco observation-deck identity while adding shared header
  navigation, an accessible populated-demo heading, route focus behavior, a
  working 404 skip target, and the required landing explanations.
- Rewrote the flagged README language in plain words and removed the untested
  multi-browser support claim. The current release is explicitly verified in
  Chromium.
- Added the verb-first catalog description and updated the copy audit.

## Verification

From the repair checkout:

```sh
npm test                 # 9 passed
npm run lint             # passed
npm run build            # passed; dist/ generated
npm run test:e2e         # 18 Chromium tests passed
```

From a fresh clone at `/tmp/accessible-photo-catalog-clean-TbdUmv`:

```sh
npm ci && npm run build  # passed
```

Each of the 11 commands in `.factory/claims.json` then passed independently:
`demo-isolation`, `local-only`, `keyboard-workflow`, `csv-export`,
`browser-persistence`, `pwa-install`, `offline-reload`, `backup-roundtrip`,
`original-files-safe`, `accessible-display`, and `filter-undo`.

After deployment, `PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e`
passed all 18 tests. This includes the claim, privacy request, offline,
keyboard, mobile, route, 404, and axe checks.

`verify-url.sh` cold checks passed for `/` and `/demo`; evidence is in
[`evidence/polish-1`](evidence/polish-1). The live root had no console errors,
one h1, `lang=en`, a main landmark, and no images missing alt text. Lighthouse
12.8.2 on the live root scored Performance 100, Accessibility 100, Best
Practices 100, and SEO 100 (FCP 0.9 s, LCP 1.2 s, CLS 0.006, TBT 0 ms).

## Run and deploy

```sh
npm ci
npm test
npm run lint
npm run build
npm run test:e2e
/opt/fleet/lib/deploy-static.sh accessible-photo-catalog dist
```

No external runtime services, analytics, or photo uploads are used. The demo
remains isolated under the documented `demo:` storage namespace.
