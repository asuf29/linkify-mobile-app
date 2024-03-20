import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, Button, Modal, Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar from './../components/Navbar';
import tw from 'twrnc';
import LoginScreen from './LoginScreen';
import LogOutModal from '../components/LogOutModal';

function Feed() {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={tw`flex-row items-center mb-20`}>
        <View>
          <Image
            source={require('./../assets/images/asuf.jpg')}
            style={tw`w-24 h-24  rounded-full`}
          />
        </View>
        <View style={tw`flex-row mx-8`}>
          <View style={tw`items-center mr-10`}>
            <Text style={tw`text-lg font-bold`}>129</Text>
            <Text style={tw`text-sm font-medium`}>followers</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-lg font-bold`}>129</Text>
            <Text style={tw`text-sm font-medium`}>following</Text>
          </View>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text>Asuf</Text>
      </View>
      <View style={tw`flex-row`}>
        <Button title="Edit Profile" onPress={() => {}} />
        <Button title="Share profile" onPress={() => {}} />
      </View>
    </View>
  );
}

function LogOut({ navigation }) {
  return(
    <View>
      <LogOutModal navigation={navigation} />
    </View>
  )
  // useEffect(() => {
  //   setModalVisible(true);
  // }, []);

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Modal
  //       animationType='slide'
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         setModalVisible(!modalVisible);
  //       }}
  //     > 
  //       <View style={tw`flex flex-1 justify-center items-center `}>
  //         <View style={tw`m-20 bg-gray-300 rounded-xl p-9 items-center shadow-black`}>
  //           <Text style={tw`text-center font-bold text-xs justify-items-center mb-4`}>Log out of your account?</Text>
  //           <Pressable
  //             style={tw`rounded-md bg-red-500 p-2 w-24 items-center justify-center mb-4`}
  //             onPress={() => {
  //               navigation.navigate('LoginScreen');
  //               setModalVisible(false); 
  //             }}>
  //             <Text style={tw`items-center font-bold text-white`}>Log Out</Text>
  //           </Pressable>
  //           <Pressable
  //             style={tw`rounded-md bg-gray-500 p-2 w-24 items-center justify-center`}
  //             onPress={() => {
  //               navigation.navigate('Profile');
  //               setModalVisible(false); 
  //             }}>
  //             <Text style={tw`items-center font-bold text-white`}>Cancel</Text>
  //           </Pressable>
  //         </View>
  //       </View>
  //     </Modal>
  //   </View>
  // );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition:"right", 
        headerShown: false
      }}
    >
      <Drawer.Screen name="Profile" component={Feed} />
      <Drawer.Screen name="Log Out" component={LogOut} />
    </Drawer.Navigator>
  );
}

function ProfileScreen() {
  return (  
    <MyDrawer />
  );
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProfileScreen;
