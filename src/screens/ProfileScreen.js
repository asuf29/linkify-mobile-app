import React from 'react';
import { Text, View } from 'react-native';
import Navbar from './../components/Navbar';

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <Text>Profile Screen</Text>
    </View>
  );
}

export default ProfileScreen;
