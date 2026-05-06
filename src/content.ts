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
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: 'TRIGGER_CLEAN' });
      } else {
        // Fallback for context loss: directly trigger local event
        console.warn('Clash Cleaner: chrome.runtime not available, triggering local only.');
        window.dispatchEvent(new CustomEvent('CLASH_CLEANER_TRIGGER'));
      }
    } catch (err) {
      console.error('Clash Cleaner: Failed to send message:', err);
      window.dispatchEvent(new CustomEvent('CLASH_CLEANER_TRIGGER'));
    }
  };
}

function injectPageScript() {
  if (document.getElementById('clash-cleaner-script')) return;
  
  const script = document.createElement('script');
  script.id = 'clash-cleaner-script';
  try {
    script.src = chrome.runtime.getURL('dist/page_script.js');
    (document.head || document.documentElement).appendChild(script);
  } catch (e) {
    console.error('Clash Cleaner: Failed to inject page script:', e);
  }
}

if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'TRIGGER_CLEAN') {
      window.dispatchEvent(new CustomEvent('CLASH_CLEANER_TRIGGER'));
    }
  });
}

injectPageScript();
const observer = new MutationObserver(() => injectCleanButton());
observer.observe(document.body, { childList: true, subtree: true });
injectCleanButton();
