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
import Camera from '../components/camera';
export default function ReportAnimal({ navigation }) {
    const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');
    return (
        <ScrollView style={{ height: '100%' }}>

            <View>
                <Camera />




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



    );
};


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
