import './sidePanel.css';
import { useEffect, useState } from 'react';
import { storage } from 'wxt/storage';
import { SelectedWordPackage } from '@/models/SelectedWordPackage';
import { LocalStorage } from '@/models/LocalStorage';

function SidePanel() {

  const [selectedWordPackage, setSelectedWordPackage] = useState<SelectedWordPackage | undefined>(undefined);

  useEffect(() => {
    // retrieve selected word package from local storage initially
    storage.getItem<SelectedWordPackage>(LocalStorage.SelectedWordPackage).then((value) => {
      setSelectedWordPackage(value!);

      // watch for changes in selected word package
      const unwatch = storage.watch<SelectedWordPackage>(LocalStorage.SelectedWordPackage, (newValue) => {
        setSelectedWordPackage(newValue!);
      });

      // cleanup watcher when unmounts
      return () => {
        unwatch();
      };

    });
  }, []);

  return (
    <main>
      <div>{selectedWordPackage?.selectedText}</div>
    </main>
  );
}

export default SidePanel;
