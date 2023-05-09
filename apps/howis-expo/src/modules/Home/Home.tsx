import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import {
  beachTypes,
  currentLocationAtom,
  getCurrentBeachesAtom,
} from '../../atoms/beaches';
import { camerasAtom } from '../../atoms/cameras';
import Player from '../../components/Player';
import {
  AddButton,
  AddButtonText,
  Container,
  Modal,
  Players,
} from './HomeStyles';

// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { showModalAtom } from '../../atoms/user';

function Home() {
  const [cameras, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);
  const [showModal, setShowModal] = useState(false);
  const [beaches] = useAtom(getCurrentBeachesAtom);
  const [isModalShown, setShownModal] = useAtom(showModalAtom);

  const showFeedInPlayer = (name) => {
    // Implement navigation to feedback
  };

  const handleClose = () => {
    setShowModal(false);
    setShownModal(true);
  };

  const buyBeer = () => {
    // Implement PayPal link
    setShowModal(false);
  };

  const addNewCamera = () => {
    // navigation.navigate('Feed');
    // setCameras((prev) => {
    //   const current = [...prev[currentLocation], beaches[0]];
    //   return { ...prev, [currentLocation]: current };
    // });
  };
  const renderItem = ({ item, index }) => (
    <Player
      key={index}
      index={index}
      name={item.name}
      url={item.url}
      beachNames={beaches}
      showFeed={showFeedInPlayer}
    />
  );
  useEffect(() => {
    if (!isModalShown) {
      setShowModal(cameras?.[currentLocation].length > 0);
    }
  }, [cameras, currentLocation, isModalShown, setShownModal]);

  return (
    <Container>
      {showModal && (
        <Modal>
          <Text>
            We all hate ads. Thats why we're here. If you like what you see. Buy
            me a beer...
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <Text>No thanks.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={buyBeer}>
            <Text>Hell yeah!</Text>
          </TouchableOpacity>
        </Modal>
      )}

      <Players>
        <FlatList
          data={cameras?.[currentLocation]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ width: '100%' }}
        />
      </Players>
    </Container>
  );
}

export default Home;
