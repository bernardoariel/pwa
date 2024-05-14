self.addEventListener('install', e => {
    const cacheProm = caches.open('cache-1').then(cache => {
        return cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/image.png',
            '/js/app.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
            '/pages/offline.html'
        ]).catch(error => {
            console.error('Failed to cache:', error);
            throw error;
        });
    });
    e.waitUntil(cacheProm);
});