//this wil auto play songs on page for ten seconds each, hit the publish button if available, and then move on to the next. If it plays 5 published songs in a row, it jumps back to the top and starts publsihing any new songs that you made since it last cycled. Must run from projects or Songs page only or you won't have access to the publish button in the side frame that this uses.
//run this alongside the auto generate script for full potential.
let failCount = 0;
let maxFails = 5;
let index = 0;

function getButtons() {
    const btns = Array.from(document.querySelectorAll('button[aria-label^="Play "]'));
    console.log(`Rescanned: Found ${btns.length} playable items.`);
    return btns;
}

let buttons = getButtons();

function clickNext() {
    if (index >= buttons.length) {
        console.log('Finished clicking all items.');
        return;
    }
    
    const btn = buttons[index];
    
    console.log(`Clicking item ${index + 1}:`, btn.getAttribute('aria-label'));
    
    btn.click();

    // After 2 seconds, attempt Publish
    setTimeout(() => {
        const publishBtn = document.querySelector('button.bg-brand-primary');
        
        if (publishBtn) {
            console.log('Clicking Publish button.');
            publishBtn.click();
            failCount = 0; // Reset failure count on success
        } else {
            console.warn('Publish button not found!');
            failCount++;

            if (failCount >= maxFails) {
                console.warn(`Reached ${failCount} consecutive failures. Restarting...`);
                failCount = 0;
                index = 0;
                buttons = getButtons();

                setTimeout(clickNext, 1000);
                return;
            }
        }

        index++;
        setTimeout(clickNext, 10000); // Next item after 5 seconds

    }, 2000);
}

// Start the process
clickNext();
