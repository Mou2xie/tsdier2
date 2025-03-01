import './WordListItemComponent.css';
import { WordListItem } from '@/models/WordListItem';
import { useRef, useEffect } from 'react';
import link from '@/assets/images/external-link-line.svg';
import trash from '@/assets/images/delete-bin-7-line.svg';
import { TSelectedWordPackage } from '@/models/TSelectedWordPackage';
import { EOpenFrom } from '@/models/EOpenFrom';
import { sendMessage } from "webext-bridge/content-script";
import { EMessage } from "@/models/EMessage";

interface IProps {
    data: WordListItem;
    trigger: () => void; // A function to trigger refresh
}

function WordListItemComponent({ data, trigger }: IProps) {
    const ref = useRef<HTMLDivElement>(null);

    const openSidePanel = () => {

        // Send the selected word package to background
        const selectedWordPackage: TSelectedWordPackage = {
            selectedText: data.word,
            sentence: data.sentence,
            currentURL: data.url,
            from: EOpenFrom.NOTEBOOK,
        };

        sendMessage(EMessage.SEND_SELECTED_WORD_PACKAGE, selectedWordPackage, 'background');
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