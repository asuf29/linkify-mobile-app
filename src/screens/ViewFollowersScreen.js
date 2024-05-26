import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

function ViewFollowersScreen() {
  return (
    <View style={tw`flex-1 items-center mt-20`}>
      <Text style={tw`font-bold text-lg mb-4`}>All Followers</Text>
      <View style={tw`absolute w-full top-0 flex-row items-center justify-center px-4 pt-4 border-b border-gray-300 mt-4`}></View>
      <View style={styles.followersContainer}>
        <Image
          source={require('../assets/images/asuf.jpg')}
          style={tw`w-16 h-16 mr-4 rounded-full`}
        />
        <View style={tw`mr-25`}>
          <Text style={tw`text-base font-bold`}>asuf</Text>
          <Text style={tw`text-sm`}>Asu Fışkın</Text>
        </View>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={tw`text-white font-bold`}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  followersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
});

export default ViewFollowersScreen;
