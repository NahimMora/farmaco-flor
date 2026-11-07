// Red primero para las páginas; los archivos con hash se guardan para estudiar sin conexión. Los videos no se guardan.
const CACHE = 'farmaco-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || r.url.includes('/videos/') || r.headers.has('range')) return;
  e.respondWith(fetch(r).then(res => {
    if (res.ok) { const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)); }
    return res;
  }).catch(() => caches.match(r).then(m => m || caches.match('/farmaco-flor/index.html'))));
});
