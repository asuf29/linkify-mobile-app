import React from 'react';
import { View, Image } from 'react-native';
import tw from 'twrnc';

function IconArea() {
  return (
    <View
      style={tw`absolute w-full top-0 flex-row items-center justify-center px-4 pt-4 border-b border-gray-300`}
    >
      <Image
        source={require('./../assets/images/w-logo.png')}
        style={tw`w-12 h-12`}
      />
    </View>
  );
}

export default IconArea;
