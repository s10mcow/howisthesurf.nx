import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import MediaCard from '../../components/MediaCard';
import { useAuth0 } from 'react-native-auth0';

import { useAllMedia, useCreateMedia } from '../../data';

import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  mediaList: {
    flexGrow: 1,
  },
});

const Feed = ({ toggle }) => {
  const [image, setImage] = useState('');
  const { authorize, clearSession, user, error } = useAuth0();

  const { data: media, isLoading: isFetchingMedia } = useAllMedia();
  const { mutate: createMedia, isLoading: isLoadingMedia } = useCreateMedia();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      createMedia({ file: result.uri, tags: '', user });
    }
  };

  return (
    <SafeAreaView style={styles.feedbackContainer}>
      {isFetchingMedia ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.mediaList}>
          {media?.map(({ data }) =>
            data.resource_type === 'image' ? (
              <MediaCard key={data.public_id} data={data} />
            ) : (
              <Text key={data.public_id}>I'm a video</Text>
            )
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Feed;
