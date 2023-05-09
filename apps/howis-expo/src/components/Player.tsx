import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useAtom } from 'jotai';
import { beachTypes, currentLocationAtom } from '../atoms/beaches';
import { camerasAtom } from '../atoms/cameras';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

interface Beach {
  url: string;
  name: string;
}

interface PlayerProps {
  url: string;
  name: string;
  index: number;
  beachNames: Beach[];
  showFeed: (name: string) => void;
}

const Player: React.FC<PlayerProps> = ({ url, name, index, beachNames }) => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();
  const [videoWidth, setVideoWidth] = useState(Dimensions.get('window').width);
  const [videoHeight, setVideoHeight] = useState(
    Dimensions.get('window').width * (9 / 16)
  );
  const [_, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);

  useEffect(() => {
    const detectOrientation = async (evt) => {
      const { width, height } = Dimensions.get('window');
      const orientation = evt.orientationInfo.orientation;
      Alert.alert('CHANED ORIENTATION', orientation);
      if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setVideoWidth(height);
        setVideoHeight(width);
      } else {
        setVideoWidth(width);
        setVideoHeight(width * (9 / 16));
      }
    };

    const sub =
      ScreenOrientation.addOrientationChangeListener(detectOrientation);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub);
    };
  }, []);

  const updateCamera = ({
    index,
    url,
    name,
  }: {
    index: number;
    url: string;
    name: string;
  }) => {
    setCameras((prev) => {
      const currentCams = [...prev[currentLocation]];
      currentCams[index] = { url, name };
      return { ...prev, [currentLocation]: currentCams };
    });
  };

  const changeCamera = (index: number, camera: string) => {
    if (camera === 'suggest_new_camera') {
      // handle the email suggestion
    } else {
      const { url, name } = JSON.parse(camera);
      updateCamera({ index, url, name });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Video
          ref={videoRef}
          source={{ uri: url }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          // style={styles.video}
          style={{ width: videoWidth, height: videoHeight }}
          shouldPlay
        />
      </View>
      <View>
        <Picker
          selectedValue={JSON.stringify({ url, name })}
          onValueChange={(itemValue) =>
            changeCamera(index, itemValue as string)
          }
        >
          {beachNames.map((beach, key) => (
            <Picker.Item
              key={key}
              value={JSON.stringify({ url: beach.url, name: beach.name })}
              label={beach.name}
            />
          ))}
          <Picker.Item
            key="suggest_new_camera"
            value="suggest_new_camera"
            label="* Suggest New Camera *"
          />
        </Picker>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
        <Text>How was it?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: 500,
  },
  fullscreenVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
});

export default Player;
