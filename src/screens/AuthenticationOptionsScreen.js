import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import 'tailwindcss/tailwind.css'
import './../../src/input.css'
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
        style={styles.socialInfluencer}
        source={require('./../assets/images/social-influencer.png')}
      />
      <View style={tw`flex-row gap-x-12`}>  
        <TouchableOpacity 
          style={[tw`border-2 border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2`, styles.button]} 
          onPress={handleSignIn} 
        >
          <Text style={tw`text-white`}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`border-2 border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2`, styles.button]}  
          onPress={handleSignUp}  
        >
          <Text style={tw`text-white`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  socialInfluencer: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  }
});

export default AuthenticationOptionsScreen; 