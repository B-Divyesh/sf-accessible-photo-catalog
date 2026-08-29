import './style.css';
import { buildCsv, buildJson, createPhoto, formatBytes, isImageFile, parseTags, safeProposedName, statusCounts } from './catalog';
import { clearPhotos, configureStorage, loadPhotos, replacePhotos, savePhoto } from './storage';
import { STATUS_LABEL, type CatalogExport, type CatalogPhoto, type PhotoStatus } from './types';

type Filter = 'all' | PhotoStatus;
type DeferredInstall = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Application root was not found.');

const currentUrlState = new URL(window.location.href);
const isDemo = currentUrlState.pathname.replace(/\/$/, '') === '/demo' || currentUrlState.searchParams.get('demo') === '1';
const storagePrefix = isDemo ? 'demo:' : '';
configureStorage(isDemo);
document.body.classList.toggle('empty-catalog', !isDemo);
if (isDemo) {
  document.title = 'Demo — Large Type Catalog';
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', 'https://accessible-photo-catalog.sociobot.in/demo');
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', 'Demo — Large Type Catalog');
  document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', 'https://accessible-photo-catalog.sociobot.in/demo');
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', 'Demo — Large Type Catalog');
}

function localKey(key: string): string {
  return `${storagePrefix}${key}`;
}

function clearDemoPreferences(): void {
  Object.keys(localStorage).filter((key) => key.startsWith('demo:')).forEach((key) => localStorage.removeItem(key));
}

app.innerHTML = `
  <a class="skip-link" href="#main">Skip to catalog</a>
  <div class="offline-banner" id="offline-banner" role="status" hidden>
    <span aria-hidden="true">◇</span> Offline. Your saved catalog still works in this browser.
  </div>
  <aside class="demo-banner" id="demo-banner" aria-label="Demo controls" ${isDemo ? '' : 'hidden'}>
    <strong>Demo — sample data, nothing is saved</strong>
    <span>Changes stay in a separate demo catalog.</span>
    <div><button id="reset-demo-button" type="button">Reset demo</button><button id="start-real-button" type="button">Start for real</button></div>
  </aside>
  <header class="masthead">
    <a class="identity" href="/" aria-label="Large Type Catalog home">
      <svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M4 46 32 6l28 40H4Z"/><circle cx="32" cy="34" r="10"/><path d="M10 52h44v7H10z"/></svg>
      <span><span class="eyebrow">Private photo sorter</span><span class="wordmark">Large Type Catalog</span></span>
    </a>
    <nav class="site-nav" aria-label="Site navigation">
      <a href="/demo" ${isDemo ? 'aria-current="page"' : ''}>Demo</a>
      <a href="/privacy/">Privacy</a>
      <a href="/terms/">Terms</a>
    </nav>
    <div class="session-count" id="session-count" aria-live="polite">No folder open</div>
    <nav class="top-actions" aria-label="Catalog actions">
      <button class="button primary" id="choose-button" type="button"><span aria-hidden="true">＋</span> Choose folder</button>
      <button class="button" id="export-button" type="button" disabled><span aria-hidden="true">⇩</span> Export CSV</button>
      <button class="button compact" id="settings-button" type="button" aria-haspopup="dialog">Adjust display</button>
      <button class="button compact" id="help-button" type="button" aria-haspopup="dialog">View keyboard shortcuts</button>
    </nav>
    <input id="folder-input" type="file" accept="image/*,.heic,.heif" multiple webkitdirectory hidden />
  </header>

  <main id="main" tabindex="-1">
    <section class="empty-state" id="empty-state" aria-labelledby="page-title">
      <picture class="poster-frame">
        <source type="image/avif" srcset="/assets/empty-observation.avif" />
        <source type="image/webp" srcset="/assets/empty-observation.webp" />
        <img src="/assets/empty-observation.jpg" width="1152" height="768" fetchpriority="high" decoding="async" alt="Art-deco observation desk with blank photographs traveling along three sorting lanes" />
      </picture>
      <div class="empty-copy">
        <p class="route-label">Local photo sorting</p>
        <h1 id="page-title" tabindex="-1">Sort local photos with large controls</h1>
        <p>For low-vision people and older family members who need a clear way to sort one photo folder.</p>
        <div class="hero-actions">
          <a class="button primary jumbo" id="demo-button" href="/demo">Try it with sample data</a>
          <button class="button jumbo" id="empty-choose-button" type="button">Choose your photo folder</button>
        </div>
        <p class="action-note">It opens three sample photos. Your folder opens only after you choose it.</p>
        <ul class="trust-list" aria-label="Privacy and compatibility">
          <li><span aria-hidden="true">◆</span> Photos and catalog data stay in this browser</li>
          <li><span aria-hidden="true">⌨</span> Works with a keyboard</li>
          <li><span aria-hidden="true">◐</span> Works offline</li>
        </ul>
      </div>
    </section>

    <section class="workspace" id="workspace" aria-labelledby="page-title" hidden>
      <div class="route-board">
        <div>
          <p class="eyebrow">Current photo</p>
          <div id="workspace-title-slot"></div>
          <h2>Photo <span id="position">1 of 1</span></h2>
        </div>
        <label class="filter-label" for="filter-select">Show
          <select id="filter-select">
            <option value="all">All photos</option>
            <option value="unreviewed">Unreviewed</option>
            <option value="keep">Keep</option>
            <option value="review">Review</option>
            <option value="reject">Reject</option>
          </select>
        </label>
        <div class="count-track" id="count-track" aria-label="Decision totals"></div>
      </div>

      <progress class="progress-rail" id="progress-marker" max="100" value="0" aria-label="Catalog progress"></progress>

      <div class="filter-empty" id="filter-empty" hidden>
        <span class="filter-empty-symbol" aria-hidden="true">◇</span>
        <h3>No photos match this filter</h3>
        <p>Choose another decision filter to continue.</p>
        <button class="button" id="show-all-button" type="button">Show all photos</button>
      </div>

      <div id="photo-workspace">
        <div class="photo-layout">
          <section class="viewer" aria-label="Current photo">
            <div class="photo-window">
              <button class="nav-arrow previous" id="previous-button" type="button" aria-label="Previous photo"><span aria-hidden="true">←</span></button>
              <figure>
                <img id="current-image" src="" alt="" decoding="async" />
                <figcaption>
                  <span class="file-name" id="file-name"></span>
                  <span class="file-meta" id="file-meta"></span>
                </figcaption>
              </figure>
              <button class="nav-arrow next" id="next-button" type="button" aria-label="Next photo"><span aria-hidden="true">→</span></button>
              <div class="image-error" id="image-error" role="alert" hidden>
                <strong>This photo could not be displayed.</strong>
                <span>The file is still in your catalog. Move to another photo or export its row.</span>
              </div>
            </div>

            <div class="decision-station" aria-label="Classify current photo">
              <button class="decision keep" data-status="keep" type="button"><kbd>K</kbd><span><strong>Keep</strong><small>Include this photo</small></span></button>
              <button class="decision review" data-status="review" type="button"><kbd>R</kbd><span><strong>Review</strong><small>Decide later</small></span></button>
              <button class="decision reject" data-status="reject" type="button"><kbd>X</kbd><span><strong>Reject</strong><small>Mark in export only</small></span></button>
            </div>
            <p class="decision-note">Original photos are not deleted or renamed. Your decisions are saved in this browser and included in exports.</p>
          </section>

          <aside class="details" aria-labelledby="details-title">
            <div class="details-heading">
              <div><p class="eyebrow">Photo details</p><h3 id="details-title">Label this photo</h3></div>
              <span class="status-ticket" id="status-ticket">Unreviewed</span>
            </div>

            <form id="tag-form">
              <label for="tag-input"><span class="field-key">T</span> Tags <small>Separate with commas</small></label>
              <div class="field-action"><input id="tag-input" type="text" maxlength="240" autocomplete="off" /><button class="button" type="submit">Save tags</button></div>
            </form>
            <div class="tag-list" id="tag-list" aria-label="Saved tags"></div>

            <form id="rename-form">
              <label for="rename-input"><span class="field-key">N</span> Filename for export</label>
              <div class="field-action"><input id="rename-input" type="text" maxlength="240" autocomplete="off" /><button class="button" type="submit">Queue name</button></div>
              <p class="field-hint">Your original file is not changed.</p>
            </form>

            <form id="note-form">
              <label for="note-input">Note <small>Optional</small></label>
              <textarea id="note-input" rows="3" maxlength="1000"></textarea>
              <button class="button" type="submit">Save note</button>
            </form>
          </aside>
        </div>

        <section class="nearby" aria-labelledby="nearby-title">
          <div><p class="eyebrow">In this folder</p><h3 id="nearby-title">Nearby photos</h3></div>
          <div class="thumbnail-line" id="thumbnail-line"></div>
        </section>
      </div>
    </section>

    <section class="landing-details" id="landing-details" aria-label="About the catalog">
      <section aria-labelledby="how-it-works-title">
        <p class="route-label">How it works</p>
        <h2 id="how-it-works-title">Sort a folder in three steps</h2>
        <ol class="steps-list">
          <li><strong>Choose a folder.</strong><span>Open photos after you choose a folder.</span></li>
          <li><strong>Mark each photo.</strong><span>Keep, review, or reject it.</span></li>
          <li><strong>Export decisions.</strong><span>Save a CSV file when you finish.</span></li>
        </ol>
      </section>
      <section class="limits-panel" aria-labelledby="limits-title">
        <p class="route-label">Privacy</p>
        <h2 id="limits-title">What this catalog does not do</h2>
        <p>It does not upload, delete, move, or rename your original photos.</p>
        <a href="/privacy/">Read the privacy details</a>
      </section>
    </section>
  </main>

  <footer>
    <p>Photos and catalog data stay in this browser.</p>
    <nav aria-label="Legal"><a href="/demo">Demo</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav>
    <p class="generated-note">Built by Param Factory · v1.1.1 · Original generated artwork</p>
  </footer>

  <dialog id="settings-dialog" aria-labelledby="settings-title">
    <form method="dialog" class="dialog-shell">
      <div class="dialog-heading"><div><p class="eyebrow">Display settings</p><h2 id="settings-title">Adjust the display</h2></div><button class="icon-button" value="close" aria-label="Close">×</button></div>
      <fieldset>
        <legend>Text size</legend>
        <label><input type="radio" name="text-size" value="standard" /> Large</label>
        <label><input type="radio" name="text-size" value="larger" /> Larger</label>
        <label><input type="radio" name="text-size" value="largest" /> Largest</label>
      </fieldset>
      <label class="switch-row"><span><strong>High contrast</strong><small>Use light text on a near-black background.</small></span><input id="contrast-toggle" type="checkbox" /></label>
      <button class="button" id="install-button" type="button" hidden>Install the catalog</button>
      <hr />
      <button class="button" id="json-export-button" type="button" disabled>Export backup (JSON)</button>
      <button class="button" id="json-import-button" type="button">Import backup</button>
      <input id="json-input" type="file" accept="application/json,.json" hidden />
      <button class="button danger-outline" id="clear-button" type="button" disabled>Clear saved catalog</button>
      <button class="button primary full" value="close">Close display settings</button>
    </form>
  </dialog>

  <dialog id="help-dialog" aria-labelledby="help-title">
    <form method="dialog" class="dialog-shell help-shell">
      <div class="dialog-heading"><div><p class="eyebrow">Keyboard shortcuts</p><h2 id="help-title">Sort without a mouse</h2></div><button class="icon-button" value="close" aria-label="Close keyboard help">×</button></div>
      <dl class="shortcut-list">
        <div><dt><kbd>←</kbd> <kbd>→</kbd></dt><dd>Previous or next photo</dd></div>
        <div><dt><kbd>K</kbd></dt><dd>Keep and advance</dd></div>
        <div><dt><kbd>R</kbd></dt><dd>Review later and advance</dd></div>
        <div><dt><kbd>X</kbd></dt><dd>Reject and advance</dd></div>
        <div><dt><kbd>T</kbd></dt><dd>Focus tags</dd></div>
        <div><dt><kbd>N</kbd></dt><dd>Focus queued filename</dd></div>
        <div><dt><kbd>?</kbd></dt><dd>Open this guide</dd></div>
      </dl>
      <p>In a text field, press <kbd>Enter</kbd> to save. Press <kbd>Escape</kbd> to close a dialog.</p>
      <button class="button primary full" value="close">Close keyboard shortcuts</button>
    </form>
  </dialog>

  <dialog id="replace-dialog" aria-labelledby="replace-title">
    <form method="dialog" class="dialog-shell">
      <div><p class="eyebrow">Change folder</p><h2 id="replace-title">Replace this catalog?</h2></div>
      <p>Opening another folder removes the current photos and decisions from this browser. Export first if you need them.</p>
      <div class="dialog-actions"><button class="button" value="cancel">Cancel</button><button class="button danger" id="confirm-replace" value="replace">Replace catalog</button></div>
    </form>
  </dialog>

  <dialog id="clear-dialog" aria-labelledby="clear-title">
    <form method="dialog" class="dialog-shell">
      <div><p class="eyebrow">Clear local data</p><h2 id="clear-title">Remove this saved catalog?</h2></div>
      <p>This removes the locally stored photo copies and decisions from this browser. Your original folder is not touched.</p>
      <div class="dialog-actions"><button class="button" value="cancel">Cancel</button><button class="button danger" id="confirm-clear" value="clear">Clear saved catalog</button></div>
    </form>
  </dialog>

  <div class="toast" id="toast" role="status" aria-live="polite" hidden><span id="toast-message"></span><button id="undo-button" type="button" hidden>Undo</button></div>
  <div class="sr-only" id="announcer" aria-live="assertive" aria-atomic="true"></div>
`;

function byId<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing element #${id}`);
  return element as T;
}

const folderInput = byId<HTMLInputElement>('folder-input');
const emptyState = byId<HTMLElement>('empty-state');
const workspace = byId<HTMLElement>('workspace');
const landingDetails = byId<HTMLElement>('landing-details');
const pageTitle = byId<HTMLHeadingElement>('page-title');
const workspaceTitleSlot = byId<HTMLElement>('workspace-title-slot');
const photoWorkspace = byId<HTMLElement>('photo-workspace');
const filterEmpty = byId<HTMLElement>('filter-empty');
const filterSelect = byId<HTMLSelectElement>('filter-select');
const image = byId<HTMLImageElement>('current-image');
const imageError = byId<HTMLElement>('image-error');
const settingsDialog = byId<HTMLDialogElement>('settings-dialog');
const helpDialog = byId<HTMLDialogElement>('help-dialog');
const replaceDialog = byId<HTMLDialogElement>('replace-dialog');
const clearDialog = byId<HTMLDialogElement>('clear-dialog');
const announcer = byId<HTMLElement>('announcer');
const toast = byId<HTMLElement>('toast');
const toastMessage = byId<HTMLElement>('toast-message');
const undoButton = byId<HTMLButtonElement>('undo-button');

let photos: CatalogPhoto[] = [];
let currentId = '';
let filter: Filter = 'all';
let folderName = localStorage.getItem(localKey('catalog-folder')) || 'photo-folder';
let currentUrl = '';
let thumbnailUrls: string[] = [];
let pendingFiles: File[] = [];
let toastTimer = 0;
let deferredInstall: DeferredInstall | null = null;
let undoState: { id: string; previous: PhotoStatus } | null = null;

const demoSamples = [
  { file: 'family-picnic.svg', status: 'keep' as const, tags: ['family', 'print'], note: 'Make a copy for Mum.' },
  { file: 'coastal-train.svg', status: 'review' as const, tags: ['holiday', 'train'], note: 'Check the date with Sam.' },
  { file: 'garden-birthday.svg', status: 'unreviewed' as const, tags: ['birthday'], note: '' },
];

function visiblePhotos(): CatalogPhoto[] {
  return filter === 'all' ? photos : photos.filter((photo) => photo.status === filter);
}

function getCurrent(): CatalogPhoto | undefined {
  return photos.find((photo) => photo.id === currentId);
}

function announce(message: string): void {
  announcer.textContent = '';
  window.setTimeout(() => { announcer.textContent = message; }, 20);
}

function showToast(message: string, canUndo = false): void {
  window.clearTimeout(toastTimer);
  toastMessage.textContent = message;
  undoButton.hidden = !canUndo;
  toast.hidden = false;
  toastTimer = window.setTimeout(() => { toast.hidden = true; }, 6500);
}

function revokeImageUrls(): void {
  if (currentUrl) URL.revokeObjectURL(currentUrl);
  thumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
  currentUrl = '';
  thumbnailUrls = [];
}

function renderCounts(): void {
  const counts = statusCounts(photos);
  byId('count-track').innerHTML = `
    <span><b>${counts.keep}</b> Keep</span><span><b>${counts.review}</b> Review</span>
    <span><b>${counts.reject}</b> Reject</span><span><b>${counts.unreviewed}</b> Left</span>`;
  byId('session-count').textContent = photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'} · ${counts.unreviewed} left` : 'No folder open';
}

function renderThumbnails(visible: CatalogPhoto[], index: number): void {
  thumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
  thumbnailUrls = [];
  const start = Math.max(0, Math.min(index - 2, visible.length - 5));
  const nearby = visible.slice(start, start + 5);
  byId('thumbnail-line').innerHTML = nearby.map((photo, offset) => {
    const url = URL.createObjectURL(photo.blob);
    thumbnailUrls.push(url);
    const photoIndex = start + offset;
    return `<button class="thumbnail ${photo.id === currentId ? 'current' : ''}" type="button" data-id="${encodeURIComponent(photo.id)}" aria-label="Go to photo ${photoIndex + 1}, ${escapeHtml(photo.originalName)}, ${STATUS_LABEL[photo.status]}" ${photo.id === currentId ? 'aria-current="true"' : ''}>
      <img src="${url}" alt="" loading="lazy" decoding="async" /><span>${photoIndex + 1}</span><i class="status-dot ${photo.status}">${STATUS_LABEL[photo.status]}</i>
    </button>`;
  }).join('');
}

function escapeHtml(value: string): string {
  const span = document.createElement('span');
  span.textContent = value;
  return span.innerHTML;
}

function comparePhotos(a: CatalogPhoto, b: CatalogPhoto): number {
  return a.relativePath.localeCompare(b.relativePath, undefined, { numeric: true });
}

function render(): void {
  const hasPhotos = photos.length > 0;
  document.body.classList.toggle('empty-catalog', !hasPhotos);
  emptyState.hidden = hasPhotos;
  workspace.hidden = !hasPhotos;
  landingDetails.hidden = hasPhotos;
  if (hasPhotos) {
    pageTitle.textContent = isDemo ? 'Sample photo catalog' : 'Photo catalog';
    workspaceTitleSlot.append(pageTitle);
  } else {
    pageTitle.textContent = 'Sort local photos with large controls';
    document.querySelector<HTMLElement>('.empty-copy .route-label')?.after(pageTitle);
  }
  byId<HTMLButtonElement>('export-button').disabled = !hasPhotos;
  byId<HTMLButtonElement>('json-export-button').disabled = !hasPhotos;
  byId<HTMLButtonElement>('clear-button').disabled = !hasPhotos;
  renderCounts();
  if (!hasPhotos) {
    revokeImageUrls();
    document.body.classList.remove('app-loading');
    return;
  }

  const visible = visiblePhotos();
  if (!visible.length) {
    filterEmpty.hidden = false;
    photoWorkspace.hidden = true;
    byId('position').textContent = `0 of ${photos.length}`;
    byId<HTMLProgressElement>('progress-marker').value = 0;
    return;
  }
  filterEmpty.hidden = true;
  photoWorkspace.hidden = false;

  let index = visible.findIndex((photo) => photo.id === currentId);
  if (index < 0) {
    index = 0;
    currentId = visible[0].id;
  }
  const photo = visible[index];
  if (currentUrl) URL.revokeObjectURL(currentUrl);
  currentUrl = URL.createObjectURL(photo.blob);
  imageError.hidden = true;
  image.hidden = false;
  image.src = currentUrl;
  image.alt = `Photo ${index + 1} of ${visible.length}: ${photo.originalName}`;
  byId('position').textContent = `${index + 1} of ${visible.length}`;
  byId<HTMLProgressElement>('progress-marker').value = ((index + 1) / visible.length) * 100;
  byId('file-name').textContent = photo.originalName;
  byId('file-meta').textContent = `${formatBytes(photo.size)} · ${photo.type.replace('image/', '').toUpperCase() || 'IMAGE'}`;
  byId('status-ticket').textContent = STATUS_LABEL[photo.status];
  byId('status-ticket').className = `status-ticket ${photo.status}`;
  document.querySelectorAll<HTMLButtonElement>('.decision').forEach((button) => {
    const selected = button.dataset.status === photo.status;
    button.setAttribute('aria-pressed', String(selected));
  });
  byId<HTMLInputElement>('tag-input').value = photo.tags.join(', ');
  byId<HTMLInputElement>('rename-input').value = photo.proposedName;
  byId<HTMLTextAreaElement>('note-input').value = photo.note;
  byId('tag-list').innerHTML = photo.tags.length
    ? photo.tags.map((tag) => `<button type="button" data-tag="${encodeURIComponent(tag)}" aria-label="Remove tag ${escapeHtml(tag)}">${escapeHtml(tag)} <span aria-hidden="true">×</span></button>`).join('')
    : '<span class="no-tags">No tags saved yet</span>';
  byId<HTMLButtonElement>('previous-button').disabled = index === 0;
  byId<HTMLButtonElement>('next-button').disabled = index === visible.length - 1;
  renderThumbnails(visible, index);
  document.body.classList.remove('app-loading');
}

async function makeDemoPhotos(): Promise<CatalogPhoto[]> {
  const samplePhotos = await Promise.all(demoSamples.map(async (sample, index) => {
    const response = await fetch(`/demo-assets/${sample.file}`);
    if (!response.ok) throw new Error(`Could not load demo photo ${sample.file}.`);
    const blob = await response.blob();
    const file = new File([blob], sample.file, { type: 'image/svg+xml', lastModified: Date.UTC(2026, 6, 12 + index) });
    const photo = createPhoto(file);
    photo.status = sample.status;
    photo.tags = [...sample.tags];
    photo.note = sample.note;
    photo.updatedAt = Date.UTC(2026, 6, 20 + index);
    return photo;
  }));
  return samplePhotos.sort(comparePhotos);
}

async function resetDemo(): Promise<void> {
  if (!isDemo) return;
  const resetButton = byId<HTMLButtonElement>('reset-demo-button');
  resetButton.disabled = true;
  try {
    await clearPhotos();
    clearDemoPreferences();
    photos = await makeDemoPhotos();
    await replacePhotos(photos);
    folderName = 'family-photo-sample';
    localStorage.setItem(localKey('catalog-folder'), folderName);
    applyPreferences();
    currentId = photos[0]?.id ?? '';
    filter = 'all';
    filterSelect.value = filter;
    render();
    announce('Demo reset. Three sample photos are ready.');
    showToast('Demo reset to its original sample photos.');
  } catch (error) {
    console.error(error);
    showToast('The sample photos could not be loaded. Reload while online and try again.');
  } finally {
    resetButton.disabled = false;
  }
}

async function importFiles(files: File[]): Promise<void> {
  const imageFiles = files.filter(isImageFile);
  if (!imageFiles.length) {
    showToast('No supported image files were found. Choose a folder containing JPEG, PNG, WebP, GIF, SVG, AVIF, or HEIC photos.');
    return;
  }
  byId<HTMLButtonElement>('choose-button').disabled = true;
  showToast(`Opening ${imageFiles.length} photo${imageFiles.length === 1 ? '' : 's'}…`);
  try {
    const previous = new Map(photos.map((photo) => [photo.id, photo]));
    const nextPhotos = imageFiles.map((file) => createPhoto(file, previous.get(`${file.webkitRelativePath || file.name}\u001f${file.size}\u001f${file.lastModified}`)));
    nextPhotos.sort(comparePhotos);
    await replacePhotos(nextPhotos);
    photos = nextPhotos;
    currentId = photos[0].id;
    filter = 'all';
    filterSelect.value = filter;
    folderName = imageFiles[0].webkitRelativePath?.split('/')[0] || 'selected-photos';
    localStorage.setItem(localKey('catalog-folder'), folderName);
    render();
    announce(`${photos.length} photos ready. Photo 1, ${photos[0].originalName}.`);
    showToast(`${photos.length} photos are ready in this browser.`);
  } catch (error) {
    console.error(error);
    showToast('The folder could not be saved. This device may be low on browser storage. Try a smaller folder.');
  } finally {
    byId<HTMLButtonElement>('choose-button').disabled = false;
    folderInput.value = '';
    pendingFiles = [];
  }
}

function openFolderPicker(): void {
  folderInput.click();
}

async function classify(status: PhotoStatus): Promise<void> {
  const photo = getCurrent();
  if (!photo) return;
  const before = visiblePhotos();
  const index = before.findIndex((item) => item.id === photo.id);
  undoState = { id: photo.id, previous: photo.status };
  photo.status = status;
  photo.updatedAt = Date.now();
  try { await savePhoto(photo); } catch (error) { console.error(error); showToast('The decision could not be saved locally. Try again.'); return; }

  const after = visiblePhotos();
  if (filter === 'all') currentId = before[Math.min(index + 1, before.length - 1)]?.id ?? photo.id;
  else currentId = after[Math.min(index, Math.max(0, after.length - 1))]?.id ?? '';
  render();
  const next = getCurrent();
  const message = `${photo.originalName} marked ${STATUS_LABEL[status]}.`;
  announce(`${message}${next && next.id !== photo.id ? ` Next: ${next.originalName}.` : ''}`);
  showToast(message, true);
}

function navigate(delta: number): void {
  const visible = visiblePhotos();
  const index = visible.findIndex((photo) => photo.id === currentId);
  const nextIndex = Math.max(0, Math.min(visible.length - 1, index + delta));
  if (visible[nextIndex] && nextIndex !== index) {
    currentId = visible[nextIndex].id;
    render();
    announce(`Photo ${nextIndex + 1} of ${visible.length}: ${visible[nextIndex].originalName}. ${STATUS_LABEL[visible[nextIndex].status]}.`);
  }
}

function download(filename: string, contents: string, type: string): void {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportCsv(): void {
  if (!photos.length) return;
  download(`${folderName}-catalog.csv`, buildCsv(photos), 'text/csv;charset=utf-8');
  showToast(`Exported ${photos.length} rows to ${folderName}-catalog.csv.`);
  announce('CSV catalog exported.');
}

function exportJson(): void {
  if (!photos.length) return;
  download(`${folderName}-catalog-backup.json`, JSON.stringify(buildJson(photos, folderName), null, 2), 'application/json');
  showToast('Metadata backup exported. Photos are not included.');
}

function preferences(): { scale: string; contrast: boolean } {
  return {
    scale: localStorage.getItem(localKey('catalog-scale')) || 'standard',
    contrast: localStorage.getItem(localKey('catalog-contrast')) === 'true',
  };
}

function applyPreferences(): void {
  const saved = preferences();
  document.documentElement.dataset.scale = saved.scale;
  document.documentElement.dataset.contrast = String(saved.contrast);
  const radio = document.querySelector<HTMLInputElement>(`input[name="text-size"][value="${saved.scale}"]`);
  if (radio) radio.checked = true;
  byId<HTMLInputElement>('contrast-toggle').checked = saved.contrast;
}

document.querySelectorAll<HTMLButtonElement>('#choose-button, #empty-choose-button').forEach((button) => button.addEventListener('click', openFolderPicker));
byId('reset-demo-button').addEventListener('click', () => void resetDemo());
byId('start-real-button').addEventListener('click', async () => {
  await clearPhotos();
  clearDemoPreferences();
  window.location.assign('/');
});
folderInput.addEventListener('change', () => {
  pendingFiles = [...(folderInput.files ?? [])];
  if (!pendingFiles.length) return;
  if (photos.length) replaceDialog.showModal();
  else void importFiles(pendingFiles);
});
replaceDialog.addEventListener('close', () => {
  if (replaceDialog.returnValue === 'replace') void importFiles(pendingFiles);
  else { pendingFiles = []; folderInput.value = ''; }
});

document.querySelectorAll<HTMLButtonElement>('.decision').forEach((button) => button.addEventListener('click', () => void classify(button.dataset.status as PhotoStatus)));
byId('previous-button').addEventListener('click', () => navigate(-1));
byId('next-button').addEventListener('click', () => navigate(1));
filterSelect.addEventListener('change', () => { filter = filterSelect.value as Filter; currentId = visiblePhotos()[0]?.id ?? ''; render(); announce(`${filterSelect.selectedOptions[0].text} filter selected. ${visiblePhotos().length} photos.`); });
byId('show-all-button').addEventListener('click', () => { filter = 'all'; filterSelect.value = 'all'; currentId = photos[0]?.id ?? ''; render(); });

byId<HTMLFormElement>('tag-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const photo = getCurrent();
  if (!photo) return;
  photo.tags = parseTags(byId<HTMLInputElement>('tag-input').value);
  photo.updatedAt = Date.now();
  void savePhoto(photo).then(() => { render(); announce(`Tags saved for ${photo.originalName}.`); showToast('Tags saved.'); }).catch((error) => { console.error(error); showToast('Tags could not be saved.'); });
});
byId('tag-list').addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-tag]');
  const photo = getCurrent();
  if (!button || !photo) return;
  const tag = decodeURIComponent(button.dataset.tag ?? '');
  photo.tags = photo.tags.filter((item) => item !== tag);
  photo.updatedAt = Date.now();
  void savePhoto(photo).then(() => { render(); announce(`Tag ${tag} removed.`); });
});
byId<HTMLFormElement>('rename-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const photo = getCurrent();
  if (!photo) return;
  photo.proposedName = safeProposedName(byId<HTMLInputElement>('rename-input').value, photo.originalName);
  photo.updatedAt = Date.now();
  void savePhoto(photo).then(() => { render(); announce(`Filename ${photo.proposedName} queued for export.`); showToast('Filename queued. Your original was not changed.'); });
});
byId<HTMLFormElement>('note-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const photo = getCurrent();
  if (!photo) return;
  photo.note = byId<HTMLTextAreaElement>('note-input').value.trim();
  photo.updatedAt = Date.now();
  void savePhoto(photo).then(() => { showToast('Note saved.'); announce(`Note saved for ${photo.originalName}.`); });
});

byId('thumbnail-line').addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-id]');
  if (!button) return;
  currentId = decodeURIComponent(button.dataset.id ?? '');
  render();
});
image.addEventListener('load', () => { image.hidden = false; imageError.hidden = true; });
image.addEventListener('error', () => {
  if (!currentUrl || image.src !== currentUrl) return;
  image.hidden = true;
  imageError.hidden = false;
  announce('This photo could not be displayed. The catalog entry remains available.');
});

byId('export-button').addEventListener('click', exportCsv);
byId('json-export-button').addEventListener('click', exportJson);
byId('json-import-button').addEventListener('click', () => byId<HTMLInputElement>('json-input').click());
byId<HTMLInputElement>('json-input').addEventListener('change', async (event) => {
  const input = event.currentTarget as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    let parsed: CatalogExport;
    try {
      parsed = JSON.parse(await file.text()) as CatalogExport;
    } catch {
      throw new Error('That backup is not valid JSON. Choose a Large Type Catalog backup and try again.');
    }
    if (parsed.version !== 1 || !Array.isArray(parsed.photos)) {
      throw new Error('That backup format is not supported. Choose a Large Type Catalog backup and try again.');
    }
    if (!photos.length) throw new Error('Open the original photo folder before importing this backup.');
    const metadata = new Map(parsed.photos.map((photo) => [photo.relativePath, photo]));
    let matched = 0;
    photos.forEach((photo) => {
      const saved = metadata.get(photo.relativePath);
      if (!saved) return;
      if (!['unreviewed', 'keep', 'review', 'reject'].includes(saved.status)) return;
      photo.status = saved.status;
      photo.tags = Array.isArray(saved.tags) ? saved.tags.slice(0, 20).map(String) : [];
      photo.proposedName = safeProposedName(String(saved.proposedName || ''), photo.originalName);
      photo.note = String(saved.note || '').slice(0, 1000);
      photo.updatedAt = Date.now();
      matched += 1;
    });
    await replacePhotos(photos);
    render();
    showToast(`Imported decisions for ${matched} of ${photos.length} photos.`);
  } catch (error) {
    showToast(error instanceof Error ? error.message : 'That backup could not be imported.');
  } finally { input.value = ''; }
});

byId('settings-button').addEventListener('click', () => settingsDialog.showModal());
byId('help-button').addEventListener('click', () => helpDialog.showModal());
document.querySelectorAll<HTMLInputElement>('input[name="text-size"]').forEach((radio) => radio.addEventListener('change', () => {
  localStorage.setItem(localKey('catalog-scale'), radio.value);
  applyPreferences();
}));
byId<HTMLInputElement>('contrast-toggle').addEventListener('change', (event) => {
  localStorage.setItem(localKey('catalog-contrast'), String((event.currentTarget as HTMLInputElement).checked));
  applyPreferences();
});
byId('clear-button').addEventListener('click', () => clearDialog.showModal());
clearDialog.addEventListener('close', async () => {
  if (clearDialog.returnValue !== 'clear') return;
  await clearPhotos();
  photos = [];
  currentId = '';
  localStorage.removeItem(localKey('catalog-folder'));
  settingsDialog.close();
  render();
  showToast('Saved catalog cleared. Original files were not changed.');
});
undoButton.addEventListener('click', async () => {
  if (!undoState) return;
  const photo = photos.find((item) => item.id === undoState?.id);
  if (!photo) return;
  photo.status = undoState.previous;
  photo.updatedAt = Date.now();
  await savePhoto(photo);
  currentId = photo.id;
  undoState = null;
  render();
  showToast(`Restored ${photo.originalName} to ${STATUS_LABEL[photo.status]}.`);
});

document.addEventListener('keydown', (event) => {
  const target = event.target as HTMLElement;
  const typing = target.matches('input, textarea, select, [contenteditable="true"]');
  const targetDialog = target.closest<HTMLDialogElement>('dialog[open]');
  if (event.key === 'Escape' && targetDialog) {
    event.preventDefault();
    targetDialog.close('cancel');
    return;
  }
  if (typing && event.key === 'Escape') {
    event.preventDefault();
    render();
    target.blur();
    announce('Edit cancelled.');
    return;
  }
  if (typing || settingsDialog.open || helpDialog.open || replaceDialog.open || clearDialog.open) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const key = event.key.toLowerCase();
  if (key === 'arrowleft') { event.preventDefault(); navigate(-1); }
  else if (key === 'arrowright') { event.preventDefault(); navigate(1); }
  else if (key === 'k') { event.preventDefault(); void classify('keep'); }
  else if (key === 'r') { event.preventDefault(); void classify('review'); }
  else if (key === 'x') { event.preventDefault(); void classify('reject'); }
  else if (key === 't' && photos.length) { event.preventDefault(); byId<HTMLInputElement>('tag-input').focus(); }
  else if (key === 'n' && photos.length) { event.preventDefault(); byId<HTMLInputElement>('rename-input').focus(); byId<HTMLInputElement>('rename-input').select(); }
  else if (event.key === '?') { event.preventDefault(); helpDialog.showModal(); }
});

window.addEventListener('online', () => { byId('offline-banner').hidden = true; showToast('Back online. Your catalog remained in this browser.'); });
window.addEventListener('offline', () => { byId('offline-banner').hidden = false; });
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstall = event as DeferredInstall;
  byId('install-button').hidden = false;
});
byId('install-button').addEventListener('click', async () => {
  if (!deferredInstall) return;
  await deferredInstall.prompt();
  await deferredInstall.userChoice;
  deferredInstall = null;
  byId('install-button').hidden = true;
});

async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) showToast('An update is ready. It will appear on your next visit.');
      });
    });
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'APP_UPDATED') showToast('The catalog was updated and is ready offline.');
    });
  } catch (error) { console.error('Offline setup failed', error); }
}

async function start(): Promise<void> {
  applyPreferences();
  byId('offline-banner').hidden = navigator.onLine;
  try {
    photos = await loadPhotos();
    if (isDemo && !photos.length) {
      photos = await makeDemoPhotos();
      await replacePhotos(photos);
      folderName = 'family-photo-sample';
      localStorage.setItem(localKey('catalog-folder'), folderName);
    }
    currentId = photos[0]?.id ?? '';
  } catch (error) {
    console.error(error);
    showToast('Saved catalog data could not be opened. You can still choose a folder.');
  }
  render();
  const historyRestore = performance.getEntriesByType('navigation').some((entry) => (entry as PerformanceNavigationTiming).type === 'back_forward');
  if ((isDemo && photos.length) || historyRestore) {
    window.requestAnimationFrame(() => {
      pageTitle.focus({ preventScroll: true });
      announce('Sample photo catalog. Three sample photos are ready.');
    });
  }
  void registerServiceWorker();
}

void start();

window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  window.requestAnimationFrame(() => {
    pageTitle.focus({ preventScroll: true });
    announce(`${pageTitle.textContent}.`);
  });
});
