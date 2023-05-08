import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { formatDistance } from 'date-fns';
import { Cloudinary } from '@cloudinary/url-gen';

const styles = StyleSheet.create({
  noMediaCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    minHeight: 150,
    flex: 1,
    fontSize: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    color: 'white',
  },
  user: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40,
    borderRadius: 0,
    position: 'relative',
  },
  mediaContainer: {
    order: 1,
    position: 'relative',
  },
  media: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  content: {
    order: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
  },
  share: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});

export default function MediaCard({ data }) {
  const userPublicId =
    data && data.user && data.user.image && data.user.image.public_id;

  //   const image = useMemo(() => cld.image(userPublicId), [cld, userPublicId]);

  const onShare = async () => {
    try {
      await Share.share({
        message: `https://howisthe.surf/feedback/${data.public_id}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: data.url }}
          style={styles.media}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={onShare} style={styles.share}>
          <Text style={{ color: 'white', fontSize: 24 }}>Share</Text>
        </TouchableOpacity>
        <View style={styles.user}>
          {/* <Avatar
            source={{
              uri: image.toURL(),
            }}
            size="medium"
          /> */}
          <Text style={styles.userName}>{data.user.name}</Text>
        </View>
        <View>
          {data.created_at && (
            <Text>
              {formatDistance(new Date(data.created_at), new Date())} ago
            </Text>
          )}
          {data.tags.map((tag, key) => (
            <Text key={key}>{tag}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
