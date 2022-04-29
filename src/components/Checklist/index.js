import React, {useEffect, useState, useContext} from 'react';
import {View, TouchableOpacity, Text as Text2} from 'react-native';
import Moment from 'moment';
import {SparklesIcon, TrashIcon} from 'react-native-heroicons/solid';
import LottieView from 'lottie-react-native';
import {BSON} from 'realm';
import {
  Box,
  Container,
  Items,
  BoxTitle,
  Title,
  Text,
  DescriptionBox,
  FarmName,
  IconBtn,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import { ChecklistContext } from '../../Context/checklistContext';
import { deleteChecklist } from '../../services/storage';

const Checklist = () => {

  const {checklists, syncChecklists, setSelectedChecklist} = useContext(ChecklistContext)
  
  const navigation = useNavigation();
  
  function handleNavigate(item){
    navigation.navigate('Update')
    setSelectedChecklist(item)
  }

  function formatDate(date) {
    Moment.locale('pt');
    return Moment(date).format('LLL');
  }

  

  

  return (
    <>
      {checklists.length > 0 ? checklists?.map((item, index) => (
        <Box key={index}>
          <Items onPress={() => handleNavigate(item)}>
            <DescriptionBox>
              <FarmName>{JSON.parse(item?.farmer)?.name} </FarmName>
              <IconBtn onPress={() => {
                deleteChecklist(item.id)
                .then(res =>  {
                  syncChecklists()
                })
              }}>
                <TrashIcon size={28} color={'#da552f'} />
              </IconBtn>
            </DescriptionBox>

            <DescriptionBox>
              <BoxTitle>
                {/* <Title>Farm:</Title> */}
                <Title>City:</Title>
                <Title>Farmer:</Title>
                <Title>Created at: </Title>
              </BoxTitle>
              <BoxTitle>
                {/*   <Text>Kikovo</Text> */}
                <Text>{JSON.parse(item?.farmer)?.city}</Text>
                <Text>{JSON.parse(item?.from)?.name}</Text>
                <Text>{formatDate(item?.created_at)}</Text>
              </BoxTitle>
            </DescriptionBox>
          </Items>
        </Box>
      )) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView source={require('./../../../assets/icons/not_found.json')} autoPlay loop />
        
      </View>)
      }
    </>
  );
};

export default Checklist;
