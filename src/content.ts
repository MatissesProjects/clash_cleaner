import { cleanPythonCode } from './cleaner';

/**
 * CodinGame uses Monaco editor. We can often access it via the global window object
 * or by interacting with the DOM elements.
 * For this initial version, we will try to find the editor container and inject a button.
 */

function injectCleanButton() {
  const toolbar = document.querySelector('.ide-buttons-container') || document.querySelector('.action-container');
  
  if (toolbar && !document.getElementById('clash-cleaner-btn')) {
    const btn = document.createElement('button');
    btn.id = 'clash-cleaner-btn';
    btn.innerText = 'Clean';
    btn.style.marginLeft = '10px';
    btn.style.padding = '5px 10px';
    btn.style.backgroundColor = '#f2bb13';
    btn.style.border = 'none';
    btn.style.borderRadius = '3px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.color = '#000';

    btn.onclick = () => {
      window.dispatchEvent(new CustomEvent('CLASH_CLEANER_TRIGGER'));
    };

    toolbar.appendChild(btn);
  }
}

// Inject the page script to access window.monaco
function injectPageScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('dist/page_script.js');
  (document.head || document.documentElement).appendChild(script);
}

injectPageScript();
const observer = new MutationObserver(() => {
  injectCleanButton();
});

observer.observe(document.body, { childList: true, subtree: true });
injectCleanButton();
