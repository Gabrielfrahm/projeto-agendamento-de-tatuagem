import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import backImg from '../../assets/BackImg.png';

import {Container, Title, ImgBack} from './styles';

const SignIn: React.FC = () => {
    return (
      <>
      <KeyboardAvoidingView style={{flex:1}} enabled behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1}} >
          <ImgBack source={backImg}   />

          <Container>
              <Title>Faça seu login</Title>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      </>
    );
};




export default SignIn;
