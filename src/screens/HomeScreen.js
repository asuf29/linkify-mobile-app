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
import ProductPicker from "../components/ProductPickerModal";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";

const windowDimensions = Dimensions.get("window");
const numVisibleImages = 3;
const imageSize = windowDimensions.width / numVisibleImages;

const profileData = [
  {
    id: "1",
    username: "damlakasal1",
    image: require("../assets/home-screen/outfit.jpg"),
  },
  {
    id: "2",
    username: "damlakasal2",
    image: require("../assets/home-screen/outfit.jpg"),
  },
  {
    id: "3",
    username: "damlakasal3",
    image: require("../assets/home-screen/outfit.jpg"),
  },
  {
    id: "4",
    username: "damlakasal4",
    image: require("../assets/home-screen/outfit.jpg"),
  },
  {
    id: "5",
    username: "damlakasal5",
    image: require("../assets/home-screen/outfit.jpg"),
  },
];

const HomeScreen = () => {
  const [iconColor, setIconColor] = useState({});

  const [carouselData, setCarouselData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Seçilen öğenin ID'sini tutan state'i oluştur

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const imageWidth = windowDimensions.width;
  const imageHeight = imageWidth;

  const handlePress = (itemId) => {
    const newIconColors = { ...iconColor };
    newIconColors[itemId] = newIconColors[itemId] === "black" ? "red" : "black";
    setIconColor(newIconColors);
  };

  useEffect(() => {
    const initialIconColors = {};
    profileData.forEach((data) => {
      initialIconColors[data.id] = "black";
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
  }, []);
  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item.id)}>
      <View style={{ width: imageSize, height: imageSize }}>
        <Image
          style={tw`flex-1  w-full h-full aspect-ratio: 1 rounded-lg`}
          resizeMode="contain"
          source={item.image}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <ScrollView>
      <View key={item.id}>
        <View style={tw`flex-row p-2 items-center`}>
          <View style={tw`w-1/12`}>
            <Icon name="user-circle" size={30} color="black" />
          </View>
          <View style={[tw`w-11/12`, { paddingLeft: 10 }]}>
            <Text style={tw`text-xl font-bold`}>{item.username}</Text>
          </View>
        </View>
        <View style={tw`flex-row relative`}>
          <Image
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
            source={item.image}
          />
          <TouchableOpacity
            onPress={() => handlePress(item.id)}
            style={tw`absolute bottom-0 right-0`}
          >
            <Icon
              name="heart"
              size={30}
              color={iconColor[item.id] || "black"}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex mt-2`}>
          <Carousel
            layout="default"
            data={carouselData}
            sliderWidth={windowDimensions.width}
            itemWidth={imageSize}
            renderItem={renderCarouselItem}
          />
          <ProductPicker
            isVisible={isModalVisible}
            onClose={onModalClose}
            selectedItemId={selectedItemId}
            carouselData={carouselData}
          />
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={[tw`flex-1 justify-center pt-14`]}>
      <Navbar />
      <FlatList
        data={profileData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
