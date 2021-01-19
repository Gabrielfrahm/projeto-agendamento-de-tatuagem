import React from 'react';
import { Text, Button } from 'react-native';
import {useAuth} from '../../hooks/Auth';

const Dashboard: React.FC  = () => {
  const {signOut} = useAuth();
  return(
    <>
      <Text>Bem vindo</Text>
      <Button title="sair" onPress={signOut}>sair</Button>
    </>
  );
}

export default Dashboard;
