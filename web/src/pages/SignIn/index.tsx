import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

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
  const { signInCustomer, signInProvider } = useAuth();
  const { addToast } = useToast();
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
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signInCustomer({
          email: data.email,
          password: data.password,
        });
        history.push('/dashboardCustomer');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login cheque as credenciais',
        });
      }
    },
    [signInCustomer, history, addToast],
  );

  const handleSubmitProvider = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signInProvider({
          email: data.email,
          password: data.password,
        });
        history.push('/dashboardProvider');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login cheque as credenciais',
        });
      }
    },
    [signInProvider, history, addToast],
  );

  return (
    <>
      <Link to="/">
        <FiArrowLeft color="#fff" size={35} />
      </Link>
      <Container>
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
              onSubmit={
                isCustomer ? handleSubmitCustomer : handleSubmitProvider
              }
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
    </>
  );
};

export default SignIn;
