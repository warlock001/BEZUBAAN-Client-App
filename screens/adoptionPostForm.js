import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import TextField from '../components/inputField';
import React, {useState, useRef} from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Lottie from 'lottie-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import SelectBox from '../components/selectBox';
const REACT_APP_BASE_URL = 'http://192.168.0.107:3001';
import {launchImageLibrary} from 'react-native-image-picker';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const mime = require('mime');

export default function AdoptionPostForm({navigation}) {
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const [phone, setPhone] = useState(null);
  const [dialCode, setDialCode] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('Choose an image');
  const [modalVisible, setModalVisible] = useState(false);

  const petTypes = ['Dog', 'Bird', 'Cat', 'Fish'];

  const chooseImage = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    }

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImageName(response.assets[0].uri);
        setImage({
          uri: response.assets[0].uri,
          name: `${new Date()}_profilePicture.jpg`,
          type: mime.getType(response.assets[0].uri),
        });
      }
    });
  };

  async function sendData() {
    console.log({
      petType: petType,
      breed: breed,
      age: age,
      color: color,
      petDescription: petDescription,
      phone: phone,
      dialCode: dialCode,
    });

    if (!petType || !breed || !color || !petDescription || !phone || !image) {
      Alert.alert('', 'Please fill in All the required details.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      id = await AsyncStorage.getItem('@id');
      const form = new FormData();
      form.append('image', image);
      form.append('petType', petType);
      form.append('breed', breed);
      form.append('age', age);
      form.append('color', color);
      form.append('petDescription', petDescription);
      form.append('dialCode', dialCode);
      form.append('phone', phone);
      form.append('id', id);
      axios({
        method: 'POST',
        url: `${REACT_APP_BASE_URL}/adoption`,
        data: form,
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data', // add this
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2M2JjNWZlZDM3OTY0ZjlkM2E2M2I5ZWIiLCJyb2xlIjoiY2xpZW50In0.bgUbZk0lKqY65wgSF-JU-_zxmOasQZ9ClTatL-Qtmv4',
        },
      })
        .then(res => {
          console.log(res.message);
          setModalVisible(true);
          setPetType('');
          setBreed('');
          setAge('');
          setColor('');
          setPetDescription('');
          setPhone('');
        })
        .catch(err => {
          console.log(err);
          Alert.alert('', 'Unknown Error Occured', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    }
  }

  return (
    <ScrollView style={{height: '100%'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[
            styles.centeredView,
            modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
          ]}>
          <View style={styles.modalView}>
            <Lottie
              resizeMode="cover"
              style={{
                width: 150,
                // height: '100%',
              }}
              source={require('../images/success_lottie.json')}
              loop={false}
              autoPlay
            />

            <Text
              style={{
                paddingTop: 31,
                fontSize: 24,
                fontWeight: '500',
                color: '#1A8E2D',
                textAlign: 'center',
              }}>
              Successful
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 15,
                fontWeight: '500',
                color: '#000',
                textAlign: 'center',
              }}>
              Your account has been successfully registered{' '}
            </Text>
            <Pressable
              style={[styles.doneButton]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={require('../images/onBoardingPet3.jpeg')}
        style={{width: '100%', height: 250}}>
        <View style={styles.innerContainer}>
          <View style={styles.topheader}>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>Find Your Pet</Text>
              <Text style={[styles.textStyle, {paddingBottom: 20}]}>
                A New Home
              </Text>
              <Text style={styles.textStyle2}>
                Fill out the details below to post your pet on our listing and
                find our pet a new home.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView style={styles.bottomSection}>
          <View style={{height: '100%', padding: 24}}>
            <SafeAreaView style={{marginBottom: 20}}>
              <SelectBox
                data={petTypes}
                defaultButtonText="Select Pet Type"
                onSelect={(selectedItem, index) => {
                  setPetType(selectedItem);
                }}
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <TextField
                label="Bread"
                onChangeText={text => setBreed(text)}
                value={breed}
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
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <TextField
                label="Age"
                keyboardType="numeric"
                onChangeText={text => setAge(text)}
                value={age}
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
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <TextField
                label="Color"
                onChangeText={text => setColor(text)}
                value={color}
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
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <TextInput
                label="Description"
                onChangeText={text => setPetDescription(text)}
                value={petDescription}
                multiline={true}
                numberOfLines={4}
                activeOutlineColor={'#CF3339'}
                outlineColor={'rgba(0,0,0,0.20)'}
                style={{
                  height: 200,
                  width: '100%',
                  backgroundColor: '#ffffff',
                  textAlignVertical: 'top',
                  borderWidth: 0.5,
                  borderTopLeftRadius: 7,
                  borderTopRightRadius: 7,
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                  padding: 20,
                }}
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <IntlPhoneInput
                // flagStyle={{display: 'none'}}
                defaultCountry="PK"
                value={phone}
                renderAction={() => <Text>XX</Text>}
                containerStyle={styles.phoneInput}
                onChangeText={data => {
                  console.log(data);
                  if (data.phoneNumber[0] === '0') {
                    setPhone(
                      `${data.phoneNumber.substring(1)}`.replace(' ', ''),
                    );
                    setDialCode(data.dialCode);
                  } else {
                    setPhone(`${data.phoneNumber}`.replace(' ', ''));
                    setDialCode(`${data.dialCode}`);
                  }
                }}
                lang="EN"
              />
            </SafeAreaView>

            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={async () => {
                await chooseImage();
              }}>
              <Text style={{fontSize: 18}}>{imageName}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={async () => {
                await sendData();
              }}>
              <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF'}}>
                Submit
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginBottom: 24,
                alignSelf: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                resizeMode="contain"
                style={{width: PAGE_WIDTH - 186}}
                source={require('../assets/tagline.png')}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: 35, fontWeight: 'bold', color: '#FFF'},
  textStyle2: {fontSize: 16, fontWeight: '400', color: '#FFF'},

  bottomSection: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.20)',
    roundness: 10,
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
  },

  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginBottom: 15,
  },
  chooseImageButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  doneButton: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    marginTop: 40,
    marginBottom: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.60)',
  },
});
