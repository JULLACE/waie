import { useState } from 'react';
import { Image, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/Button";
import LanguageButton from "../components/LanguageButton";
import Ionicons from '@expo/vector-icons/Ionicons';

import ocrService from '../services/ocr'
import { LinearGradient } from 'expo-linear-gradient';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      ocrService.sendImage(result.assets[0]).then(res => {
        console.log(res);
        router.push({
          pathname: '/results',
          params: { ingredientsList: JSON.stringify(res.ingredients), dietary: JSON.stringify(res.dietary)}
        })
      })
    }
    
  };

  return (
    <View style={styles.container}>
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
        <LanguageButton label="EN"/>
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
});
