import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiLock, FiMail, FiArrowLeft, FiUser, FiPhone } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

import {
  Container,
  Content,
  AnimationContainer,
  ButtonContainer,
  ButtonCustomer,
  BackgroundIMG,
  ButtonProvider,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const phoneRegExp = useMemo(() => {
    const numberCompare = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return numberCompare;
  }, []);

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
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().min(6, 'no Mínimo 6 dígitos'),
          phone: Yup.string()
            .required('o telefone é obrigatório')
            .min(11, 'inclua o numero com o DD')
            .matches(phoneRegExp, 'Numero de telefone não é valido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/customers', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você ja pode fazer seu logon na aplicação!',
        });
        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer cadastro cheque as credenciais',
        });
      }
    },
    [history, phoneRegExp, addToast],
  );

  const handleSubmitProvider = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().min(6, 'no Mínimo 6 dígitos'),
          phone: Yup.string()
            .required('o telefone é obrigatório')
            .min(11, 'inclua o numero com o DD')
            .matches(phoneRegExp, 'Numero de telefone não é valido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/providers', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você ja pode fazer seu logon na aplicação!',
        });

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer cadastro cheque as credenciais',
        });
      }
    },
    [history, addToast, phoneRegExp],
  );

  return (
    <Container>
      <BackgroundIMG />

      <Content>
        <AnimationContainer>
          <h1>Faça seu cadastro</h1>
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
