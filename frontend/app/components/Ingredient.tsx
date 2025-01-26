import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    id: string,
    label: string;
    tkey?: string,
    isPressed: boolean;
    onPress: (id:string, tkey:string) => void;
};

export default function Ingredient({ id, label, tkey, isPressed, onPress }: Props) {
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
                { backgroundColor: isPressed ? 'rgba(244, 244, 244, 0.2)' : 'rgba(101, 95, 95, 255)' }
                ]} onPress={() => onPress(id, tkey)}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'flex-start',
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
    }
});
