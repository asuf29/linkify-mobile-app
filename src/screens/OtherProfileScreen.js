import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import tw from 'twrnc';
import Navbar from './../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function OtherProfileScreen(props) {
  const navigation = useNavigation();
  const username = props.route.params.username;
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleOtherProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/profiles/user', {
          headers: { 
            'Authorization': `${token}`
            },
            params: { username: username },
        });
        if( response.data.code === 200) {
          console.log(response.data.data.user.personal_info);
          setUserData(response.data);
        }
        else {
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    handleOtherProfile();
  }, []);
 

  const handleFollow = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/profiles/follow_user', {
      username: username
    }, {
      headers: {
        'Authorization': `${token}`
      }
    });
    console.log(response.data);
    if(response.data.code === 200) {
      console.log(response.data);
    }
    if (isFollowed) {
      userData.data.user.followers -= 1;
    } else {
      userData.data.user.followers += 1;
    }
    setIsFollowed(prevState => !prevState);

  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.mainBioContainer}>
        <StatusBar style="auto" />
        {userData ? (
          <View>
            <Text style={tw`items-center text-lg font-bold`}>{userData.data.user.personal_info.username}</Text>
          </View>
        ) : null}
        </View>
        <View style={tw`flex-row items-center mb-2`}>
            <View>
              {userData ? (
              <Image
                source={{uri: userData.data.user.personal_info.avatar}}
                style={tw`w-24 h-24 mr-8 rounded-full`}
              />
            ) : null}
            </View>
            <View style={tw`flex-row mx-8`}>
            {userData ? (
              <View style={tw`items-center mr-10`}>
                <Text style={tw`text-lg font-bold`}>{userData.data.user.followers}</Text>
                <Text style={tw`text-sm font-medium`}>followers</Text>
              </View>
            ) : null}
            {userData ? (
              <View style={tw`items-center`}>
                <Text style={tw`text-lg font-bold`}>{userData.data.user.followings}</Text>
                <Text style={tw`text-sm font-medium`}>following</Text>
              </View>
            ) : null}
          </View>
          </View>
        <View style={styles.bioContainer}>
            {userData ? (
            <View>
                <Text style={styles.bioContainerText}>{userData.data.user.personal_info.full_name}</Text>
            </View>
            ) : null}
        </View>
        <View style={styles.followButtonContainer}>
          <TouchableOpacity onPress={handleFollow} style={styles.followButton}>
            <Text style={styles.followButtonText}>{isFollowed ? 'unfollow' : 'follow'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  mainBioContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  bioContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
  },
  bioContainerText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  followButtonContainer: {
    width: '100%',
    height: 50,
  },
  followButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    width: '100%',
  },
  followButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});


export default OtherProfileScreen;