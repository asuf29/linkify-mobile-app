import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar from './../components/Navbar';
import tw from 'twrnc';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

function ProfileScreen() {
  return <MyDrawer />;
  //return (
  //   <View style={styles.container}>
  //     <Navbar />
  //     <View style={tw`flex-row items-center mb-20`}>
  //       <View>
  //         <Image
  //           source={require('./../assets/images/asuf.jpg')}
  //           style={tw`w-24 h-24  rounded-full`}
  //         />
  //       </View>
  //       <View style={tw`flex-row mx-8`}>
  //         <View style={tw`items-center mr-10`}>
  //           <Text style={tw`text-lg font-bold`}>129</Text>
  //           <Text style={tw`text-sm font-medium`}>followers</Text>
  //         </View>
  //         <View style={tw`items-center`}>
  //           <Text style={tw`text-lg font-bold`}>129</Text>
  //           <Text style={tw`text-sm font-medium`}>following</Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View style={styles.bioContainer}>
  //       <Text>Asuf</Text>
  //     </View>
  //     <View style={tw`flex-row`}>
  //       <Button title="Edit Profile" onPress={() => {}} />
  //       <Button title="Share profile" onPress={() => {}} />
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default ProfileScreen;
