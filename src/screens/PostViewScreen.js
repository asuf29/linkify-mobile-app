import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Navbar from "./../components/Navbar";
import ProductPickerModal from "../components/ProductPickerModal"; // Doğru bileşeni içe aktarın
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const windowDimensions = Dimensions.get("window");
const numVisibleImages = 3;
const imageSize = windowDimensions.width / numVisibleImages;

const PostViewScreen = (props) => {
  const [iconColor, setIconColor] = useState({});
  const [carouselData, setCarouselData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState([]); // JSON verisini tutmak için state
  const [token, setToken] = useState(null);
  const [postUrl, setPostUrl] = useState("");
  const [favoritePosts, setFavoritePosts] = useState([]);
  const navigation = useNavigation();

  const openModal = (product) => {
    setSelectedItemId(product);
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setSelectedItemId(null); // Modal kapandığında seçili öğeyi sıfırla
  };

  useEffect(() => {
    const initialIconColors = {};
    postData.forEach((data) => {
      initialIconColors[data.id] = data.favorite_by_user ? "red" :"black";
    });
    setIconColor(initialIconColors);

    // carouselData'ya veri ataması
    setCarouselData([
      { id: "1", image: require("../assets/home-screen/bag.jpg") },
      { id: "2", image: require("../assets/home-screen/belt.jpg") },
      { id: "3", image: require("../assets/home-screen/blazer.jpg") },
      { id: "4", image: require("../assets/home-screen/earring.jpg") },
      { id: "5", image: require("../assets/home-screen/skirt.jpg") },
    ]);
  }, [postData]);

  const iconUrl = (value) => {
    console.log("value", value);
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
        return null;
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      data = props.route.params.postData;
      setPostData([data]);
    };
    fetchPostData();
  }, []);

  const handlePress = async (itemId) => {
    const newIconColors = { ...iconColor };
    newIconColors[itemId] = newIconColors[itemId] === "black" ? "red" : "black";
    setIconColor(newIconColors);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts/favorite_post",
        { post_id: itemId },
        {
          headers: {
            'Authorization': `${token}`,
          },
        }

      );
      const { data, code } = response;
      if (code === 200) {
        setFavoritePosts(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    }

  const embedPostUrl = (url) => {
    if (!url) return "";
    return url.split("?")[0];
  };

  const renderPostView = (url) => {
    if (!url) return null;
    return (
      <View style={styles.webViewContainer}>
        <WebView
          source={{ html: `<iframe width='1000' height='1000' src='${embedPostUrl(url)}' frameborder='0'></iframe>` }}
          style={styles.webView}
        />
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%',height: '100%'}}></View>
      </View>
    );
  };

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item.id)}>
      <View style={{ width: imageSize, height: imageSize }}>
        <Image
          style={tw`flex-1  w-full h-full aspect-ratio: 1 rounded-lg`}
          resizeMode="contain"
          source={iconUrl(item.id)}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <ScrollView>
      <View key={item.id} style={tw`px-2`}>
        <TouchableOpacity style={tw`flex-row p-2 items-center`} onPress={() => navigation.navigate('OtherProfileScreen', { username: item.user.username })}>
          <View style={tw`w-1/12`}>
            {item.user.avatar ? (
              <Image
                source={{ uri: item.user.avatar }}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            ) : (
              <Icon name="user-circle" size={30} color="black" />
            )}
          </View>

          <View style={[tw`w-11/12`, { paddingLeft: 10 }]}>
            <Text style={tw`text-xl`}>{item.user.username}</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex-row relative`}>
          {renderPostView(item.url)}
          <TouchableOpacity
            onPress={() => handlePress(item.id)}
            style={tw`absolute bottom-0 right-0`}
          >
            <Icon
              name="heart"
              size={30}
              color={iconColor[item.id] || (item.favorite_by_user ? "red" : "black")}
              style={tw`p-2`}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex mt-2`}>
          <Carousel
            layout="default"
            data={item.products} // Her post'un products listesini kullanın
            sliderWidth={windowDimensions.width}
            itemWidth={imageSize}
            activeSlideAlignment="start" 
            renderItem={({ item: product }) => (
              <TouchableOpacity onPress={() => openModal(product)}>
                <View style={{ width: imageSize, height: imageSize }}>
                  <Image
                    style={tw`flex-1 ml-2 w-25 h-full aspect-ratio: 1 rounded-lg`}
                    resizeMode="contain"
                    source={iconUrl(product.category_id)}
                  />
                  {/* <Text style={tw`text-center`}>{product.name}</Text> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={[tw`flex-1 justify-center pt-14`]}>
      <Navbar />
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <ProductPickerModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        selectedItemData={selectedItemId}
        carouselData={postData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  webViewContainer: {
    height: 400,
    width: "100%",
  },
  webView: {
    flex: 1,
  }
});

export default PostViewScreen;
