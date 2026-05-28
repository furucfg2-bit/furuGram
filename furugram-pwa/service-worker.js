const CACHE_NAME = 'furugram-v1';
const ASSETS = [
    '/furugram/',
    '/furugram/index.html',
    '/furugram/admin.html',
    '/furugram/manifest.json',
    '/furugram/icon-192.png',
    '/furugram/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => Promise.all(
            names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
        ))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});