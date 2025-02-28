// class for word info which should be stored in / remove from local storage

import localforage from "localforage";

class StoredWord {

    constructor(
        public word: string,
        public sentence: string,
        public articleURL: string,
        public timestamp: Date = new Date()
    ) { }

    async addWord() {
        if (!(await StoredWord.checkIfWordExists(this.word))) {
            this.timestamp = new Date();
            await localforage.setItem(this.word, this);
        }
    }

    static async removeWord(word: string) {
        await localforage.removeItem(word);
    }

    static async checkIfWordExists(word: string): Promise<boolean> {
        const data = await localforage.getItem<StoredWord>(word);
        return !!data;
    }
}

export { StoredWord };