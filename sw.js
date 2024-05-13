
self.addEventListener('fetch',event=>{

    const offLineResponse = new Response(fetch('pages/offline.html'))

    const resp = fetch(event.request)
                    .catch( ()=> offLineResponse )

    event.respondWith( resp )
}) 