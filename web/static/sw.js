const urlsToCache = [
    "/",
    "/not_found"
];

self.addEventListener('install', event => {
    const preLoaded = caches.open('v1').then(cache => cache.addAll(urlsToCache));
    event.waitUntil(preLoaded);
});

self.addEventListener("fetch", event => {
    const req = event.request;
    event.respondWith(networkFirst1(req));
});

const networkFirst1 = req => {
    //buscar en internet
    return fetch(req).then(r => {
        //console.log("Found on internet");
        caches.open('v1').then(thisCache => {
            thisCache.put(req, r);
        });
        return r.clone();
    }).catch(err => {
        //buscar en el cache o retornar not_found
        //console.log('Offline error: ' + err);
        return caches.match(req).then(response => {
            if (response) {
                //console.log('Found response in cache:', response);
                return response;
            } else {
                //console.log('Not found so /not_found is returned');
                return caches.match("/not_found").then(match => match);
            }
        }).catch(error => {
            // Handles exceptions that arise from match() or fetch().
            //console.log('Error in fetch handler:', error);
            throw error;
        });
    });
};

