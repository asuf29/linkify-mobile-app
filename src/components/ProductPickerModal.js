import React, { useEffect, useState } from "react";
import { Modal, View, Text, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from 'react-native-snap-carousel';
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppRegistry, WebView, Linking } from 'react-native';
const ProductPickerModal = ({
  isVisible,
  onClose,
  selectedItemData,
  carouselData,
}) => {
  const { width: viewportWidth } = Dimensions.get('window');
  const [productData, setProductData] = useState(null);

  const iconUrl = (value) => {
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

  useEffect(() => {
    setProductData(selectedItemData)
  });

  const redirectProduct = () => {
    console.log(productData)
    Linking.openURL(productData.url);
}


  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={[tw`p-4 h-1/3 w-full bg-white rounded-t-lg absolute bottom-0`]}>
        <View style={[tw`h-1/6 rounded-t-2xl px-4 flex-row justify-between items-center`]}>
        <Text style={[tw`text-black text-lg`]}></Text>
          <Pressable onPress={onClose}>
            <Icon name="close" color="black" size={22} />
          </Pressable>
        </View>
        {productData ? (
          <View key={1} style={[tw`h-4/6 flex-row p-4`, styles.productContainer]}>
            <View style={[tw`w-5/12`]}>
              <Image
                style={[tw`w-full h-full`, styles.image]}
                resizeMode="contain"
                source={ iconUrl(productData.category_id)}
              />
            </View>
            <View style={[tw`w-7/12 justify-center px-4`]}>
              <Text style={[tw`text-black text-lg font-bold`]}>Name: {productData.name}</Text>
              <Text style={[tw`text-black text-lg`]}>Category: {productData.category_name}</Text>
              <TouchableOpacity 
                  style={tw`flex flex-row  justify-center items-center mt-2 bg-black py-2 rounded w-4/5`} 
                  onPress={() => redirectProduct()}
                >
                  <Text style={tw`text-white text-lg`}>Ürüne Git</Text>
                </TouchableOpacity>

            </View>
          </View>
        ) : null}
        {/* <Carousel
          data={postData}
          renderItem={renderProduct}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 60}
          keyExtractor={(item) => item.id.toString()}
        /> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 10, // Her bir ürünün altına boşluk ekler
  },
  image: {
    borderRadius: 8, // Görüntüye köşe yuvarlaması ekler
  },
});

export default ProductPickerModal;
