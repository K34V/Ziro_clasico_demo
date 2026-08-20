const CACHE_NAME = 'ziro-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css'
];

// Instalar el Service Worker y guardar en caché los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones para que funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve (offline)
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});