import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('dist');
const required = ['index.html', '404.html', 'privacy/index.html', 'terms/index.html', 'manifest.webmanifest', 'manifest.json', 'sitemap.xml', 'staticwebapp.config.json', 'sw.js'];
await Promise.all(required.map(async (file) => {
  if (!(await stat(resolve(root, file))).isFile()) throw new Error(`Missing build output: ${file}`);
}));

const assets = await readdir(resolve(root, 'assets'));
const javascript = assets.filter((file) => /^app-.*\.js$/.test(file));
const styles = assets.filter((file) => /^style-.*\.css$/.test(file));
if (javascript.length !== 1 || styles.length !== 1) throw new Error('Expected one hashed app script and stylesheet.');

const serviceWorker = await readFile(resolve(root, 'sw.js'), 'utf8');
if (/large-type-catalog-(?:v1|dev)/.test(serviceWorker)) throw new Error('Service worker cache was not build-versioned.');
for (const file of [...javascript, ...styles]) {
  if (!serviceWorker.includes(`/assets/${file}`)) throw new Error(`Service worker does not precache ${file}.`);
}

const config = JSON.parse(await readFile(resolve(root, 'staticwebapp.config.json'), 'utf8'));
if (!config.responseOverrides?.['404'] || !config.globalHeaders?.['Content-Security-Policy']) throw new Error('Static response policy is incomplete.');

const jsBytes = (await stat(resolve(root, 'assets', javascript[0]))).size;
const cssBytes = (await stat(resolve(root, 'assets', styles[0]))).size;
if (jsBytes > 200_000) throw new Error(`Initial JavaScript exceeds 200 KB: ${jsBytes}`);
if (cssBytes > 50_000) throw new Error(`Initial CSS exceeds 50 KB: ${cssBytes}`);

console.log(`release build verified: JS ${jsBytes} B, CSS ${cssBytes} B, versioned offline shell`);
