import React, { useState } from 'react';
import { Alert, Modal, Image, View, StyleSheet, Dimensions, Text, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/Button";
import LanguageButton from "../components/LanguageButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import ocrService from '../services/ocr'
import { LinearGradient } from 'expo-linear-gradient';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Ingredient from '../components/Ingredient';

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
        
import Loading from "../components/Loading"

export default function ImagePickerExample() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  useFonts({
    'Asap-Thin': require('../../assets/fonts/Asap-Thin.ttf'),
    'Asap-Regular': require('../../assets/fonts/Asap-Regular.ttf'),
    'Asap-SemiBold': require('../../assets/fonts/Asap-SemiBold.ttf'),
  });

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true) // for the loading screen
      setImage(result.assets[0].uri);
      ocrService.sendImage(result.assets[0]).then(res => {
        console.log(res);
        router.push({
          pathname: '/results',
          params: { ingredientsList: JSON.stringify(res.ingredients), dietary: JSON.stringify(res.dietary)}
        })
        setLoading(false)
      })
    }
  };

  const [selectedButton, setSelectedButton] = useState<string | null>('EN');
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
      {loading ? <Loading/> : null}
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

      { image ?
        <View style={styles.photoContainer}>
          {image && <Image source={{ uri: image }} style={styles.image}/>}
        </View>
          : <View style={styles.photoContainerEmpty}></View>
      }

      <View style={styles.mainButtonContainer}>
        <LinearGradient
          colors={["rgb(92, 114, 133)", "rgb(129, 140, 120)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} 
          style={styles.mainButtonContainer}
        >
          <Button label="Upload Image" onPress={pickImage}/>
        </LinearGradient>
      </View>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    flex: 1,
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
  photoContainerEmpty: {
    borderRadius: 15,
    backgroundColor: "#000",
    flex: 2,
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 2,

    borderRadius: 15,
    backgroundColor: '#000',
  },
  image: {
    objectFit: 'contain',
    minHeight: '70%',
  },
  mainButtonContainer:{
    alignItems: 'center',
    paddingTop: 25,
    zIndex: 5,
    borderRadius: 25,
    bottom: 0,
    paddingBottom: 25,
    width: Dimensions.get('window').width,
    height: 180,
    justifyContent: 'center',
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
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});
