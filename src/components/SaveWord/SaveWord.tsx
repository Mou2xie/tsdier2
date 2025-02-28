import star_line from '@/assets/images/star-line.svg';
import star_fill from '@/assets/images/star-fill.svg';
import './SaveWord.css';
import { useState, useEffect } from 'react';
import { SelectedWordPackage } from '@/models/SelectedWordPackage';
import { StoredWord } from '@/models/StoredWord';

function SaveWord({ selectedWordPackage, onChange }: { selectedWordPackage: SelectedWordPackage, onChange: () => void }) {

    const [isSaved, setIsSaved] = useState(false);

    // Check if the word is saved when the selectedWordPackage(selected word) changes
    useEffect(() => {
        StoredWord.checkIfWordExists(selectedWordPackage.selectedText).then((bool) => {
            setIsSaved(bool);
        });
    }, [selectedWordPackage]);

    // Save or remove the word from the storage when the star icon is clicked
    const handleSave = async () => {
        if (isSaved) {
            await StoredWord.removeWord(selectedWordPackage.selectedText);
        } else {
            const storedWord = new StoredWord(selectedWordPackage.selectedText, selectedWordPackage.sentence, selectedWordPackage.currentURL);
            await storedWord.addWord();
        }
        onChange();
        setIsSaved(!isSaved);
    }

    return (
        <img className='saveWord' src={isSaved ? star_fill : star_line} onClick={handleSave} alt="favorite" />
    );
}

export { SaveWord }