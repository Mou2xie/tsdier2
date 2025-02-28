import './sidePanel.css';
import { useEffect, useState } from 'react';
import { storage } from 'wxt/storage';
import { SelectedWordPackage } from '@/models/SelectedWordPackage';
import { LocalStorage } from '@/models/LocalStorage';
import { ISupabaseRes } from '@/models/ISupabaseRes';
import { ITranslation } from '@/models/ITranslation';
import { supabaseClient } from '@/utils/supabaseClient';
import { translationHandler } from '@/utils/translationHandler';
import { AudioPlayer } from '@/components/AudioPlayer/AudioPlayer';
import { NoteBook } from '@/components/NoteBook/NoteBook';
import { SaveWord } from '@/components/SaveWord/SaveWord';
import { SidePanelController } from '@/components/SidePanelController/SidePanelController';
import setting from '@/assets/images/settings-line.svg';

function SidePanel() {

  const [selectedWordPackage, setSelectedWordPackage] = useState<SelectedWordPackage | undefined>(undefined);
  const [translation, setTranslation] = useState<ITranslation | undefined>(undefined);
  const [triggerNoteBookRefresh, setTriggerNoteBookRefresh] = useState(false);

  useEffect(() => {
    // retrieve selected word package from local storage initially
    storage.getItem<SelectedWordPackage>(LocalStorage.SELECTED_WORD_PCKAGE).then((value) => {
      setSelectedWordPackage(value!);
    });

    // watch for changes in selected word package
    const unwatch = storage.watch<SelectedWordPackage>(LocalStorage.SELECTED_WORD_PCKAGE, (newValue) => {
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
            <SaveWord selectedWordPackage={selectedWordPackage!} onChange={() => setTriggerNoteBookRefresh(!triggerNoteBookRefresh)}></SaveWord>
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

      <section className='bottom-bar'>
        <div>
          <NoteBook triggerNoteBookRefresh={triggerNoteBookRefresh}></NoteBook>
        </div>
        <div className='tool-bar'>
          <div>
            <SidePanelController></SidePanelController>
          </div>
          <img src={setting} alt="setting" />
        </div>
        <div className='mask'></div>
      </section>
    </main>
  );
}

export default SidePanel;
