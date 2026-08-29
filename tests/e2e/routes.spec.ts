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
