import { Text, View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';
import Button from "../components/Button";
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function HomeScreen() {
    const router = useRouter();
    useFonts({
        'Asap-Thin': require('../../assets/fonts/Asap-Thin.ttf'),
        'Asap-Regular': require('../../assets/fonts/Asap-Regular.ttf'),
    });
    return (
        <AnimatedLinearGradient
            colors={["rgb(92, 114, 133)", "rgb(129, 140, 120)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <Text style={styles.title}>WAYE</Text>
                <Text style={styles.text}>What Are You Eating?</Text>
                <Button
                    label="Take Photo"
                    onPress={() => router.push('/camera')}
                    icon={<Ionicons name={'camera'} size={24} />} />
                <Button 
                    label="Upload Photo" 
                    onPress={() => router.push('/photoselect')} 
                    icon={<Feather name="upload" size={24} />} />
            </View>
        </AnimatedLinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 64,
        fontFamily: 'Asap-Thin',
        color: '#fff',
        margin: 8,
    },
    text: {
        fontSize: 24,
        fontFamily: 'Asap-Regular',
        color: 'rgb(50, 54, 53)',
        marginBottom: 80,
    }
});