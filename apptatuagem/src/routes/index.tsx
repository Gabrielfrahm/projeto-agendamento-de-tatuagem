import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AuthRoutes from './auth.routes';
// import AppRoutes from './app.routes';
import {useAuth} from '../hooks/Auth';

const Routes: React.FC = () => {
  const {user, loading} = useAuth();

  if(loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"  color="#B34D4B"/>
      </View>
    )
  }
  return user ?  null : <AuthRoutes />;
}

export default Routes;
