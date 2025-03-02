import star_line from '@/assets/images/star-line.svg';
import star_fill from '@/assets/images/star-fill.svg';
import './SaveWord.css';
import { useState, useEffect, useRef } from 'react';
import { TSelectedWordPackage } from '@/models/TSelectedWordPackage';
import { StoredWord } from '@/models/StoredWord';
import { storage } from 'wxt/storage';
import { ELocalStorage } from '@/models/ELocalStorage';

interface IProps {
    selectedWordPackage: TSelectedWordPackage;
    onChange: () => void; // a function that triggers a rerender
}

function SaveWord({ selectedWordPackage, onChange }: IProps) {

    const [isSaved, setIsSaved] = useState(false);
    const btn = useRef<HTMLImageElement>(null);

    useEffect(() => {
        async function init() {
            // Check if the word is already saved when the selectedWordPackage(selected word) changes
            const _isSaved = await StoredWord.checkIfWordExists(selectedWordPackage.selectedText);
            setIsSaved(_isSaved);

            // Check if the auto save feature is enabled and save the word automatically
            const isAutoSaveEnabled = await storage.getItem(ELocalStorage.AUTO_SAVE_WORD);
            if (isAutoSaveEnabled && _isSaved === false) {
                btn.current?.click();
            }
        }
        init();
    }, [selectedWordPackage]);

    // Save or remove the word from storage when the star icon is clicked
    const handleSave = async () => {
        if (isSaved) {
            await StoredWord.removeWord(selectedWordPackage.selectedText);
        } else {
            const storedWord = new StoredWord(selectedWordPackage.selectedText, selectedWordPackage.sentence, selectedWordPackage.currentURL);
            await storedWord.addWord();
        }
        onChange(); // trigger rerender
        setIsSaved(!isSaved); // change save state
    }

    return (
        <img className='saveWord' ref={btn} src={isSaved ? star_fill : star_line} onClick={handleSave} alt="favorite" />
    );
}

export { SaveWord }