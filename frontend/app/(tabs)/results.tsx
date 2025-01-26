import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import Ingredient from "../components/Ingredient";
import { useState } from 'react';
import Dropdown from "../components/Dropdown";
import Ionicons from '@expo/vector-icons/Ionicons';
import ocrService from "../services/ocr"

export default function ResultsScreen() {
    const searchParams = useSearchParams();
    const ingredientsList = searchParams.get('ingredientsList');
    const ingredientsArray = ingredientsList ? JSON.parse(ingredientsList) : [];

    const dietaryList = searchParams.get('dietary');
    const dietaryArray = dietaryList ? JSON.parse(dietaryList) : [];

    const [explanationMessage, setExplanationMessage] = useState('Click on an ingredient to learn more!')

    const router = useRouter();
    useFonts({
        'Asap-Thin': require('../../assets/fonts/Asap-Thin.ttf'),
        'Asap-Regular': require('../../assets/fonts/Asap-Regular.ttf'),
        'Asap-SemiBold': require('../../assets/fonts/Asap-SemiBold.ttf'),
    });
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const handleIngredientPress = (id: string) => {
        setSelectedButton(id);
        ocrService.sendOneIngredient(id).then(res => {
            setExplanationMessage(res.explanation)
        })
    };

    const [visible, setVisible] = useState(false);
    const handleDropdownPress = () => {
        setVisible(!visible);
    }

    return (
        <ScrollView
        bounces={false}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <LinearGradient
                        colors={["rgb(92, 114, 133)", "rgb(129, 140, 120)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} 
                        style={styles.headerContainer}
                    >
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}  >
                            <Text style={styles.text}><Ionicons name="chevron-back-outline" size={40} color='rgb(206, 215, 199)' /></Text>
                        </TouchableOpacity>
                        <Text style={styles.header}>Results</Text>
                        <Text style={styles.title}>What Are You Eating?</Text>
                    </LinearGradient>
                </View>
                <Text style={styles.ingredients}>Ingredients ({ingredientsArray.length})</Text>
                <View style={styles.buttonRow}>
                    {ingredientsArray.map((key: string) => (
                        <Ingredient 
                        key={key}
                        id={key}
                        label={key}
                        isPressed={selectedButton === key}
                        onPress={handleIngredientPress} />
                    ))}
                </View>
                <View style={styles.ingredientInfo}>
                    <Text style={styles.text}>{explanationMessage}</Text>
                </View>
                <Dropdown
                    label={`Allergens & Dietary Restrictions (${dietaryArray ? dietaryArray.length : 0})`}
                    isVisible={visible}
                    content={dietaryArray ? dietaryArray.join(', ') : 'grdhufdxfshcxjjndscx'}
                    onPress={handleDropdownPress}>
                </Dropdown>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 2000,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
    },
    headerContainer: {
        width: '100%',
        top: 0,
        position: 'absolute',
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    backButton: {
        position: 'absolute',
        top: 80,
        left: 30,
    },
    header: {
        fontSize: 36,
        fontFamily: 'Asap-Semibold',
        color: '#fff',
        textAlign: 'center',
    },
    title: {
        fontSize: 50,
        fontFamily: 'Asap-Thin',
        color: '#fff',
        margin: 8,
        textAlign: 'center',
    },
    ingredients: {
        fontSize: 36,
        fontFamily: 'Asap-Thin',
        color: '#fff',
        marginTop: 290,
        marginBottom: 10,
        marginLeft: 20,
        textAlign: 'left',
    },
    buttonRow: {
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    ingredientInfo: {
        backgroundColor: 'rgba(101, 95, 95, 255)',
        borderColor: '#fff',
        borderRadius: 15,
        padding: 12,
        marginHorizontal: 15,
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
        fontFamily: 'Asap-Regular'
    },
    text: {
        fontSize: 20,
        fontFamily: 'Asap-Regular',
        color: '#fff',
    }
});