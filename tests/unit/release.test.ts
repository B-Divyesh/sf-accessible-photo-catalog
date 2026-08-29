import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

type Claim = { id: string; claim: string; where: string; test: string; sandbox: string };

describe('release contract', () => {
  it('registers every claim once and gives it exactly one tagged browser test', () => {
    const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Claim[];
    const browserTests = readFileSync('tests/e2e/claims.spec.ts', 'utf8');
    expect(claims.length).toBeGreaterThan(0);
    expect(new Set(claims.map((claim) => claim.id)).size).toBe(claims.length);
    claims.forEach((claim) => {
      expect(claim.claim).toBeTruthy();
      expect(claim.where).toBeTruthy();
      expect(claim.sandbox).toContain('/demo');
      expect(claim.test).toBe(`npm run test:e2e -- --grep @claim:${claim.id}`);
      expect(browserTests.split(`@claim:${claim.id}`).length - 1).toBe(1);
    });
    const registeredTags = new Set(claims.map((claim) => `@claim:${claim.id}`));
    const testTags = browserTests.match(/@claim:[a-z0-9-]+/g) ?? [];
    expect(new Set(testTags)).toEqual(registeredTags);
  });

  it('declares static-host routing, security, caching, and manifest MIME policies', () => {
    const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8')) as {
      routes: Array<{ route: string; rewrite?: string; statusCode?: number; headers?: Record<string, string> }>;
      responseOverrides: Record<string, { rewrite: string }>;
      globalHeaders: Record<string, string>;
    };
    expect(config.routes.find((route) => route.route === '/demo')?.rewrite).toBe('/index.html');
    expect(config.routes.find((route) => route.route === '/assets/*')?.headers?.['Cache-Control']).toContain('immutable');
    expect(config.routes.find((route) => route.route === '/manifest.webmanifest')?.rewrite).toBe('/manifest.json');
    expect(JSON.parse(readFileSync('public/manifest.webmanifest', 'utf8'))).toEqual(JSON.parse(readFileSync('public/manifest.json', 'utf8')));
    expect(config.responseOverrides['404'].rewrite).toBe('/404.html');
    expect(config.globalHeaders['Content-Security-Policy']).toContain("frame-ancestors 'none'");
    expect(config.globalHeaders['Permissions-Policy']).toContain('camera=()');
    expect(config.routes.every((route) => !(route.rewrite && route.statusCode))).toBe(true);
    const normalizedRoutes = config.routes.map((route) => route.route.replace(/\/$/, ''));
    expect(new Set(normalizedRoutes).size).toBe(normalizedRoutes.length);
  });

  it('ships complete route metadata, sitemap, and designed not-found page', () => {
    const routes = ['index.html', 'privacy/index.html', 'terms/index.html', '404.html'];
    routes.forEach((route) => {
      const html = readFileSync(route, 'utf8');
      expect(html).toContain('<html lang="en">');
      expect(html).toMatch(/<title>[^<]+<\/title>/);
      expect(html).toContain('rel="canonical"');
      expect(html).toContain('property="og:title"');
      expect(html).toContain('name="twitter:card"');
      expect(html).toContain('/assets/social-card.jpg');
    });
    const sitemap = readFileSync('public/sitemap.xml', 'utf8');
    ['/</loc>', '/demo</loc>', '/privacy/</loc>', '/terms/</loc>'].forEach((route) => expect(sitemap).toContain(route));
    expect(readFileSync('404.html', 'utf8')).toContain('<h1>This page does not exist</h1>');
  });
});
