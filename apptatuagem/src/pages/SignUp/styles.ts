import { Platform } from 'react-native';

import styled, { css } from 'styled-components/native';

interface ButtonProviderProps {
  isClickedProvider: boolean;
}
interface ButtonCustomerProps {
  isClickedCustomer: boolean;
}


export const ImgBack = styled.ImageBackground`
  flex:1;
  justify-content: center;
  position: relative;
`;

export const Container = styled.View`
  position: absolute;
  width:100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 100 : 40}px;

`;


export const Title = styled.Text`
  font-size: 55px;
  color: #f4ede8;
  margin: 40px 0 24px;
  font-family: 'BigShouldersStencilText-Medium';
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom:20px;



`;

export const ButtonProvider = styled.TouchableOpacity<ButtonProviderProps>`
  margin-right: 55px;
  border-width: 2px ;
  border-color: transparent;

  ${props =>
    props.isClickedProvider &&
    css`
      border-color: #B34D4B;
      padding: 4px;
      border-radius: 10px;
    `}



`;

export const ButtonCustomer = styled.TouchableOpacity<ButtonCustomerProps>`
  border-width: 2px ;
  border-color: transparent;

${props =>
    props.isClickedCustomer &&
    css`
       border-color: #B34D4B;
       padding: 4px;
       border-radius: 10px;
    `}

`;

export const ButtonText = styled.Text`
  font-family: 'BigShouldersStencilText-Medium';
  font-size: 18px;
  color: #fff;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #B34D4B;
  font-size: 24px;
  font-family: 'BigShouldersStencilText-Medium';
`;


export const BackLoginButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #B34D4B;
  border-top-width: 1px;
  border-color: #B34D4B;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackLoginText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-family: 'BigShouldersStencilText-Medium';
  margin-left: 16px;
`;
