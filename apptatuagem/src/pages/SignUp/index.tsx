import React, { useCallback, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View ,ScrollView, TextInput } from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import Button from '../../components/Button';

import backImg from '../../assets/BackImgUp.png';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/Auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  ImgBack,
  ButtonContainer,
  ButtonProvider,
  ButtonCustomer,
  ButtonText,
  ForgotPassword,
  ForgotPasswordText,
  BackLoginButton,
  BackLoginText,

} from './styles';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const InputEmailRef = useRef<TextInput>(null);
  const InputPasswordRef = useRef<TextInput>(null);
  const InputPhoneRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { signInCustomer, signInProvider } = useAuth();


  const [isCustomer, setISCustomer] = useState(false);
  const [isClickedProvider, setIsClickedProvider] = useState(false);
  const [isClickedCustomer, setIsClickedCustomer] = useState(false);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    async (data: SignUpFormData) => {
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

        navigation.navigate('CreatedUser');

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
    async (data: SignUpFormData) => {
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

        console.log('provider');

        navigation.navigate('CreatedUser')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        Alert.alert(
          'Erro no cadastro',
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
              <Title>Cadastros</Title>
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
                name='name'
                icon='user'
                placeholder='Nome'
                returnKeyType='next'
                onSubmitEditing={() => {
                  InputEmailRef.current?.focus();
                }}
              />

              <Input
                autoCorrect={false}
                ref={InputEmailRef}
                autoCapitalize='none'
                keyboardType='email-address'
                name='email'
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
                  InputPhoneRef.current?.focus()
                }}
              />
              <Input
                ref={InputPhoneRef}
                name="phone"
                icon="phone"
                placeholder="Numero"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />


              <Button onPress={() => {
                formRef.current?.submitForm()
              }}>Cadastrar</Button>

            </Form>



            <BackLoginButton onPress={()=> {navigation.goBack()}}>
              <BackLoginText>
                <Icon name="arrow-left" size={25} />
                Voltar
              </BackLoginText>
            </BackLoginButton>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      </>
    );
};




export default SignUp;
