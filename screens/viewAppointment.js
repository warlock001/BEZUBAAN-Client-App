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
import React, { useState, useRef, useEffect } from 'react';
import call from 'react-native-phone-call';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Config } from '../config';
import Lottie from 'lottie-react-native';
const REACT_APP_BASE_URL = Config.ip;
export default function ViewAppointment({ route, navigation }) {
    const [date, setDate] = useState(new Date());
    const [appointment, setAppointment] = useState();
    const d = new Date();
    const t = new Date();
    const wd = new Date(t.setDate(t.getDate() + 7));
    const [modalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            axios.get(`${REACT_APP_BASE_URL}/booking?id=${route.params._id}`).then(res => {
                console.log(res.data.booking)
                setAppointment(res.data.booking)
            })
        }, []),
    );
    return (
        <ScrollView>

            <View style={{ width: '100%', height: 250, marginBottom: 20 }}>
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

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: '900', color: '#000000' }}>
                            Welcome!
                        </Text>
                        <Text style={{ fontSize: 24, fontWeight: '900', color: '#000000' }}>
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

            <View style={{ padding: 20 }}>
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

                        date={date}
                        mode={'date'}
                        onDateChange={date => {
                            setDate(date);
                        }}

                    />
                </View>
                <View>
                    <Text style={[styles.textStyle, { marginBottom: 20 }]}>Appointments</Text>
                </View>

                <FlatList
                    data={appointment}
                    keyExtractor={item => item._id}
                    renderItem={(item) => {
                        console.log(item.item._id)
                        var d = new Date(item.item.date)
                        var appointmentDate = d.getDate()
                        var selectedDate = date.getDate()
                        var day = d.getDay()
                        const getDay = (day) => {
                            if (day == 0) {
                                return 'Sunday'
                            } else if (day == 1) {
                                return 'Monday'
                            } else if (day == 2) {
                                return 'Tuesday'
                            } else if (day == 3) {
                                return 'Wednesday'
                            } else if (day == 4) {
                                return 'Thursday'
                            } else if (day == 5) {
                                return 'Friday'
                            } else if (day == 6) {
                                return 'Saturday'
                            }
                        }

                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                        const slots = ["", "08:00 - 10:00 am", "10:00 - 12:00 am", "12:00 - 02:00 pm", "02:00 - 04:00 pm", "04:00 - 06:00 pm", "06:00 - 08:00 pm"]

                        return appointmentDate == selectedDate ? (
                            <View style={{ backgroundColor: '#FFF', marginBottom: 20, borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20, }}>
                                    <Image
                                        style={{
                                            marginHorizontal: 20,
                                            width: 70,
                                            height: 70,
                                            borderRadius: 150 / 2,
                                            overflow: 'hidden',
                                            // width: 70,
                                            flexWrap: 'wrap',
                                            // borderRadius: 500
                                        }}
                                        source={{ uri: route.params.image }}
                                    />
                                    <View>
                                        <Text style={{ fontSize: 20, color: '#000' }}>{item.item.user.firstName} {item.item.user.lastName}</Text>
                                        <Text style={{ fontSize: 14, color: '#000' }}>With : {route.params.firstName} {''}{route.params.lastName}</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 20, padding: 10, backgroundColor: "#e1979a", borderRadius: 15, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ marginHorizontal: 5 }} source={require("../images/clock.png")} />
                                    <Text style={{ marginHorizontal: 5, fontWeight: '500' }}>{getDay(day)}</Text>
                                    <Text style={{ marginHorizontal: 1, fontWeight: '500' }}>{months[d.getMonth()]}</Text>
                                    <Text style={{ marginHorizontal: 1, fontWeight: '500' }}>{d.getDate()}, </Text>
                                    <Text style={{ marginHorizontal: 1, fontWeight: '500' }}>{d.getFullYear()}</Text>
                                    <Text style={{ marginHorizontal: 1, fontWeight: '500', alignSelf: 'flex-end', marginLeft: 'auto' }}>{slots[parseInt(item.item.slot)]}</Text>
                                </View>
                            </View>
                        ) : ''
                    }}
                />


            </View>
        </ScrollView >
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
