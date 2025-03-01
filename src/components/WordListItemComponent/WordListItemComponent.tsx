import './WordListItemComponent.css';
import { WordListItem } from '@/models/WordListItem';
import { useRef, useEffect } from 'react';
import link from '@/assets/images/external-link-line.svg';
import trash from '@/assets/images/delete-bin-7-line.svg';

function WordListItemComponent({ data, trigger }: { data: WordListItem, trigger: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = data.sentence;
        }
    }, []);

    return (
        <div className='word-list-item'>
            <h2>{data.word}</h2>
            <p ref={ref}></p>
            <div className='operation'>
                <img src={link} alt="go to original website" onClick={() => data.visitSite()} />
                <img src={trash} alt="trash" onClick={() => { data.remove(); trigger() }} />
            </div>
        </div>
    );
}

export { WordListItemComponent };