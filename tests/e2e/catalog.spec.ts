import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const photoFolder = resolve('tests/fixtures/photos');

test('completes a keyboard-only classify, tag, rename, and CSV export route', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.goto('/');

  await expect(page).toHaveTitle(/Large Type Catalog/);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Sort local photos with large controls' })).toBeVisible();
  await expect(page.getByText(/For low-vision people and older family members/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();

  const emptyA11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(emptyA11y.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);

  await page.locator('#folder-input').setInputFiles(photoFolder);
  await expect(page.getByRole('heading', { name: /Photo 1 of 2/ })).toBeVisible();
  await expect(page.locator('#empty-state')).toBeHidden();
  await expect(page.locator('#current-image')).toBeVisible();
  await expect(page.locator('#image-error')).toBeHidden();

  await page.keyboard.press('k');
  await expect(page.locator('#status-ticket')).toHaveText('Unreviewed');
  await expect(page.locator('#position')).toHaveText('2 of 2');

  await page.keyboard.press('t');
  await expect(page.locator('#tag-input')).toBeFocused();
  await page.locator('#tag-input').fill('Family, train, family');
  await page.keyboard.press('Enter');
  await expect(page.locator('#tag-list')).toContainText('Family');
  await expect(page.locator('#tag-list')).toContainText('train');

  await page.keyboard.press('Escape');
  await page.locator('body').press('n');
  await expect(page.locator('#rename-input')).toBeFocused();
  await page.locator('#rename-input').fill('station-final');
  await page.keyboard.press('Enter');
  await expect(page.locator('#rename-input')).toHaveValue('station-final.svg');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Export CSV/ }).click();
  const download = await downloadPromise;
  const csvPath = await download.path();
  expect(csvPath).toBeTruthy();
  const csv = await readFile(csvPath!, 'utf8');
  expect(csv).toContain('station-final.svg');
  expect(csv).toContain('Family; train');
  expect(csv).toContain(',keep,');

  const workspaceA11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(workspaceA11y.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);

  await page.getByRole('button', { name: 'Adjust display' }).click();
  await page.getByRole('checkbox', { name: /High contrast/ }).check();
  await page.getByRole('button', { name: 'Close display settings' }).click();
  const contrastA11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(contrastA11y.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test('fits a 390px viewport without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Choose your photo folder/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator('#folder-input').setInputFiles(photoFolder);
  await expect(page.getByRole('button', { name: /Keep/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('reloads the app shell while offline after first visit', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page).toHaveTitle(/Large Type Catalog/);
  await expect(page.getByRole('heading', { name: 'Sort local photos with large controls' })).toBeVisible();
  await expect(page.locator('#offline-banner')).toBeVisible();
  await context.setOffline(false);
});
