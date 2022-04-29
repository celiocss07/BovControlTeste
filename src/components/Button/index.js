import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {Container, Title} from './styles';

const Button = ({title, type, loading, ...rest}) => {
  return (
    
    <Container
      style={{
        backgroundColor: type == 'solid' ? '#da552f' : 'transparent',
      }}
      disabled={loading}
      {...rest}>
      {loading ? (
       <BarIndicator color={type == 'solid' ? '#FFF' : '#da552f'} size={32} />
      ) : (
        <Title
          style={{
            color: type == 'solid' ? '#FFF' : '#da552f',
          }}>
          {title ? title : 'default'}
        </Title>
      )}
    </Container>
  );
};

export default Button;
