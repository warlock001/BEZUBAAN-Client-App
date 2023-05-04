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
  Pressable,
  Alert,
  Modal,
  Platform,
  FlatList,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {Drawer} from 'react-native-paper';
import LoadingModal from '../components/loadingScreen';
import Lottie from 'lottie-react-native';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
const REACT_APP_BASE_URL = 'http://192.168.0.107:3001';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
export default function AdoptAnimal({navigation}) {
  const [loader, setLoader] = useState(false);
  const [adoption, setAdoption] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = ({item}) => (
    <View style={{backgroundColor: '#FFFFFF', marginBottom: 20, elevation: 10}}>
      <View>
        <Image
          source={require('../images/onBoardingPet3.jpeg')}
          style={{width: '100%', height: 200}}
          resizeMode="contain"
        />
        <View
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 22, borderWidth: 1, padding: 5}}>
            {item.pet.petType}
          </Text>
          <Text style={{fontSize: 22, borderWidth: 1, padding: 5}}>
            {item.pet.breed}
          </Text>
          <Text style={{fontSize: 22, borderWidth: 1, padding: 5}}>
            {item.pet.age}
          </Text>
          <Text style={{fontSize: 22, borderWidth: 1, padding: 5}}>
            {item.pet.breed}
          </Text>
          <Text style={{fontSize: 22, borderWidth: 1, padding: 5}}>
            {item.pet.color}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <Text>{item.pet.petDescription}</Text>
        </View>
        <View
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>{item.phone}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{color: '#cf3339'}}>Mark as interested</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/adoption`,
      })
        .then(res => {
          console.log(res.data);
          setAdoption(res.data.adoption);
        })
        .catch(err => console.log(err));
    }, [shouldUpdate]),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eededf'}}>
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
              Your Request has been submitted
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

      <View style={[styles.bottomSection]}>
        {/* <SidebarLayout header={'My Account'} /> */}
        {!loader ? (
          <View
            style={{
              marginTop: 12,
              paddingHorizontal: 10,
              // zIndex: 10,
              height: PAGE_HEIGHT - 150,
            }}>
            <FlatList
              data={adoption}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              // extraData={selectedId}
            />
          </View>
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
