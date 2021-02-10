import React, { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';

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
import api from '../../services/api';

interface SignInFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // const { signInCustomer, signInProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [isCustomer, setISCustomer] = useState(false);
  const [isClickedProvider, setIsClickedProvider] = useState(false);
  const [isClickedCustomer, setIsClickedCustomer] = useState(false);

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
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/customers-password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail de recuperação de senha, cheque sua caixa de entrada',
        });
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
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  const handleSubmitProvider = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/providers-password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail de recuperação de senha, cheque sua caixa de entrada',
        });
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
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Link to="/">
        <FiArrowLeft color="#fff" size={35} />
      </Link>
      <Content>
        <AnimationContainer>
          <h1>Recuperação de senha</h1>
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

            <Button loading={loading} type="submit">
              Enviar
            </Button>

            <Link to="/signin">Voltar para login</Link>
          </Form>
          <Link to="/signup">Não tem uma conta?</Link>
        </AnimationContainer>
      </Content>
      <BackgroundIMG />
    </Container>
  );
};

export default ForgotPassword;
