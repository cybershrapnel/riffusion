//this will output a numbered list of all songs on page to the console.
(function logSongNames() {
    const songItems = document.querySelectorAll('a[href^="/song/"] h4');

    if (songItems.length === 0) {
        console.log('⚠️ No song items found. Make sure the song list is visible.');
        return;
    }

    console.log(`🎶 Found ${songItems.length} songs:\n`);

    songItems.forEach((el, i) => {
        const songName = el.innerText?.trim() || '[Unnamed]';
        console.log(`${i + 1}. ${songName}`);
    });

    console.log('\n✅ Song name list complete.');
})();
