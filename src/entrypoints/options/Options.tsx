import './Options.css'
import pic1 from '@/assets/images/Group 62.svg'
import pic2 from '@/assets/images/Group 63.svg'
import { storage } from '@wxt-dev/storage';
import { ELocalStorage } from '@/models/ELocalStorage';
import { useEffect, useState } from 'react';

function Options() {

  const [autoSaveWord, setAutoSaveWord] = useState(false);
  const [mute, setMute] = useState(false);
  const [stopSidePanel, setStopSidePanel] = useState(false);


  // get settings from local storage initially
  useEffect(() => {
    storage.getItem(ELocalStorage.AUTO_SAVE_WORD).then((value) => {
      setAutoSaveWord(!!value);
    });
    storage.getItem(ELocalStorage.MUTE).then((value) => {
      setMute(!!value);
    });
    storage.getItem(ELocalStorage.STOPSIDEPANEL).then((value) => {
      setStopSidePanel(!!value);
    });
  }, []);

  return (
    <main>
      <h1>设置</h1>
      <section className='options'>
        <div className='option-item'>
          <input className='radio-box' type="radio" id="autoMark" checked={autoSaveWord} onClick={() => {
            setAutoSaveWord(!autoSaveWord);
            storage.setItem(ELocalStorage.AUTO_SAVE_WORD, !autoSaveWord);
          }} />
          <label htmlFor="autoMark">
            <p>自动标记单词</p>
            <p>勾选后，所翻译的单词将自动存入单词本。</p>
          </label>
        </div>
        <div className='option-item'>
          <input className='radio-box' type="radio" id="mute" checked={mute} onClick={() => {
            setMute(!mute);
            storage.setItem(ELocalStorage.MUTE, !mute);
          }} />
          <label htmlFor="mute">
            <p>静音翻译</p>
            <p>勾选后，将不再自动播放单词的读音。</p>
          </label>
        </div>
        <div className='option-item'>
          <input className='radio-box' type="radio" id="stop" checked={stopSidePanel} onClick={() => {
            setStopSidePanel(!stopSidePanel);
            storage.setItem(ELocalStorage.STOPSIDEPANEL, !stopSidePanel);
          }} />
          <label htmlFor="stop">
            <p>停用侧边栏</p>
            <p>勾选后，本插件将暂停运行，双击单词将不再弹出侧边栏。<br />如果想重新启用，请手动打开侧边栏，取消勾选该选项。</p>
            <div>
              <div className='pic-item'>
                <img src={pic1} alt="how to open side panel manually 1" />
                <div>
                  <div>1</div>
                  <p>点击浏览器（右上角）地址栏右侧的“拼图”图标</p>
                </div>
              </div>
              <div className='pic-item'>
                <img src={pic2} alt="how to open side panel manually 2" />
                <div>
                  <div>2</div>
                  <p>在弹出的插件列表中点击transider插件即可手动打开侧边栏</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </section>
      <section className='ad'>
        <div>⭐️ 更多产品：</div>
        <a href="https://www.speakingpass.com/" target="_blank">SpeakingPass-雅思口语考试真题库</a>
      </section>
      <section className='ad'>
        <div>🐶 联系作者：</div>
        <p>jedxie2022@gmail.com</p>
      </section>
    </main>

  );
}

export default Options;