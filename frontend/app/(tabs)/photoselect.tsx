import { useState } from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/Button";
import LanguageButton from "../components/LanguageButton";

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const BackArrow = require('@/assets/images/BackArrow.png');
  
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container,{flexDirection: 'column',},]}>
        <View style={styles.topNavContainer}>
            <Image source={BackArrow} style={styles.backArrow}/>
            <LanguageButton label="EN"/>
        </View>
        {image ?
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
        flex: 1, 
        backgroundColor: 'black',
    },
    
  topNavContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingLeft: 26,
    paddingRight: 26,
  },

  photoContainerEmpty: {
    flex: 7,
    borderRadius: 15,
    zIndex: 1,
    backgroundColor: 'purple',
  },

  photoContainer: {
    flex: 7,
    borderRadius: 15,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },

  image: {
    resizeMode: "contain",
    flex: 1,
    height: '100%',
    width: '100%',
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
    width: 30,
    height: 30,
  },
  
  languageButtonLabel: { 
    color: 'blue',
  }
});
