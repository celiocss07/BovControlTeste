import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import Checklist from '../../components/Checklist';
import Container from '../../components/Container';
import InputSearch from '../../components/InputSearch';
import Realm from 'realm';
import {ListBox} from './styles';
import {getAllChecklist} from '../../services/storage';

const Home = () => {
  
  useEffect(() => {
    
  }, []);

  return (
    <Container>
      <InputSearch />

      <ListBox>
        <Checklist />
      </ListBox>
    </Container>
  );
};

export default Home;
