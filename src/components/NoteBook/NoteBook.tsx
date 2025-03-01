import './NoteBook.css'
import notebook from '@/assets/images/bookmark-line.svg';
import { useState, useEffect } from 'react';
import localforage from 'localforage';

interface IProps {
    triggerNoteBookRefresh: boolean; // a boolean value that triggers the notebook to refresh
}

function NoteBook({ triggerNoteBookRefresh }: IProps) {

    const [count, setCount] = useState(0);

    // retrieve the total number of words when triggerNoteBookRefresh changes (user saves or removes a word)
    useEffect(() => {
        localforage.length().then((length) => {
            setCount(length);
        })
    }, [triggerNoteBookRefresh]);

    const handleNoteBookClick = () => {
        // open the notebook page when the notebook icon is clicked
        chrome.tabs.create({ url: 'notebook.html' });
    };

    return (
        <div className='notebook' onClick={handleNoteBookClick}>
            <img src={notebook} alt="notebook icon" />
            <p>单词本</p>
            <div>{count}</div>
        </div>
    );
}

export { NoteBook }