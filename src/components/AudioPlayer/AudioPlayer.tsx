import { useRef, useEffect } from 'react';
import playAudio from '@/assets/images/volume-up-fill.svg';
import './AudioPlayer.css';

interface IProps {
    word: string;
}

function AudioPlayer({ word }: IProps) {

    const audioSrc = `http://dict.youdao.com/dictvoice?type=0&audio=${word}`;
    const audioPlayer = useRef<HTMLAudioElement>(null);

    //play audio when word changes
    useEffect(() => {
        audioPlayer.current && audioPlayer.current.play();
    }, [word]);

    return (
        <>
            <img className='audioPlayer' src={playAudio} alt="play pronunciation" onClick={() => audioPlayer.current?.play()} />
            <audio ref={audioPlayer} src={audioSrc} />
        </>
    );
}

export { AudioPlayer }