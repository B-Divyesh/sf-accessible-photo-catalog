import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', title: 'Large Type Catalog — Sort local photos clearly' },
  { path: '/demo', title: 'Demo — Large Type Catalog' },
  { path: '/privacy/', title: 'Privacy — Large Type Catalog' },
  { path: '/terms/', title: 'Terms — Large Type Catalog' },
  { path: '/404.html', title: 'Page not found — Large Type Catalog' },
];

test('all routes have metadata, landmarks, one h1, alt text, and no serious axe findings', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  for (const route of routes) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    expect(await page.locator('img:not([alt])').count()).toBe(0);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('every internal footer link resolves in the production build', async ({ page, request, baseURL }) => {
  await page.goto('/');
  const hrefs = await page.locator('footer a').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  for (const href of hrefs) {
    expect(new URL(href).origin).toBe(new URL(baseURL!).origin);
    expect((await request.get(href)).ok()).toBe(true);
  }
});

test('demo exposes and focuses its route heading on direct, linked, and history navigation', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Sample photo catalog' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sample photo catalog' })).toBeFocused();

  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.getByRole('heading', { name: 'Sample photo catalog' })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Sort local photos with large controls' })).toBeFocused();
});

test('shared header navigation and the 404 skip link work on every route', async ({ page }) => {
  for (const path of ['/', '/demo', '/privacy/', '/terms/', '/404.html']) {
    await page.goto(path);
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: 'Demo' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Privacy' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Terms' })).toBeVisible();
  }
  await page.goto('/404.html');
  await page.getByRole('link', { name: 'Skip to main content' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('privacy gives the current path for clearing saved catalog data', async ({ page }) => {
  await page.goto('/privacy/');
  await expect(page.getByText('In the catalog, choose “Adjust display,” then “Clear saved catalog.”')).toBeVisible();
  await page.goto('/demo');
  await expect(page.getByRole('button', { name: 'Adjust display' })).toBeVisible();
  await page.getByRole('button', { name: 'Adjust display' }).click();
  await expect(page.getByRole('button', { name: 'Clear saved catalog' })).toBeVisible();
});
