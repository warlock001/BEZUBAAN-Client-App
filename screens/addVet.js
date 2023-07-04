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
import {Config} from '../config';
const REACT_APP_BASE_URL = Config.ip;
import {launchImageLibrary} from 'react-native-image-picker';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const mime = require('mime');

export default function AddVet({navigation}) {
  const [type, setVetType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setVetDescription] = useState('');
  const [phone, setPhone] = useState(null);
  const [dialCode, setDialCode] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('Choose an image');
  const [modalVisible, setModalVisible] = useState(false);

  const vetTypes = [
    'Feline Vet',
    'Avian Vet',
    'Canine Vet',
    'Companion Vet',
    'Exotic Vet',
    'Livestock Vet',
    'Laboratory Vet',
  ];

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
      type: type,
      firstName: firstName,
      lastName: lastName,
      description: description,
      mobile: phone,
      dialCode: dialCode,
      countryCode: dialCode,
    });

    if (
      !type ||
      !firstName ||
      !lastName ||
      !description ||
      !phone ||
      !dialCode ||
      !image
    ) {
      Alert.alert('', 'Please fill in All the required details.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      const form = new FormData();
      form.append('image', image);
      form.append('type', type);
      form.append('firstName', firstName);
      form.append('lastName', lastName);
      form.append('description', description);
      form.append('mobile', phone);
      form.append('dialCode', dialCode);
      form.append('countryCode', dialCode);
      axios({
        method: 'POST',
        url: `${REACT_APP_BASE_URL}/vet`,
        data: form,
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          console.log(res.message);
          setModalVisible(true);
          setVetType('');
          setFirstName('');
          setLastName('');
          setVetDescription('');
          setPhone('');
          setDialCode('');
          setImage('');
          setImageName('');
        })
        .catch(res => {
          console.log(res);
          Alert.alert('', 'Unknown Error Occured', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    }
  }

  return (
    <ScrollView>
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
              Vet has been added sucessfully{' '}
            </Text>
            <Pressable
              style={[styles.doneButton]}
              onPress={() => navigation.navigate('RescuerStack')}>
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
              <Text style={styles.textStyle}>Add A New Vet</Text>
              <Text style={styles.textStyle2}>Add a new vet to your Team.</Text>
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
                data={vetTypes}
                defaultButtonText="Select Vet Type"
                onSelect={(selectedItem, index) => {
                  setVetType(selectedItem);
                }}
              />
            </SafeAreaView>
            <SafeAreaView style={{marginBottom: 20}}>
              <TextField
                label="First Name"
                onChangeText={text => setFirstName(text)}
                left={
                  <TextInput.Icon
                    resizeMode="contain"
                    style={{width: 25}}
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/User1.png')}
                      />
                    )}
                  />
                }
              />
            </SafeAreaView>
            <SafeAreaView style={{marginBottom: 20}}>
              <TextField
                label="Last Name"
                onChangeText={text => setLastName(text)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/User1.png')}
                      />
                    )}
                  />
                }
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <TextInput
                label="Description"
                onChangeText={text => setVetDescription(text)}
                value={description}
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
    marginBottom: 22,
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
