import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Svg, Image as SvgImage } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const DropdownComponent = ({ addProduct }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [isProductBoxVisible, setProductBoxVisibility] = useState(false);

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const options = [
    { label: 'Tops', value: 'Tops', icon: 'iconTops'},
    { label: 'Dresses', value: 'Dresses', icon: 'iconDresses' },
    { label: 'Jackets', value: 'Jackets', icon: 'iconJackets' },
    { label: 'Skirts', value: 'Skirts', icon: 'iconSkirts' },
    { label: 'Jeans', value: 'Jeans', icon: 'iconJeans' },
    { label: 'Shoes', value: 'Shoes', icon: 'iconShoes' },
    { label: 'Accessories', value: 'Accessories', icon: 'iconAccessories' },
    { label: 'Bags', value: 'Bags', icon: 'iconBags' },
  ];

  useEffect(() => {
    const selectedOption = options.find(option => option.value === selectedValue);
    setSelectedIcon(selectedOption ? selectedOption.icon : null);
  }, [selectedValue]);
  
  const handleAddProductBox = () => {
    setProductBoxVisibility(true);
  }

  const handleProductName = (text) => {
    setProductName(text);
  }

  const handleProductUrl = (text) => {
    setProductUrl(text);
  }

  const handleAddProduct = () => {
    const newProduct = { 
      icon: selectedIcon,
      name: productName,
      url: productUrl
    };
    addProduct(newProduct);
    setProductName('');
    setProductUrl('');
    setSelectedValue(null);
    setProductBoxVisibility(false);
  }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View>
        <TextInput 
          style={styles.postUrlArea}
          placeholder="Post Url"
          autoCapitalize="none"
        />
      </View> */}
      {/* <View style={styles.title}>
        <Text>Your Products</Text>
        <TouchableOpacity onPress={handleAddProductBox}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>  */}
      {isProductBoxVisible && 
        <View>
          <View style={styles.selectContainer}>
            {selectedIcon && 
            <Svg width={50} height={50} >
              <SvgImage
                width={50}
                height={50}
                style={styles.icon}
                href={selectedIcon} 
              />
            </Svg>
            }
            <RNPickerSelect
              placeholder={placeholder}
              items={options}
              onValueChange={(value) => setSelectedValue(value)}
              value={selectedValue}
              style={styles.pickerSelect}
            />
          </View>
          {selectedValue && <Text>Selected: {selectedValue}</Text>} 
          <View style={styles.productBox}>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              autoCapitalize="none"
              value={productName}
              onChangeText={handleProductName}
            />
          </View>  
          <View style={styles.productBox}>
            <TextInput
              style={styles.input}
              placeholder="Product Url"
              autoCapitalize="none"
              value={productUrl}
              onChangeText={handleProductUrl}
            />
          </View>  
          <View>
            <TouchableOpacity onPress={handleAddProduct} style={styles.addButton} >
              <Text>Add Product</Text>
            </TouchableOpacity>
          </View>
        </View> 
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  postUrlArea: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 100,
    marginTop: 30,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 4,
    fontSize: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    height: 50,
  },
  icon: {
    marginRight: 10,
    backgroundColor: 'black',
    padding: 12,
  },
  pickerSelect: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productBox: {
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default DropdownComponent;