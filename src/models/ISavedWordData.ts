interface ISavedWordData {
    word: string;
    sentence: string;
    articleURL: string;
}

interface IWordStoredData extends ISavedWordData {
    timestamp: Date;
}

export { ISavedWordData, IWordStoredData }