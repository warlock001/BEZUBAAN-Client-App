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
import { connectToSocket, socket } from '../sockets/socketConfig';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '../components/inputField';
import { TextInput } from 'react-native-paper';
const REACT_APP_BASE_URL = "http://192.168.100.76:3001";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import call from 'react-native-phone-call';
import { set } from 'date-fns';
import getDirections from 'react-native-google-maps-directions'
export default function RescueCenter({ navigation }) {
    const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [ETAmodalVisible, setETAModalVisible] = useState(false);
    const [rescueLocation, setRescueLocation] = useState(0);
    const [selectedId, setSelectedId] = useState();
    const [reportId, setReportId] = useState(0);
    const [ETA, setETA] = useState(0);
    const [Data, setData] = useState([]);


    const [JWT, setJWT] = useState(0);
    const [ID, setID] = useState();


    const Item = ({ item, onPress, backgroundColor, textColor }) => {
        let date = new Date(item.createdAt)
        console.log(date)
        const [location, setlocation] = useState();
        handleGetDirections = () => {
            const data = {
                source: {
                    latitude: -33.8356372,
                    longitude: 18.6947617
                },
                destination: {
                    latitude: -33.8600024,
                    longitude: 18.697459
                },
                params: [
                    {
                        key: "travelmode",
                        value: "driving"        // may be "walking", "bicycling" or "transit" as well
                    },
                    {
                        key: "dir_action",
                        value: "navigate"       // this instantly initializes navigation using the given travel mode
                    }
                ],
                waypoints: [
                    {
                        latitude: -33.8600025,
                        longitude: 18.697452
                    },
                    {
                        latitude: -33.8600026,
                        longitude: 18.697453
                    },
                    {
                        latitude: -33.8600036,
                        longitude: 18.697493
                    }
                ]
            }

            getDirections(data)
        }


        useEffect(() => {
            async function fetchLocation() {
                var loc = JSON.parse(item.location)
                const Location = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.8a577d1b155ce4938bc3dbe2b851c181&lat=${loc.latitude}&lon=${loc.longitude}&format=json`);
                setlocation(Location.data.display_name)

            }
            fetchLocation()
        }, [])
        return (
            <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{date.toLocaleString()}</Text>
                <Text style={[styles.title, { color: textColor }]}>{location}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('tel://' + item.user.dialCode + item.user.mobile).then(() => null).catch(() => null);
                    }}><Text>Call</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=-33.8600024%2C18.697459&origin=-33.8356372%2C18.6947617')
                    }}><Text>Get Direction</Text></TouchableOpacity>
                    <TouchableOpacity ><Text>Mark Done</Text></TouchableOpacity></View>
            </TouchableOpacity>
        )
    };


    const renderItems = ({ item }) => {
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
                console.log(res.data.report)
            })
            .catch(er => {
                console.log(er.response.data)

                Alert.alert('Failed', `${er.response.data.message ? er.response.data.message : "Something went wrong"}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
    }


    useEffect(() => {
        fetchAllRecord = async () => {
            const id = await AsyncStorage.getItem('@id');
            const jwt = await AsyncStorage.getItem('@jwt');
            console.log("the id id" + id)
            fetchData(id, jwt);
        };

        fetchAllRecord()

    }, [])


    useFocusEffect(
        React.useCallback(() => {

            connectSocket = async () => {
                connectToSocket();
            }

            connectSocket();

            socket.on("report", (arg) => {
                console.log(arg); // world
                setRescueLocation(arg.location)
                setReportId(arg.reportId)
                setModalVisible(true)
            });



        })
    );

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
                setETAModalVisible(true)
            })
            .catch(er => {
                console.log(er.response.data)

                Alert.alert('Failed', `${er.response.data.message ? er.response.data.message : "Something went wrong"}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
            );
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
                console.log(er.response.data)

                Alert.alert('Failed', `${er.response.data.message ? er.response.data.message : "Something went wrong"}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
            );
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
                        <Text style={styles.modalText}>{rescueLocation}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '10' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    accept()
                                    setModalVisible(!modalVisible)
                                }
                                }>
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
                        <View style={{ display: 'flex', gap: '10' }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <TextField
                                    label="ETA"
                                    onChangeText={text => setETA(text)}
                                    style={{ width: '80%' }}

                                    left={
                                        <TextInput.Icon
                                            resizeMode="contain"
                                            style={{ width: 25 }}
                                            name={() => (
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 25 }}
                                                    source={require('../images/User1.png')}
                                                />
                                            )}
                                        />
                                    }
                                    right={
                                        <Text style={{ width: 25, color: 'black' }}>Mins</Text>
                                    }
                                />
                                <View style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: 'black' }}>Mins</Text></View>
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    updateETA()
                                    setETAModalVisible(!ETAmodalVisible)
                                }
                                }>
                                <Text style={styles.textStyle}>Send</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>

            <SafeAreaView>
                {/* <Text>{Data}</Text> */}
                <FlatList
                    data={Data}
                    renderItem={item => renderItems(item)}
                    keyExtractor={item => item._id}
                    extraData={selectedId}
                />
            </SafeAreaView>

        </View>
    );
};

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
    },
});
