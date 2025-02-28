import localforage from "localforage";

class WordListItem {

    constructor(
        public id: number,
        public word: string,
        public sentence: string,
        public url: string,
    ) { }

    remove(): void {
        localforage.removeItem(this.word);
    }

    visitSite(): void {
        chrome.tabs.create({ url: this.url });
    }

}

export { WordListItem }