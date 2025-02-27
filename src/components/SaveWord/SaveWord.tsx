import star_line from '@/assets/images/star-line.svg';
import star_fill from '@/assets/images/star-fill.svg';
import './SaveWord.css';
import { useState, useEffect } from 'react';
import { SelectedWordPackage } from '@/models/SelectedWordPackage';
import { IWordStoredData } from '@/models/ISavedWordData';
import { addWord, removeWord, checkIfWordExists } from '@/utils/wordStorageHandler';

function SaveWord({ selectedWordPackage }: { selectedWordPackage: SelectedWordPackage }) {

    const wordData: IWordStoredData = {
        word: selectedWordPackage.selectedText,
        sentence: selectedWordPackage.sentence,
        articleURL: selectedWordPackage.currentURL,
        timestamp: new Date()
    }

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(checkIfWordExists(selectedWordPackage.selectedText));
    }, [selectedWordPackage]);

    const handleSave = () => {
        if (isSaved) {
            removeWord(selectedWordPackage.selectedText);
        } else {
            addWord(wordData);
        }
        setIsSaved(!isSaved);
    }

    return (
        <img className='saveWord' src={isSaved ? star_fill : star_line} onClick={handleSave} alt="favorite" />
    );
}

export { SaveWord }