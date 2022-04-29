import React, {useState, useRef, useContext} from 'react';
import {View} from 'react-native';
import {BSON} from 'realm';
import Button from '../../components/Button';
import Container from '../../components/Container';
import HeaderBack from '../../components/HeaderBack';
import Input from '../../components/Input';
import getRealm from '../../services/realm';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import {Form, Row, Scroll, Title} from './styles';
import { getAllChecklist, createChecklist } from '../../services/storage';
import { ChecklistContext } from '../../Context/checklistContext';

const Create = ({navigation}) => {

  const {syncChecklists} = useContext(ChecklistContext)

  const [farmerName, setFarmerName] = useState('');
  const [farm, setFarm] = useState('');
  const [milk, setMilk] = useState('0');
  const [roleName, setRoleName] = useState('');
  const [farmCity, setFarmCity] = useState('');
  const [headQuantity, setHeadQuantity] = useState('0');
  const [selectedChecklistType, setSelectedChecklistType] = useState('');
  const [loading, setLoading] = useState(false);
  const [hadSupervision, setHadSupervision] = useState(false);

  const inputFarmerNameRef = useRef();
  const inputFarmNameRef = useRef();
  const inputFarmerCityRef = useRef();
  const inputRoleNameRef = useRef();
  const inputMilkRef = useRef();
  const inputHeadQuantityRef = useRef();
  const inputChecklistTypeRef = useRef();

  function cleanForm() {
    setFarm('');
    setFarmCity('');
    setFarmerName('');
    setRoleName('');
    setHeadQuantity('0');
    setMilk('0');
    setSelectedChecklistType('');
    setLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Created',
      text2: 'Checklist was created with sucess',
    });
  }
  async function handleChecklist(checklist) {
    setLoading(true);
    try {
      if (
        farm &&
        farmCity &&
        farmerName &&
        roleName &&
        selectedChecklistType &&
        milk &&
        headQuantity 
      ) {
        const data = {
          id: Math.floor(Math.random()*1000),
          type: selectedChecklistType,
          amount_of_milk_produced: parseInt(milk),
          number_of_cows_head: parseInt(headQuantity),
          had_supervision: hadSupervision,
          farmer: JSON.stringify({
            name: farm,
            city: farmCity,
          }),
          from: JSON.stringify({
            name: farmerName,
          }),
          to: JSON.stringify({
            name: roleName,
          }),
          created_at: new Date(),
          updated_at: new Date(),
        };
        createChecklist(data)
        .then( res => {
          syncChecklists()
          cleanForm();
        })
        .catch( err => {
          
        })
        
        
       
      } else {
        
        setLoading(false)
      }
    } catch (error) {
      console.log('realm error => ', error);
    }
  }

  

  return (
    <Container style={{backgroundColor: '#fFF'}}>
      <HeaderBack navigation={navigation} />
      <Title>Create a new cheklist</Title>
      <Scroll>
        <Form>
          <Input
            ref={inputFarmNameRef}
            value={farm}
            onChangeText={e => setFarm(e)}
            placeholder="Farm name"
            autoCapitalize="words"
            onSubmitEditing={() => inputFarmerCityRef.current.focus()}
          />
          <Input
            ref={inputFarmerCityRef}
            value={farmCity}
            onChangeText={e => setFarmCity(e)}
            placeholder="Farm city name"
            autoCapitalize="words"
            onSubmitEditing={() => inputFarmerNameRef.current.focus()}
          />
          <Input
            ref={inputFarmerNameRef}
            value={farmerName}
            onChangeText={e => setFarmerName(e)}
            placeholder="Farmer name"
            autoCapitalize="words"
            onSubmitEditing={() => inputRoleNameRef.current.focus()}
          />
          <Input
            ref={inputRoleNameRef}
            value={roleName}
            onChangeText={e => setRoleName(e)}
            placeholder="Role farmer name"
            autoCapitalize="words"
           // onSubmitEditing={() => inputChecklistTypeRef.current.focus()}
          />
          <Row style={{margin: 8}}>
            <SelectDropdown
              buttonTextStyle={{color: '#da552f'}}
              defaultButtonText="select checklist type"
              buttonStyle={{
                backgroundColor: '#FFF',
                borderRadius: 4,
                marginBottom: 8,
                width: '48%',
                borderColor: '#da552f',
                borderWidth: 1,
                height: 46,
              }}
              data={['BPA', 'Antibiótico', 'BPF']}
              onSelect={(selectedItem, index) => {
                setSelectedChecklistType(selectedItem);
              }}
            />
            <SelectDropdown
              buttonTextStyle={{color: '#da552f'}}
              defaultButtonText="had supervision?"
              buttonStyle={{
                backgroundColor: '#FFF',
                borderRadius: 4,
                marginBottom: 8,
                width: '48%',
                borderColor: '#da552f',
                borderWidth: 1,
                height: 46,
              }}
              data={['true', 'false']}
              onSelect={(selectedItem, index) => {
                setHadSupervision(index == 0 ? true : false);
              }}
            />
          </Row>
          <Row>
            <Input
              ref={inputMilkRef}
              width={'48%'}
              value={milk}
              type="numeric"
              onChangeText={e => setMilk(e)}
              placeholder="Milk quantity"
              onSubmitEditing={() => inputHeadQuantityRef.current.focus()}
            />
            <Input
              ref={inputHeadQuantityRef}
              width={'48%'}
              value={headQuantity}
              type="numeric"
              onChangeText={e => setHeadQuantity(e)}
              placeholder="Head qantity"
            />
          </Row>

          <Button
            title={'Create'}
            type="solid"
            onPress={handleChecklist}
            loading={loading}
          />
        </Form>
      </Scroll>
    </Container>
  );
};

export default Create;
