// Definition of the translation interface
// Used for sidepanel display

interface ITranslation {
    word: string;
    phonetic?: string;
    translation: [string, string][];
    definition?: [string, string][];
    exchange?: [string, string][];
    tag?: string[];
}

export { ITranslation }