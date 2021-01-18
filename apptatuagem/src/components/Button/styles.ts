import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  background: #B34D4B;
  border-radius: 10px;
  margin-top: 15px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'BigShouldersStencilText-Medium';
  color: #fff;
  font-size: 24px;
`;
