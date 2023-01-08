import React from 'react';
import Lottie from 'lottie-react-native';
import {Dimensions, Modal, Text, View} from 'react-native';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const LoadingModal = props => {
  const isModalVisible = !props.isAppInitialized;

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      style={{
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        backgroundColor: '#000',
      }}>
      <View
        style={{
          backgroundColor: '#f3f3f2',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 200,
          }}>
          <Lottie
            resizeMode="cover"
            style={{width: 100, height: 40}}
            // style={{
            //   width: PAGE_WIDTH,
            //   aspectRatio: 375 / 812,
            //   flexGrow: 1,
            //   alignSelf: 'center',
            // }}
            source={require('../images/dot-loading.json')}
            loop={true}
            autoPlay
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
