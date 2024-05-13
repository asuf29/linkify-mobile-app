import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, RefreshControl, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import ProfileScreen from './ProfileScreen';
import { useNavigation } from '@react-navigation/native';


const EditProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
          setFullName(data.user.personal_info.full_name);
          setUsername(data.user.personal_info.username);
          setEmail(data.user.personal_info.email);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleUserDatas();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/profiles/update_profile', {
        full_name: fullName,
        username: username,
        email: email,
      }, {
        headers: {
          'Authorization': `${token}`
        }
      });
      const { data, code } = response.data;
      if (code === 200) {
        navigation.navigate('tab5', { screen: 'ProfileScreen' });
      } else {
        Alert.alert('Error', 'Profile could not be updated');
      }
    } catch (error) {
      console.log(error);
    };
  };
  
  return (
    <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={tw`text-2xl font-bold`}>Edit Profile</Text>
      <View>
        {userData ? (
          <Image
            source={{uri: userData.user.personal_info.avatar}}
            style={tw`w-24 h-24 rounded-full`}
          />
        ) : null}
      </View>
      <Text style={tw`font-bold text-sm mt-4 mb-10 text-blue-400`}>Change Picture</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity
        style={tw`bg-gray-900 p-2 rounded-lg mt-2 w-1/2 items-center`}
        onPress={handleSaveProfile}
      >
        <Text style={[tw`text-gray-100 text-center`, styles.button]}>Save</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  button: {
    fontSize: 20,
    fontWeight: '500',
    width: 200,
    height: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default EditProfileScreen;
