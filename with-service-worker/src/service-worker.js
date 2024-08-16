importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js');

self.addEventListener('install', event => {
    console.info("service worker.install")

    event.waitUntil(self.skipWaiting());
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
    RegExp('^https://sneaker-window\\.vyking\\.io/vyking-apparel/.*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'vyking-apparel',
        plugins: [
            bgSyncPlugin
        ]
    })
);

workbox.routing.registerRoute(
    RegExp('^https://sneaker-window.vyking.io/vyking-model-viewer/.*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'model-viewer',
        plugins: [
            bgSyncPlugin
        ]
    })
);

workbox.routing.registerRoute(
    RegExp('^https://sneaker-window.vyking.io/vyking-assets/.*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'vyking-assets',
        plugins: [
            bgSyncPlugin,
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50
            }),
        ],
    })
);

