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

export default function RescueCenter({ navigation }) {
    const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

    useFocusEffect(
        React.useCallback(async () => {

            connectSocket = async () => {
                connectToSocket();
            }

            connectSocket();

            socket.on("hello", (arg) => {
                console.log(arg); // world
            });

        })
    );

    return (
        <View></View>
    );
};