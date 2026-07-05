self.addEventListener('install', (_event) => {
  // Keep the service worker deliberately lightweight; it only proves support
  // and can be extended later without changing the app shell.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
