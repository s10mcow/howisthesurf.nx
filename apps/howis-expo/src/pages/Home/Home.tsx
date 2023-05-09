import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  Button,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  beachTypes,
  currentLocationAtom,
  getCurrentBeachesAtom,
} from '../../atoms/beaches';
import { camerasAtom } from '../../atoms/cameras';
import Player from '../../components/Player';
import { Container, Players } from './HomeStyles';

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
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Support?</Text>
            <Text style={styles.modalText}>We all hate ads.</Text>
            <Text style={styles.modalText}>
              Thats why we're here. If you like what you see.
            </Text>
            <Text style={styles.modalText}>Buy me a beer...</Text>
            <Button onPress={handleClose} title="No thanks." />

            <TouchableOpacity style={styles.closeButton} onPress={buyBeer}>
              <Text style={styles.closeButtonText}>🍺 Hell yeah! 🍺</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
