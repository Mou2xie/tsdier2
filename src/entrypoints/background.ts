import { onMessage } from "webext-bridge/background";
import { storage } from 'wxt/storage';

export default defineBackground(() => {

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

    storage.setItem('local:selectedWordPackage', selectedWordPackage);

    // open the side panel
    chrome.sidePanel.open({
      tabId
    });
  });
});
