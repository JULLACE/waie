import { Image, type ImageSource } from "expo-image";
import { Text, View, StyleSheet, Animated, Dimensions, Modal} from 'react-native';

type Props = {
    modalVisible?: true;
};

export default function ImageViewer({ modalVisible }: Props) {

    return (
        <Modal animationType="fade" transparent={modalVisible} presentationStyle="overFullScreen">
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.loadingText}>Processing...</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        padding: 35,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 36,
        alignSelf: 'center',
        fontFamily: 'Asap-Thin',
        color: 'black',
    },
});
