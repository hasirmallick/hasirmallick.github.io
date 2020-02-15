importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('Creativegun').then(function(cache) {
     return cache.addAll([
        // '/',
        '/PWA.html',
        '/PWA.css',
        '/titas.js',
        '/main1.js',
        '/main2.js',
        '/assets/logo.svg',
        '/assets/logo.png'
     ]);
   })
 );
});


self.addEventListener('fetch', function(event) {

console.log(event.request.url);

event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});