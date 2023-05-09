/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import Home from '../Home/Home';
import Landing from '../Landing/Landing';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//   await clearSession({ customScheme: 'auth0.com.howisthesurf' });
const Add = () => {
  return (
    <View>
      <Text>Add!</Text>
    </View>
  );
};

const Feed = () => {
  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
};

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export const Navigation = () => {
  const { user } = useAuth0();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={user ? Home : Landing}
        />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
