chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action === 'TRIGGER_CLEAN') {
    // Broadcast to all tabs and all frames
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { action: 'TRIGGER_CLEAN' });
        }
      });
    });
  }
});
