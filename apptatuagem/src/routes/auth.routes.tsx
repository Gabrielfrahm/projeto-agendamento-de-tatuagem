import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreatedUser from '../pages/CreatedUser';

const Auth =  createStackNavigator();

const AuthRoutes: React.FC =() => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: "#201E1E" }
      }}
    >
      <Auth.Screen  name="SignIn" component={SignIn}/>
      <Auth.Screen  name="SignUp" component={SignUp}/>
      <Auth.Screen  name="CreatedUser" component={CreatedUser}/>
    </Auth.Navigator>
  );
}

export default AuthRoutes;
