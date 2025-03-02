import { useRef, useEffect } from 'react';
import playAudio from '@/assets/images/volume-up-fill.svg';
import './AudioPlayer.css';
import { storage } from 'wxt/storage';
import { ELocalStorage } from '@/models/ELocalStorage';

interface IProps {
    word: string;
}

function AudioPlayer({ word }: IProps) {

    const audioSrc = `http://dict.youdao.com/dictvoice?type=0&audio=${word}`;
    const audioPlayer = useRef<HTMLAudioElement>(null);

    //play audio when word changes
    useEffect(() => {
        async function init() {
            const isAutoPronounceEnabled = await storage.getItem(ELocalStorage.MUTE);
            if (!isAutoPronounceEnabled) {
                audioPlayer.current && audioPlayer.current.play();
            }
        }
        init();
    }, [word]);

    return (
        <>
            <img className='audioPlayer' src={playAudio} alt="play pronunciation" onClick={() => audioPlayer.current?.play()} />
            <audio ref={audioPlayer} src={audioSrc} />
        </>
    );
}

export { AudioPlayer }