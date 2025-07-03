//run this on your songs page, it will let you adjust where the first offset load starts at. So if you have thousands of songs like me and can't reach the bottom because it's one big load to the bottom with no filters, then this will let you enter a locatin to begin the first offset. Meaning it will always load the first 20 newest songs. but after that it will load from the offset value going forward. This is the only way to reach songs that are not in playlists/projects if they are buried thousands deep until they give us filters etc
(function() {
    const originalFetch = window.fetch;
    const targetPattern = /\/__api\/v2\/users\/.*\/generations\?offset=\d+/;
    const limit = 20;
    let forcedOffset = 5000; //change this value to set your initial song offset in your list starting after the 20 newest songs load.

    window.fetch = function(input, init) {
        let url = input instanceof Request ? input.url : input;

        if (targetPattern.test(url)) {
            console.log('[BLOCKED ORIGINAL GENERATIONS FETCH]', url);

            const updatedUrl = url.replace(/offset=\d+/, 'offset=' + forcedOffset);
            console.log('[FORCED GENERATIONS FETCH]', updatedUrl);

            if (input instanceof Request) {
                input = new Request(updatedUrl, input);
            } else {
                input = updatedUrl;
            }

            forcedOffset += limit;

            return originalFetch.call(this, input, init);
        }

        return originalFetch.call(this, input, init);
    };

    console.log('[AUTO-INCREMENT OFFSET INJECTOR ENABLED]');
})();
