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

import DatePicker from 'react-native-date-picker'
export default function ScheduleAppointment({ route, navigation }) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const d = new Date();
    const t = new Date()
    const wd = new Date(t.setDate(t.getDate() + 7));
    useFocusEffect(
        React.useCallback(() => {
            // navigation.navigate('Login');
        }),
    );
    return (
        <View >
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
                        <Text style={{ fontSize: 24, fontWeight: '900', color: '#000000' }}>Welcome!</Text>
                        <Text style={{ fontSize: 24, fontWeight: '900', color: '#000000' }}>Dr. Fatima Imran</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#CF3339', flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 13, borderRadius: 50, width: '40%', justifyContent: 'center' }}>
                        <Text style={{ color: '#ffffff', flexWrap: 'wrap', flexDirection: 'row', fontWeight: '600' }}>Urgent Care!</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ padding: 20, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                    <DatePicker
                        theme={"light"}
                        minimumDate={d}
                        maximumDate={wd}
                        open={open}
                        date={date}
                        mode={"date"}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <View><Text style={[styles.textStyle, { marginBottom: 20 }]}>Slots</Text></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
                    <View style={styles.slotBTN}><Text style={styles.slotBTNText}>08:00 AM</Text></View>
                    <View style={styles.slotBTN}><Text style={styles.slotBTNText}>10:00 AM</Text></View>
                    <View style={styles.slotBTN}><Text style={styles.slotBTNText}>12:00 AM</Text></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={styles.slotBTN}><Text style={styles.slotBTNText}>02:00 PM</Text></View>
                    <View style={styles.slotBTN}><Text style={styles.slotBTNText}>04:00 PM</Text></View>
                    <View style={styles.slotBTN}><Text style={styles.slotBTNText}>06:00 PM</Text></View>
                </View>

                <View ><Text>dsgdsgsg</Text></View>
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
    slotBTN: {
        backgroundColor: '#CF3339',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        borderRadius: 10,
    },
    slotBTNText: {
        color: "#ffffff",
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
    signInButton: {
        width: '100%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#CF3339',
        marginBottom: 15,
    },
});
