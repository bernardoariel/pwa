const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const limpiarCache = (cacheName, numeroItems) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > numeroItems) {
        cache.delete(keys[0]).then(() => limpiarCache(cacheName, numeroItems));
      }
    });
  });
};

self.addEventListener('install', e => {
  const cacheProm = caches.open(CACHE_STATIC_NAME).then(cache => {
    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/image.png',
      '/js/app.js',
      '/pages/offline.html'
    ]).catch(error => {
      console.error('Failed to cache:', error);
      throw error;
    });
  });

  const cacheInputable = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
    return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
  });

  e.waitUntil(Promise.all([cacheProm, cacheInputable]));
});

self.addEventListener('fetch', e => {
  // 2- Cache with Network Fallback
  const respuesta = caches.match(e.request).then(res => {
    // si la respuesta existe retornamos la respuesta que es del cache
    if (res) return res;

    // No existe el archivo
    // tengo que ir a la web
    console.log('No existe', e.request.url);
    return fetch(e.request).then(newResponse => {
      return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
        cache.put(e.request, newResponse.clone()).then(() => {
          limpiarCache(CACHE_DYNAMIC_NAME, 5);
        });
        return newResponse;
      });
    });
  });

  e.respondWith(respuesta);

  // 1 - Cache Only 
  // no va a haber peticion que sale a la web
  // e.respondWith(caches.match(e.request));
});
