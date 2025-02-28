import './NoteBook.css';
import { useState, useEffect } from "react";
import localforage from "localforage";
import setting from '@/assets/images/settings-line.svg';
import { WordListItem } from '@/models/WordListItem';
import { WordListItemComponent } from '@/components/WordListItemComponent/WordListItemComponent';
import { StoredWord } from '@/models/StoredWord';

function NoteBook() {

    const [wordList, setwordList] = useState<WordListItem[]>([]);

    useEffect(() => {
        const storedWords: StoredWord[] = [];
        localforage.iterate<StoredWord, void>((value) => {
            storedWords.push(value);
        }).then(() => {
            storedWords.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            storedWords.forEach((item, index) => {
                setwordList((prev) => [...prev, new WordListItem(index, item.word, item.sentence, item.articleURL)]);
            });
        });
    }, []);

    return (
        <main>
            <section className='title-bar'>
                <div className='title'>
                    已标记<span>{wordList.length}</span>个单词
                </div>
                <img src={setting} alt="setting" />
            </section>
            <section>
                {wordList.map((item) => (
                    <WordListItemComponent data={item} key={item.id} />
                ))}
            </section>


        </main>
    );
}

export default NoteBook;