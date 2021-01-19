import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items:center;

`;

export const Message = styled.Text`
  font-size: 30px;
  font-family: 'BigShouldersStencilText-Medium';
  color: #fff;
`;

export const SubMessage = styled.Text`
  font-size: 20px;
  font-family: 'BigShouldersStencilText-Medium';
  color: #fff;
`;

export const ButtonBackSignIn = styled(RectButton)`
  margin-top: 30px;
  background: #B34D4B;
  padding: 5px 18px;
  border-radius: 12px;
`;

export const ButtonBackSignInText = styled.Text`
  font-family: 'BigShouldersStencilText-Medium';
  color: #fff;
  font-size: 20px;
`;
