// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login'
import Register from './screens/register';
import Home from './screens/home.js';
import ReportAnimal from './screens/reportAnimal';
import MyAccount from './screens/myAccount';
import RescueCenter from './screens/rescueCenter';



const Stack = createNativeStackNavigator();

function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RescueCenter" component={RescueCenter} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ReportAnimal" component={MyAccount} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;