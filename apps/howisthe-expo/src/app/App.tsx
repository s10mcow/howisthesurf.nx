import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth0Provider } from 'react-native-auth0';
import Home from '../modules/Home';
import Feed from '../modules/Feed/Feed';
export const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={'dev-z23gbvtub72x2sj8.us.auth0.com'}
        clientId={'JyOLnYTPcyJfVzmNXVl8bRfq1TvBuv3s'}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Feed" component={Feed} />
          </Stack.Navigator>
        </NavigationContainer>
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default App;
