import './NoteBook.css';
import { useState, useEffect } from "react";
import localforage from "localforage";
import setting from '@/assets/images/settings-line.svg';
import { WordListItem } from '@/models/WordListItem';
import { WordListItemComponent } from '@/components/WordListItemComponent/WordListItemComponent';
import { StoredWord } from '@/models/StoredWord';
import { Pagination } from '@/components/Pagination/Pagination';

function NoteBook() {

    const PAGELENGTH = 10;
    const [wordList, setwordList] = useState<WordListItem[]>([]);
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [totalNum, setTotalNum] = useState(0);

    useEffect(() => {

        async function getStoredWords() {
            setwordList([]);
            const storedWords: StoredWord[] = [];

            await localforage.iterate<StoredWord, void>((value) => {
                storedWords.push(value);
            });

            setTotalNum(storedWords.length);

            storedWords.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

            for (let i = pageNum * PAGELENGTH; i < pageNum * PAGELENGTH + PAGELENGTH; i++) {
                if (storedWords[i] === undefined) {
                    break;
                }
                setwordList((prev) => [...prev, new WordListItem(i, storedWords[i].word, storedWords[i].sentence, storedWords[i].articleURL)]);
            }
        }
        getStoredWords();
    }, [triggerRefresh, pageNum]);

    return (
        <main>
            <section className='title-bar'>
                <div className='title'>
                    已标记<span>{wordList.length}</span>个单词
                </div>
                <img src={setting} alt="setting" />
            </section>
            <section className='word-list'>
                {wordList.map((item) => (
                    <WordListItemComponent data={item} key={item.id} trigger={() => setTriggerRefresh(!triggerRefresh)} />
                ))}
            </section>
            <Pagination pageNum={pageNum + 1} totalNum={Math.ceil(totalNum / PAGELENGTH)} setPage={setPageNum}></Pagination>
        </main >
    );
}

export default NoteBook;