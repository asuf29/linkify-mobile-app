import React from 'react';
import { Text, View } from 'react-native';
import Navbar from './../components/Navbar';

function SharePostScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <Text>Share Post Screen</Text>
    </View>
  );
}

export default SharePostScreen;
