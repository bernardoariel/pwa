

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}
if(window.caches){
    caches.open('prueba-1')
    caches.open('prueba-2')
    caches.has('prueba-3').then(console.log)

    caches.delete('prueba-1').then( eliminado => console.log(eliminado))
    caches.open('cache-v1.1').then( cache =>{
        cache.add('/index.html')
        cache.addAll([
            '/img/image.png',
            '/css/style.css'
        ]).then(()=>{
            // cache.delete('/css/style.css')
            // cache.put('index.html', new Response('Hola mundo'))
        })
    })
    caches.keys().then( key=>{
        console.log(key)
    })

    caches.match('/index.html')
        .then( res =>{
            res.text().then(text => console.log(text))
        })
        caches.
}