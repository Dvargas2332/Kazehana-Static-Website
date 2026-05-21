const CACHE = 'kazehana-v1.0.0';
const FILES = [
  '/',
  '/index.html',
  '/modules.html',
  '/workflow.html',
  '/faq.html',
  '/contact.html',
  '/about.html',
  '/pricing.html',
  '/css/styles.css',
  '/css/dark-mode.css',
  '/js/i18n-data.js',
  '/js/i18n.js',
  '/js/carousel.js',
  '/js/header-toggle.js',
  '/js/notice.js',
  '/js/form-handler.js',
  '/js/dark-mode.js',
  '/js/scroll-reveal.js',
  '/js/smooth-scroll.js',
  '/js/main.js',
  '/ico/kazehanalogo.png',
  '/ico/frontdesk.png',
  '/ico/restaurant.png',
  '/ico/management.png',
  '/ico/accounting.png',
  '/ico/einvoice.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    })
  );
});
