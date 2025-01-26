import { useState } from 'react';
import { Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/Button";
import LanguageButton from "../components/LanguageButton";

import ocrService from '../services/ocr'

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  
  const BackArrow = require('@/assets/images/BackArrow.png');
  
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      ocrService.send(result.assets[0]).then(res => {
        console.log(res);
        router.push({
          pathname: '/results',
          params: { ingredientsList: JSON.stringify(res.ingredientsList), dietary: JSON.stringify(res.dietary)}
        })
      })
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavContainer}>
        <Image source={BackArrow} style={styles.backArrow}/>
        <LanguageButton label="EN"/>
      </View>

      { image ?
        <View style={styles.photoContainer}>
          {image && <Image source={{ uri: image }} style={styles.image}/>}
        </View>
          : <View style={styles.photoContainerEmpty}></View>
      }

      <View style={styles.mainButtonContainer}>
        <Button label="Upload Image" onPress={pickImage}/>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'black',
    marginTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
  },

  photoContainerEmpty: {
    borderRadius: 15,
    backgroundColor: 'rgb(25, 25, 25)',
    flex: 2,
  },

  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 2,

    borderRadius: 15,
    backgroundColor: 'rgb(25, 25, 25)',
  },

  image: {
    objectFit: 'contain',
    minHeight: '70%',
  },

  mainButtonContainer:{
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 25,
    zIndex: 5,
    borderRadius: 25,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 187,
  },

  backArrow: {
    objectFit: 'contain',
    width: 35,
    height: 35
  },
});
