import { CameraView, CameraType, useCameraPermissions, } from 'expo-camera';
import { useState, useRef } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import ocrService from "../services/ocr"
import Loading from "../components/Loading"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LanguageButton from '../components/LanguageButton';
import { LinearGradient } from 'expo-linear-gradient';
import Ingredient from '../components/Ingredient';
import { useFonts } from 'expo-font';

const languages = [
    { name: 'Chinese', code: 'CN' },
    { name: 'Arabic', code: 'AR' },
    { name: 'English', code: 'EN' },
    { name: 'Thai', code: 'TH' },
    { name: 'Japanese', code: 'JP' },
    { name: 'Spanish', code: 'ES' },
    { name: 'Hindi', code: 'HI' },
    { name: 'Bengali', code: 'BN' },
    { name: 'Russian', code: 'RU' },
    { name: 'Portuguese', code: 'PT' },
    { name: 'French', code: 'FR' },
  ];

export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedButton, setSelectedButton] = useState<string | null>('EN');
    
    const [fontsLoaded] = useFonts({
    'Asap-Thin': require('../../assets/fonts/Asap-Thin.ttf'),
    'Asap-Regular': require('../../assets/fonts/Asap-Regular.ttf'),
    'Asap-SemiBold': require('../../assets/fonts/Asap-SemiBold.ttf'),
    });

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo)
            setLoading(true) // for the loading screen
            ocrService.sendImage(photo).then(res => {
                console.log(res); 
                router.push({
                    pathname: '/results',
                    params: { ingredientsList: JSON.stringify(res.ingredients), dietary: JSON.stringify(res.dietary)}
                })
                setLoading(false)
            })
        }
    };

    function toggleCameraFacing() {
        setFacing(current => (current == 'back' ? 'front' : 'back'));
    };
    
    const handleIngredientPress = (id: string) => {
        setSelectedButton(id);
        setModalVisible(!modalVisible);
      };

    return (
        <SafeAreaProvider>
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
                      <Text style={styles.modalText}>Choose a language</Text>
                      <View style={styles.buttonRow}>
                        {languages.map(({name, code}) => (
                            <Ingredient 
                            key={code}
                            id={code}
                            label={name}
                            isPressed={selectedButton === code}
                            onPress={handleIngredientPress} />
                        ))}
                    </View>
                    </View>
                  </View>
                </Modal>
            <View style={styles.container}>
                {loading? <Loading/> : null}
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.topNavContainer}>
                        <LinearGradient
                            colors={["rgb(92, 114, 133)", "rgb(129, 140, 120)"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }} 
                            style={styles.topNavContainer}
                            >
                            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="chevron-back-outline" size={40} color='rgb(206, 215, 199)' />
                            </TouchableOpacity>
                            <LanguageButton 
                            label={selectedButton ? selectedButton : "EN"}
                            onPress={() => setModalVisible(true)}
                            />
                        </LinearGradient>
                    </View>
                    <View style={styles.cameraButtons}>
                        <TouchableOpacity style={styles.camerabutton} onPress={takePhoto}>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons name="camera-flip-outline" size={36} color={"white"}>  </MaterialCommunityIcons>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,

    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    topNavContainer: {
        width: '100%',
        top: -10,
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        borderRadius: 25,
      },
      backButton: {
        margin: 5,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
      modalText: {
        fontSize: 20,
        fontFamily: 'Asap-Semibold',
        color: '#000',
        marginBottom: 8,
      },
      buttonRow: {
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      },
      cameraButtons: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        height: 120,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center', 
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    camerabutton: {
        width: 80,
        height: 80,
        borderRadius: 40, 
        borderWidth: 5,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute',
    },
    button: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center', 
        marginLeft: 175, 
    },    
});
