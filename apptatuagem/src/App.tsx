import React from 'react';
import 'react-native-gesture-handler';
import AppProvider from './hooks';
import {NavigationContainer} from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar  barStyle='light-content' backgroundColor="#B34D4B" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#201E1E'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  )
};

export default App;
