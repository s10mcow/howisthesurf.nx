import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useAtom } from 'jotai';
import { beachTypes, currentLocationAtom } from '../atoms/beaches';
import { camerasAtom } from '../atoms/cameras';
import { Picker } from '@react-native-picker/picker';

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
  const [showError, setShowError] = useState(false);
  const videoRef = useRef<Video>(null);
  const [_, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);
  const deleteCamera = (index: number) => {
    setCameras((prev) => {
      const currentCams = [...prev[currentLocation]];
      currentCams.splice(index, 1);
      return { ...prev, [currentLocation]: currentCams };
    });
  };

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

  const deleteHandler = () => {
    deleteCamera(index);
  };

  const changeCamera = (index: number, camera: string) => {
    if (camera === 'suggest_new_camera') {
      // handle the email suggestion
    } else {
      const { url, name } = JSON.parse(camera);
      updateCamera({ index, url, name });
    }
  };

  const footer = (
    <View>
      <Picker
        selectedValue={JSON.stringify({ url, name })}
        onValueChange={(itemValue) => changeCamera(index, itemValue as string)}
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
  );

  const playerContent = showError ? (
    <View>
      <Text>Camera offline.</Text>
    </View>
  ) : (
    <View>
      <TouchableOpacity onPress={deleteHandler}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <Video
        ref={videoRef}
        source={{ uri: url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: '100%', height: 300 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {playerContent}
      {footer}
      <TouchableOpacity onPress={() => showFeed(name)}>
        <Text>How was it?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default Player;
