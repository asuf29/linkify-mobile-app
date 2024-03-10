import React from 'react';
import { Text, View } from 'react-native';
import Navbar from './../components/Navbar';

function DiscoverScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <Text>Discover Screen</Text>
    </View>
  );
}

export default DiscoverScreen;
