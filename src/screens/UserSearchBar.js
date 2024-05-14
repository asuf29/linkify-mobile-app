import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBarComponent from './../components/SearchBarComponent'; 
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import OtherProfileScreen from './OtherProfileScreen';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'https://linkify-backend-test-94b3648c3afa.herokuapp.com/api';

const UserSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await searchUsers('');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const searchUsers = async (query) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(query);
      const response = await axios.get(`${API_BASE_URL}/profiles/search_user`, {
        headers: { 
          'Authorization': `${token}`
         },
        params: { query: query },
      });
      console.log('Search results:', response.data.data.users);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await searchUsers(query);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBarComponent onSearch={handleSearch} />
      {loading ? (
        <View>
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" />
        </View>
      ) : (
        <View>
          <FlatList
          data={users}
          keyExtractor={(item) => item.username.toString()}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Image
                source={{uri: item.avatar}}
                style={tw`w-10 h-10 mr-4 rounded-full`}
              />
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('OtherProfileScreen', { username: item.username })}>
                  <Text style={tw`text-sm font-bold`}>{item.username}</Text>
                  <Text style={tw`text-gray-700`}>{item.full_name}</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={tw`flex-1 items-end`}>
                <Ionicons name="close" size={20} style={tw`text-gray-500`}/>
              </View> */}
            </View>
          )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default UserSearchBar;
