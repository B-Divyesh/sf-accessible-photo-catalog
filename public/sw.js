const CACHE = 'large-type-catalog-v1';
const APP_SHELL = [
  '/', '/index.html', '/manifest.webmanifest', '/offline.html', '/robots.txt',
  '/privacy/', '/terms/', '/icons/icon.svg', '/icons/icon-192.png',
  '/icons/icon-512.png', '/icons/icon-maskable-512.png',
  '/assets/empty-observation.avif', '/assets/empty-observation.webp', '/assets/empty-observation.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  let isUpdate = false;
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        isUpdate = keys.some((key) => key.startsWith('large-type-catalog-') && key !== CACHE);
        return keys;
      })
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        if (isUpdate) clients.forEach((client) => client.postMessage({ type: 'UPDATE_READY' }));
      }),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || (await caches.match('/index.html')) || caches.match('/offline.html')),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      }
      return response;
    })),
  );
});
