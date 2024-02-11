import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import 'tailwindcss/tailwind.css';
import './../../src/input.css';
import tw from 'twrnc';

const AuthenticationOptionsScreen = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignUp = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        style={tw`w-40 h-40`}
        source={require('./../assets/images/white-logo.png')}
      />
      <Text style={tw`mb-8`}>
        <Text style={tw`italic font-bold`}>Discover</Text> with us,{' '}
        <Text style={tw`italic font-bold`}>share</Text>, and let's{' '}
        <Text style={tw`italic font-bold`}>grow</Text> together.
      </Text>
      <View style={tw`gap-y-4 w-80`}>
        <TouchableOpacity
          style={[
            tw`border-2 border-black bg-white rounded-md px-4 py-2 h-12 items-center`,
            styles.button,
          ]}
          onPress={handleSignIn}
        >
          <Text style={tw`text-black text-center h-full text-base`}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`border-2 border-gray-900 bg-gray-900 text-white rounded-md px-4 py-2 h-12 items-center`,
            styles.button,
          ]}
          onPress={handleSignUp}
        >
          <Text style={tw`text-white text-center h-full text-base`}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
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
});

export default AuthenticationOptionsScreen;
