import './sidePanel.css';
import { useEffect, useState } from 'react';
import { storage } from 'wxt/storage';
import { TSelectedWordPackage } from '@/models/TSelectedWordPackage';
import { ELocalStorage } from '@/models/ELocalStorage';
import { ISupabaseRes } from '@/models/ISupabaseRes';
import { ITranslation } from '@/models/ITranslation';
import { supabaseClient } from '@/utils/supabaseClient';
import { translationHandler } from '@/utils/translationHandler';
import { AudioPlayer } from '@/components/AudioPlayer/AudioPlayer';
import { NoteBook } from '@/components/NoteBook/NoteBook';
import { SaveWord } from '@/components/SaveWord/SaveWord';
import { SidePanelController } from '@/components/SidePanelController/SidePanelController';
import setting from '@/assets/images/settings-line.svg';
import { EOpenFrom } from '@/models/EOpenFrom';

function SidePanel() {

  const [selectedWordPackage, setSelectedWordPackage] = useState<TSelectedWordPackage | undefined>(undefined);
  const [translation, setTranslation] = useState<ITranslation | undefined>(undefined);
  const [triggerNoteBookRefresh, setTriggerNoteBookRefresh] = useState(false);

  useEffect(() => {
    // retrieve selected word package from local storage initially
    storage.getItem<TSelectedWordPackage>(ELocalStorage.SELECTED_WORD_PCKAGE).then((value) => {
      setSelectedWordPackage(value!);
    });

    // watch for changes in selected word package
    const unwatch = storage.watch<TSelectedWordPackage>(ELocalStorage.SELECTED_WORD_PCKAGE, (newValue) => {
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
      {!translation ? (
        <div>No translation available</div>
      ) : (
        <>
          <section className='top-bar'>
            <h1>{translation?.word}</h1>
            {selectedWordPackage?.from === EOpenFrom.PAGE ?
              <SaveWord selectedWordPackage={selectedWordPackage!} onChange={() => setTriggerNoteBookRefresh(!triggerNoteBookRefresh)}></SaveWord>
              : null}
          </section>
          <section className='phonetic-bar'>
            {translation?.phonetic ? <div>{`/ ${translation?.phonetic} /`}</div> : null}
            <AudioPlayer word={translation?.word!}></AudioPlayer>
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
        </>
      )}

      {
        selectedWordPackage?.from === EOpenFrom.PAGE ? (<section className='bottom-bar'>
          <div>
            <NoteBook triggerNoteBookRefresh={triggerNoteBookRefresh}></NoteBook>
          </div>
          <div className='tool-bar'>
            <div>
              <SidePanelController></SidePanelController>
            </div>
            <img src={setting} alt="setting" onClick={() => { chrome.tabs.create({ url: 'options.html' }) }} />
          </div>
          <div className='mask'></div>
        </section>) : null
      }
    </main>
  );
}

export default SidePanel;
