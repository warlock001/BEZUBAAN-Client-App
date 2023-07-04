import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
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
import React, {useState, useRef, useEffect} from 'react';
import call from 'react-native-phone-call';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Config} from '../config';
import Lottie from 'lottie-react-native';
const REACT_APP_BASE_URL = Config.ip;
export default function ScheduleAppointment({route, navigation}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const d = new Date();
  const t = new Date();
  const wd = new Date(t.setDate(t.getDate() + 7));
  const [modalVisible, setModalVisible] = useState(false);
  const [slot1, setSlot1] = useState('free');
  const [slot2, setSlot2] = useState('free');
  const [slot3, setSlot3] = useState('free');
  const [slot4, setSlot4] = useState('free');
  const [slot5, setSlot5] = useState('free');
  const [slot6, setSlot6] = useState('free');
  const [selectedSlot, setSelectedSlot] = useState('');

  async function checkSlots(date) {
    axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/booking?id=${route.params._id}&date=${date}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      setSlot1('free');
      setSlot2('free');
      setSlot3('free');
      setSlot4('free');
      setSlot5('free');
      setSlot6('free');
      res.data.booking.forEach(item => {
        bookingDate = new Date(item.date);
        bookingDay = bookingDate.getDate();
        selectedDay = date.getDate();
        console.log(bookingDay);
        if (bookingDay == selectedDay) {
          if (item.slot == 1) {
            setSlot1('booked');
          } else if (item.slot == 2) {
            setSlot2('booked');
          } else if (item.slot == 3) {
            setSlot3('booked');
          } else if (item.slot == 4) {
            setSlot4('booked');
          } else if (item.slot == 5) {
            setSlot5('booked');
          } else if (item.slot == 6) {
            setSlot6('booked');
          }
        }
      });
    });
  }

  async function postBooking() {
    id = await AsyncStorage.getItem('@id');
    axios({
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/booking`,
      data: {
        id: id,
        vet: route.params._id,
        date: date,
        slot: selectedSlot,
      },
    }).then(() => {
      setModalVisible(true);
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      //   console.log(route.params);
    }),
  );
  return (
    <ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          navigation.navigate('HomeStack');
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
              Appointment Booked sucessfully{' '}
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
      <View style={{width: '100%', height: 250, marginBottom: 20}}>
        <LinearGradient
          colors={['#CF333900', '#CF3339']}
          style={styles.gradientStyle}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0.5, y: 1.5}}
        />
        <View style={styles.topheader}>
          <View style={{paddingBottom: 30}}>
            <Text>Get Help For Your</Text>
            <Text style={styles.textStyle}>BEZUBAAN</Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 24, fontWeight: '900', color: '#000000'}}>
              Welcome!
            </Text>
            <Text style={{fontSize: 24, fontWeight: '900', color: '#000000'}}>
              Dr. {route.params.firstName} {route.params.lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              call({
                number: route.params.dialCode + route.params.mobile,
                prompt: false,
                skipCanOpen: true,
              }).catch(console.error);
            }}
            style={{
              backgroundColor: '#CF3339',
              flexWrap: 'wrap',
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 13,
              borderRadius: 50,
              width: '40%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#ffffff',
                flexWrap: 'wrap',
                flexDirection: 'row',
                fontWeight: '600',
              }}>
              Urgent Care!
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{padding: 20}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <DatePicker
            theme={'light'}
            minimumDate={d}
            maximumDate={wd}
            open={open}
            date={date}
            mode={'date'}
            onDateChange={date => {
              setOpen(false);
              setDate(date);
              checkSlots(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View>
          <Text style={[styles.textStyle, {marginBottom: 20}]}>Slots</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            disabled={slot1 == 'booked' ? true : false}
            onPress={() => {
              setSelectedSlot(1);
            }}
            style={[
              styles.slotBTN,
              {
                backgroundColor: slot1 == 'booked' ? 'grey' : '#CF3339',
                borderWidth: selectedSlot == 1 ? 2 : 0,
                borderColor: '#000',
              },
            ]}>
            <Text style={styles.slotBTNText}>08:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={slot2 == 'booked' ? true : false}
            onPress={() => {
              setSelectedSlot(2);
            }}
            style={[
              styles.slotBTN,
              {
                backgroundColor: slot2 == 'booked' ? 'grey' : '#CF3339',
                borderWidth: selectedSlot == 2 ? 2 : 0,
                borderColor: '#000',
              },
            ]}>
            <Text style={styles.slotBTNText}>10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={slot3 == 'booked' ? true : false}
            onPress={() => {
              setSelectedSlot(3);
            }}
            style={[
              styles.slotBTN,
              {
                backgroundColor: slot3 == 'booked' ? 'grey' : '#CF3339',
                borderWidth: selectedSlot == 3 ? 2 : 0,
                borderColor: '#000',
              },
            ]}>
            <Text style={styles.slotBTNText}>12:00 AM</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 40,
          }}>
          <TouchableOpacity
            disabled={slot4 == 'booked' ? true : false}
            onPress={() => {
              setSelectedSlot(4);
            }}
            style={[
              styles.slotBTN,
              {
                backgroundColor: slot4 == 'booked' ? 'grey' : '#CF3339',
                borderWidth: selectedSlot == 4 ? 2 : 0,
                borderColor: '#000',
              },
            ]}>
            <Text style={styles.slotBTNText}>02:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={slot5 == 'booked' ? true : false}
            onPress={() => {
              setSelectedSlot(5);
            }}
            style={[
              styles.slotBTN,
              {
                backgroundColor: slot5 == 'booked' ? 'grey' : '#CF3339',
                borderWidth: selectedSlot == 5 ? 2 : 0,
                borderColor: '#000',
              },
            ]}>
            <Text style={styles.slotBTNText}>04:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={slot6 == 'booked' ? true : false}
            onPress={() => {
              setSelectedSlot(6);
            }}
            style={[
              styles.slotBTN,
              {
                backgroundColor: slot6 == 'booked' ? 'grey' : '#CF3339',
                borderWidth: selectedSlot == 6 ? 2 : 0,
                borderColor: '#000',
              },
            ]}>
            <Text style={styles.slotBTNText}>06:00 PM</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            postBooking();
          }}
          style={styles.signInButton}>
          <Text style={{color: '#ffffff', textAlign: 'center'}}>
            Schedule Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flexGrow: 1,
  },
  slotBTN: {
    // backgroundColor: '#CF3339',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 10,
  },
  slotBTNText: {
    color: '#ffffff',
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
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CF3339',
  },
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
