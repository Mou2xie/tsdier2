import './NoteBook.css';
import { useState, useEffect, use } from "react";
import localforage from "localforage";
import exportFile from '@/assets/images/download-2-line.svg';
import setting from '@/assets/images/settings-line.svg';
import { WordListItem } from '@/models/WordListItem';
import { WordListItemComponent } from '@/components/WordListItemComponent/WordListItemComponent';
import { StoredWord } from '@/models/StoredWord';
import { Pagination } from '@/components/Pagination/Pagination';
import { create } from 'zustand';
import { exportToExcel } from '@/utils/exportExcel';

interface Store {
    currentPage: number;
    totalPage: number;
    setTotalPage: (totalPage: number) => void;
    toZeroPage: () => void;
    toPrevPage: () => void;
    toNextPage: () => void;
    toLastPage: () => void;
}

// store for pagination
const useStore = create<Store>((set) => ({
    currentPage: 0,
    totalPage: 0,
    setTotalPage: (totalPage: number) => set({ totalPage }),
    toZeroPage: () => set({ currentPage: 0 }),
    toPrevPage: () => set((state) => state.currentPage > 0 ? { currentPage: state.currentPage - 1 } : { currentPage: 0 }),
    toNextPage: () => set((state) => state.currentPage < state.totalPage - 1 ? { currentPage: state.currentPage + 1 } : { currentPage: state.totalPage - 1 }),
    toLastPage: () => set((state) => ({ currentPage: state.totalPage - 1 })),
}));

function NoteBook() {

    const PAGELENGTH = 10; // How many words to display in one page

    const [wordListDisplayed, setwordListDisplayed] = useState<WordListItem[]>([]); // The words displayed on current page
    const [totalWordsNum, setTotalWordsNum] = useState(0);// The total number of stored words
    const [triggerRefresh, setTriggerRefresh] = useState(false); // Trigger to refresh the page

    const { currentPage, setTotalPage } = useStore();

    useEffect(() => {

        async function getStoredWords() {
            // reset wordListDisplayed
            setwordListDisplayed([]);

            // get all stored words
            const storedWords: StoredWord[] = [];
            await localforage.iterate<StoredWord, void>((value: StoredWord | any) => {

                // Compatible with old versions, convert old data into StoredWord
                if (value.selectedText) {
                    const _value = new StoredWord(value.selectedText, value.sentence, value.currentURL);
                    storedWords.push(_value);
                } else {
                    storedWords.push(value);
                }
            });

            // set total number of stored words and calculate total page
            setTotalWordsNum(storedWords.length);
            setTotalPage(Math.ceil(storedWords.length / PAGELENGTH));

            // sort stored words by timestamp
            storedWords.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

            // set words to be displayed on current page
            for (let i = currentPage * PAGELENGTH; i < currentPage * PAGELENGTH + PAGELENGTH; i++) {
                if (storedWords[i] === undefined) {
                    break;
                }
                setwordListDisplayed((prev) => [...prev, new WordListItem(i, storedWords[i].word, storedWords[i].sentence, storedWords[i].articleURL)]);
            }
        }
        getStoredWords();
    }, [triggerRefresh, currentPage]);

    return (
        <main>
            <section className='title-bar'>
                <div className='title'>
                    已标记<span>{totalWordsNum}</span>个单词
                </div>
                {totalWordsNum > 0 && <img src={exportFile} alt="export" onClick={exportToExcel} />}
                <img src={setting} alt="setting" onClick={() => chrome.tabs.create({ url: 'options.html' })} />
            </section>
            <section className='word-list'>
                {wordListDisplayed.map((item) => (
                    <WordListItemComponent data={item} key={item.id} trigger={() => setTriggerRefresh(!triggerRefresh)} />
                ))}
            </section>
            <Pagination useStore={useStore}></Pagination>
        </main >
    );
}

export default NoteBook;