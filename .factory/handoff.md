# Polish 2 handoff — 2026-08-29

**Repair commit:** `2a365dc3e623fb2bfaf84231ab51506d8771da47`

**Base reviewed:** `fd82bc36846f6f6794b0e159e9686420d4580714`

**Work-order deploy:** `e54a36f0-f625-4c99-aa49-12f51edb98a3`
**Live:** <https://accessible-photo-catalog.sociobot.in/>

## Completed

Polish 2 closes every F-1 and F-2 finding in the adversarial reports. The
workspace now truthfully explains that decisions are saved in this browser and
included in exports. Storage wording is consistent, the privacy deletion path
names the current controls, folder opening and nearby-photo navigation are
registered claims, and all remaining metaphor/jargon/button labels are plain.
The sample order is stable across reset, online reload, and offline reload.

The product remains a static, local-first offline PWA with its art-deco
observation-deck identity. No photo, account, payment, analytics, or cloud API
was added.

## Verification

From a fresh clone of `2a365dc` in `/tmp/accessible-photo-catalog-clean.9IfrnC`:

```text
npm ci                 PASS — 178 packages, 0 vulnerabilities
npm test               PASS — 9 tests
npm run typecheck      PASS
npm run lint           PASS
npm run build          PASS — dist/ produced; JS 31,981 B, CSS 21,757 B
npm run test:e2e       PASS — 30 Chromium tests
```

Every one of the 16 exact commands in `.factory/claims.json` was also run
independently in that clean clone and selected one passing test:

```text
demo-isolation, local-only, keyboard-workflow, csv-export,
browser-persistence, pwa-install, offline-reload, backup-roundtrip,
original-files-safe, accessible-display, filter-undo, folder-open,
private-runtime, clear-data, browser-data-clear, free-use
```

The full live run also passed all 30 Chromium tests. It includes offline reload,
request-origin privacy checks, first-screen 1440×900 and 390×844 checks, 200%
text reflow, keyboard dialogs, mobile target sizes, metadata/404 links, and
axe WCAG A/AA scans. `verify-url.sh` then passed the cold live root and demo:
both returned 200 with zero console errors, `lang=en`, one h1, a main landmark,
complete image alt text, and labeled buttons. Live evidence is in
`.factory/evidence/polish-2/live-root/` and `live-demo/`.

The live headers include the self-only CSP with `frame-ancestors 'none'`,
Permissions-Policy, Referrer-Policy, and `nosniff`; unknown routes return the
designed HTTP 404.

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

See `.factory/polish-2.md` for the required finding-by-finding map.

Known gaps: none.
