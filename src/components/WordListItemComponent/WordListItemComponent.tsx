import './WordListItemComponent.css';
import { WordListItem } from '@/models/WordListItem';
import { useRef, useEffect } from 'react';
import link from '@/assets/images/external-link-line.svg';
import trash from '@/assets/images/delete-bin-7-line.svg';
import { SelectedWordPackage } from '@/models/SelectedWordPackage';
import { OpenFrom } from '@/models/openFrom';
import { sendMessage } from "webext-bridge/content-script";
import { Message } from "@/models/Message";


function WordListItemComponent({ data, trigger }: { data: WordListItem, trigger: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    const openSidePanel = () => {
        const selectedWordPackage: SelectedWordPackage = {
            selectedText: data.word,
            sentence: data.sentence,
            currentURL: data.url,
            from: OpenFrom.NOTEBOOK,
        };
        sendMessage(Message.SEND_SELECTED_WORD_PACKAGE, selectedWordPackage, 'background');
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = data.sentence;
        }
    }, []);

    return (
        <div className='word-list-item' >
            <div onClick={openSidePanel}>
                <h2>{data.word}</h2>
                <p ref={ref}></p>
            </div>

            <div className='operation'>
                <img src={link} alt="go to original website" onClick={() => { data.visitSite() }} />
                <img src={trash} alt="trash" onClick={() => { data.remove(); trigger() }} />
            </div>
        </div>
    );
}

export { WordListItemComponent };