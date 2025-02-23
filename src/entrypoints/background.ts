import { onMessage } from "webext-bridge/background";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  // set the action click behavior to open the panel
  chrome.action.onClicked.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });

  // listen for selected word from the content script
  onMessage('selectedWordPackage', (message) => {
    const {
      data: selectedWordPackage,
      sender: { tabId }
    } = message;

    console.log(selectedWordPackage);

    // open side panel
    chrome.sidePanel.open({
      tabId
    });
  });
});
