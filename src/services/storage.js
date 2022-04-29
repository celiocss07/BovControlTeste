import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import getRealm from './realm';
import api from './api';

export async function getAllChecklist() {
  const realm = await getRealm();
  return await realm.objects('Checklist');
  //console.log('get all checklist => ', data);
}
export async function syncRemoteStorage() {
  const realm = await getRealm();
  const localData = await realm.objects('Checklist').sorted('created_at', true);
  

  try {
    const  unsubscribe = NetInfo.addEventListener(async state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        await api
          .get('/')
          .then(res => {
            res.data.map(async obj => {
              await api
                .delete(`/${obj.id}`)
                .then(res => console.log('DELETE checklist => ', res.data))
                .catch(err => console.log('Error to DELETE checklist => ', err));
            });
          })
          .catch(err => {
            console.log('API error => ', err);
          });
  
        localData.map(async item => {
          await api
            .post(`/`, item)
            .then(res => console.log('POST checklist => ', res.data))
            .catch(err => console.log('Error to POST checklist => ', err));
        });
      }
    });

    unsubscribe()
    
  } catch (error) {
    console.info(error)
  }
}

export async function createChecklist(checklist) {
  try {
    console.log(checklist);
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Checklist', checklist);
    });
  } catch (error) {
    console.log('realm error => ', error);
  }
}
export async function updateChecklist(checklist) {
  try {
    const realm = await getRealm();

    const aux = realm.objectForPrimaryKey('Checklist', checklist.id);
    console.log('UPDATE => ', aux);

    realm.write(() => {
      aux.farmer = checklist.farmer;
      aux.from = checklist.from;
      aux.to = checklist.to;
      aux.amount_of_milk_produced = checklist.amount_of_milk_produced;
      aux.number_of_cows_head = checklist.number_of_cows_head;
      aux.updated_at = checklist.updated_at;
    });
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'This checklist was updated👋',
    });
  } catch (error) {
    console.log('realm error => ', error);
    Toast.show({
      type: 'error',
      text1: 'was not updated',
      text2: 'Checklist was not updated please check the logs',
    });
  }
}

export async function deleteChecklist(id) {
  try {
    const realm = await getRealm();
    console.log('ID => ', id);
    console.log(
      'CONSULTA => ',
      realm.objects('Checklist').filtered('id == ' + id),
    );

    realm.write(() => {
      realm.delete(realm.objects('Checklist').filtered(`id = ${id}`));
    });
    Toast.show({
      type: 'success',
      text1: 'Deleted',
      text2: 'Checklist was deleted',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'was not deleted',
      text2: 'Checklist was not deleted please check the logs',
    });
    console.log('realm error => ', error);
  }
}
