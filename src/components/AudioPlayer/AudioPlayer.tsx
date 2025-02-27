import { useRef, useEffect } from 'react';
import playAudio from '@/assets/images/volume-up-fill.svg';
import './AudioPlayer.css';

function AudioPlayer({ word }: { word: string }) {

    const audioSrc = `http://dict.youdao.com/dictvoice?type=0&audio=${word}`;
    const audioPlayer = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        audioPlayer.current && audioPlayer.current.play();
    }, [word]);

    return (
        <>
            <img className='audioPlayer' src={playAudio} alt="play audio" onClick={() => audioPlayer.current?.play()} />
            <audio ref={audioPlayer} src={audioSrc} />
        </>
    );
}


export { AudioPlayer }