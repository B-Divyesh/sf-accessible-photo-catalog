# Copy audit

Audited 2026-08-29 against the complete landing page. Hyphenated terms count
as one word. Every item is 22 words or fewer and contains no banned marketing
word.

| Landing text | Words | Result |
| --- | ---: | --- |
| Skip to catalog | 3 | Pass |
| Private photo sorter | 3 | Pass |
| Large Type Catalog | 3 | Pass |
| Demo | 1 | Pass |
| Privacy | 1 | Pass |
| Terms | 1 | Pass |
| Local photo sorting | 3 | Pass |
| Sort local photos with large controls | 6 | Pass: job headline |
| For low-vision people and older family members who need a clear way to sort one photo folder. | 18 | Pass |
| Try it with sample data | 6 | Pass: `demo-isolation` |
| Choose your photo folder | 4 | Pass: `folder-open` |
| It opens three sample photos. | 5 | Pass: `demo-isolation` |
| Your folder opens only after you choose it. | 8 | Pass: `folder-open` |
| Photos and catalog data stay in this browser | 8 | Pass: `local-only` |
| Works with a keyboard | 4 | Pass: `keyboard-workflow` |
| Works offline | 2 | Pass: `offline-reload` |
| Art-deco observation desk with blank photographs traveling along three sorting lanes | 11 | Pass: useful image alternative |
| How it works | 3 | Pass |
| Sort a folder in three steps | 6 | Pass |
| Choose a folder. | 3 | Pass |
| Open photos after you choose a folder. | 7 | Pass: `folder-open` |
| Mark each photo. | 3 | Pass |
| Keep, review, or reject it. | 5 | Pass: `keyboard-workflow` |
| Export decisions. | 2 | Pass: `csv-export` |
| Save a CSV file when you finish. | 8 | Pass: `csv-export` |
| What this catalog does not do | 6 | Pass |
| It does not upload, delete, move, or rename your original photos. | 11 | Pass: `local-only`, `original-files-safe` |
| Read the privacy details | 4 | Pass |
| Photos and catalog data stay in this browser. | 8 | Pass: `local-only` |
| Built by Param Factory · v1.1.2 · Original generated artwork | 8 | Pass: provenance is in `.factory/design.md` |

Read aloud: “Sort local photos with large controls, for low-vision people and
older family members. Try it with sample data.” It states the job, audience,
and first action in one breath.

## Terminology

| Concept | Product term |
| --- | --- |
| A chosen local directory | folder |
| A stored set of photo records | catalog |
| Keep, Review, Reject, or Unreviewed | decision |
| A filename written to export only | export filename |
| The isolated try-out | demo |
| Reusable decisions without photos | backup |
