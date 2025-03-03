import { onMessage } from "webext-bridge/background";
import { storage } from 'wxt/storage';
import { TSelectedWordPackage } from "@/models/TSelectedWordPackage";
import { ELocalStorage } from "@/models/ELocalStorage";
import { EMessage } from "@/models/EMessage";

export default defineBackground(() => {

  // set the action click behavior to open the panel
  chrome.action.onClicked.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });

  // listen for selected word
  onMessage(EMessage.SEND_SELECTED_WORD_PACKAGE, (message) => {

    const selectedWordPackage = message.data as TSelectedWordPackage;
    const { tabId } = message.sender;

    // save the selected word package to the local storage (for the side panel to access)
    storage.setItem(ELocalStorage.SELECTED_WORD_PCKAGE, selectedWordPackage);

    // open the side panel
    chrome.sidePanel.open({
      tabId
    });
  });
});
