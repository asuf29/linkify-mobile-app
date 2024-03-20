import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const verifyToken = async () => {
    try { 
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error verifying token:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isValid = await verifyToken();
        if (isValid) {
          navigation.navigate('HomeScreen');
        } else {
          navigation.replace('AuthenticationOptionsScreen'); 
        }
      } catch (error) {
        console.log('Token verify error:', error);
        navigation.replace('AuthenticationOptionsScreen'); 
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      checkToken();
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./../assets/images/splash.png')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
