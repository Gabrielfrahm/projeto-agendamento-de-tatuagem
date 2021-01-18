import React, { useCallback, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View ,ScrollView, TextInput } from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import backImg from '../../assets/BackImg.png';
import * as Yup from 'yup';

import {
  Container,
  Title,
  ImgBack,
  ButtonContainer,
  ButtonProvider,
  ButtonCustomer,
  ButtonText,

} from './styles';

import { useAuth } from '../../hooks/Auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const InputPasswordRef = useRef<TextInput>(null);
  const { signInCustomer, signInProvider } = useAuth();


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

  const handleTest = useCallback(()=> {
    console.log('customer');
  },[]);

  const handleTestProvide = useCallback(()=> {
    console.log('provider');
  },[]);


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
        console.log('customer');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login cheque as credenciais',
        );
      }
    },
    [signInCustomer, Alert],
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
        console.log('provider');

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login cheque as credenciais',
        );
      }
    },
    [signInProvider, Alert],
  );

    return (
      <>
      <KeyboardAvoidingView style={{flex:1}} enabled behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1}} >
          <ImgBack source={backImg}   />

          <Container>
            <View>
              <Title>Faça seu login</Title>
            </View>
            <ButtonContainer >
              <ButtonProvider
                onPress={handleLoginProvider}
                isClickedProvider={isClickedProvider}
              >
                <ButtonText  >Sou tatuador</ButtonText>
              </ButtonProvider>
              <ButtonCustomer
                onPress={handleLoginCustomer}
                isClickedCustomer={isClickedCustomer}
              >
                <ButtonText>Sou cliente</ButtonText>
              </ButtonCustomer>
            </ButtonContainer>

            <Form ref={formRef} onSubmit={isCustomer ? handleSubmitCustomer : handleSubmitProvider}>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                name='name'
                icon='mail'
                placeholder='E-mail'
                returnKeyType='next'
                onSubmitEditing={() => {
                  InputPasswordRef.current?.focus();
                }}
              />

              <Input
                ref={InputPasswordRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm()
              }}>Entrar</Button>

            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      </>
    );
};




export default SignIn;
