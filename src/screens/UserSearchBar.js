import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBarComponent from './../components/SearchBarComponent'; 
import tw from 'twrnc';

const API_BASE_URL = 'https://linkify-backend-test-94b3648c3afa.herokuapp.com/api';

const UserSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />
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
                style={tw`w-24 h-24 mr-8 rounded-full`}
              />
              <Text>{item.username}</Text>
              <Text>{item.full_name}</Text>
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
  },
});

export default UserSearchBar;
