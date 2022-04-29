import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import getRealm from '../services/realm';
import axios from 'axios';
import {getAllChecklist, syncRemoteStorage} from '../services/storage';
import NetInfo from '@react-native-community/netinfo';

export const ChecklistContext = createContext({});

function ChecklistProvider({children}) {
  const [checklists, setChecklists] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState({});

  async function syncChecklists() {
    const realm = await getRealm();
    const localData = await realm.objects('Checklist').sorted('created_at', true);

    syncRemoteStorage()
    //console.log('CHECKLISTS => ', localData);
        setChecklists(localData);
  }

  useEffect(() => {
    syncChecklists();
  }, []);

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        setChecklists,
        syncChecklists,
        selectedChecklist,
        setSelectedChecklist,
      }}>
      {children}
    </ChecklistContext.Provider>
  );
}
export default ChecklistProvider;
