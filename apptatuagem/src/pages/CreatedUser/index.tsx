import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {Container, Message, SubMessage, ButtonBackSignIn, ButtonBackSignInText} from './stytes';

const CreatedUser: React.FC = () => {
  const navigation = useNavigation();
  return(
    <Container>
      <Icon name="check" size={100} color="#B34D4B"/>
      <Message>Cadastro realizado com sucesso</Message>
      <SubMessage>Você ja pode fazer login</SubMessage>
      <ButtonBackSignIn>
        <ButtonBackSignInText onPress={() => navigation.navigate('SignIn')}>Fazer login</ButtonBackSignInText>
      </ButtonBackSignIn>
    </Container>
  )
}

export default CreatedUser;
