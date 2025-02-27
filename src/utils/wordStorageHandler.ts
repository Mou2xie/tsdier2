import { ISavedWordData, IWordStoredData } from "@/models/ISavedWordData"
import localforage from "localforage";


async function addWord(wordData: ISavedWordData) {
    if (!checkIfWordExists(wordData.word)) {
        const _wordData: IWordStoredData = { ...wordData, timestamp: new Date() };
        await localforage.setItem(wordData.word, wordData);
    }
}


async function removeWord(word: string) {
    await localforage.removeItem(word);
}

function checkIfWordExists(word: string): boolean {
    let wordExists = false;

    localforage.getItem(word).then((data) => {
        if (data) {
            wordExists = true;
        }
    });
    return wordExists;
}

export { addWord, removeWord, checkIfWordExists }
