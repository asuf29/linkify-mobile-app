import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';

const AuthenticationOptionsScreen = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.socialInfluencer}
        source={require('./../assets/images/social-influencer.png')}
      />
      <View> 
        <Button
          title="Sign In"
          onPress={handleSignIn} 
        />
        <Button
          title="Sign Up"
          onPress={handleSignUp}  
        />
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