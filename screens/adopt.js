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

import React, {useState, useRef, useEffect} from 'react';
import {Drawer} from 'react-native-paper';
import LoadingModal from '../components/loadingScreen';
import {Config} from '../config';
const REACT_APP_BASE_URL = Config.ip;
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
export default function Adopt({navigation}) {
  const [loader, setLoader] = useState(false);

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
              <TouchableOpacity
                onPress={() => navigation.navigate('Adoption Post Form')}>
                <View style={{marginBottom: 24}}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 110,
                      height: 110,
                    }}
                    source={require('../images/contact-form.png')}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.textStyle2}>Post For Adoption</Text>
            </View>

            <View style={styles.profilePicture}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AdoptAnimal')}>
                <View style={{marginBottom: 24}}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 110,
                      height: 110,
                    }}
                    source={require('../images/house.png')}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.textStyle2}>Adopt an animal</Text>
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
            backgroundColor: 'Red',
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
    marginBottom: 50,
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
