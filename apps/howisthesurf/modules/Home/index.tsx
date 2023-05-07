import Player from '../../components/Player/index';
import MenuAppBar from '../../components/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useEffect, useState } from 'react';

import {
  beachTypes,
  currentLocationAtom,
  getCurrentBeachesAtom,
} from '../../atoms/beaches';
import { camerasAtom } from '../../atoms/cameras';
import { ForecastWidget } from '../../components/ForecastWidget';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { showModalAtom } from '../../atoms/user';

export default function Home() {
  const [cameras, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);

  const players =
    cameras?.[currentLocation].length === 1
      ? 'players players--single'
      : 'players';
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [beaches] = useAtom(getCurrentBeachesAtom);
  const [isModalShown, setShownModal] = useAtom(showModalAtom);

  //@ts-ignore
  const setSelectedFeedback = (selectedFeedback) => true;

  //@ts-ignore
  const showFeedInPlayer = (name) => {
    setSelectedFeedback(name);
    router.push('/feedback');
  };
  const handleClose = () => {
    setOpen(false);
    setShownModal(true);
  };

  const buyBeer = () => {
    const a = document.createElement('a');
    a.href = 'https://www.paypal.com/paypalme2/powdertothepeopletv';
    a.target = '_blank';
    a.click();
    setOpen(false);
  };

  const addNewCamera = () => {
    setCameras((prev) => {
      const current = [...prev[currentLocation], beaches[0]];
      return { ...prev, [currentLocation]: current };
    });
  };

  useEffect(() => {
    if (!isModalShown) {
      setOpen(cameras?.[currentLocation].length === 2);
    }
  }, [cameras, currentLocation, isModalShown, setShownModal]);

  return (
    <>
      <MenuAppBar />
      <div className="players__wrapper">
        <Dialog
          className="players__wrapper__dialog"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We all hate ads.
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <br /> Thats why we're here.
              <br /> If you like what you see.
              <br /> Buy me a beer...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No thanks.</Button>
            <Button onClick={buyBeer} color="primary">
              Hell yeah!
            </Button>
          </DialogActions>
        </Dialog>
        <section className={players}>
          {cameras?.[currentLocation]?.map((camera, index) => (
            <Player
              key={index}
              index={index}
              name={camera.name}
              url={camera.url}
              beachNames={beaches}
              showFeed={showFeedInPlayer}
            />
          ))}
        </section>
        <Button
          sx={{ mt: 2, mb: 2 }}
          size="large"
          variant="contained"
          onClick={addNewCamera}
        >
          Add Camera
        </Button>
        <ForecastWidget />
      </div>
    </>
  );
}
