import React from "react";
import { Modal, View, Text, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import adaptiveicon from "../assets/images/adaptive-icon.png";
const ProductPickerModal = ({
  isVisible,
  onClose,
  selectedItemId,
  carouselData,
}) => {
  // Seçilen öğenin verisini al
  const selectedItem = carouselData.find((item) => item.id === selectedItemId);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={[tw`p-4 h-1/3 w-full bg-white rounded-t-lg absolute bottom-0`]}
      >
        <View
          style={[
            tw`h-1/6 rounded-t-2xl px-4 flex-row justify-between items-center`,
          ]}
        >
          <Text style={[tw`text-black text-lg`]}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <Icon name="close" color="black" size={22} />
          </Pressable>
        </View>
        <View style={[tw`h-4/6 flex-row`]}>
          <View style={[tw`w-5/12`]}>
            <Image style={[tw`w-full h-full`]} source={adaptiveicon} />
          </View>
          <View style={[tw`w-7/12 justify-center`]}>
            <Text style={[tw`text-black text-lg`]}>Sample Text 1</Text>
            <Text style={[tw`text-black text-lg`]}>Sample Text 2</Text>
            {selectedItemId !== null && (
              <Text style={[tw`text-black text-lg`]}>
                Selected Item ID: {selectedItem.id},
              </Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductPickerModal;
