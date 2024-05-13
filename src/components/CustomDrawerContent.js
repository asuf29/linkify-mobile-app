import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import tw from 'twrnc';

const CustomDrawerContent = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-row justify-start pr-2.5`}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;