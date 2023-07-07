import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Linking,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {connectToSocket, socket} from '../sockets/socketConfig';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import TextField from '../components/inputField';
import {TextInput} from 'react-native-paper';
import {Config} from '../config';
const REACT_APP_BASE_URL = Config.ip;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import call from 'react-native-phone-call';
import {set} from 'date-fns';
import GetLocation from 'react-native-get-location';

import getDirections from 'react-native-google-maps-directions';
export default function RescueCenter({navigation}) {
  const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const [ETAmodalVisible, setETAModalVisible] = useState(false);
  const [rescueLocation, setRescueLocation] = useState(0);
  const [selectedId, setSelectedId] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [reportId, setReportId] = useState(0);
  const [ETA, setETA] = useState(0);
  const [Data, setData] = useState([]);
  // const [location, setLocation] = useState();
  const [image, setImage] = useState();
  const [contentType, setContentType] = useState();
  const [shouldUpdate, setShouldUpdate] = useState(false);
  var location;
  const Item = ({item, onPress, backgroundColor, textColor}) => {
    const date = new Date(item.createdAt);
    // console.log(date);

    const position = JSON.parse(item.location);
    const getLocationNow = () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(res => {
          console.log(res);
          location = res;
        })
        .catch(error => {
          const {code, message} = error;
          console.log(code, message);
        });
    };
    getLocationNow();
    useFocusEffect(React.useCallback(() => {}, [shouldUpdate]));

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.item,
          {backgroundColor: item.status == 'On Going' ? '#CF3339' : 'grey'},
        ]}>
        <Text style={[styles.title]}>{date.toLocaleString()}</Text>
        <Text style={[styles.title, {color: textColor}]}>{item.address}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel://' + item.user.dialCode + item.user.mobile)
                .then(() => null)
                .catch(() => null);
            }}>
            <Text>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${position.latitude}%2C${position.longitude}&origin=${location.latitude}%2C${location.longitude}`,
              );
            }}>
            <Text>Get Direction</Text>
          </TouchableOpacity>
          {item.status == 'On Going' ? (
            <TouchableOpacity
              onPress={() => {
                markDone(item._id);
              }}>
              <Text>Mark Done</Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItems = ({item}) => {
    // console.log(item)
    const backgroundColor = item._id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item._id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item._id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  function fetchData(id, jwt) {
    axios({
      timeout: 20000,
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/report?id=${id}`,
      headers: {
        'x-auth-token': jwt,
      },
    })
      .then(async res => {
        setData(res.data.report);
        console.log(res.data.report);
      })
      .catch(er => {
        console.log(er.response.data);

        Alert.alert(
          'Failed',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Something went wrong'
          }`,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      });
  }

  useEffect(() => {
    fetchAllRecord = async () => {
      const id = await AsyncStorage.getItem('@id');
      const jwt = await AsyncStorage.getItem('@jwt');
      console.log('the id id' + id);
      fetchData(id, jwt);
    };

    fetchAllRecord();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const connectSocket = async () => {
        connectToSocket();
      };

      connectSocket();

      socket.on('report', arg => {
        console.log('fdfd');
        console.log(arg); // world
        setRescueLocation(arg.location);
        setReportId(arg.reportId);
        setModalVisible(true);
        setImage(arg.image);
        setContentType(arg.contentType);
      });
    }, []),
  );

  async function markDone(reportId) {
    console.log(reportId);
    const id = await AsyncStorage.getItem('@id');
    const jwt = await AsyncStorage.getItem('@jwt');
    await axios({
      timeout: 20000,
      method: 'PUT',
      url: `${REACT_APP_BASE_URL}/updatereport?id=${reportId}`,
      headers: {
        'x-auth-token': jwt,
      },
      data: {
        rescuer: id,
        status: 'Done',
      },
    });
  }

  async function accept() {
    const id = await AsyncStorage.getItem('@id');
    const jwt = await AsyncStorage.getItem('@jwt');
    axios({
      timeout: 20000,
      method: 'PUT',
      url: `${REACT_APP_BASE_URL}/updatereport?id=${reportId}`,
      headers: {
        'x-auth-token': jwt,
      },
      data: {
        rescuer: id,
      },
    })
      .then(async res => {
        setETAModalVisible(true);
      })
      .catch(er => {
        console.log(er.response.data);

        Alert.alert(
          'Failed',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Something went wrong'
          }`,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      });
  }

  async function updateETA() {
    const id = await AsyncStorage.getItem('@id');
    const jwt = await AsyncStorage.getItem('@jwt');
    axios({
      timeout: 20000,
      method: 'PUT',
      url: `${REACT_APP_BASE_URL}/updatereport?id=${reportId}`,
      headers: {
        'x-auth-token': jwt,
      },
      data: {
        rescuer: id,
        ETA: ETA,
      },
    })
      .then(async res => {
        console.log(res.data);
      })
      .catch(er => {
        console.log(er.response.data);

        Alert.alert(
          'Failed',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Something went wrong'
          }`,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      });
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Rescue Request!</Text>
            <Image
              style={{
                width: 250,
                height: 250,
                overflow: 'hidden',
                // width: 70,
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
              source={{uri: `data:${contentType};base64,${image}`}}
            />
            <Text style={styles.modalText}>{rescueLocation}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: '10'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  accept();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Accept</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ETAmodalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setETAModalVisible(!ETAmodalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Provide ETA!</Text>
            <Text style={styles.modalText}>{rescueLocation}</Text>
            <View style={{display: 'flex', gap: '10'}}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <TextField
                  label="ETA"
                  onChangeText={text => setETA(text)}
                  style={{width: '80%'}}
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
                  right={<Text style={{width: 25, color: 'black'}}>Mins</Text>}
                />
                <View
                  style={{
                    width: '25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'black'}}>Mins</Text>
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  updateETA();
                  setETAModalVisible(!ETAmodalVisible);
                }}>
                <Text style={styles.textStyle}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <SafeAreaView>
        {/* <Text>{Data}</Text> */}
        <FlatList
          data={Data.reverse()}
          renderItem={item => renderItems(item)}
          keyExtractor={item => item._id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
});
