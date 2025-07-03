//This will add all songs that are loaded in a project or playlist into a new playlist. Must create playlist called "80s That Didn't Exist" and then rename when done or edit script
//playlist pages preload all items, project and songs page needs to be manually scrolled through to desired end before running
(function monitorClicks() {
    document.addEventListener('click', function (e) {
        const target = e.target.closest('button, a, div, span, svg, path');
        if (target) {
            let text = '';
            try { text = target.innerText?.trim(); } catch {}
            console.log('🖱️ Clicked Element:', target);
            console.log('Inner Text:', text);
            console.log('Aria-Label:', target.getAttribute('aria-label'));
            console.log('Classes:', target.className);
            console.log('Full HTML:', target.outerHTML);
        }
    }, true);
    console.log('✅ Click Monitor Active — start clicking elements.');
})();

const menuObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
            const menu = node.querySelector('div[role="menu"]');
            if (menu && menu.innerText.includes('Add to playlist')) {
                console.log('✅ Main menu detected, triggering Add to playlist sequence...');
                
                const playlistBtn = Array.from(menu.querySelectorAll('div.flex.items-center.gap-4')).find(el => {
                    try { return el.innerText?.trim() === 'Add to playlist'; }
                    catch { return false; }
                });

                if (playlistBtn) {
                    console.log('✅ Found Add to playlist wrapper, simulating click...');
                    playlistBtn.click();

                    const subObserver = new MutationObserver(subMutations => {
                        subMutations.forEach(subMutation => {
                            subMutation.addedNodes.forEach(subNode => {
                                if (!(subNode instanceof HTMLElement)) return;
                                const playlistMenu = subNode.querySelector('div[role="menu"]');
                                if (playlistMenu && playlistMenu.innerText.includes("80s That Didn't Exist")) {
                                    console.log('✅ Playlist menu detected, clicking target playlist...');

                                    const targetPlaylist = Array.from(playlistMenu.querySelectorAll('div[role="menuitem"]')).find(el => {
                                        try {
                                            return el.innerText?.trim() === "80s That Didn't Exist";
                                        } catch { return false; }
                                    });

                                    if (targetPlaylist) {
                                        console.log('🎯 Target playlist wrapper clicked.');
                                        targetPlaylist.click();
                                    } else {
                                        console.log('⚠️ Playlist menuitem not found.');
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
console.log('👀 Auto-Add to Playlist system active. Open a song menu, playlist added instantly.');

let offset = parseInt(prompt(`Enter how many items to skip (0 = start at first item):`, "0"), 10);
if (isNaN(offset) || offset < 0) {
    offset = 0;
    console.log('⚠️ Invalid offset entered, starting from first item.');
}
console.log(`⏩ Starting at item #${offset + 1}.`);
let index = offset;

function simulateTrueUserClick(element) {
    const down = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'mouse' });
    const up = new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerType: 'mouse' });
    element.dispatchEvent(down);
    element.dispatchEvent(up);
}

function openNextMenu() {
    const currentButtons = Array.from(document.querySelectorAll('button[aria-haspopup="menu"][data-sentry-element="MenuTrigger"]'));
    
    if (index >= currentButtons.length) {
        console.log('🎯 All menus opened. Sequence complete.');
        return;
    }

    const btn = currentButtons[index];
    if (btn) {
        console.log(`▶️ Opening menu ${index + 1} of ${currentButtons.length}...`);
        simulateTrueUserClick(btn);
    } else {
        console.log(`⚠️ Button ${index + 1} missing, skipping...`);
    }
    index++;
    setTimeout(openNextMenu, 500);
}

console.log('⏳ Starting systematic menu opener in 3 seconds...');
setTimeout(openNextMenu, 500);
