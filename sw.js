self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(Creativegun).then(function(cache) {
      return cache.addAll(
        [
          '404.html',
          'style.css',
          'offline.html',
          'logo-02.svg',
        ]
      );
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});