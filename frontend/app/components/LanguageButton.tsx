import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import Svg, { FeColorMatrix, Path } from 'react-native-svg'


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
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M12 22a9.671 9.671 0 01-3.875-.788 10.148 10.148 0 01-3.187-2.15 10.148 10.148 0 01-2.15-3.187A9.67 9.67 0 012 12a9.64 9.64 0 01.788-3.887 10.202 10.202 0 012.15-3.175 10.126 10.126 0 013.187-2.15A9.693 9.693 0 0112 2c1.383 0 2.68.263 3.888.788a10.174 10.174 0 013.174 2.15 10.21 10.21 0 012.15 3.175A9.622 9.622 0 0122 12a9.671 9.671 0 01-.788 3.875 10.16 10.16 0 01-2.15 3.188 10.164 10.164 0 01-3.175 2.15A9.655 9.655 0 0112 22zm0-2.05c.433-.6.808-1.225 1.125-1.875.317-.65.575-1.342.775-2.075h-3.8c.2.733.458 1.425.775 2.075.317.65.692 1.275 1.125 1.875zm-2.6-.4c-.3-.55-.562-1.121-.787-1.713A14.898 14.898 0 018.05 16H5.1a8.295 8.295 0 001.813 2.175A7.202 7.202 0 009.4 19.55zm5.2 0a7.2 7.2 0 002.488-1.375A8.28 8.28 0 0018.9 16h-2.95a14.76 14.76 0 01-.562 1.838 13.642 13.642 0 01-.788 1.712zM4.25 14h3.4a13.595 13.595 0 01-.15-2c0-.35.012-.688.038-1.012.026-.324.063-.653.112-.988h-3.4a8.151 8.151 0 000 4zm5.4 0h4.7a12.719 12.719 0 00.15-2 13.682 13.682 0 00-.15-2h-4.7a13.584 13.584 0 00-.15 2c0 .35.012.687.038 1.013.026.326.063.655.112.987zm6.7 0h3.4c.083-.333.146-.662.188-.987a8.25 8.25 0 000-2.025A8.185 8.185 0 0019.75 10h-3.4a12.728 12.728 0 01.15 2 13.45 13.45 0 01-.15 2zm-.4-6h2.95a8.302 8.302 0 00-1.812-2.175A7.189 7.189 0 0014.6 4.45c.3.55.563 1.121.788 1.713.225.592.413 1.204.562 1.837zM10.1 8h3.8c-.2-.733-.458-1.425-.775-2.075A12.701 12.701 0 0012 4.05c-.433.6-.808 1.225-1.125 1.875-.317.65-.575 1.342-.775 2.075zm-5 0h2.95c.15-.633.338-1.246.563-1.838A13.93 13.93 0 019.4 4.45a7.2 7.2 0 00-2.488 1.375A8.277 8.277 0 005.1 8z"
                        fill="#fff"
                    />
                </Svg> 
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
        justifyContent: 'space-between',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        gap: 5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
