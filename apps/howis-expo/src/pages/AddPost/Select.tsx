import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { selectedImageAtom } from '../../atoms/post';
import { MaterialIcons } from '@expo/vector-icons';

export default function Select() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom);
  const navigator = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const { assets } = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          sortBy: 'creationTime',
          first: 100,
        });
        setImages(assets);
        setSelectedImage(assets[0]);
      }
    })();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setSelectedImage(item)}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.selectedImage}
        />
      )}
      <TouchableOpacity
        onPress={() => navigator.navigate('Camera')}
        style={styles.takePictureButton}
      >
        <MaterialIcons name="camera" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '32%',
    height: 100,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  takePictureButton: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});
