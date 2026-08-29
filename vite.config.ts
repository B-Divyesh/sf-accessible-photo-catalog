import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function filesBelow(directory: string, prefix = ''): string[] {
  return readdirSync(resolve(directory, prefix), { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    return entry.isDirectory() ? filesBelow(directory, relative) : [relative];
  });
}

function versionServiceWorker(): Plugin {
  return {
    name: 'version-service-worker',
    apply: 'build',
    closeBundle() {
      const outputDirectory = resolve(__dirname, 'dist');
      const files = filesBelow(outputDirectory)
        .filter((file) => file !== 'sw.js' && file !== 'staticwebapp.config.json' && !file.endsWith('.map'))
        .sort();
      const hash = createHash('sha256');
      files.forEach((file) => {
        hash.update(file);
        hash.update(readFileSync(resolve(outputDirectory, file)));
      });
      const version = hash.digest('hex').slice(0, 12);
      const routes = new Set(files.map((file) => `/${file}`));
      routes.add('/');
      routes.add('/demo');
      routes.add('/privacy/');
      routes.add('/terms/');
      const template = readFileSync(resolve(__dirname, 'public/sw.js'), 'utf8');
      const serviceWorker = template
        .replace("'large-type-catalog-dev'", `'large-type-catalog-${version}'`)
        .replace("['/']", JSON.stringify([...routes].sort(), null, 2));
      writeFileSync(resolve(outputDirectory, 'sw.js'), serviceWorker);
    },
  };
}

export default defineConfig({
  plugins: [versionServiceWorker()],
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
      },
    },
  },
});
