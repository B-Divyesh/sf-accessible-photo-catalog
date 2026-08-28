# Independent verification — FAIL

**Candidate:** `5d7c88d400dc6d06adc47c4af3b7008cdeb99f49`
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Verified:** 2026-08-28
**Verdict:** **FAIL — do not release.**

## Release-blocking findings

### P0 — required claims registry and claim tests are absent

The clean candidate has no `.factory/claims.json`. This is an explicit release-blocking condition in the work order, so there were no claim commands to execute before other QA. The page and README nevertheless make testable claims including local-only/no upload, keyboard workflow, CSV export, persistence, installation, and offline reload. None have the required one-to-one `@claim:<id>` demo-entry test.

### P0 — no one-click, isolated sample-data demo

Cold live-page test found **zero** controls named “Try it with sample data.” `/demo` returns the SPA fallback, but renders the identical empty “Choose a photo folder” screen: no realistic sample, no `Demo — sample data, nothing is saved` banner, no Reset demo/Start for real actions, and no separate demo storage namespace. `.factory/demo.md` is also absent. This prevents the required clean-state claim sandbox from existing.

### P0 — first-read acceptance test fails

The cold first screen says “See one photo. Make one clear choice.” and offers “Choose a photo folder.” It conveys a photo sorting task and an initial action, but does not say it is for low-vision people or older family members in plain words. More decisively, it has no one-click sample-data action. The supplied acceptance rule says either condition fails the candidate.

## Other defects

| Severity | Finding | Evidence |
| --- | --- | --- |
| P2 | No designed 404, sitemap, or static-host routing/security configuration. | `/not-a-real-page` returns HTTP 200 app shell; `/sitemap.xml` returns 404. No `404` asset or `staticwebapp.config.json` is in the candidate. |
| P2 | Production omits a Content-Security-Policy and Permissions-Policy. | Live headers include HSTS, `nosniff`, and referrer policy, but no CSP or Permissions-Policy. |
| P2 | Hashed production assets are not immutably cached. | Live app JS and CSS both return `Cache-Control: public, must-revalidate, max-age=30`, not long-lived immutable caching required for the PWA. |
| P2 | PWA update behavior is not robustly versioned. | `public/sw.js` fixes the cache name at `large-type-catalog-v1`; app JS/CSS are absent from its precache list. A normal application build can change while this service worker and cache version remain unchanged, so the stipulated update path cannot reliably announce/replace an existing offline shell. |
| P3 | Manifest is served as generic binary. | `/manifest.webmanifest` responds `Content-Type: application/octet-stream` rather than a web-manifest media type. |
| P3 | Route metadata is incomplete. | No canonical URL, Open Graph/Twitter metadata, or social image is present in source/build. |

## Evidence collected

### Clean candidate and local quality gates

The tree started clean at the requested SHA. I ran `npm ci`, then:

| Command | Result |
| --- | --- |
| Required claims commands | **BLOCKED/FAIL** — `.factory/claims.json` does not exist. |
| `npm test` | PASS — 6 Vitest assertions. |
| `npm run build` | PASS — typecheck plus Vite build; `dist/` produced. |
| `npm run test:e2e` | PASS — 3 Chromium tests. |

There is no lint script. The build’s largest initial JS is 26.77 KB (8.74 KB gzip) and CSS is 17.60 KB (4.73 KB gzip), within the supplied static budgets.

### Live deployment identity and browser behavior

The live deployment matches this candidate, not a different failed deploy:

- SHA-256 matches for local and live `index.html`: `6139351d792b3390b17240ef5c897ea5f79d7d4f8cccca614327715a65e84911`.
- It matches for `app-B4tfjC-D.js`: `3a9680fa36f334e4577ce3ed20dc55af62bdc07cef444c55fe8b260595f16841`.
- It matches for `style-Cbpw_08K.css`: `f1e612de2c3a783c6725f15f46338a14ba18681658705fb4cfd6c15e59aad721`.
- The served service worker exactly matches `public/sw.js`.

Fresh Chromium checks against the live URL passed for the non-demo core flow:

- Imported the shipped two-photo fixture, classified by keyboard, added 25 tags (correctly capped at 20), queued a sanitised filename, downloaded CSV, and confirmed catalog persistence after reload.
- A folder containing only `notes.txt` shows the supported-files recovery message.
- Empty, active, and high-contrast states have zero axe serious/critical findings. Tab navigation shows a visible 3px solid focus outline.
- At 390×844 there is no horizontal overflow. Reduced-motion transition duration is `1e-05s`.
- A first-visit service worker controls the page after reload; offline reload succeeds and displays the offline banner.
- No console/page errors or cross-origin requests occurred during the full live normal workflow. This supports the local-only implementation but does **not** replace the missing required privacy claim test in a demo sandbox.
- No server-side product endpoint exists, therefore rate-limit testing and sign-in/Entra validation are not applicable.

Independent Lighthouse on the live root (Chromium headless) scored Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.4 s, CLS 0, TBT 100 ms. This does not override the P0 acceptance failures above.

## Required remediation before re-verification

1. Add a complete `.factory/claims.json`; add and run exactly one clean-demo observable test for every on-page/README claim.
2. Add `/demo` (or `?demo=1`) with one-click realistic sample data, persistent demo/reset/start-real controls, isolated `demo:` storage, and `.factory/demo.md`.
3. Rewrite the first screen so it names the low-vision/older-user audience in plain words and exposes “Try it with sample data.”
4. Add a real 404, sitemap, canonical/social metadata, production CSP, immutable hashed-asset caching, and a build-versioned service-worker update strategy; then re-run the full claims and PWA update tests.
