/* ════════════════════════════════════════
   SISS! — sw.js (Service Worker)
   PWA: Cache-first strategy untuk offline support
════════════════════════════════════════ */

const CACHE_NAME   = 'siss-v1.0.0';
const STATIC_CACHE = 'siss-static-v1';

// File yang wajib di-cache agar bisa offline
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/main.css',
  '/assets/css/sidebar.css',
  '/assets/css/components.css',
  '/assets/css/responsive.css',
  '/assets/js/storage.js',
  '/assets/js/navigation.js',
  '/assets/js/tracker.js',
  '/assets/js/calendar.js',
  '/assets/js/mood.js',
  '/assets/js/insights.js',
  '/assets/js/education.js',
  '/assets/js/init.js',
  '/data/phases.js',
  '/data/health.js',
  // Google Fonts (dicache saat pertama kali diakses)
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap'
];

/* ── Install: pre-cache semua asset ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: hapus cache lama ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== STATIC_CACHE)
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first untuk asset, network-first untuk API ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome-extension dan request non-http
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(response => {
          // Cache response baru (hanya GET yang sukses)
          if (request.method === 'GET' && response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then(c => c.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback untuk navigasi
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

/* ── Background Sync: simpan data saat offline ── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-mood-data') {
    // Placeholder untuk sinkronisasi data ke server di masa depan
    console.log('[SISS SW] Background sync triggered');
  }
});

/* ── Push Notification (opsional — siap diaktifkan) ── */
self.addEventListener('push', event => {
  const data = event.data?.json() ?? {};
  const title = data.title ?? 'SISS! Reminder 🌸';
  const options = {
    body: data.body ?? 'Sudah catat mood hari ini belum?',
    icon: '/assets/icons/icon-192.png',
    badge: '/assets/icons/badge-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url ?? '/' },
    actions: [
      { action: 'catat', title: '✏️ Catat Sekarang' },
      { action: 'nanti', title: 'Nanti saja' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'catat') {
    event.waitUntil(clients.openWindow('/#mood'));
  }
});
