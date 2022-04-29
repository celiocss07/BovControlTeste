import React, {useState, useRef, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import Button from '../../components/Button';
import Container from '../../components/Container';
import HeaderBack from '../../components/HeaderBack';
import Input from '../../components/Input';
import {BarIndicator} from 'react-native-indicators';
import {EnableUpdateButton, Form, Row, Scroll, Title} from './styles';
import Toast from 'react-native-toast-message';
import {ChecklistContext} from '../../Context/checklistContext';
import {updateChecklist} from '../../services/storage';
const Update = () => {
  const {selectedChecklist, syncChecklists} = useContext(ChecklistContext);

  const [farmerName, setFarmerName] = useState('');
  const [farm, setFarm] = useState('');
  const [milk, setMilk] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [farmCity, setFarmCity] = useState('');
  const [headQuantity, setHeadQuantity] = useState('');
  const [selectedChecklistType, setSelectedChecklistType] = useState('');
  const [loading, setLoading] = useState(true);
  const [hadSupervision, setHadSupervision] = useState('');

  const inputFarmerNameRef = useRef();
  const inputFarmNameRef = useRef();
  const inputFarmerCityRef = useRef();
  const inputRoleNameRef = useRef();
  const inputMilkRef = useRef();
  const inputHeadQuantityRef = useRef();
  const inputChecklistTypeRef = useRef();

  function handleUpdate() {
    const data = {
      id: selectedChecklist.id,
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
      updated_at: new Date(),
    };

    updateChecklist(data)
    .then( res => syncChecklists());
  }

  function handleSetData() {
    setFarm(JSON.parse(selectedChecklist?.farmer)?.name);
    setFarmCity(JSON.parse(selectedChecklist?.farmer)?.city);
    setFarmerName(JSON.parse(selectedChecklist?.from)?.name);
    setRoleName(JSON.parse(selectedChecklist?.to)?.name);
    setHeadQuantity((selectedChecklist?.number_of_cows_head).toString());
    setMilk((selectedChecklist?.amount_of_milk_produced).toString());
    setSelectedChecklistType(selectedChecklist?.type);
    setHadSupervision(selectedChecklist.had_supervision.toString());
    setLoading(false);
  }

  function handleEditable() {
    setIsEditable(!isEditable);
  }

  useEffect(() => {
    handleSetData();

    return () => {};
  }, []);

  return (
    <Container style={{backgroundColor: '#FFF'}}>
      <HeaderBack />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BarIndicator color="#da552f" size={80} />
        </View>
      ) : (
        <>
          <Title>View or update cheklist</Title>
          <EnableUpdateButton
            style={{backgroundColor: !isEditable ? '#880808' : '#32CD32'}}
            onPress={() => handleEditable()}>
            <Text style={{color: '#FFF', fontSize: 16}}>
              {!isEditable
                ? 'Click for enable update'
                : 'Click for disable update'}
            </Text>
          </EnableUpdateButton>

          <Scroll>
            <Form>
              <Input
                style={{color: isEditable ? '#000' : '#aaa'}}
                ref={inputFarmNameRef}
                value={farm}
                onChangeText={e => setFarm(e)}
                placeholder="Farm name"
                autoCapitalize="words"
                onSubmitEditing={() => inputFarmerCityRef.current.focus()}
                editable={isEditable}
              />
              <Input
                style={{color: isEditable ? '#000' : '#aaa'}}
                ref={inputFarmerCityRef}
                value={farmCity}
                onChangeText={e => setFarmCity(e)}
                placeholder="Farm city name"
                autoCapitalize="words"
                onSubmitEditing={() => inputFarmerNameRef.current.focus()}
                editable={isEditable}
              />
              <Input
                style={{color: isEditable ? '#000' : '#aaa'}}
                ref={inputFarmerNameRef}
                value={farmerName}
                onChangeText={e => setFarmerName(e)}
                placeholder="Farmer name"
                autoCapitalize="words"
                onSubmitEditing={() => inputRoleNameRef.current.focus()}
                editable={isEditable}
              />
              <Input
                style={{color: isEditable ? '#000' : '#aaa'}}
                ref={inputRoleNameRef}
                value={roleName}
                onChangeText={e => setRoleName(e)}
                placeholder="Role farmer name"
                autoCapitalize="words"
                onSubmitEditing={() => inputChecklistTypeRef.current.focus()}
                editable={isEditable}
              />
              <Row>
                <Input
                  style={{color: '#aaa'}}
                  ref={inputChecklistTypeRef}
                  width={'48%'}
                  value={selectedChecklistType}
                  onChangeText={e => setSelectedChecklistType(e)}
                  placeholder="Type checklist"
                  onSubmitEditing={() => inputMilkRef.current.focus()}
                  editable={false}
                />
                <Input
                  style={{color: '#aaa'}}
                  width={'48%'}
                  value={hadSupervision}
                  type="numeric"
                  onChangeText={e => setHeadQuantity(e)}
                  placeholder="had supervision?"
                  //ref={inputHeadQuantityRef}
                  //onSubmitEditing={() => inputMilkRef.current.focus()}
                  editable={false}
                />
              </Row>
              <Row>
                <Input
                  style={{color: isEditable ? '#000' : '#aaa'}}
                  ref={inputMilkRef}
                  value={milk}
                  width={'48%'}
                  type="numeric"
                  onChangeText={e => setMilk(e)}
                  placeholder="Milk quantity"
                  onSubmitEditing={() => inputHeadQuantityRef.current.focus()}
                  editable={isEditable}
                />
                <Input
                  style={{color: isEditable ? '#000' : '#aaa'}}
                  ref={inputHeadQuantityRef}
                  value={headQuantity}
                  width={'48%'}
                  type="numeric"
                  onChangeText={e => setHeadQuantity(e)}
                  placeholder="Head qantity"
                  editable={isEditable}
                />
              </Row>

              <Button title={'Update'} type="solid" onPress={handleUpdate} />
            </Form>
          </Scroll>
        </>
      )}
    </Container>
  );
};

export default Update;
