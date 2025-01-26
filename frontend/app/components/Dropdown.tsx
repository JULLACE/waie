import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import Feather from '@expo/vector-icons/Feather';

type Props = {
    label: string;
    isVisible: boolean;
    content: string;
    onPress: () => void;
};

export default function Dropdown({ label, isVisible, content, onPress }: Props) {
    useFonts({
        'Asap-Regular': require('../../assets/fonts/Asap-Regular.ttf'),
    });

    return (
        <View style={styles.buttonContainer}>
            <LinearGradient
                colors={["rgb(92, 114, 133)", "rgb(129, 140, 120)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} 
                style={styles.buttonFill}
            >
                <Pressable style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? 'rgba(244, 244, 244, 0.2)' : '' }
                ]} onPress={onPress}
                >
                <Text style={styles.buttonLabel}>{label}</Text>
                <Feather name={isVisible ? "chevron-up" : "chevron-down"} size={24} color="white" />
            </Pressable>
            {isVisible && 
                <View style={styles.dropdownContainer}>
                    <Text style={styles.text}>{content}</Text>
                </View>
            }
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        alignSelf: 'center',
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    buttonFill: {
        borderRadius: 15,
    },
    button: {
        alignSelf: 'flex-start',
        borderRadius: 15,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        fontFamily: 'Asap-Regular'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    dropdownContainer: {
        borderRadius: 15,
        borderColor: '#fff',
        padding: 10,
        marginHorizontal: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        fontFamily: 'Asap-Regular',
        backgroundColor: '#000',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Asap-Regular',
        color: '#fff',
    }
});
