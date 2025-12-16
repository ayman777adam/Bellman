const CACHE_NAME = 'bellman-v1-cache';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  // Network first for Firestore/Online calls, Cache first for UI assets
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});