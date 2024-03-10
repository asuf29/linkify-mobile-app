import React from 'react';
import { Text, View } from 'react-native';
import Navbar from './../components/Navbar';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
