import AppBar from '../../components/AppBar';
import styled from '@emotion/styled';
import Camera from '@mui/icons-material/CameraAlt';
import React, { useState } from 'react';

import { userAtom } from '../../atoms/user';
import { CircularProgress } from '@mui/material';
import { useAtom } from 'jotai';
import { Config } from '../api/profile';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: calc(100vw - 10px);
`;

export const ProfileHeader = styled.section`
  display: flex;
  margin: 0 auto 30px;
  position: relative;
`;

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
`;

export const ProfileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgrey;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  right: 0px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  background: lightgrey;
  border-radius: 50%;
`;

const Profile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const imagePicker = React.createRef<HTMLDivElement>();
  const [user] = useAtom(userAtom);
  const openImagePicker = () => imagePicker?.current?.click();
  const uploadImage = async (file: any) => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append('upload_preset', Config.upload_preset);
    formData.append('file', file);
    formData.append('tags', 'profile_image');
    formData.append('context', `photo=${file.name}`);

    await fetch('/api/profile', {
      method: 'POST',
      body: formData,
    });
    setIsUploading(false);
  };

  return (
    <>
      <AppBar />
      <ProfileContainer>
        <ProfileHeader>
          {isUploading ? (
            <SpinnerWrapper>
              <CircularProgress />
            </SpinnerWrapper>
          ) : // <FilePicker
          //   maxSize={10}
          //   dims={{ minWidth: 100, minHeight: 100 }}
          //   onChange={(file) => uploadImage(file)}
          //   onError={(errMsg) => console.log(errMsg)}
          // >
          //   <div ref={imagePicker}>
          //     {user?.image?.public_id ? (
          //       <ProfileImage>
          //         <Image
          //           publicId={user?.image?.public_id}
          //           crop="scale"
          //           width="150"
          //           alt="Profile Image"
          //         />
          //       </ProfileImage>
          //     ) : (
          //       <Avatar style={{ width: 150, height: 150 }}>
          //         <AccountCircle style={{ fontSize: 180 }} />
          //       </Avatar>
          //     )}
          //   </div>
          // </FilePicker>
          null}
          <ProfileIcon onClick={openImagePicker}>
            <Camera />
          </ProfileIcon>
        </ProfileHeader>
      </ProfileContainer>
    </>
  );
};

export default Profile;
