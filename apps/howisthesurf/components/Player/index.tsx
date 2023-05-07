import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Hls from 'hls.js';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import { beachTypes, currentLocationAtom } from '../../atoms/beaches';
import { camerasAtom } from '../../atoms/cameras';

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

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-size: 20px;
  }
`;

const Player: React.FC<PlayerProps> = ({ url, name, index, beachNames }) => {
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [showError, setShowError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [_, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);
  const router = useRouter();
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
    if (hlsInstance && hlsInstance.destroy) hlsInstance.destroy();
    setHlsInstance(null);
    deleteCamera(index);
  };

  useEffect(() => {
    setShowError(false);
    if (Hls.isSupported()) {
      let beachHls = new Hls();
      beachHls.loadSource(url);
      beachHls.attachMedia(videoRef.current as HTMLVideoElement);
      beachHls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) videoRef.current.play();
      });
      beachHls.on(Hls.Events.ERROR, (event, err) => {
        console.log(err);
        if (err.response && err.response.code === 404) {
          setShowError(true);
          beachHls.destroy();
        }
      });
      setHlsInstance(beachHls);
    } else {
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.play();
      }
    }
  }, [url]);

  const changeCamera = (index: number, camera: string) => {
    if (camera === 'suggest_new_camera') {
      const a = document.createElement('a');
      a.href =
        'mailto:powdertothepeeps@gmail.com?subject=New Camera Suggestion';
      a.target = '_blank';
      a.click();
    } else {
      const { url, name } = JSON.parse(camera);
      updateCamera({ index, url, name });
      ReactGA.event({
        category: 'Camera Player',
        action: 'Change Camera',
        label: url,
      });
    }
  };

  const footer = (
    <div className="player__footer__uncollapsed">
      <Select
        fullWidth
        value={JSON.stringify({ url, name })}
        onChange={(event) => changeCamera(index, event.target.value as string)}
      >
        {beachNames.map((beach, key) => (
          <StyledMenuItem
            key={key}
            value={JSON.stringify({ url: beach.url, name: beach.name })}
          >
            {beach.name}
          </StyledMenuItem>
        ))}
        <StyledMenuItem key="suggest_new_camera" value="suggest_new_camera">
          * Suggest New Camera *
        </StyledMenuItem>
      </Select>
    </div>
  );

  const playerContent = showError ? (
    <main className="player__error">
      <div>Camera offline.</div>
    </main>
  ) : (
    <main className="player__content">
      <Fab
        className="player__delete"
        aria-label="remove"
        onClick={deleteHandler}
      >
        <CloseIcon />
      </Fab>
      <video ref={videoRef} autoPlay controls />
    </main>
  );

  const goToFeed = (name: string) => {
    router.push(`/feed?name=${name}`);
  };

  return (
    <Card className="player">
      {playerContent}
      <CardActions className="player__footer">{footer}</CardActions>
      <Button onClick={() => goToFeed(name)}>How was it?</Button>
    </Card>
  );
};

export default Player;
