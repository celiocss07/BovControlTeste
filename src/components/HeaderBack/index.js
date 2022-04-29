import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import { Button, Container } from './styles';

const HeaderBack = ({}) => {
    const navigation = useNavigation()
    function handleNavigate(){
        navigation.goBack()
    }
  return (
      <Container>
          <Button onPress={() => handleNavigate()}>
              <ArrowLeftIcon size={28} color='#da552f' />
          </Button>
      </Container>
  );
}

export default HeaderBack;