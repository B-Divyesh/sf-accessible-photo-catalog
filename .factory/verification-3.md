# Independent verification 3 — FAIL

**Candidate:** `1b0c344704c4db67f0d9dfb1d5f87f93d978994c`
**Live URL:** <https://accessible-photo-catalog.sociobot.in/>
**Verified:** 2026-08-29
**Verdict:** **FAIL — do not release.**

The previously reported deployment-only problem is resolved. The live build is
the candidate and its automated suites pass. The candidate nevertheless fails
the work order's mandatory cold first-read test and has additional accessibility
and claims-contract defects.

## Release-blocking findings

### P0 — the required first action is below the first screen

On a cold live load at 1440×900, the h1 **“Sort local photos with large
controls”** and the audience sentence are visible, but **“Try it with sample
data”** starts at y=903 and ends at y=967. It is wholly below the 900px
viewport. At 390×844, the h1 starts at y=652.6 and ends at y=865.6, the
audience sentence starts at y=933.1, and the sample action starts at y=1050.2.
Thus the mobile first screen does not fully show what the product does, does
not say whom it is for, and does not show the required plain-language first
action. The visible header link merely says **“Demo”** and has no adjacent
explanation.

The actual demo works once found: one click opens `/demo`, shows three sample
photos, focuses **“Sample photo catalog”**, and displays **“Demo — sample data,
nothing is saved.”** That does not cure the explicit first-screen acceptance
failure.

### P1 — 200% text resize loses content and creates horizontal scrolling

With the declared 18px root text size doubled to 36px to simulate 200%
text-only resize, the live root becomes 1326px wide in a 1280px viewport. The
hero h1 has a 413px client width but a 510px scroll width because **“CONTROLS”**
does not wrap. In `/demo`, the fixed 54×54 previous/next controls need 60×82px
for their enlarged glyphs; the 28×28 `T` and `N` key labels need 28×38px, and
**“Nearby photos”** needs 197px in a 170px slot. This violates the supplied
requirement that text resize to 200% without loss, and is high impact for this
low-vision-first product.

### P1 — public claims exist outside `.factory/claims.json`

All registered claim tests pass, but the registry is not complete. Public copy
also promises:

- no account, analytics, advertising, cookies, or tracking scripts
  (`/privacy/`);
- clearing the saved catalog removes browser copies and decisions
  (`/privacy/`);
- no third-party fonts, runtime scripts, payment services, or cloud photo APIs
  (`README.md`);
- that the utility is free (`/privacy/` and `/terms/`).

None of those promises is represented by a claim ID and exactly one matching
`@claim:<id>` sandbox test. Manual source/request inspection supported the
privacy statements, but the claims contract explicitly requires automated
registration for every visitor-reliable claim.

## Other defects

| Severity | Finding | Exact evidence |
| --- | --- | --- |
| P2 | Escape does not always close the settings dialog. | Open **Adjust display**, focus the **Largest** radio, then press Escape. `#settings-dialog.open` remains `true`. The global key handler treats all inputs as editable before checking open dialogs and prevents the native dialog Escape action. This contradicts the keyboard help text. |
| P2 | Several mobile targets are below the required 44×44 CSS px. | At 390px in the populated demo, the home link is 358×42, tag-removal buttons are 92×43 and 80×43, and footer Demo/Privacy/Terms links are 36×21, 45×21, and 37×21. |
| P2 | A malformed backup produces a browser parser error instead of a plain recovery message. | Importing a file containing `{` displays **“Expected property name or '}' in JSON at position 1 (line 1 column 2)”**. It does not explain in user language what happened or what to do next. |

## Mandatory claims gate — all listed commands pass

The checkout was clean and exactly at the candidate before installation. After
`npm ci`, each command in `.factory/claims.json` was run separately before the
rest of QA. Each selected exactly one Chromium test.

| Claim ID | Result | Time |
| --- | --- | ---: |
| `demo-isolation` | PASS | 12.0s |
| `local-only` | PASS | 11.6s |
| `keyboard-workflow` | PASS | 11.5s |
| `csv-export` | PASS | 10.1s |
| `browser-persistence` | PASS | 11.3s |
| `pwa-install` | PASS | 9.5s |
| `offline-reload` | PASS | 9.8s |
| `backup-roundtrip` | PASS | 10.3s |
| `original-files-safe` | PASS | 9.6s |
| `accessible-display` | PASS | 10.6s |
| `filter-undo` | PASS | 9.7s |

The test named `catalog.spec.ts` checks that the sample link is DOM-visible,
not that it lies inside the first viewport. Playwright scrolls it into view for
clicking, so the passing test does not detect the P0 layout failure.

## Clean local quality gates

| Command | Result |
| --- | --- |
| `npm ci` | PASS — 179 packages, 0 vulnerabilities |
| `npm test` | PASS — 9 tests |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — `dist/` produced and release verifier passed |
| `npm run test:e2e` | PASS — 18 Chromium tests in 45.0s |
| `PLAYWRIGHT_BASE_URL=https://accessible-photo-catalog.sociobot.in npm run test:e2e` | PASS — 18 live Chromium tests in 41.6s |

The production build contains 31,397 bytes of initial app JS and 20,461 bytes
of CSS uncompressed. The AVIF hero is 47,421 bytes. These are below the supplied
200 KB JS, 50 KB CSS, and 300 KB hero budgets.

## End-to-end product evidence

- The demo opens three realistic bundled photos. Keyboard classification,
  navigation, tags, queued filename, note, filters, Undo, CSV export, JSON
  export/import, reset, and Start for real all passed in the claim/full suites.
- Independent boundary checks capped and de-duplicated 25 submitted tags to 20,
  capped a note at 1,000 characters, changed `coast/rail:2026` to
  `coast-rail-2026.svg`, and produced a four-line CSV for three sample photos.
- A synthetic 50-photo browser input produced 50 catalog rows in CSV.
- An unsupported text file produced a supported-formats recovery message. A
  corrupt JPEG stayed in the catalog and showed the designed image-error state.
  Importing metadata before opening its photo folder produced the correct next
  step. The malformed-JSON wording defect is listed above.
- No console error, page error, or failed request occurred in these flows.

## Accessibility and responsive evidence

- Axe 4.10.2 found zero serious or critical WCAG A/AA findings on root, demo,
  workspace, high contrast, privacy, terms, and 404 states.
- At 390×844 with the largest built-in text setting and high contrast,
  `scrollWidth` equaled `innerWidth` at 390px. The separate 200% text-resize
  failure is documented above.
- Reduced-motion emulation left no non-zero transition or animation durations.
- The first Tab on the root reveals the skip link; Enter focuses `#main`.
  Focus rings are solid 3px. Their measured contrast is 6.38:1 in light mode
  and 13.53:1 in high contrast.
- Keyboard focus traversed the demo controls without a trap. The settings
  dialog Escape exception is documented above.

## Privacy, security, routing, and PWA evidence

- A full independent demo workflow generated 32 requests. Every request was to
  `https://accessible-photo-catalog.sociobot.in`; there were no failed requests,
  console errors, analytics, fonts, third-party scripts, or API calls.
- Response headers include HSTS, `nosniff`, strict-origin referrer policy,
  Permissions-Policy, and a CSP restricted to self with `frame-ancestors
  'none'`. Hashed JS/CSS use one-year immutable caching; `/sw.js` is `no-cache`.
- Root, demo, privacy, terms, robots, sitemap, manifest, and offline page return
  200. A made-up route returns the designed page with HTTP 404. All discovered
  internal links resolve.
- The manifest returns `application/json` and declares standalone display,
  192px/512px icons, and a maskable icon. A fresh online demo visit followed by
  an offline reload restored **Photo 1 of 3** and showed the offline banner.
- Service-worker update simulation inserted
  `large-type-catalog-verifier-old`; registration removed it, retained only
  `large-type-catalog-9751d532dc39`, and displayed **“The catalog was updated
  and is ready offline.”**
- This is a static product with no server endpoint, product-unlock call, or
  sign-in. Rate-limit/429 and Microsoft Entra checks are not applicable.

## Deployment identity and performance

Fresh `dist/` byte-matches the live deployment:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `d7fa1cdfa84673b975f4d992ee09edcd88d2b717d8cf9affe117464574dd2799` |
| `assets/app-B_5ItAX2.js` | `43fbe621eacb4ad86a8487de9c8a3b7992a178f5f772cb12ff08adb679155174` |
| `assets/style-CceQNqJO.css` | `c3ccfea611163b82ca5bae96b45a1439fdbcbc340abbbd7ff56dbfec324a423a` |
| `sw.js` | `751eae916da763329afefa08c982f5e8c91eb24d98f8123db8f050f10edc61b2` |
| `manifest.webmanifest` | `c51c1a7033b9c8bee8b899c0b3132275e1236c9967c180ad45faa9f18f8af838` |
| `404.html` | `3d84bd57114d6410859bbdf8bb02c467ff5d9e5568808e25b05029decc9313fe` |

Fresh mobile Lighthouse 12.8.2 on the live root scored Performance 91,
Accessibility 100, Best Practices 100, and SEO 100. FCP was 1.0s, LCP 1.3s,
CLS 0.006, TBT 380ms, and transferred content 94 KiB. INP was not available for
the synthetic no-interaction run. The factory `verify-url.sh` also passed root
and demo with zero console errors, one h1, `lang=en`, a main landmark, and no
missing image alt text.

## Required remediation

1. Put the audience sentence, exact sample-data action, adjacent explanation,
   and first-screen facts inside the initial 1440×900 and 390×844 viewports.
2. Reflow or wrap all content and controls at 200% text size without horizontal
   scrolling or clipping.
3. Register and add one sandbox test for every remaining README/privacy/terms
   claim, or remove those promises.
4. Let Escape close dialogs regardless of which dialog control has focus.
5. Make every mobile interactive target at least 44×44 CSS px.
6. Replace raw JSON parser text with a plain error and one recovery step.
