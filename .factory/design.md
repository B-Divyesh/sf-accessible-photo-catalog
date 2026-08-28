# Large Type Catalog — visual thesis

## Direction: the observation deck

Large Type Catalog borrows the confidence and legibility of a 1930s art-deco
transit poster: a journey broken into unambiguous stops, enormous destination
type, geometric sight-lines, and a restrained signal palette. The catalog is an
"observation deck" over a private photo collection. It should feel purposeful
and warm rather than clinical, and distinctive without decorating over the
photographs users came to inspect.

The metaphor earns its place in the workflow. Photos are "stops" in a route;
the progress rail communicates position; Keep, Reject, and Review are large
platform signs; brass corner rules frame the current photograph like a station
window. Decoration recedes once a folder is open.

## Palette

All colors are encoded as CSS custom properties and used semantically.

| Token | Day mode | Night/high-contrast mode | Purpose |
| --- | --- | --- | --- |
| Paper/background | `#F4E9D0` | `#080D12` | warm poster stock / near-black |
| Surface | `#FFF9EA` | `#121B23` | controls and working panels |
| Ink/text | `#17242D` | `#FFF8DF` | primary copy (AA/AAA against background) |
| Muted ink | `#526068` | `#C7D2D8` | secondary copy (AA) |
| Signal/accent | `#B73525` | `#FFB49D` | current stop and primary action |
| Brass | `#A46712` | `#FFD166` | focus, geometry, review state |
| Keep | `#176B50` | `#79E0B5` | positive state, always paired with text/icon |
| Reject | `#9F2F2F` | `#FFAAA2` | destructive state, always paired with text/icon |
| Line | `#8E826E` | `#758592` | strong boundaries and routes |

The standard theme targets at least 4.5:1 for text; the night treatment raises
foreground separation and is labeled "High contrast" in the interface. State
is always conveyed with words and symbols, never color alone.

## Type and scale

No web fonts are loaded. Headings use `Arial Narrow`, `Aptos Narrow`, and
`Roboto Condensed` where locally available, falling back to a bold sans serif.
The narrow, uppercase display face evokes timetable lettering while allowing
very large labels. Body and control text use `Atkinson Hyperlegible Next` when
installed and a robust system sans-serif fallback. This avoids external font
requests and stays crisp under 200% zoom.

The default body is 18px and users can choose 18, 22, or 26px. The fluid display
scale runs from 1rem labels through 1.2rem body, 1.55rem panel headings, 2.2rem
page headings, and a 3.8rem wordmark. Line height is 1.5 for prose. File counts
and position use tabular figures.

## Space, shape, and hierarchy

An 8px base rhythm produces 8, 16, 24, 32, 48, and 64px steps. Interactive
targets are at least 48px tall and separated by at least 8px. Corners are
clipped or minimally rounded (0–6px); paired diagonal cuts, double rules, and
sunburst-like route lines supply the art-deco grammar. The current photo gets
the greatest area and clearest border. Settings and help are progressive
disclosures, not permanent dashboard furniture.

At 390px, secondary copy and ornamental route ticks disappear, metadata stacks,
the image keeps a generous viewport, and the three classification controls form
a reachable grid. Nothing relies on hover. Safe-area padding protects installed
mode controls.

## Interaction grammar

- The primary sequence is Choose folder → inspect → Keep/Reject/Review → Next.
- Keyboard shortcuts are printed directly on controls: K, X, R, arrows, T, N.
- Classification advances to the next image and announces the action.
- Rename and tag edits save on Enter or their explicit buttons; Escape cancels.
- Reject is reversible through Undo and can be changed at any time.
- Selection enters from the direction of travel over 180ms; focus uses a solid
  3px brass ring plus offset so it remains perceivable independent of color.

## Motion policy

Only continuity moves: the progress marker glides, the photo changes with a
short horizontal translation, and status feedback fades in over 150–220ms.
There are no looping or ambient animations. Under `prefers-reduced-motion`, all
translations and smooth scrolling become instant; state remains clear through
labels, borders, and live announcements.

## Original asset plan and provenance

The empty-state illustration is a generated art-deco station observation window:
an abstract stack of unlabeled photographs, route lines, and a sunrise aperture.
It explains the private-folder workflow without implying AI recognition. Product
icons are hand-authored inline SVG/typographic symbols using simple geometric
forms; screenshots or third-party icon sets are not used.

### Prompt sheet

**Subject:** an empty art-deco railway observation lounge arranged as a private
photo sorting desk, abstract blank photographic prints moving along three clear
route lines toward keep, review, and reject trays; no people.

**World/materials:** 1930s transit-poster geometry, screen-printed cream paper,
midnight blue ink, vermilion signal blocks, aged brass linework, subtle paper
grain; flat graphic shapes rather than a UI screenshot.

**Light/lens:** centered sunrise aperture, frontal orthographic poster
composition, bold negative space, crisp silhouette, calm high-contrast light.

**Palette words:** warm ticket cream, midnight rail blue, signal vermilion,
patinated brass, forest green.

**Negative list:** no text, letters, numbers, watermark, logo, brand, people,
faces, hands, gradients, photorealistic device mockups, illegible signage,
copyrighted characters, thin low-contrast details.

**Generation record:** Azure OpenAI image generation via the factory
`gen-image.sh` tool, deployment `factory-image`, generated 2026-08-28. The full
derived prompt and tool parameters live beside the source image in
`assets/src/empty-observation.json`. Generated specifically for this product;
original asset, disclosed in the footer.
