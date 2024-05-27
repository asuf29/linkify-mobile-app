import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Navbar from './../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc";
import { WebView } from 'react-native-webview';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FavoriteScreen() {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [error, setError] = useState(null);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 32) / 3;

  useEffect(() => { 
    const fetchFavoritePosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setError("Token bulunamadı");
          return;
        }

        const response = await axios.get(
          "https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts/favorited_posts",
          {
            headers: {
              'Authorization': `${token}`,
            },
          }
        );

        const { data, code } = response.data;
        if (code === 200) {
          setFavoritePosts(data);
        } else {
          setError(data.message || "Bilinmeyen bir hata oluştu");
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };

    fetchFavoritePosts();
  } , []);

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
    <SafeAreaView style={styles.container}>
       <Text style={[tw`w-full items-center justify-center border-b border-gray-300`,styles.postTitle]}> Favorite Posts</Text>
      <Navbar />
     
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.postContainer}>
              
          {favoritePosts.map((item, index) => (
            <View key={index} style={[styles.postItem, { width: itemWidth, marginLeft: index % 4 === 0 ? 0 : 4 }]}>

              <View style={tw`flex-row relative`}>
                {renderPostView(item.url)}
              </View>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  postItem: {
    width: '25%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 8,
  },
  postTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 120,
    paddingTop: 50,
  
  },
  webViewContainer: {
    height: 140,  // Bu değeri ihtiyacınıza göre ayarlayın
    width: '100%',  // Genişliği ekranın tamamı olacak şekilde ayarlayın
  },
  webView: {
    flex: 1,
  },
});

export default FavoriteScreen;
