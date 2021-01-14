import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import {
  Container,
  Content,
  AnimationContainer,
  ButtonContainer,
  ButtonCustomer,
  BackgroundIMG,
  ButtonProvider,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('submit =)');
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h1>Faça seu login</h1>
          <ButtonContainer>
            <ButtonProvider>Sou tatuador</ButtonProvider>
            <ButtonCustomer>Sou cliente</ButtonCustomer>
          </ButtonContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input />
            <Input />
            <button type="button">Entrar</button>
          </Form>
        </AnimationContainer>
      </Content>
      <BackgroundIMG />
    </Container>
  );
};

export default SignIn;
