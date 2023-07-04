import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Logout({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      async function clearData() {
        await AsyncStorage.removeItem('@id');
        await AsyncStorage.removeItem('@role');
        await AsyncStorage.removeItem('@jwt');
        navigation.navigate('Login');
      }
      clearData();
    }),
  );
  return;
}
