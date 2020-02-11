importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('Creativegun').then(function(cache) {
     return cache.addAll([
        // '/',
        'offline.html',
        '/cache-polyfill.js',
        'https://fonts.googleapis.com/css?family=Roboto&display=swap',
        'https://fonts.googleapis.com/css?family=Noto+Sans&display=swap',
        'favicon-02.png',
        'fbimg.jpg',
        'hm.png',
        'hasir mallick favicon.png',
        'logo-02.svg'
     ]);
   })
 );
});




self.addEventListener('install', function(event) {
	var offlineRequest = new Request('offline.html');
  event.waitUntil(
    fetch(offlineRequest).then(function(response) {
      return caches.open('offline').then(function(cache) {
        console.log('[oninstall] Cached offline page', response.url);
        return cache.put(offlineRequest, response);
      });
    })
  );
});
self.addEventListener('fetch', function(event) {
	 var request = event.request;
	 if (request.method === 'GET') {
	 	event.respondWith(
      fetch(request).catch(function(error) {
      	console.error(
          '[onfetch] Failed. Serving cached offline fallback ' +
          error
        );
        return caches.open('offline').then(function(cache) {
          return cache.match('offline.html');
        });
      })
    );
  }
  });