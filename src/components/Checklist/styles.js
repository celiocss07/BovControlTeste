import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: orange;
`;
export const Box = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding:  8px;

`;

export const Items = styled.TouchableOpacity`
  width: 100%;
  background-color: #FFF;
  border-radius: 6px;
  padding: 8px;
  elevation: 4;
`;
export const IconBtn = styled.TouchableOpacity`
  
  padding: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  
  
`;

export const BoxTitle = styled.View`
  margin-right: 8px;
 

`;
export const DescriptionBox = styled.View`
flex-direction: row;
justify-content: space-around;
align-items: center;
  
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: #000;
`;
export const Text= styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: #000;
`;

export const FarmName= styled.Text`
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: #da552f;
  
`;
