// In App.js in a new project

import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home.js';
import OnBoarding from './screens/onBoarding';
import ReportAnimal from './screens/reportAnimal';
import MyAccount from './screens/myAccount';
import RescueCenter from './screens/rescueCenter';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './components/tabBar';
import {useDispatch} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Adopt from './screens/adopt';
import 'react-native-gesture-handler';
import AdoptAnimal from './screens/adoptAnimal';
import AdoptionPostForm from './screens/adoptionPostForm';
// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator useLegacyImplementation>
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Article" component={Article} />
//     </Drawer.Navigator>
//   );
// }

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(false);
  const [appInit, setAppInit] = useState(false);
  useEffect(() => {
    func = async () => {
      const jwt = await AsyncStorage.getItem('@jwt');
      const role = await AsyncStorage.getItem('@role');
      if (jwt !== null) {
        setLoggedIn(true);
        setUserRole(role);
      } else {
        setLoggedIn(false);
        setAppInit(true);
      }
    };
    func();
  }, []);

  function HomeStack({route, navigation}) {
    const {shouldRedirect, UserRole} = route.params;
    useEffect(() => {
      if (shouldRedirect === true) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'OnBoarding1'}],
          }),
        );
      } else if (UserRole == 'rescuer') {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'RescueCenter'}],
          }),
        );
      }
    }, [shouldRedirect]);

    return (
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={({route}) => ({
          unmountOnBlur: true,
          headerShown: false,
        })}>
        <Tab.Screen
          options={{
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/home2.png')
                      : require('./images/homegrey.png')
                  }
                  style={{width: 20, height: 20}}
                />
              );
            },
            tabBarShowLabel: true,
          }}
          name="Home"
          component={Home}
        />

        <Tab.Screen
          options={{
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  style={{width: 20, height: 20}}
                  source={
                    focused
                      ? require('./images/account.png')
                      : require('./images/accountGrey.png')
                  }
                />
              );
            },
            // tabBarShowLabel: false,
          }}
          name="Profile"
          component={MyAccount}
        />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Drawer /> */}
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            initialParams={{shouldRedirect: !loggedIn, UserRole: userRole}}
          />
          <Stack.Screen name="OnBoarding1" component={OnBoarding} />
          <Stack.Screen name="RescueCenter" component={RescueCenter} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ReportAnimal" component={MyAccount} />
          <Stack.Screen name="Adopt" component={Adopt} />
          <Stack.Screen name="AdoptAnimal" component={AdoptAnimal} />
          <Stack.Screen name="AdoptionPostForm" component={AdoptionPostForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
