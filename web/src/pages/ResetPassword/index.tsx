import React, { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';

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
  BackgroundIMG,
  ButtonContainer,
  ButtonCustomer,
  ButtonProvider,
} from './styles';
import api from '../../services/api';

interface ResetFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isCustomer, setISCustomer] = useState(false);
  const [isClickedProvider, setIsClickedProvider] = useState(false);
  const [isClickedCustomer, setIsClickedCustomer] = useState(false);

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

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

  const handleSubmitProvider = useCallback(
    async (data: ResetFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('senha Obrigatório'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'as senhas nao batem',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/providers-password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'senha alterada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, location, history],
  );

  const handleSubmitCustomer = useCallback(
    async (data: ResetFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('senha Obrigatório'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'as senhas nao batem',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/customers-password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'senha alterada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, location, history],
  );

  return (
    <Container>
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
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="confirme sua senha"
            />

            <Button loading={loading} type="submit">
              Alterar senha
            </Button>

            <Link to="/signin">Voltar para login</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <BackgroundIMG />
    </Container>
  );
};

export default ResetPassword;
