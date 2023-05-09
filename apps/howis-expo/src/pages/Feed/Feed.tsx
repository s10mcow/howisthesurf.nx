import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import MediaCard from '../../components/MediaCard';

import { useAllMedia } from '../../data';

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

const Feed = () => {
  const { data: media, isLoading: isFetchingMedia } = useAllMedia();

  return (
    <SafeAreaView style={styles.feedbackContainer}>
      {isFetchingMedia ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.mediaList}>
          {media
            ?.reverse()
            ?.map(({ data }) =>
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
