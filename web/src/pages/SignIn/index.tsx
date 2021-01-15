import React, { useCallback, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

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
  const { signInCustomer, signInProvider } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [isCustomer, setISCustomer] = useState(false);
  const [isClickedProvider, setIsClickedProvider] = useState(false);
  const [isClickedCustomer, setIsClickedCustomer] = useState(false);

  const history = useHistory();

  const handleLoginCustomer = useCallback(() => {
    setISCustomer(true);
    setIsClickedCustomer(true);
    setIsClickedProvider(false);
  }, []);

  const handleLoginProvider = useCallback(() => {
    setISCustomer(false);
    setIsClickedProvider(true);
    setIsClickedCustomer(false);
  }, []);

  const handleSubmitCustomer = useCallback(
    async (data: SignInFormData) => {
      try {
        await signInCustomer({
          email: data.email,
          password: data.password,
        });
        console.log('customer');
        history.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
    [signInCustomer, history],
  );

  const handleSubmitProvider = useCallback(
    async (data: SignInFormData) => {
      try {
        await signInProvider({
          email: data.email,
          password: data.password,
        });
        console.log('provider');
        history.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
    [signInProvider, history],
  );

  return (
    <Container>
      <Link to="/">
        <FiArrowLeft color="#fff" size={35} />
      </Link>
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

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </Form>
          <Link to="/signup">Não tem uma conta?</Link>
        </AnimationContainer>
      </Content>
      <BackgroundIMG />
    </Container>
  );
};

export default SignIn;
