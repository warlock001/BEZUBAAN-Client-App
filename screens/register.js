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
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import React, { useState, useRef } from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Lottie from 'lottie-react-native';
//import { REACT_APP_BASE_URL } from '@env';
const REACT_APP_BASE_URL = "http://192.168.100.76:3001";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function Register({ navigation }) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dialCode, setDialCode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    function sendData() {
        console.log({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: phoneNumber,
            dialCode: dialCode,
            isVerified: false,
            role: 'client',
            password: password,
            confirmPassword: confirmPassword

        });
        axios({
            method: 'POST',
            url: `${REACT_APP_BASE_URL}/signup`,
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: phoneNumber,
                dialCode: dialCode,
                isVerified: false,
                role: 'client',
                password: password,
                confirmPassword: confirmPassword
            },
        })
            .then(res => {
                console.log(res.message);
                const _storeData = async () => {
                    try {
                        setModalVisible(true);
                    } catch (error) {
                        console.log(error);
                    }
                };
                _storeData();
                setModalVisible(true);

            })
            .catch(err => {
                console.log(err);
                Alert.alert('', 'Email already registered', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
        if (firstName &&
            lastName &&
            email &&
            phoneNumber

        ) {
            setModalVisible(true)
        }
        else {
            Alert.alert('', 'Please fill in All the required details.', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }

    return (
        <ScrollView style={{ height: '100%' }}>
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
                            style={{ width: 150, height: 150 }}
                            resizeMode="contain"
                            source={require('../images/Icon.png')}
                        /> */}

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
                            Your account has been successfully registered{' '}
                        </Text>
                        <Pressable
                            style={[styles.doneButton]}
                            onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#FFF', fontSize: 17, fontWeight: '700' }}>
                                Done
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ImageBackground
                source={require('../images/SignIn.jpg')}
                style={{ width: '100%', height: 250 }}>
                <View style={styles.topheader}>
                    <View style={styles.textView}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ alignItems: 'flex-start', padding: 0 }}>
                            <Image
                                style={{ padding: 0, alignSelf: 'flex-start' }}
                                source={require('../images/Back.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.textStyle}>Register for</Text>
                        <Text style={[styles.textStyle, { paddingBottom: 20 }]}>
                            New Account
                        </Text>
                        <Text style={styles.textStyle2}>
                            Fill out the details below to signup for a bezubaan first responder
                            account.
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <ScrollView style={styles.bottomSection}>
                    <View style={{ height: '100%', padding: 24 }}>
                        <SafeAreaView style={{ marginBottom: 20 }}>
                            <TextField
                                label="First Name"
                                onChangeText={text => setFirstName(text)}
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
                            />
                        </SafeAreaView>
                        <SafeAreaView style={{ marginBottom: 20 }}>
                            <TextField
                                label="Last Name"
                                onChangeText={text => setLastName(text)}
                                left={
                                    <TextInput.Icon
                                        name={() => (
                                            <Image
                                                resizeMode="contain"
                                                style={{ width: 25 }}
                                                source={require('../images/User1.png')}
                                            />
                                        )}
                                    />
                                }
                            />
                        </SafeAreaView>

                        <SafeAreaView style={{ marginBottom: 20 }}>
                            <TextField
                                label="Email Address"
                                onChangeText={text => setEmail(text)}
                                left={
                                    <TextInput.Icon
                                        name={() => (
                                            <Image
                                                resizeMode="contain"
                                                style={{ width: 25 }}
                                                source={require('../images/EnvelopeClosed.png')}
                                            />
                                        )}
                                    />
                                }
                            />
                        </SafeAreaView>

                        <SafeAreaView style={{ marginBottom: 20 }}>
                            <IntlPhoneInput
                                // flagStyle={{display: 'none'}}
                                defaultCountry="PK"
                                renderAction={() => <Text>XX</Text>}
                                containerStyle={styles.phoneInput}
                                onChangeText={data => {
                                    if (data.phoneNumber[0] === '0') {
                                        setPhoneNumber(
                                            `${data.phoneNumber.substring(1)}`.replace(' ', ''),
                                        );
                                        setDialCode(data.dialCode);
                                    } else {
                                        setPhoneNumber(`${data.phoneNumber}`.replace(' ', ''));
                                        setDialCode(`${data.dialCode}`);
                                    }
                                }}
                                lang="EN"
                            />
                        </SafeAreaView>

                        <View style={{ marginBottom: 20 }}>
                            <TextField
                                label="Password"
                                secureTextEntry={showPassword ? false : true}
                                onChangeText={text => setPassword(text)}
                                left={
                                    <TextInput.Icon
                                        name={() => (
                                            <Image
                                                resizeMode="contain"
                                                style={{ width: 25 }}
                                                source={require('../images/password_icon.png')}
                                            />
                                        )}
                                    />
                                }
                                right={
                                    <TextInput.Icon
                                        onPress={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        name={() =>
                                            showPassword ? (
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 25 }}
                                                    source={require('../images/eyeOpen.png')}
                                                />
                                            ) : (
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 25 }}
                                                    source={require('../images/Hide.png')}
                                                />
                                            )
                                        }
                                    />
                                }
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <TextField
                                label="Confirm Password"
                                secureTextEntry={showConfirmPassword ? false : true}
                                onChangeText={text => setConfirmPassword(text)}
                                left={
                                    <TextInput.Icon
                                        name={() => (
                                            <Image
                                                resizeMode="contain"
                                                style={{ width: 25 }}
                                                source={require('../images/password_icon.png')}
                                            />
                                        )}
                                    />
                                }
                                right={
                                    <TextInput.Icon
                                        onPress={() => {
                                            setShowConfirmPassword(!showConfirmPassword);
                                        }}
                                        name={() =>
                                            showConfirmPassword ? (
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 25 }}
                                                    source={require('../images/eyeOpen.png')}
                                                />
                                            ) : (
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 25 }}
                                                    source={require('../images/Hide.png')}
                                                />
                                            )
                                        }
                                    />
                                }
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={async () => {
                                const _storeData = async () => {
                                    try {
                                        await AsyncStorage.setItem('@email', email);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };
                                _storeData();
                                sendData();
                            }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFF' }}>
                                Register Now
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 50 }}>
                            <View
                                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingRight: 5 }}>
                                    Already have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#CF3339',
                                            fontWeight: 'bold',
                                            textDecorationLine: 'underline',
                                        }}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                marginBottom: 24,
                                alignSelf: 'center',
                                justifyContent: 'flex-start',
                            }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: PAGE_WIDTH - 186 }}
                                source={require('../assets/tagline.png')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    topheader: {
        height: 250,
        padding: 24,
        flex: 1,
        justifyContent: 'flex-end',
    },
    textStyle: { fontSize: 35, fontWeight: 'bold', color: '#FFF' },
    textStyle2: { fontSize: 16, fontWeight: '400', color: '#FFF' },

    bottomSection: {
        backgroundColor: '#f1f1f1',
        height: '100%',
        width: '100%',
    },
    phoneInput: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.20)',
        roundness: 10,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
    },

    signInButton: {
        width: '100%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#CF3339',
        marginBottom: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    doneButton: {
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 50,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        marginTop: 40,
        marginBottom: 16,
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
});
