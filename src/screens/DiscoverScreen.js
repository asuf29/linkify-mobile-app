import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Navbar from './../components/Navbar';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import UserSearchBar from './UserSearchBar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const iconUrl = (value) => {
  console.log("value", value)
  switch (value) {
    case 1:
      return require("../assets/images/icons/1.png");
    case 2:
      return require("../assets/images/icons/2.png");
    case 3:
      return require("../assets/images/icons/3.png");
    case 4:
      return require("../assets/images/icons/4.png");
    case 5:
      return require("../assets/images/icons/5.png");
    case 6:
      return require("../assets/images/icons/6.png");
    case 7:
      return require("../assets/images/icons/7.png");
    case 8:
      return require("../assets/images/icons/8.png");
    default:
      return require("../assets/images/icons/1.png");
  }
};

function DiscoverScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleCategoryList = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts/category_list', {
          headers: {
            'Authorization': `${token}`
          }
        });
        const { data, code } = response.data;
        if (code === 200) {
          console.log(data);
          setCategoryList(data);
          console.log("aa")
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleCategoryList();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={iconUrl(item.id)} style={styles.icon} />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flex: 1, alignItems: 'center', width: '100%', padding: 10 }}>
          <Navbar />
          <View style={styles.searchBar}> 
            <TouchableOpacity onPress={() => navigation.navigate('UserSearchBar')} style={styles.userSearchBar}>
              <Ionicons name="search-outline" size={20} color="black" style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
          <Text>Discover Screen</Text>
          <FlatList
            data={categoryList}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            contentContainerStyle={styles.categoryList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 70,
    borderBlockColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
  },
  userSearchBar: {
    flex: 1, 
    justifyContent: 'start', 
    marginTop: 2,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderBlockColor: 'black',
    borderWidth: 1,
    height: 100,
    width: 100,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    marginTop: 5,
    alignItems: 'center',
  },
});

export default DiscoverScreen;
