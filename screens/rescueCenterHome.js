import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  SafeAreaView,
  Pressable,
  Modal,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';

import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MenuBox from '../components/menuBox';
import Lottie from 'lottie-react-native';
// import SidebarLayout from '../layouts/sidebarLayout';
import Carousel from 'react-native-reanimated-carousel';

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function RescueCenterHome({ navigation }) {
  const swiper = useRef(null);
  const progressValue = 0;
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH - 24,
    height: '100%',
  };
  const [modalVisible, setModalVisible] = useState(false);

  const goToImageScreen = () => {
    navigation.navigate('ImageScreen');
  };

  const goToLoginScreen = () => {
    navigation.navigate('Login');
  };

  const promotions = [
    {
      link: 'google.com',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      link: 'google.com',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      link: 'google.com',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={{ flex: 1 }}>
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
              modalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '',
            ]}>
            <View style={styles.modalView}>
              {/* <Image
                  style={{width: 150, height: 150}}
                  resizeMode="contain"
                  source={require('../images/Icon.png')}
                /> */}

              <Lottie
                resizeMode="cover"
                style={{
                  width: 150,
                }}
                source={require('../images/error_cone.json')}
                loop={false}
                autoPlay
              />

              <Text
                style={{
                  paddingTop: 31,
                  fontSize: 24,
                  fontWeight: '500',
                  color: '#CF3339',
                  textAlign: 'center',
                }}>
                Looks like your company is not registered
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Please contact one of our sales representatives
              </Text>
              <Pressable
                style={[styles.doneButton]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ color: '#FFF', fontSize: 17, fontWeight: '700' }}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{ flex: 1, padding: 24 }}>
          <View style={{ paddingTop: 24, flexDirection: 'row' }}></View>

          <ScrollView
            style={{
              height: '100%',
              width: '100%',
              marginBottom: 30,
            }}
            contentContainerStyle={{ alignItems: 'center' }}>
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AdoptAnimal');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={require('../assets/takemehome.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: 16,
                      borderWidth: 4,
                      borderColor: '#DB7E81',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 31,
                        // paddingVertical: 21,
                        height: 100,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Lottie
                        resizeMode="cover"
                        style={{
                          width: '50%',
                          height: '100%',
                        }}
                        source={require('../assets/lf20_syqnfe7c.json')}
                        loop={true}
                        autoPlay
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '100%',
                paddingVertical: 24,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Rescue Center')}>
                <MenuBox
                  image={require('../assets/communication.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Listen to Reports"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Add Vet')}>
                <MenuBox
                  image={require('../assets/contact-form.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="Add a Vet"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Select Vet')}>
                <MenuBox
                  image={require('../images/files.png')}
                  PAGE_WIDTH={PAGE_WIDTH}
                  title="View Appointments"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },
});
