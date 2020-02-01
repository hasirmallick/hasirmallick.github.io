importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('Creativegun').then(function(cache) {
     return cache.addAll([
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        'favicon-02.png',
        'fbimg.jpg',
        'hm.png',
        'hasir mallick favicon.png',
        'logo-02.svg'
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