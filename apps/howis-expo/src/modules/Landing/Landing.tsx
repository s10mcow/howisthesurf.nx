import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useAuth0 } from 'react-native-auth0';

const { height } = Dimensions.get('window');

export default function Landing() {
  const { authorize, clearSession, user, error } = useAuth0();
  const login = async () => {
    try {
      await authorize(
        { scope: 'openid profile email' },
        { customScheme: 'auth0.com.howisthesurf' }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToCreateAccount = () => {
    // Add navigation to the create account page here
    console.log('Navigating to create account...');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('./landing_icon.png')} />
      </View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={navigateToCreateAccount}
      >
        <Text style={styles.linkButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: height / 3,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkButton: {
    marginTop: 20, // Add margin to place the button at the bottom
  },
  linkButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});
