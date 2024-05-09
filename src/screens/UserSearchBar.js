import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import SearchBar from './../components/SearchBar'; 

const API_BASE_URL = 'https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/profiles/search_user'; 

const UserSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers('');
  }, []);

  const fetchUsers = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users?search=${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    fetchUsers(query);
  };

  return (
    <View style={styles.container}>
      <SearchComponent onSearch={handleSearch} /> {/* Render search component */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text>{item.username}</Text>
              <Text>{item.bio}</Text>
            </View>
          )}
        />
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
