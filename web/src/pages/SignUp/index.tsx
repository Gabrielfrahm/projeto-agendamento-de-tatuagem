import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLock, FiMail, FiArrowLeft, FiUser, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

import {
  Container,
  Content,
  AnimationContainer,
  ButtonContainer,
  ButtonCustomer,
  BackgroundIMG,
  ButtonProvider,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      await api.post('/customers', data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <BackgroundIMG />

      <Content>
        <AnimationContainer>
          <h1>Faça seu login</h1>
          <ButtonContainer>
            <ButtonProvider>Sou tatuador</ButtonProvider>
            <ButtonCustomer>Sou cliente</ButtonCustomer>
          </ButtonContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input type="name" name="name" icon={FiUser} placeholder="Nome" />

            <Input
              type="email"
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input name="phone" icon={FiPhone} placeholder="Numero" />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/signin">
            <FiArrowLeft color="#fff" size={20} />
            voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
