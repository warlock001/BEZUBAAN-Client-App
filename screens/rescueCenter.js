import {
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Dimensions,
    Pressable,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';
import { connectToSocket, socket } from '../sockets/socketConfig';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
const REACT_APP_BASE_URL = "http://192.168.100.76:3001";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function RescueCenter({ navigation }) {
    const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [rescueLocation, setRescueLocation] = useState(0);
    const [reportId, setReportId] = useState(0);

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

    function accept() {
        const id = AsyncStorage.getItem('@id');
        const jwt = AsyncStorage.getItem('@jwt');
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
    }
});
