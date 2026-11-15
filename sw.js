// khi-tshu 蓋厝：離線快取。改版時把版本號加 1，手機下次開啟就會更新。
const VERSION = 'khi-v12';
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./rooms/index.json", "./rooms/A.json", "./rooms/B.json", "./rooms/C.json", "./rooms/D.json", "./rooms/E.json", "./rooms/F.json", "./rooms/G.json", "./rooms/H.json", "./rooms/J.json", "./rooms/K.json", "./rooms/L.json", "./rooms/M.json", "./rooms/N.json", "./rooms/P.json", "./rooms/Q.json", "./rooms/R.json", "./rooms/S.json", "./rooms/T.json", "./rooms/U.json", "./rooms/W.json", "./rooms/SL1.json", "./rooms/SL2.json", "./rooms/SL3.json", "./rooms/SL4.json"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // 先用網路拿最新版，沒網路時用快取
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
