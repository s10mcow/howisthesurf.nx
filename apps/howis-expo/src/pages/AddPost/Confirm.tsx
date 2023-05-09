import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { selectedImageAtom } from '../../atoms/post';
import { useCreateMedia } from '../../data';
import { StackActions } from '@react-navigation/native';

import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator } from 'react-native-paper';

export default function Confirm({ navigation }) {
  const [image] = useAtom(selectedImageAtom);
  const { user } = useAuth0();
  const { mutateAsync: createMedia, isLoading: isLoadingMedia } =
    useCreateMedia();

  useEffect(() => {
    const handleSave = async () => {
      try {
        const asset = await MediaLibrary.getAssetInfoAsync(image);
        const source = {
          uri: asset.localUri,
          type: asset.type,
          name: asset.filename,
        };
        await createMedia({ file: source, tags: '', user });
        navigation.navigate('Feed');
        navigation.dispatch(StackActions.popToTop());
      } catch (error) {
        console.log(error);
      }
    };
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <MaterialIcons name="check" size={24} color="#2979FF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoadingMedia && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      )}
      <Image
        source={{ uri: image.uri }}
        style={{ ...styles.image, ...(isLoadingMedia ? { opacity: 0.5 } : {}) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    padding: 5,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
