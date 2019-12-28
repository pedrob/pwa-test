const CACHE_NAME = "hpV1"

this.addEventListener('install', async function() {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
        '/index.html',
        '/index.css',
        '/main.js',
        '/sw.js',
    ])
})

self.addEventListener('fetch', event => {
    const getCustomResponsePromise = async () => {
        console.log(`URL ${event.request.url}`, `location origin ${location}`)
        try {
            const cachedResponse = await caches.match(event.request)
            if (cachedResponse) {
                console.log(`Cached response ${cachedResponse}`)
                return cachedResponse
            }
            const netResponse = await fetch(event.request)
            console.log(`adding net response to cache`)

            let cache = await caches.open(CACHE_NAME)

            cache.put(event.request, netResponse.clone())

            return netResponse

        } catch (err) {
            console.error(`Error ${err}`)
            throw err
        }
    }

    event.respondWith(getCustomResponsePromise())
})