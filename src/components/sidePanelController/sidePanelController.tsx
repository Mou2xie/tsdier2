import './SidePanelController.css'
import { useState } from 'react';

function SidePanelController() {

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    return (
        <div className='sidePanelControllerContainer'>
            <input className='sidePanelControllerInput' type="radio" id='radio' checked={isSidePanelOpen} onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} />
            <label className='sidePanelControllerLabel' htmlFor='radio'>停止弹出侧边栏</label>
        </div>
    );
}

export { SidePanelController }