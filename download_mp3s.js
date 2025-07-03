//This will download all the MP3 files of all the songs currently loaded. Playlists preload the list, everything else must be scrolled to load to desired end of files.

// 1️⃣ Click Monitor for Inspection
(function monitorClicks() {
    document.addEventListener('click', function (e) {
        const target = e.target.closest('button, a, div');
        if (target) {
            console.log('🖱️ Clicked Element:', target);
            console.log('Inner Text:', target.innerText);
            console.log('Aria-Label:', target.getAttribute('aria-label'));
            console.log('Classes:', target.className);
            console.log('Full HTML:', target.outerHTML);
        }
    }, true);
 
    console.log('✅ Click Monitor Active — inspect elements as needed.');
})();
 
 
// 2️⃣ Mutation Observer for Download Automation
const menuObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
 
            const menu = node.querySelector('div[role="menu"]');
            if (menu && menu.innerText.includes('Download')) {
 
                console.log('✅ Main menu detected, triggering Download sequence...');
 
                const downloadBtn = Array.from(menu.querySelectorAll('*')).find(el => el.innerText?.trim() === 'Download');
 
                if (downloadBtn) {
                    console.log('✅ Found Download option, simulating click to open format menu...');
                    downloadBtn.click();
 
                    const subObserver = new MutationObserver(subMutations => {
                        subMutations.forEach(subMutation => {
                            subMutation.addedNodes.forEach(subNode => {
                                if (!(subNode instanceof HTMLElement)) return;
 
                                const formatMenu = subNode.querySelector('div[role="menu"]');
                                if (formatMenu && formatMenu.innerText.includes('MP3')) {
 
                                    console.log('✅ Format menu detected, auto-clicking MP3...');
 
                                    const mp3Btn = Array.from(formatMenu.querySelectorAll('*')).find(el => el.innerText?.trim() === 'MP3');
 
                                    if (mp3Btn) {
                                        console.log('🎯 MP3 button clicked automatically.');
                                        mp3Btn.click();
                                    }
 
                                    subObserver.disconnect();
                                }
                            });
                        });
                    });
 
                    subObserver.observe(document.body, { childList: true, subtree: true });
                }
            }
        });
    });
});
 
menuObserver.observe(document.body, { childList: true, subtree: true });
console.log('👀 Auto-download MP3 system active. Open a song menu, MP3 downloads instantly.');
 
 
// 3️⃣ Systematic Menu Opener with Offset + Real User Clicks
const menuButtons = Array.from(document.querySelectorAll('button[aria-haspopup="menu"][data-sentry-element="MenuTrigger"]'));
console.log(`✅ Found ${menuButtons.length} menu buttons.`);
 
// Prompt for offset (items to skip)
let offset = parseInt(prompt(`Enter how many items to skip (0 = start at first item):`, "0"), 10);
if (isNaN(offset) || offset < 0 || offset >= menuButtons.length) {
    offset = 0;
    console.log('⚠️ Invalid offset entered, starting from first item.');
}
 
console.log(`⏩ Starting at item #${offset + 1} of ${menuButtons.length}.`);
 
let index = offset;
 
function simulateTrueUserClick(element) {
    const down = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'mouse' });
    const up = new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerType: 'mouse' });
    element.dispatchEvent(down);
    element.dispatchEvent(up);
}
 
function openNextMenu() {
    if (index >= menuButtons.length) {
        console.log('🎯 All menus opened. Sequence complete.');
        return;
    }
 
    const btn = menuButtons[index];
    if (btn) {
        console.log(`▶️ Opening menu ${index + 1} of ${menuButtons.length}...`);
        simulateTrueUserClick(btn);
    } else {
        console.log(`⚠️ Button ${index + 1} missing, skipping...`);
    }
 
    index++;
    setTimeout(openNextMenu, 12000); // 12-second interval between items
}
 
console.log('⏳ Starting systematic menu opener in 3 seconds...');
setTimeout(openNextMenu, 3000);
