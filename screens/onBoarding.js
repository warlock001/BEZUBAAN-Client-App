import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';

export default function OnBoarding({ navigation }) {
  const swiper = useRef(null);

  return (
    <View style={{ height: '100%' }}>
      <Swiper
        ref={swiper}
        style={{ height: '100%' }}
        loop={false}
        dot={
          <View
            style={{
              backgroundColor: 'rgba(172 ,172 , 176 , 0.35)',
              width: 60,
              height: 5,
              borderRadius: 20,
              marginBottom: 100,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
        }
        scrollEnabled={true}
        activeDot={
          <View
            style={{
              backgroundColor: '#FFF',
              width: 60,
              height: 5,
              borderRadius: 20,
              marginBottom: 100,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
        }>
        <View>
          <ImageBackground
            source={require('../images/onboardingPet1.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <LinearGradient
              colors={['#CF333900', '#CF3339']}
              style={styles.gradientStyle}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 0.5, y: 1.5 }}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.titleStyle}>Save The</Text>
              <Text style={styles.titleStyle}>Paws Around You</Text>
              <Text style={styles.titleStyle}>With A Touch On</Text>
              <Text style={styles.titleStyle}>Your Smartphone</Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            source={require('../images/onboardingPet2.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <LinearGradient
              colors={['#CF333900', '#CF3339']}
              style={styles.gradientStyle}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 0.5, y: 1.5 }}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.titleStyle}>Adpot Now!</Text>
              <Text style={styles.titleStyle}>And Find Youself</Text>
              <Text style={styles.titleStyle}>A New Friend</Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            source={require('../images/onBoardingPet3.jpeg')}
            style={{ width: '100%', height: '100%' }}>
            <LinearGradient
              colors={['#CF333900', '#CF3339']}
              style={styles.gradientStyle}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 0.5, y: 1.5 }}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.titleStyle}>Get Access To</Text>
              <Text style={styles.titleStyle}>The Best Vet</Text>
              <Text style={styles.titleStyle}>In Your Area</Text>
            </View>
          </ImageBackground>
        </View>
      </Swiper>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          if (swiper.current.state.index > 1) {
            navigation.navigate('Login');
          } else {
            swiper.current.scrollBy(1);
          }
        }}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFF' }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    color: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: 24,

    paddingBottom: 150,
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  titleStyle: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
  },
  buttonStyle: {
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CF3339',
    marginTop: 26,
    marginBottom: 40,
    bottom: 0,
    position: 'absolute',
  },
});
