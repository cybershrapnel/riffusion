// Function to find and click the generate button (pre fill in the form and it will click generate forever or until memory error every 45 seconds)
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
