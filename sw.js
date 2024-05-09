
self.addEventListener('fetch',event=>{

    const offLineResponse = new Response(`
        
        Bienvenido a mi sitio web.

        Disculpa , pero para usarla, necesitas internet.
        
    `)

    const resp = fetch(event.request)
                    .catch( ()=> offLineResponse )

    event.respondWith( resp )
}) 