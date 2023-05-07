import { CameraAlt, Home } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import MediaCard, { NoMediaCard } from '../../components/MediaCard';
import Slide from '@mui/material/Slide';
import {
  FeedbackContainer,
  MediaList,
  UploadingImage,
  UploadingImageWrapper,
} from './styles';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useAllMedia, useCreateMedia } from '../../data';
import { useRouter } from 'next/router';
import { useFilePicker } from 'react-sage';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//@ts-ignore
const Feed = ({ toggle }) => {
  const [image, setImage] = useState('');
  const { user, isLoading: isLoadingUser, error } = useUser();
  const { data: media, isLoading: isFetchingMedia } = useAllMedia();
  const router = useRouter();
  const { files, onClick, HiddenFileInput } = useFilePicker();
  const {
    mutate: createMedia,
    isLoading: isLoadingMedia,
    isSuccess,
    isError,
  } = useCreateMedia();
  console.log(user);
  useEffect(() => {
    if (files?.length) {
      createMedia({ file: files[0], tags: '', user });
    }
  }, [files, createMedia]);

  return (
    <>
      <Dialog
        fullScreen
        aria-labelledby="simple-dialog-title"
        open={isLoadingMedia}
        TransitionComponent={Transition}
      >
        <UploadingImageWrapper>
          <UploadingImage url={image} />
          <CircularProgress className="CircularProgress" />
        </UploadingImageWrapper>
      </Dialog>
      <FeedbackContainer>
        {isFetchingMedia ? (
          <CircularProgress />
        ) : (
          <MediaList>
            {media?.map(({ data }) =>
              //@ts-ignore
              data.resource_type === 'image' ? (
                //@ts-ignore
                <MediaCard key={data.public_id} data={data} />
              ) : (
                // <Video
                //   key={data.public_id}
                //   controls
                //   publicId={`${data.public_id}.gif`}
                //   resourceType={data.resource_type}
                // >
                //   <Transformation
                //     audioCodec="none"
                //     flags="animated"
                //     quality="auto"
                //   />
                // </Video>
                //@ts-ignore
                <div key={data.public_id}>imavid</div>
              )
            )}
            {media && media.length === 0 && (
              <NoMediaCard>
                <p>No images here!</p>
                <p>Log in and get some media moving!</p>
              </NoMediaCard>
            )}
          </MediaList>
        )}

        <footer className="feedback__footer">
          <Button className="feedback__back" onClick={toggle}>
            <Home />
          </Button>
          {user && (
            <>
              <Button className="feeback__camera" onClick={onClick}>
                <CameraAlt />
              </Button>
              <HiddenFileInput />
            </>
          )}
        </footer>
      </FeedbackContainer>
    </>
  );
};

export default Feed;
