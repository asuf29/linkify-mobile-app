import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar from './../components/Navbar';
import tw from 'twrnc';
import LoginScreen from './LoginScreen';
import EditProfileScreen from './EditProfileScreen';
import LogOutModal from '../components/LogOutModal';
import CustomDrawerContent from '../components/CustomDrawerContent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

function Feed({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const windowWidth = Dimensions.get('window').width;
  // const itemWidth = (windowWidth - 32) / 3;

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
          console.log(data);
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

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts/current_posts', {
          headers: {
            'Authorization': `${token}`
          }
        });
        const { data, code } = response.data;
        if (code === 200) {
          setUserPosts(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
  }, []);

  const embedPostUrl = (url) => {
    if (!url) return "";
    return url.split("?")[0];
  };

  const renderPostView = (url) => {
    if (!url) return null;
    return (
      <View style={styles.webViewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: `<iframe width='500' height='600' src='${embedPostUrl(url)}' frameborder='0'></iframe>` }}
          style={styles.webView}
        />
      </View>
    );
  };

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
              <Text style={tw`text-start text-xl font-bold ml-4`}>{userData.user.personal_info.username}</Text>
            </View>
          ) : null}
          <View style={styles.hamburgerMenu}>
            <CustomDrawerContent />
          </View>
        </View>
        <View style={tw`flex-row items-center mb-2`}>
          <View>
            {userData ? (
              <Image
                source={{ uri: userData.user.personal_info.avatar }}
                style={tw`w-24 h-24 mr-8 rounded-full`}
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
        <View style={styles.bioContainer}>
          {userData ? (
            <View>
              <Text style={styles.bioContainerText}>{userData.user.personal_info.full_name}</Text>
            </View>
          ) : null}
        </View>
        <View style={tw`flex flex-row`}>
          <TouchableOpacity
            style={[tw`bg-gray-900 mr-10 rounded-md p-2`, styles.button]}
            onPress={handleEditProfile}
          >
            <Text style={[tw`text-white text-sm text-center`]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`bg-gray-900 mr-10 rounded-md p-2`, styles.button]}
            onPress={() => { }}
          >
            <Text style={[tw`text-white text-sm text-center`]}>Share Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
        {userPosts.map((item, index) => (
          <View key={index} style={styles.postItem}>
             <View style={tw`flex flex-row mb-2`}>
              {renderPostView(item.url)}
            </View>
          </View>
        ))}
        </View>
      </ScrollView>
    </View>
  );
}

function LogOut({ navigation }) {
  return (
    <View>
      <LogOutModal navigation={navigation} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
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
    paddingTop: 70,
  },
  mainBioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  bioContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  bioContainerText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  postContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postItem: {
    width: 120,
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 4,
    marginVertical: 2,
  },
  webViewContainer: {
    height: 120,
    width: '100%',
  },
  webView: {
    flex: 1,
  },
});

export default ProfileScreen;
