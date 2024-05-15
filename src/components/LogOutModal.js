import React, {useState, useEffect} from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import LoginScreen from './../screens/LoginScreen';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOutModal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed');
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        > 
          <View style={tw`flex flex-1 justify-center items-center `}>
            <View style={tw`m-20 bg-gray-300 rounded-xl p-9 items-center shadow-black`}>
              <Text style={tw`text-center font-bold text-xs justify-center mb-4`}>Log out of your account?</Text>
              <Pressable
                style={tw`rounded-md bg-red-500 p-2 w-24 items-center justify-center mb-4`}
                onPress={() => {
                  removeToken();
                  setModalVisible(false); 
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                    });
                }}>
                <Text style={tw`items-center font-bold text-white`}>Log Out</Text>
              </Pressable>
              <Pressable
                style={tw`rounded-md bg-gray-500 p-2 w-24 items-center justify-center`}
                onPress={() => {
                  navigation.navigate('Profile');
                  setModalVisible(false); 
                }}>
                <Text style={tw`items-center font-bold text-white`}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  
}


export default LogOutModal;