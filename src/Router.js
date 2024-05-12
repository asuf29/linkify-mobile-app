// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import SplashScreen from './screens/SplashScreen';
import AuthenticationOptionsScreen from './screens/AuthenticationOptionsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SharePostScreen from './screens/SharePostScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UserSearchBar from './screens/UserSearchBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="tab1"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Ionicons
              name="home-outline"
              color="#000000"
              size={30}
              style={tw`flex justify-center items-center h-full mt-4`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tab2"
        component={DiscoverScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Ionicons
              name="search-outline"
              color="#000000"
              size={30}
              style={tw`flex justify-center items-center h-full mt-4`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tab3"
        component={SharePostScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Ionicons
              name="add-circle-outline"
              color="#000000"
              size={35}
              style={tw`flex justify-center items-center h-full mt-2`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tab4"
        component={FavoriteScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Ionicons
              name="heart-outline"
              color="#000000"
              size={30}
              style={tw`flex justify-center items-center h-full mt-4`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tab5"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Ionicons
              name="person-circle-outline"
              color="#000000"
              size={30}
              style={tw`flex justify-center items-center h-full mt-4`}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen"
        headerShown={false}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="AuthenticationOptionsScreen"
          component={AuthenticationOptionsScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen">
          {() => <MainTabNavigator />}
        </Stack.Screen>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="UserSearchBar" component={UserSearchBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
