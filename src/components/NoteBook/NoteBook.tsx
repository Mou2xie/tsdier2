import './NoteBook.css'
import notebook from '@/assets/images/bookmark-line.svg';
import { useState, useEffect } from 'react';
import localforage from 'localforage';

function NoteBook({ triggerNoteBookRefresh }: { triggerNoteBookRefresh: boolean }) {

    const [count, setCount] = useState(0);

    useEffect(() => {
        localforage.length().then((length) => {
            setCount(length);
        })
    }, [triggerNoteBookRefresh]);

    const handleNoteBookClick = () => {
        chrome.tabs.create({ url: 'notebook.html' });
    };

    return (
        <div className='notebook' onClick={handleNoteBookClick}>
            <img src={notebook} alt="notebook" />
            <p>单词本</p>
            <div>{count}</div>
        </div>
    );
}

export { NoteBook }