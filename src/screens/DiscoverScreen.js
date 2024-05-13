import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Navbar from './../components/Navbar';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import UserSearchBar from './UserSearchBar';
import { Ionicons } from '@expo/vector-icons';

function DiscoverScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
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
            <TouchableOpacity onPress={() => navigation.navigate('UserSearchBar')} style={{ flex: 1, justifyContent: 'start', marginTop: 2}}>
              <Ionicons name="search-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text>Discover Screen</Text>
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
    marginBottom: 20,
    height: 30,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 70,
  },
});

export default DiscoverScreen;
