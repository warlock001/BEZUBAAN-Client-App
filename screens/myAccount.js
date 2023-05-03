import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Alert,
  Platform,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
import TextField from '../components/inputField';
import React, {useState, useRef, useEffect} from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import GetLocation from 'react-native-get-location';
const mime = require('mime');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
// import SidebarLayout from '../layouts/sidebarLayout';
// import ImagePicker from 'react-native-image-crop-picker';
import LoadingModal from '../components/loadingScreen';
const REACT_APP_BASE_URL = 'http://192.168.0.107:3001';
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');
export default function MyAccount({navigation}) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  //const [photo, setPhoto] = React.useState(null);
  const [photo1, setPhoto1] = React.useState(require('../images/zaby.png'));

  const [location, setLocation] = useState('');
  const [data, setData] = useState('');
  const [uri, setUri] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [filePath, setFilePath] = useState('');

  var id;
  useFocusEffect(
    React.useCallback(async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );

      getMyStringValue = async () => {
        try {
          id = await AsyncStorage.getItem('@id');
          console.log(id);
        } catch (e) {
          console.log(e);
        }
      };

      getMyStringValue();

      getLocation = async () => {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then(location => {
            console.log(location);
            setLocation(location);
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      };

      getLocation();
    }, []),
  );

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
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));

        id = await AsyncStorage.getItem('@id');
        const jwt = await AsyncStorage.getItem('@jwt');
        const form = new FormData();
        form.append('image', {
          uri: response.assets[0].uri,
          name: `${new Date()}_${id}_profilePicture.jpg`,
          type: mime.getType(response.assets[0].uri),
        });
        form.append('user', id);
        form.append('location', JSON.stringify(location));
        form.append('token', jwt);
        await axios({
          timeout: 20000,
          method: 'POST',
          url: `${REACT_APP_BASE_URL}/report`,
          data: form,
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data', // add this
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2M2JjNWZlZDM3OTY0ZjlkM2E2M2I5ZWIiLCJyb2xlIjoiY2xpZW50In0.bgUbZk0lKqY65wgSF-JU-_zxmOasQZ9ClTatL-Qtmv4',
          },
        });
      }
    });
  };

  const launchCamera = async () => {
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
    ImagePicker.launchCamera(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));

        id = await AsyncStorage.getItem('@id');
        const jwt = await AsyncStorage.getItem('@jwt');
        const form = new FormData();
        form.append('image', {
          uri: response.assets[0].uri,
          name: `${new Date()}_${id}_profilePicture.jpg`,
          type: mime.getType(response.assets[0].uri),
        });
        form.append('user', id);
        form.append('location', JSON.stringify(location));
        form.append('token', jwt);
        await axios({
          timeout: 20000,
          method: 'POST',
          url: `${REACT_APP_BASE_URL}/report`,
          data: form,
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data', // add this
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2M2JjNWZlZDM3OTY0ZjlkM2E2M2I5ZWIiLCJyb2xlIjoiY2xpZW50In0.bgUbZk0lKqY65wgSF-JU-_zxmOasQZ9ClTatL-Qtmv4',
          },
        });
      }
    });
  };

  function renderFileUri() {
    // console.log(fileUri.length > 0);
    return fileUri.length > 1 ? (
      <View style={{marginBottom: 24}}>
        <Image
          style={{
            width: 110,
            height: 110,

            borderRadius: 50,
          }}
          source={{uri: fileUri}}
        />
        <Image style={styles.camera} source={require('../images/camera.png')} />
      </View>
    ) : (
      <View style={{marginBottom: 24}}>
        <Image
          style={{
            width: 110,
            height: 110,

            borderRadius: 50,
          }}
          source={require('../images/placeholder.jpg')}
        />
        <Image style={styles.camera} source={require('../images/camera.png')} />
      </View>
    );
  }

  function uploadImage() {
    // console.log(fileUri.length > 0);
    return fileUri.length > 1 ? (
      <View style={{marginBottom: 24}}>
        <Image
          style={{
            width: 110,
            height: 110,

            borderRadius: 50,
          }}
          source={{uri: fileUri}}
        />
        <Image style={styles.camera} source={require('../images/camera.png')} />
      </View>
    ) : (
      <View style={{marginBottom: 24}}>
        <Image
          resizeMode="contain"
          style={{
            width: 110,
            height: 110,
            borderRadius: 50,
          }}
          source={require('../images/upload.png')}
        />
        <Image style={styles.camera} source={require('../images/camera.png')} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eededf'}}>
      <View style={[styles.bottomSection, {padding: 24}]}>
        {/* <SidebarLayout header={'My Account'} /> */}
        {!loader ? (
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
              paddingVertical: 24,
              marginBottom: 70,
            }}>
            <View style={styles.profilePicture}>
              <TouchableOpacity onPress={launchCamera}>
                {renderFileUri()}
              </TouchableOpacity>

              <Text style={styles.textStyle2}>Take Picture</Text>
            </View>

            <View style={styles.profilePicture}>
              <TouchableOpacity onPress={chooseImage}>
                {uploadImage()}
              </TouchableOpacity>

              <Text style={styles.textStyle2}>Upload Image</Text>
            </View>
          </ScrollView>
        ) : (
          <LoadingModal />
        )}

        
      <View
        style={{
          marginBottom: 24,
          alignSelf: 'center',
          justifyContent: 'flex-start',
          backgroundColor:"Red"
        }}>
        <Image
          resizeMode="contain"
          style={{width: PAGE_WIDTH - 186}}
          source={require('../assets/tagline.png')}
        />
      </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menubar: {
    padding: 24,
    flex: 1,
  },
  profilePicture: {
    alignItems: 'center',
    marginBottom: 50
  },
  camera: {
    position: 'absolute',
    top: 90,
    right: 10,
  },
  topheader: {
    height: 300,
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: 20, fontWeight: 'bold', color: '#000000'},
  textStyle2: {fontSize: 16, fontWeight: '600', color: '#cf3339'},
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },

  bottomSection: {
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
    marginBottom: 16,
  },
  otpBox: {
    borderRadius: 15,
    width: 50,
    padding: 20,
    height: 60,
    backgroundColor: '#d5d3d3',
    borderWidth: 1,
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
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
});
