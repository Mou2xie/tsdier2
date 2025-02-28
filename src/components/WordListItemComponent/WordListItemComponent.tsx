import './WordListItemComponent.css';
import { WordListItem } from '@/models/WordListItem';

function WordListItemComponent(prop: { data: WordListItem }) {
    const { data } = prop;
    return (
        <div className='word-list-item'>
            <h2>{data.word}</h2>
            <p>{data.sentence}</p>
            <div className='operation'>
                <button onClick={() => data.visitSite()}>查看原文</button>
                <button onClick={() => data.remove()}>删除</button>
            </div>
        </div>
    );
}

export { WordListItemComponent };