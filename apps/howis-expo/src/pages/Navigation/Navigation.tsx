/* eslint-disable jsx-a11y/accessible-emoji */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import InstaCamera from '../AddPost/Camera';
import Confirm from '../AddPost/Confirm';
import Select from '../AddPost/Select';
import Feed from '../Feed/Feed';
import Home from '../Home/Home';
import Landing from '../Landing/Landing';
import Profile from '../Profile/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PostStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Select">
      <Stack.Screen
        options={{
          headerTitle: 'New Post',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
              <MaterialIcons name="arrow-forward" size={24} color="#2979FF" />
            </TouchableOpacity>
          ),
        }}
        name="Select"
        component={Select}
      />
      <Stack.Screen
        options={{
          headerTitle: 'New Post',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Select')}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
        name="Post"
        component={Confirm}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Camera"
        component={InstaCamera}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const { user } = useAuth0();

  return user ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'image' : 'image-outline';
          } else if (route.name === 'New Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen
        name="New Post"
        options={{ headerShown: false }}
        component={PostStack}
      />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  ) : (
    <Landing />
  );
};

export default Navigation;
