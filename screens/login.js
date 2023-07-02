import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import axios from 'axios';
//import { REACT_APP_BASE_URL } from '@env';
import {Config} from '../config';
const REACT_APP_BASE_URL = Config.ip;
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
export default function SignIn({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  getMyStringValue = async () => {
    try {
      id = await AsyncStorage.getItem('@id');
      console.log(`${id} id hai`);
      navigate(id);
    } catch (e) {
      console.log(e);
    }
  };

  function navigate(ids) {
    if (ids !== null) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    }
  }

  getMyStringValue();

  function signIn() {
    console.log(REACT_APP_BASE_URL);
    setLoader(true);
    axios({
      timeout: 20000,
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        console.log(res.data);
        await AsyncStorage.setItem('@id', res.data._id);
        await AsyncStorage.setItem('@jwt', res.data.token);
        await AsyncStorage.setItem('@role', res.data.role);
        setLoader(false);
        if (res.data.role == 'client') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Menu');
        }
      })
      .catch(er => {
        setLoader(false);
        console.log(er.response.data);

        Alert.alert(
          'Failed',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Something went wrong'
          }`,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      });
  }

  return (
    <View style={{height: '100%'}}>
      {!loader ? (
        <View style={{height: '100%'}}>
          <ImageBackground
            source={require('../images/onBoardingPet3.jpeg')}
            style={{width: '100%', height: 250}}>
            <LinearGradient
              colors={['#CF333900', '#CF3339']}
              style={styles.gradientStyle}
              start={{x: 0.5, y: 0.5}}
              end={{x: 0.5, y: 1.5}}
            />
            <View style={styles.topheader}>
              <View style={styles.textView}>
                <Text style={styles.textStyle}>Sign In</Text>
                <Text style={[styles.textStyle, {paddingBottom: 20}]}>
                  To Account
                </Text>
                <Text style={styles.textStyle2}>
                  Sign with username or email and password to use your account.
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ScrollView style={styles.bottomSection}>
            <View style={{height: '100%', padding: 24}}>
              <View style={{paddingBottom: 20}}>
                <TextField
                  style={{marginBottom: 5}}
                  label="Email Address"
                  onChangeText={text => setEmail(text)}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Image
                          resizeMode="contain"
                          style={{width: 25}}
                          source={require('../images/EnvelopeClosed.png')}
                        />
                      )}
                    />
                  }
                />
                <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                  <Text style={styles.forgotButtonStyle}>Forgot Email ID?</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingBottom: 20}}>
                <TextField
                  style={{marginBottom: 5}}
                  label="Password"
                  secureTextEntry={isPasswordVisible ? false : true}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Image
                          resizeMode="contain"
                          style={{width: 25}}
                          source={require('../images/password_icon.png')}
                        />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      name={() => (
                        <TouchableOpacity
                          onPress={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                          }}>
                          {isPasswordVisible ? (
                            <Image
                              resizeMode="contain"
                              style={{width: 25}}
                              source={require('../images/eyeOpen.png')}
                            />
                          ) : (
                            <Image
                              resizeMode="contain"
                              style={{width: 25}}
                              source={require('../images/Hide.png')}
                            />
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  }
                />
                <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                  <Text style={styles.forgotButtonStyle}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => {
                  if (email !== null && password !== null) {
                    signIn();
                  }
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <View style={{width: '100%', height: 50}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', paddingRight: 5}}>
                    Don’t have account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#CF3339',
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  marginTop: 20,
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Image source={require('../assets/tagline.png')} />
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Image source={require('../images/Loading.png')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: 35, fontWeight: 'bold', color: '#FFF'},
  textStyle2: {fontSize: 16, fontWeight: '400', color: '#FFF'},
  bottomSection: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  forgotButtonStyle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#777777',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginBottom: 15,
  },
});
