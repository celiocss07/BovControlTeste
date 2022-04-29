import React, {forwardRef} from 'react';
import {View, TextInput} from 'react-native';
import {Container, InputText, Title} from './styles';

const Input = ({placeholder, type, width, ...rest}, ref) => {
  return (
    /*  <TextInput   /> */
    <Container style={{width: width? width: '100%'}}>
      <Title>{placeholder}</Title>
      <InputText
        ref={ref}
        returnKeyType="next"
        keyboardType={`${type ? type : 'default'}`}
        autoComplete="off"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
