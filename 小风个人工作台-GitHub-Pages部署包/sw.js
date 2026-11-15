'use strict';
const CACHE_PREFIX = "xiaofeng-workbench-xiaofeng-student-workbench-2026-" + encodeURIComponent(self.registration.scope) + '-';
// 替换视频、封面或图标后修改版本号；普通代码与样式在线刷新会更新。
const CACHE_VERSION = 'pages-20261115-1';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;
const APP_SHELL = [
  './', './index.html', './styles.css', './config.js', './app.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './assets/wallpaper.mp4', './assets/wallpaper-poster.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function fromCacheOrNetwork(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request.url);
  if (!cached) return fetch(request);
  const range = request.headers.get('Range');
  if (!range) return cached;
  const bytes = await cached.arrayBuffer();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match || (!match[1] && !match[2])) {
    return new Response(null, {status: 416, headers: {'Content-Range': `bytes */${bytes.byteLength}`}});
  }
  let start = match[1] ? Number(match[1]) : Math.max(0, bytes.byteLength - Number(match[2]));
  let end = match[1] && match[2] ? Number(match[2]) : bytes.byteLength - 1;
  if (start >= bytes.byteLength || start > end) {
    return new Response(null, {status: 416, headers: {'Content-Range': `bytes */${bytes.byteLength}`}});
  }
  end = Math.min(end, bytes.byteLength - 1);
  const headers = new Headers(cached.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${bytes.byteLength}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(bytes.slice(start, end + 1), { status: 206, statusText: 'Partial Content', headers });
}


// Small editable files use the network when online, with a cached offline fallback.
async function freshOrCached(request, canonical) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(canonical || request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(canonical || request);
    if (cached) return cached;
    throw error;
  }
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(freshOrCached(event.request, new URL('./index.html', self.registration.scope).href));
    return;
  }
  const relative = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (['index.html', 'styles.css', 'config.js', 'app.js', 'manifest.webmanifest'].includes(relative)) {
    event.respondWith(freshOrCached(event.request));
    return;
  }
  event.respondWith(fromCacheOrNetwork(event.request));
});
