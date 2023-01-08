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

export default function Home({ navigation }) {
    const swiper = useRef(null);
    const progressValue = useSharedValue(0);
    const baseOptions = {
        vertical: false,
        width: PAGE_WIDTH - 24,
        height: '100%',
    };
    const [modalVisible, setModalVisible] = useState(false);


    const goToImageScreen = () => {

        navigation.navigate('ImageScreen');

    }

    const goToLoginScreen = () => {

        navigation.navigate('Login');

    }

    const promotions = [{ "link": "google.com", "image": "https://randomuser.me/api/portraits/men/33.jpg" }, { "link": "google.com", "image": "https://randomuser.me/api/portraits/men/33.jpg" }, { "link": "google.com", "image": "https://randomuser.me/api/portraits/men/33.jpg" }]

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
                    {/* <SidebarLayout header={fullname = "Zabloon"} subheader={expiry = "01 / 01 / 2001"} /> */}

                    <View style={{ paddingTop: 24, flexDirection: 'row' }}>
                        {/* <TouchableOpacity
                            onPress={() => {
                            setEntries([
                                ...entries,
                                {
                                documentType: 'Trade License',
                                status: 'Active',
                                companyName: 'Express PRO FZ LLC',
                                licenseNo: '5522114',
                                expiryDate: '02-Jun-2025',
                                },
                            ]);
                            }}>
                            <View
                            style={{
                                backgroundColor: '#e3dede',
                                borderWidth: 2,
                                borderColor: 'rgba(0, 0, 0, 0.15)',
                                height: 180,
                                width: 50,
                                borderRadius: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                style={{padding: 0, alignSelf: 'center'}}
                                source={require('../images/X_Mark.png')}
                            />
                            </View>
                        </TouchableOpacity> */}


                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                            alignSelf: 'center',
                            paddingVertical: 24,
                        }}>
                        {promotions.map((data, index) => {
                            return (
                                <PaginationItem
                                    backgroundColor={'#CF3339'}
                                    animValue={progressValue}
                                    index={index}
                                    key={index}
                                    length={promotions.length}
                                />
                            );
                        })}
                    </View>
                    <ScrollView
                        style={{
                            height: '100%',
                            width: '100%',
                            marginBottom: 30
                        }}>
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Refer');
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
                                            {/* <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          Refer & Earn upto
                        </Text>
                        <Text
                          style={{
                            fontSize: 28,
                            fontWeight: '700',
                            color: '#CF3339',
                          }}>
                          AED 2,500
                        </Text>
                      </View> */}
                                            {/* <Image source={require('../images/referImage.png')} /> */}
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
                                paddingVertical: 24,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                            <TouchableOpacity
                                onPress={() =>
                                    demo === false
                                        ? navigation.navigate('ViewTradeLicense')
                                        : setModalVisible(true)
                                }>
                                <MenuBox
                                    image={require('../assets/vet.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Report an injurd paw"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    demo === false
                                        ? navigation.navigate('ViewIncorporationDocuments')
                                        : setModalVisible(true)
                                }>
                                <MenuBox
                                    image={require('../assets/toys.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Play Date"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    demo === false
                                        ? navigation.navigate('ViewVisas')
                                        : setModalVisible(true)
                                }>
                                <MenuBox
                                    image={require('../assets/stethoscope.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Online Vet"
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                paddingBottom: 24,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                            <TouchableOpacity
                                onPress={() =>
                                    demo === false
                                        ? navigation.navigate('ServiceRequest')
                                        : setModalVisible(true)
                                }>
                                <MenuBox
                                    image={require('../assets/love.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Find your pet a partner"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('BusinessSupportServices')}>
                                <MenuBox
                                    image={require('../images/team.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Business Support"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('BookAnAppointment');
                                }}>
                                <MenuBox
                                    image={require('../images/Calendar.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Book an Appointment"
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingBottom: 40,
                            }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('BankingPartners')}>
                                <MenuBox
                                    image={require('../images/handshake.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Partners"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('SpecialOffers');
                                }}>
                                <MenuBox
                                    image={require('../images/badge.png')}
                                    PAGE_WIDTH={PAGE_WIDTH}
                                    title="Special Offers"
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


const PaginationItem = props => {
    const { animValue, index, length, backgroundColor } = props;
    const width = 10;
    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP,
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={{
                backgroundColor: 'white',
                marginHorizontal: 3,
                width: width,
                height: width,
                borderRadius: 50,
                overflow: 'hidden',
                transform: [
                    {
                        rotateZ: '0deg',
                    },
                ],
            }}>
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        width: 10,
                        backgroundColor,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};
