import './SidePanelController.css'
import { useState, useEffect } from 'react';
import { storage } from 'wxt/storage';
import { ELocalStorage } from '@/models/ELocalStorage';

function SidePanelController() {

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    useEffect(() => {
        storage.getItem(ELocalStorage.STOPSIDEPANEL).then((value) => {
            setIsSidePanelOpen(!!value);
        });
    }, []);

    return (
        <div className='sidePanelControllerContainer'>
            <input className='sidePanelControllerInput' type="radio" id='radio' checked={isSidePanelOpen} onClick={() => {
                setIsSidePanelOpen(!isSidePanelOpen);
                storage.setItem(ELocalStorage.STOPSIDEPANEL, !isSidePanelOpen);
            }} />
            <label className='sidePanelControllerLabel' htmlFor='radio'>停止弹出侧边栏</label>
        </div>
    );
}

export { SidePanelController }