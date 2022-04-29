import { useNavigation } from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {View, TextInput} from 'react-native';
import { PlusIcon } from 'react-native-heroicons/solid';

import {AddButton, Container, Input} from './styles';

const InputSearch = ({placeholder, ...rest}, ref) => {
  const navigation = useNavigation()
  return (
    <Container>
      {/* <TextInput /> */}
      {/* <Input
        returnKeyType="search"
        placeholder={placeholder ? placeholder : 'Procurar checkList'}
        {...rest}
        ref={ref}
      /> */}
      <AddButton onPress={()=> navigation.navigate('Create')} >
        <PlusIcon size={28} color={'#da552f'} />
      </AddButton>
    </Container>
  );
};

export default forwardRef(InputSearch);
