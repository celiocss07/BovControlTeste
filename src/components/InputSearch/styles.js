import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 16px 8px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 80%;
  padding: 8px;
  padding-left: 16px;
  font-size: 16px;
  background-color: #FFF;
  border-radius: 4px;
  elevation: 4;
  color: #000;
`;

export const AddButton = styled.TouchableOpacity`
  padding: 8px;
  background-color: #FFF;
  border-radius: 4px;
  border: 1px solid #da552f;
`;
