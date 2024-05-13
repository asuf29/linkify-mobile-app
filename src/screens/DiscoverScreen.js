import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Navbar from './../components/Navbar';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import UserSearchBar from './UserSearchBar';

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Navbar />
          <View style={styles.searchBar}> 
            <Button 
              title="Go to Search" 
              onPress={() => navigation.navigate('UserSearchBar')}
            />
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
  },
});

export default DiscoverScreen;
