import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>WAIE</Text>
            <Text style={styles.text}>What Am I Eating?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {

    },
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
