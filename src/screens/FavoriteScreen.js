import React from 'react';
import { Text, View } from 'react-native';
import Navbar from './../components/Navbar';

function FavoriteScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <Text>Favorite Screen</Text>
    </View>
  );
}

export default FavoriteScreen;
