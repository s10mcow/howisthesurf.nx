import React from 'react';
import { View } from 'react-native';

import { Avatar, Divider, IconButton, List, Text } from 'react-native-paper';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { currentLocationAtom } from '../atoms/beaches';

const DrawerContent = ({ navigation }) => {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const [currentLocation, setLocation] = useAtom(currentLocationAtom);

  return (
    <View style={{ flex: 1 }}>
      <List.Section>
        {user && (
          <>
            <List.Item
              title={user.nickname}
              left={() =>
                user?.picture ? (
                  <Avatar.Image source={{ uri: user.picture }} size={40} />
                ) : (
                  <Avatar.Icon icon="account-circle" size={40} />
                )
              }
              onPress={() => router.push('/profile')}
            />
            <Divider />
          </>
        )}
        {!user && (
          <List.Item
            title="Profile"
            left={() => <List.Icon icon="account-circle" />}
            onPress={() => router.push('/profile')}
          />
        )}
        <List.Item
          title="Media Feed"
          left={() => <List.Icon icon="photo-library" />}
          onPress={() => router.push('/feed')}
        />
        <Divider />
        <List.Subheader>Countries</List.Subheader>
        {['fl', 'pt', 'es', 'fr', 'uk'].map((locationCode) => (
          <List.Item
            key={locationCode}
            title={locationCode.toUpperCase()}
            left={() =>
              currentLocation === locationCode ? (
                <List.Icon icon="check" />
              ) : null
            }
            onPress={() => setLocation(locationCode)}
          />
        ))}
      </List.Section>
      <Divider />
      <List.Section>
        {user ? (
          <List.Item
            title="Log out"
            left={() => <List.Icon icon="exit-to-app" />}
            onPress={() => (window.location.href = '/api/auth/logout')}
          />
        ) : (
          <List.Item
            title="Log in"
            left={() => <List.Icon icon="account-circle" />}
            onPress={() => (window.location.href = '/api/auth/login')}
          />
        )}
      </List.Section>
    </View>
  );
};

const MenuAppBar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconButton
        icon="menu"
        size={24}
        onPress={() => router.push('/')}
        style={{ marginLeft: 10 }}
      />
      <Text style={{ fontFamily: 'Lacquer', fontSize: 24, marginLeft: 10 }}>
        howisthe.surf
      </Text>
      <IconButton
        icon={user?.picture ? 'account-circle' : 'menu'}
        size={24}
        onPress={() => router.push('/drawer')}
        style={{ marginLeft: 'auto', marginRight: 10 }}
      />
    </View>
  );
};

export { MenuAppBar, DrawerContent };
