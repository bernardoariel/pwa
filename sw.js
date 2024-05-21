const CACHE_NAME = 'cache-1'



self.addEventListener('install', e => {
    const cacheProm = caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/image.png',
            '/js/app.js',
            '/pages/offline.html',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ])
    });
   
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch',e=>{

    // 2- Cache with Network Fallback
    const respuesta = caches.match( e.request )
      .then( res =>{

        //si la respuesta existe retornamos la respuesta que es del cache
        if(res)return res

        // No existe el archivo
        // tengo que ir a la web
        
        console.log('No existe', e.request)
        
        return fetch(e.request)
          .then(newResponse =>{
            caches.open(CACHE_NAME).then( cache =>{
              if(cache){
                cache.put(e.request, newResponse)
              }

            })
            return newResponse.clone()
          })
      })

    e.respondWith(respuesta)
    // 1 - Cache Only 
    // no va a haber petion que sale a la web
    // e.respondWith( caches.match( e.request ) )
})