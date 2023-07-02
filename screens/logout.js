import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import React from 'react';
export default function Logout({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate('Login');
    }),
  );
  return;
}
