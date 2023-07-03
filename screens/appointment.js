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
import React, { useState, useRef, useEffect } from 'react';
import LoadingModal from '../components/loadingScreen';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Config } from '../config';
const REACT_APP_BASE_URL = Config.ip;
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function Appointment({ navigation }) {
  const [clinicVisit, setClinicVisit] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [vet, setVet] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/vet`,
      })
        .then(async res => {
          // console.log(res.data);
          const token = await AsyncStorage.getItem('@jwt');
          await res.data.vet.forEach(async (item, index) => {
            await axios({
              method: 'GET',
              url: `${REACT_APP_BASE_URL}/files/${item.profilePicture[0]}/true`,
              headers: {
                'x-auth-token': token,
              },
            })
              .then(response => {
                // console.log(response);
                res.data.vet[index].image = `data:${response.headers['content-type']};base64,${response.data}`
                console.log(res.data.vet)
                setVet(res.data.vet);
              })
              .catch(err => {
                console.log(err);
              });
          });

        })
        .catch(err => console.log(err));
    }, [shouldUpdate]),
  );

  // const vet = [
  //   {
  //     _id: 0,
  //     name: 'Zabloon Albert',
  //     feild: 'avian',
  //     rating: '5.0',
  //   },
  //   {
  //     _id: 1,
  //     name: 'Zabloon Albert',
  //     rating: '3.0',
  //     feild: 'Livestock Vets',
  //   },
  //   {
  //     _id: 2,
  //     name: 'Zabloon Albert',
  //     rating: '2.0',
  //     feild: 'Companion Vets',
  //   },
  //   {
  //     _id: 3,
  //     name: 'Zabloon Albert',
  //     rating: '4.0',
  //     feild: 'general',
  //   },
  //   {
  //     _id: 4,
  //     name: 'Zabloon Albert',
  //     rating: '4.0',
  //     feild: 'general',
  //   },
  // ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Schedule Appointment", { id: "988978" })
      }}
      style={{
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        width: '45%',
        height: 180,
        marginBottom: 20,
        elevation: 10,
      }}>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', marginBottom: 5, borderRadius: 500 }}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 150 / 2,
            overflow: "hidden",
            // width: 70,
            flexWrap: 'wrap',
            // borderRadius: 500
          }}
          source={{ uri: item.image }}
        />
      </View>
      <Text style={{ fontSize: 20, textAlign: 'center', color: '#000000' }}>
        {item.firstName + " " + item.lastName}
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>{item.type}</Text>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image width={5} source={require('../images/star.png')} />
        <Text> {item.rating} 5.0</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ height: '100%' }}>
      <View style={{ width: '100%', height: 250 }}>
        <LinearGradient
          colors={['#CF333900', '#CF3339']}
          style={styles.gradientStyle}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1.5 }}
        />
        <View style={styles.topheader}>
          <View style={{ paddingBottom: 30 }}>
            <Text>Get Help For Your</Text>
            <Text style={styles.textStyle}>BEZUBAAN</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              onPress={() => {
                setClinicVisit(true);
              }}
              style={{
                height: 130,
                width: '45%',
                backgroundColor: clinicVisit ? '#CF3339' : '#fff',
                padding: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: clinicVisit ? '#FFF' : '#f0eefa',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                  padding: 5,
                }}>
                <Image
                  style={{ height: 25, width: 25, flexWrap: 'wrap' }}
                  source={require('../images/add.png')}></Image>
              </View>
              <View>
                <Text
                  style={{
                    color: clinicVisit ? '#fff' : '#000',
                    fontWeight: '600',
                  }}>
                  Clinic Visit
                </Text>
                <Text
                  style={{
                    color: clinicVisit ? '#fff' : '#000',
                    fontWeight: '200',
                  }}>
                  Make appointment
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setClinicVisit(false);
              }}
              style={{
                height: 130,
                width: '45%',
                backgroundColor: clinicVisit ? '#fff' : '#CF3339',
                padding: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: clinicVisit ? '#f0eefa' : '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                  padding: 5,
                }}>
                <Image
                  style={{ height: 25, width: 25, flexWrap: 'wrap' }}
                  source={require('../images/home-visit.png')}></Image>
              </View>
              <View>
                <Text
                  style={{
                    color: clinicVisit ? '#000' : '#fff',
                    fontWeight: '600',
                  }}>
                  Home Visit
                </Text>
                <Text
                  style={{
                    color: clinicVisit ? '#000' : '#fff',
                    fontWeight: '200',
                  }}>
                  Call Vet Home
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ padding: 24, flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '500',
            color: '#000000',
            marginBottom: 20,
          }}>
          Popular Doctors
        </Text>

        <FlatList
          style={{ flexGrow: 1 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={vet}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
        // extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flexGrow: 1,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CF3339',
  },
  textStyle2: { fontSize: 16, fontWeight: '400', color: '#FFF' },
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
