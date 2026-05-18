const CACHE = 'agribridge-v1';
const STATIC = [
  '/', '/index.html', '/static/js/main.chunk.js',
  '/static/js/bundle.js', '/static/css/main.chunk.css',
  '/logo192.png', '/logo512.png', '/favicon.ico',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('/api/')) {
    e.respondWith(
      fetch(e.request).catch(() =>
        caches.match(e.request).then(r => r || new Response(
          JSON.stringify({ error: 'offline', cached: true }),
          { headers: { 'Content-Type': 'application/json' } }
        ))
      )
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(data.title || 'AgriBridge Alert', {
    body: data.body || 'You have a new farm update.',
    icon: '/logo192.png',
    badge: '/logo192.png',
    tag: data.tag || 'agribridge',
    data: { url: data.url || '/' },
    actions: data.actions || [{ action: 'view', title: 'View' }],
    vibrate: [200, 100, 200]
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/'));
});
