import { Platform } from 'react-native';
import styled from 'styled-components/native';

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
