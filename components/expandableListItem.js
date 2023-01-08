import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASE_URL} from '@env';
import RNFetchBlob from 'rn-fetch-blob';

export default function ExpandableListItem({item, navigation}) {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    if (open) {
      Animated.timing(animatedRotation, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }).start();

      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease, // Easing is an additional import from react-native
        useNativeDriver: false, // To make use of native driver for performance
      }).start();
    } else {
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }).start();

      Animated.timing(animatedHeight, {
        toValue: 50,
        duration: 200,
        easing: Easing.ease, // Easing is an additional import from react-native
        useNativeDriver: false, // To make use of native driver for performance
      }).start();
    }
    setOpen(!open);
  };

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const displayDocument = async item => {
    navigation.navigate('ViewDocument', {item: item});
  };

  const downloadDocument = async item => {
    const token = await AsyncStorage.getItem('@jwt');

    const _downloadFile2 = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };
    _downloadFile2();
    var type;
    const checkFile = await axios({
      method:'GET',
      url:`${REACT_APP_BASE_URL}/files/${item}/false`,
      headers:{
        'x-auth-token': token,
      }
    }).catch(err => console.lof('err'))
    console.log(checkFile.headers['content-type'].includes("pdf"))
    type = checkFile.headers['content-type'].includes("pdf") ? "pdf" : checkFile.headers['content-type'].split('/')[1]
    console.log(type)

    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // fileCache: true,
      // path: dirs.DocumentDir + '/' + item + '.pdf',
      // fileCache: true,
      // by adding this option, the temp files will have a file extension
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
      
      },
      path:
      Platform.OS == 'ios'
        ? dirs.LibraryDir + '/' + item + '.'+type
        : dirs.DownloadDir + '/' + item + '.'+type,
    })
      .fetch('GET', `${REACT_APP_BASE_URL}/files/${item}/false`, {
        'x-auth-token': token,
      })

      .then(res => {
        console.log(res.path());
        if(Platform.OS === "ios"){
          RNFetchBlob.ios.openDocument(res.data);
        }
      })
      .catch(er => console.log(er));
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        marginVertical: 11,
      }}>
      <Pressable style={{zIndex: 10}} onPress={() => toggleMenu()}>
        <View
          style={{
            paddingVertical: 11,
            paddingHorizontal: 29,
            height: 50,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 12,
              flex: 1,
              fontWeight: '600',
              color: '#000',
            }}>
            {item.name}
          </Text>
          <Animated.Image
            style={{transform: [{rotate: spin}]}}
            source={require('../images/ViewBlack.png')}
          />
        </View>
      </Pressable>
      <Animated.View
        style={{
          zIndex: 9,
          // transform: [{translateY: animatedHeight}],
          overflow: 'hidden',
          backgroundColor: '#cf3339',
          height: animatedHeight,
          // paddingHorizontal: 28,
          // paddingVertical: 0,
          borderRadius: 16,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => displayDocument(item.file)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image resizeMode={'contain'}
                  style={{width: 20, height: 20}} source={require('../images/View.png')} />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                color: '#fff',
                paddingLeft: 10,
              }}>
              View
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../images/Line.png')} />
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => downloadDocument(item.file)}>
          <View
            style={{
              flex: 1,

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image resizeMode={'contain'}
                  style={{width: 20, height: 20}} source={require('../images/Download.png')} />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                color: '#fff',
                paddingLeft: 10,
              }}>
              Download
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}