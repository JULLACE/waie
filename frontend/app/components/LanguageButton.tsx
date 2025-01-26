import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

type Props = {
    label: string;
    theme?: 'primary';
    onPress?: () => void;
    icon?: React.ReactNode;
};

export default function Button({ label, theme, onPress, icon }: Props) {
    const [fontsLoaded] = useFonts({
        'Asap-Regular': require('../../assets/fonts/Asap-Regular.ttf'),
      });
    if (theme === 'primary') {
        return (
            <View
                style={[
                    styles.buttonContainer,
                    { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
                ]}>
                <Pressable
                    style={[styles.button, { backgroundColor: '#fff' }]}
                    onPress={onPress}>
                    <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
                    <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? 'rgba(244, 244, 244, 0.5)' : '#655F5F' }
            ]} onPress={onPress}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 95,
        height: 39,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        fontFamily: 'Asap-Regular'
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 24,
    },
    icon: {
        color: 'rgb(50, 54, 53)',
        margin: 5,
    }
});
