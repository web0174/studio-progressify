// public/service-worker.js
const CACHE_NAME = 'progressify-cache-v1'; // Increment version to clear cache on update
const PRECACHE_ASSETS = [
  '/', // Cache the root page
  '/manifest.json', // Cache the manifest
  // Add other critical static assets that make up the app shell if needed
  // Be mindful of Next.js dynamic imports and build outputs
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching pre-cache assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete, skipping waiting.');
        return self.skipWaiting(); // Activate the new service worker immediately
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete, claiming clients.');
      return self.clients.claim(); // Take control of all open clients
    })
  );
});

self.addEventListener('fetch', (event) => {
  // We only handle GET requests for caching
  if (event.request.method !== 'GET') {
    return;
  }

  // Cache-first strategy for pre-cached assets
  // For other requests, network-first or other strategies might be more appropriate
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // console.log('Service Worker: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Optionally, cache new resources dynamically if they match certain criteria
          // For this basic example, we only rely on pre-caching
          return networkResponse;
        }).catch(() => {
          // Fallback for navigation requests if offline
          if (event.request.mode === 'navigate') {
            // You could return a custom offline page here:
            // return caches.match('/offline.html');
          }
        });
      })
  );
});
