import styled from 'styled-components/native';
import {Platform} from 'react-native'
 export const Box = styled.View`
  flex: 1;
  padding: 8px;
  
  padding-top: ${Platform.OS == 'ios' ? 32 : 8}px;
`;
