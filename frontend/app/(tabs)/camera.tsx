import { CameraView, CameraType, useCameraPermissions, } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import ocrService from "../services/ocr"

export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null)
    const router = useRouter();

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

            ocrService.sendImage(photo).then(res => {
                console.log(res);
                router.push({
                    pathname: '/results',
                    params: { ingredientsList: JSON.stringify(res.ingredients), dietary: JSON.stringify(res.dietary)}
                })
            })
        }

    };

    function toggleCameraFacing() {
        setFacing(current => (current == 'back' ? 'front' : 'back'));
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}  >
                        <Text style={styles.text}><Ionicons name="chevron-back-outline" size={40} color='rgb(206, 215, 199)' /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.camerabutton} onPress={takePhoto}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={36} color={"white"}>  </MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    button: {
        flex:1,
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    backbutton: {
        flex:1,
        alignSelf: 'flex-end',
    },
    camerabutton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        alignItems:'flex-end',
        justifyContent: 'center',


    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
