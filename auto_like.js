//This will add a like to all songs loaded on page. the auto scrolling function does not work right. you need to manually scroll or run this on a playlist page that preloads.
(function automateFavorite() {
    // Select buttons with aria-label containing "Favorite" but not "Unfavorite"
    const buttons = Array.from(document.querySelectorAll('button.hover\\:text-logo[aria-label^="Favorite"]'));
    let index = 0;

    function clickNext() {
        if (index < buttons.length) {
            buttons[index].click();
            index++;
            setTimeout(clickNext, 3000); //adjust this as needed.
        } else {
            // After all buttons clicked, scroll down a few times
            let scrollCount = 0;
            const scrollInterval = setInterval(() => {
                window.scrollBy(0, window.innerHeight);
                scrollCount++;
                if (scrollCount >= 3) {
                    clearInterval(scrollInterval);
                    setTimeout(automateFavorite, 5000); // Repeat after 5 seconds
                }
            }, 500);
        }
    }

    if (buttons.length > 0) {
        clickNext();
    } else {
        // No buttons found, scroll down and retry
        let scrollCount = 0;
        const scrollInterval = setInterval(() => {
            window.scrollBy(0, window.innerHeight);
            scrollCount++;
            if (scrollCount >= 3) {
                clearInterval(scrollInterval);
                setTimeout(automateFavorite, 5000); // Retry after 5 seconds
            }
        }, 500);
    }
})();
