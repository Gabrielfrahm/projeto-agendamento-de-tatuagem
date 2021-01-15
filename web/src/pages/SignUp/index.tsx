import React, { useCallback, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLock, FiMail, FiArrowLeft, FiUser, FiPhone } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const [isCustomer, setIsCustomer] = useState(false);
  const [isClickedProvider, setIsClickedProvider] = useState(false);
  const [isClickedCustomer, setIsClickedCustomer] = useState(false);

  const handleLoginCustomer = useCallback(() => {
    setIsCustomer(true);
    setIsClickedProvider(false);
    setIsClickedCustomer(true);
  }, []);

  const handleLoginProvider = useCallback(() => {
    setIsCustomer(false);
    setIsClickedProvider(true);
    setIsClickedCustomer(false);
  }, []);

  const handleSubmitCustomer = useCallback(
    async (data: SignInFormData) => {
      try {
        await api.post('/customers', data);
        history.push('/signin');
      } catch (err) {
        console.log(err);
      }
    },
    [history],
  );

  const handleSubmitProvider = useCallback(
    async (data: SignInFormData) => {
      try {
        await api.post('/providers', data);
        history.push('/signin');
      } catch (err) {
        console.log(err);
      }
    },
    [history],
  );

  return (
    <Container>
      <BackgroundIMG />

      <Content>
        <AnimationContainer>
          <h1>Faça seu login</h1>
          <ButtonContainer>
            <ButtonProvider
              onClick={handleLoginProvider}
              isClickedProvider={isClickedProvider}
            >
              Sou tatuador
            </ButtonProvider>
            <ButtonCustomer
              onClick={handleLoginCustomer}
              isClickedCustomer={isClickedCustomer}
            >
              Sou cliente
            </ButtonCustomer>
          </ButtonContainer>

          <Form
            ref={formRef}
            onSubmit={isCustomer ? handleSubmitCustomer : handleSubmitProvider}
          >
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
