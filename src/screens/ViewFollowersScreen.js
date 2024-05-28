import React  from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


function ViewFollowingScreen(props) {
  const API_BASE_URL = 'https://linkify-backend-test-94b3648c3afa.herokuapp.com/api';
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const prop_params = props.route.params;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        username =  prop_params ? prop_params.username : null
        endpoint = username ? "/profiles/user_followers" : "/profiles/current_followers"
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
          params: {username: username},
          headers: { 
            'Authorization': `${token}`
          },
        });
        console.log('Search results:', response.data.data.followings);
        setUsers(response.data.data.followers);
        return response.data;
      } catch (error) {
        console.error('Error searching users:', error);
        throw error;
      };
    }
    fetchUsers();
  }, []);

  return (
    <View style={tw`flex-1 items-center mt-20`}>
      <Text style={tw`font-bold text-lg mb-4`}>All Followers</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.username.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer} onPress={() => navigation.push('OtherProfileScreen', { username: item.username })}>
            <View style={{flexDirection: 'row',}}>
              <Image
                source={{uri: item.avatar}}
                style={tw`w-10 h-10 mr-4 rounded-full`}
              />
              <View>
                <TouchableOpacity onPress={() => navigation.push('OtherProfileScreen', { username: item.username })}>
                  <Text style={tw`text-sm font-bold`}>{item.username}</Text>
                  <Text style={tw`text-gray-700`}>{item.full_name}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => navigation.push('OtherProfileScreen', { username: item.username })}>
              <Text style={tw`text-white font-bold`}>Profile</Text>
            </TouchableOpacity>
          </View>
        )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  followersContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  userContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingHorizontal: 40
  },
  removeButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
  },
});

export default ViewFollowingScreen;

