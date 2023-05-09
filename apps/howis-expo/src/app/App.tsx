import React from 'react';
import { Auth0Provider } from 'react-native-auth0';
import Navigation from '../pages/Navigation/Navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../data';
import { NavigationContainer } from '@react-navigation/native';

export const App = () => {
  return (
    <Auth0Provider
      domain="dev-z23gbvtub72x2sj8.us.auth0.com"
      clientId="JyOLnYTPcyJfVzmNXVl8bRfq1TvBuv3s"
    >
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
