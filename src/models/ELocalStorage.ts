// Definition: Enum for LocalStorage types

enum ELocalStorage {
    SELECTED_WORD_PCKAGE = 'local:selectedWordPackage', // word selected by user
    AUTO_SAVE_WORD = 'local:autoSaveWord', // if save word automatically
    MUTE = 'local:mute', // if mute the sound
    STOPSIDEPANEL = 'local:stopSidePanel' // if stop side panel from openning
}
export { ELocalStorage }