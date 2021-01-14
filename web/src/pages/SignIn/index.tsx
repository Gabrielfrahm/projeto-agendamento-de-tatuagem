import React from 'react';
import {
  Container,
  Content,
  ButtonContainer,
  ButtonCustomer,
  BackgroundIMG,
  ButtonProvider,
} from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <h1>Faça seu login</h1>
        <ButtonContainer>
          <ButtonProvider>Sou tatuador</ButtonProvider>
          <ButtonCustomer>Sou cliente</ButtonCustomer>
        </ButtonContainer>
      </Content>
      <BackgroundIMG />
    </Container>
  );
};

export default SignIn;
