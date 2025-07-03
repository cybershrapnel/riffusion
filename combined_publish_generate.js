//combined the two script into one to make it effortless to make and publish
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






// Function to find and click the button
function clickButton() {
    const button = document.querySelector('button.flex.h-9.flex-0.items-center.justify-center.gap-2.rounded-full.px-4.bg-primary');
    if (button) {
        button.click();
        console.log('Button clicked at ' + new Date().toLocaleTimeString());
    } else {
        console.log('Button not found');
    }
}

// Click the button every 45 seconds (45,000 ms)
setInterval(clickButton, 45000);

// Optional: Click once immediately
clickButton();	









