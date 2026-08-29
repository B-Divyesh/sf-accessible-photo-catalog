# Demo sandbox

Open <https://accessible-photo-catalog.sociobot.in/demo>, use
<https://accessible-photo-catalog.sociobot.in/?demo=1>, or select **Try it
with sample data** on the first screen.

The demo opens three bundled SVG photos: a family picnic marked Keep, a coastal
train marked Review, and an unreviewed garden birthday. Their tags and notes
make filters, keyboard sorting, rename queueing, CSV export, JSON backup, and
offline reload ready to test without setup.

Demo photo records use the IndexedDB database `demo:large-type-catalog`.
Preferences and the folder label use `demo:` local-storage keys. The normal
catalog continues to use `large-type-catalog` and unprefixed local-storage keys.
Demo mode never reads or writes that normal catalog.

**Reset demo** clears the demo database, restores the three bundled records,
and resets demo display preferences.
**Start for real** clears the demo database and every `demo:` local-storage key,
then returns to the empty real catalog. The demo can be opened directly while
offline after one online visit because its route, app code, and samples are in
the versioned app-shell cache.
