import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, Button, Modal, Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar from './../components/Navbar';
import tw from 'twrnc';
import LoginScreen from './LoginScreen';
import LogOutModal from '../components/LogOutModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Feed() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleUserDatas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/profiles/current', {
          headers: { 
            'Authorization': `${token}`
           }
        });
        const { data, code } = response.data;
        if (code === 200) {
          console.log(data)
          setUserData(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleUserDatas();
  }, []);
  
  return (
    <View style={styles.container}>
      <Navbar />
      {userData ? (
        <View style={styles.bioContainer}>
          <Text style={tw`text-start text-lg font-bold`}>{userData.user.personal_info.username}</Text>
       </View>
      ) : null}
      <View style={tw`flex-row items-center mb-20`}>
        <View>
           {userData ? (
           <Image
             source={{uri: userData.user.personal_info.avatar}}
             style={tw`w-24 h-24  rounded-full`}
           />
        ) : null}
        </View>
        <View style={tw`flex-row mx-8`}>
        {userData ? (
          <View style={tw`items-center mr-10`}>
            <Text style={tw`text-lg font-bold`}>{userData.user.followers}</Text>
            <Text style={tw`text-sm font-medium`}>followers</Text>
          </View>
        ) : null}
        {userData ? (
          <View style={tw`items-center`}>
            <Text style={tw`text-lg font-bold`}>{userData.user.followings}</Text>
            <Text style={tw`text-sm font-medium`}>following</Text>
          </View>
        ) : null}
      </View>
      </View>
      {userData ? (
         <View style={styles.bioContainer}>
          <Text style={tw`text-lg font-bold`}>{userData.user.personal_info.full_name}</Text>
       </View>
      ) : null}
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
  },
});

export default ProfileScreen;
