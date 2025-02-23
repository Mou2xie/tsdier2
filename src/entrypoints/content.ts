import { sendMessage } from "webext-bridge/content-script";


export default defineContentScript({
  // match all urls
  matches: ["*://*/*"],

  main() {

    document.addEventListener('dblclick', (e) => {

      // get the selected word
      let selectedText = window.getSelection()?.toString().trim().toLowerCase();
      // get the current url
      let currentURL = window.location.href;

      if (selectedText) {

        if (isEnglishString(selectedText)) {

          const target = e.target as HTMLElement;
          let { textContent } = target;
          // get the sentence that contains the selected word
          let sentence = findRelatedSentence(selectedText, textContent!.split('.'));

          // send the selected word package to the background
          sendMessage('selectedWordPackage', { selectedText, sentence, currentURL }, 'background');
        }
      }
    });
  },
});


//find which sentence the selected word is in.
function findRelatedSentence(selectedText: string, sentences: string[]) {
  let sentence: string = '';
  const matches = sentences.filter((item) => new RegExp('\\b' + selectedText + '\\b', 'i').test(item));
  if (matches.length > 0) {
    sentence = matches[0] + '.';
    sentence = sentence.replace(new RegExp('\\b' + selectedText + '\\b', 'gi'), `<span>${selectedText}</span>`)
  }
  return sentence
}

//if the selected word is in english or empty.
function isEnglishString(selectedText: string) {
  let englishRegex = /^[a-zA-Z]+$/;
  return englishRegex.test(selectedText);
}