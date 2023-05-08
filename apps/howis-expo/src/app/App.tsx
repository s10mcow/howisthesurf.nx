/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import Home from '../modules/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
const Login = () => {
  const { authorize, clearSession, user, error } = useAuth0();
  const onLogin = async () => {
    try {
      await authorize(
        { scope: 'openid profile email' },
        { customScheme: 'auth0.com.howisthesurf' }
      );
    } catch (e) {
      console.log(e);
    }
  };
  const onLogout = async () => {
    try {
      await clearSession({ customScheme: 'auth0.com.howisthesurf' });
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

export const App = () => {
  return (
    <Auth0Provider
      domain="dev-z23gbvtub72x2sj8.us.auth0.com"
      clientId="JyOLnYTPcyJfVzmNXVl8bRfq1TvBuv3s"
    >
      <Home />
    </Auth0Provider>
  );
};

export default App;
