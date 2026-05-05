import { cleanPythonCode } from './cleaner';

/**
 * CodinGame uses Monaco editor. We can often access it via the global window object
 * or by interacting with the DOM elements.
 */

function injectCleanButton() {
  // Only inject the button in the top-most frame to avoid duplicates
  if (window !== window.top) return;
  if (document.getElementById('clash-cleaner-btn')) return;

  const potentialContainers = [
    '.ide-buttons',
    '.ide-buttons-container',
    '.action-container',
    '.ide-header',
    '.cg-ide-header',
    '.ide-footer'
  ];
  
  let toolbar = null;
  for (const selector of potentialContainers) {
    toolbar = document.querySelector(selector);
    if (toolbar) break;
  }

  const btn = document.createElement('button');
  btn.id = 'clash-cleaner-btn';
  btn.innerText = 'Clean';
  
  if (toolbar) {
    btn.style.marginLeft = '10px';
    btn.style.padding = '5px 15px';
    btn.style.backgroundColor = '#f2bb13';
    btn.style.border = '1px solid #000';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.color = '#000';
    toolbar.appendChild(btn);
  } else {
    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.padding = '10px 20px';
    btn.style.backgroundColor = '#f2bb13';
    btn.style.border = '2px solid #000';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.color = '#000';
    btn.style.zIndex = '10000';
    document.body.appendChild(btn);
  }

  btn.onclick = (e) => {
    e.preventDefault();
    console.log('Clash Cleaner: Triggering clean across all frames.');
    chrome.runtime.sendMessage({ action: 'TRIGGER_CLEAN' });
  };
}

// Inject the page script in EVERY frame
function injectPageScript() {
  if (document.getElementById('clash-cleaner-script')) return;
  
  console.log('Clash Cleaner: Injecting page script into frame: ' + window.location.href);
  const script = document.createElement('script');
  script.id = 'clash-cleaner-script';
  script.src = chrome.runtime.getURL('dist/page_script.js');
  (document.head || document.documentElement).appendChild(script);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'TRIGGER_CLEAN') {
    console.log('Clash Cleaner: Frame received TRIGGER_CLEAN, dispatching local event.');
    window.dispatchEvent(new CustomEvent('CLASH_CLEANER_TRIGGER'));
  }
});

injectPageScript();
const observer = new MutationObserver(() => injectCleanButton());
observer.observe(document.body, { childList: true, subtree: true });
injectCleanButton();
