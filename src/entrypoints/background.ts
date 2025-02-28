import { onMessage } from "webext-bridge/background";
import { storage } from 'wxt/storage';
import { SelectedWordPackage } from "@/models/SelectedWordPackage";
import { LocalStorage } from "@/models/LocalStorage";
import { Message } from "@/models/Message";

export default defineBackground(() => {

  // set the action click behavior to open the panel
  chrome.action.onClicked.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });

  // listen for selected word from the content script
  onMessage(Message.SEND_SELECTED_WORD_PACKAGE, (message) => {

    const selectedWordPackage: SelectedWordPackage = message.data as SelectedWordPackage;
    const { tabId } = message.sender;

    // save the selected word package to the local storage (for the side panel to access)
    storage.setItem(LocalStorage.SELECTED_WORD_PCKAGE, selectedWordPackage);

    // open the side panel
    chrome.sidePanel.open({
      tabId
    });
  });
});
