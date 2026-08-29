import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const photoFolder = resolve('tests/fixtures/photos');

async function openDemo(page: Page): Promise<void> {
  await page.goto('/demo');
  await expect(page).toHaveTitle('Demo — Large Type Catalog');
  await expect(page.getByText('Demo — sample data, nothing is saved', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sample photo catalog' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sample photo catalog' })).toBeFocused();
  await expect(page.getByRole('heading', { name: 'Photo 1 of 3' })).toBeVisible();
}

test('@claim:demo-isolation keeps sample work separate and resets it', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('catalog-folder', 'real-family-archive'));
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByText('Demo — sample data, nothing is saved', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Reject/ }).click();
  await page.getByRole('button', { name: 'Adjust display' }).click();
  await page.getByRole('radio', { name: 'Largest' }).check();
  await page.getByRole('button', { name: 'Close display settings' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('#status-ticket')).toHaveText('Keep');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe('18px');
  expect(await page.evaluate(() => localStorage.getItem('catalog-folder'))).toBe('real-family-archive');
  expect(await page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('demo:')).length)).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: 'Sort local photos with large controls' })).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage).some((key) => key.startsWith('demo:')))).toBe(false);
});

test('@claim:local-only sends no catalog data off origin', async ({ page, baseURL }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await openDemo(page);
  await page.keyboard.press('k');
  await page.keyboard.press('t');
  await page.locator('#tag-input').fill('family, print');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: /Export CSV/ }).click();
  const origin = new URL(baseURL!).origin;
  expect(requests.length).toBeGreaterThan(0);
  expect(requests.every((url) => new URL(url).origin === origin)).toBe(true);
});

test('@claim:keyboard-workflow sorts, navigates, tags, and queues names by keyboard', async ({ page }) => {
  await openDemo(page);
  await page.keyboard.press('x');
  await expect(page.locator('#position')).toHaveText('2 of 3');
  await page.keyboard.press('t');
  await expect(page.locator('#tag-input')).toBeFocused();
  await page.locator('#tag-input').fill('holiday, railway');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Escape');
  await page.keyboard.press('n');
  await expect(page.locator('#rename-input')).toBeFocused();
  await page.locator('#rename-input').fill('coast-by-rail');
  await page.keyboard.press('Enter');
  await expect(page.locator('#rename-input')).toHaveValue('coast-by-rail.svg');
  await page.keyboard.press('Escape');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#position')).toHaveText('3 of 3');
});

test('@claim:csv-export downloads one complete row per sample photo', async ({ page }) => {
  await openDemo(page);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Export CSV/ }).click();
  const download = await downloadPromise;
  const csv = await readFile((await download.path())!, 'utf8');
  const rows = csv.trim().split(/\r?\n/);
  expect(rows).toHaveLength(4);
  expect(rows[0]).toContain('original_path,original_name,proposed_name,decision,tags,note,modified_iso');
  expect(csv).toContain('family-picnic.svg');
  expect(csv).toContain('coastal-train.svg');
  expect(csv).toContain('garden-birthday.svg');
});

test('@claim:browser-persistence restores demo decisions and notes after reload', async ({ page }) => {
  await openDemo(page);
  await page.locator('#note-input').fill('Print two copies for the mantel.');
  await page.getByRole('button', { name: 'Save note' }).click();
  await page.getByRole('button', { name: /Reject/ }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Photo 1 of 3' })).toBeVisible();
  await page.locator('#filter-select').selectOption('reject');
  await expect(page.locator('#status-ticket')).toHaveText('Reject');
  await expect(page.locator('#note-input')).toHaveValue('Print two copies for the mantel.');
});

test('@claim:pwa-install exposes an installable manifest and controlled app shell', async ({ page, request }) => {
  await openDemo(page);
  const manifestResponse = await request.get('/manifest.webmanifest');
  expect(manifestResponse.ok()).toBe(true);
  const manifest = await manifestResponse.json();
  expect(manifest).toMatchObject({ display: 'standalone', scope: '/', id: '/' });
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({ sizes: '192x192' }),
    expect.objectContaining({ sizes: '512x512' }),
    expect.objectContaining({ purpose: 'maskable' }),
  ]));
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
});

test('@claim:offline-reload restores the populated demo without a network', async ({ page, context }) => {
  await openDemo(page);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page).toHaveTitle('Demo — Large Type Catalog');
  await expect(page.getByRole('heading', { name: 'Photo 1 of 3' })).toBeVisible();
  await expect(page.locator('#offline-banner')).toBeVisible();
  await context.setOffline(false);
});

test('@claim:backup-roundtrip exports photo-free JSON and restores its metadata', async ({ page }) => {
  await openDemo(page);
  await page.getByRole('button', { name: /Reject/ }).click();
  await page.getByRole('button', { name: 'Adjust display' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export backup (JSON)' }).click();
  const backup = await downloadPromise;
  const backupPath = (await backup.path())!;
  const parsed = JSON.parse(await readFile(backupPath, 'utf8'));
  expect(parsed.photos).toHaveLength(3);
  expect(parsed.photos[0]).not.toHaveProperty('blob');
  await page.getByRole('button', { name: 'Close display settings' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await page.getByRole('button', { name: 'Adjust display' }).click();
  await page.locator('#json-input').setInputFiles(backupPath);
  await page.getByRole('button', { name: 'Close display settings' }).click();
  await expect(page.locator('#status-ticket')).toHaveText('Reject');
});

test('@claim:original-files-safe imports a folder without changing its files', async ({ page }) => {
  const fixture = resolve(photoFolder, 'first-photo.svg');
  const before = createHash('sha256').update(await readFile(fixture)).digest('hex');
  await openDemo(page);
  await page.locator('#folder-input').setInputFiles(photoFolder);
  await page.getByRole('button', { name: 'Replace catalog' }).click();
  await expect(page.getByRole('heading', { name: 'Photo 1 of 2' })).toBeVisible();
  await page.getByRole('button', { name: /Reject/ }).click();
  await page.keyboard.press('n');
  await page.locator('#rename-input').fill('safe-new-name');
  await page.keyboard.press('Enter');
  const after = createHash('sha256').update(await readFile(fixture)).digest('hex');
  expect(after).toBe(before);
});

test('@claim:accessible-display supports contrast, text size, reduced motion, and 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openDemo(page);
  await page.keyboard.press('Tab');
  const focusOutline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineWidth);
  expect(parseFloat(focusOutline)).toBeGreaterThanOrEqual(3);
  await page.getByRole('button', { name: 'Adjust display' }).click();
  await page.getByRole('radio', { name: 'Largest' }).check();
  await page.getByRole('checkbox', { name: /High contrast/ }).check();
  await page.getByRole('button', { name: 'Close display settings' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe('26px');
  expect(await page.evaluate(() => document.documentElement.dataset.contrast)).toBe('true');
  expect(parseFloat(await page.locator('#progress-marker').evaluate((element) => getComputedStyle(element).transitionDuration)) || 0).toBeLessThan(0.001);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
});

test('@claim:filter-undo filters decisions and reverses the last classification', async ({ page }) => {
  await openDemo(page);
  await page.getByRole('button', { name: /Reject/ }).click();
  await page.locator('#filter-select').selectOption('reject');
  await expect(page.locator('#status-ticket')).toHaveText('Reject');
  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(page.getByRole('heading', { name: 'No photos at this stop' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all photos' }).click();
  await expect(page.locator('#status-ticket')).toHaveText('Keep');
});
