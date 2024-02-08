// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import AuthenticationOptionsScreen from './screens/AuthenticationOptionsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerShown="false">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthenticationOptionsScreen" component={AuthenticationOptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
