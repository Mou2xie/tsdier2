import './sidePanel.css';
import { useEffect, useState } from 'react';
import { storage } from 'wxt/storage';
import { SelectedWordPackage } from '@/models/SelectedWordPackage';
import { LocalStorage } from '@/models/LocalStorage';
import { ISupabaseRes } from '@/models/ISupabaseRes';
import { ITranslation } from '@/models/ITranslation';
import { supabaseClient } from '@/utils/supabaseClient';
import { translationHandler } from '@/utils/translationHandler';
import star_line from '@/assets/images/star-line.svg';
import star_fill from '@/assets/images/star-fill.svg';
import playAudio from '@/assets/images/volume-up-fill.svg';
import notebook from '@/assets/images/bookmark-line.svg';
import setting from '@/assets/images/settings-line.svg';

function SidePanel() {

  const [selectedWordPackage, setSelectedWordPackage] = useState<SelectedWordPackage | undefined>(undefined);
  const [translation, setTranslation] = useState<ITranslation | undefined>(undefined);

  useEffect(() => {
    // retrieve selected word package from local storage initially
    storage.getItem<SelectedWordPackage>(LocalStorage.SelectedWordPackage).then((value) => {
      setSelectedWordPackage(value!);
    });

    // watch for changes in selected word package
    const unwatch = storage.watch<SelectedWordPackage>(LocalStorage.SelectedWordPackage, (newValue) => {
      setSelectedWordPackage(newValue!);
    });

    // cleanup watcher when unmounts
    return () => {
      unwatch();
    };

  }, []);

  // fetch translation from supabase
  useEffect(() => {
    if (selectedWordPackage) {
      supabaseClient
        .from('dictionary_n')
        .select()
        .eq('word', selectedWordPackage.selectedText)
        .then((res) => {
          if (res?.data && res?.data?.length > 0) {
            setTranslation(translationHandler(res.data[0] as ISupabaseRes));
          } else {
            setTranslation(undefined);
          }
        })
    }
  }, [
    selectedWordPackage,
  ]);

  return (
    <main>
      <section className='top-bar'>
        <h1>{translation?.word}</h1>
        <img src={star_line} alt="favorite" />
      </section>
      <section className='phonetic-bar'>
        {translation?.phonetic ? <div>{`/ ${translation?.phonetic} /`}</div> : null}
        <img src={playAudio} alt="play audio" />
      </section>
      <hr />
      <section className='translation-section'>
        {
          translation?.translation.map((item, index) => (
            <div key={index} className='translation-item'>
              <div>{`${item[0]}.`}</div>
              <div>{item[1]}</div>
            </div>
          ))
        }
      </section>
      <hr />
      <section className='definition-section'>
        {
          translation?.definition?.map((item, index) => (
            <div key={index} className='definition-item'>
              <div>{`${item[0]}.`}</div>
              <div>{item[1]}</div>
            </div>
          ))
        }
      </section>
      <hr />
      <section className='exchange-section'>
        {
          translation?.exchange?.map((item, index) => (
            <div key={index} className='exchange-item'>
              <div>{item[0]}</div>
              <div>{item[1]}</div>
            </div>
          ))
        }
      </section>
      <section className='spacer'>
      </section>
      <section className='bottom-bar'>
        <div className='notebook'>
          <img src={notebook} alt="notebook" />
          <p>单词本</p>
          <div>27</div>
        </div>
        <div className='tool-bar'>
          <input type="radio" id='radio' />
          <label htmlFor='radio'>停止弹出侧边栏</label>
          <img src={setting} alt="setting" />
        </div>
      </section>
    </main>
  );
}

export default SidePanel;
