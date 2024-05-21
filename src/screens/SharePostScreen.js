import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import Navbar from './../components/Navbar';
import { RefreshControl } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import HomeScreen from './HomeScreen';
import { useNavigation } from '@react-navigation/native';

function SharePostScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [options, setCategoryList] = useState([]);
  const [postUrl, setPostUrl] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts/category_list', {
          headers: { 
            'Authorization': `${token}`
           }
        });
        const { data, code } = response.data;
        if (code === 200) {
          console.log(data)
          console.log(data[0].name)
          maped_data = data.map((item) => {
            return {
              label: item.name,
              value: item.id,
              icon: item.id,
            };
          });
          console.log(maped_data)
          setCategoryList(maped_data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryList();
  }, []);

  const DropdownArea = ({ onAddProduct }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [productName, setProductName] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [isProductBoxVisible, setProductBoxVisibility] = useState(false);
    const placeholder = {
      label: 'Select an option...',
      value: null,
    };


    useEffect(() => {
      const selectedOption = options.find(option => option.value === selectedValue);
      setSelectedIcon(selectedValue ? iconUrl(selectedValue) : null);
      handleProductCategory(selectedValue)
    }, [selectedValue]);

    const handleAddProductBox = () => {
      setProductBoxVisibility(!isProductBoxVisible);
    }
  
    const handleProductName = (text) => {
      setProductName(text);
    }
  
    const handleProductUrl = (text) => {
      setProductUrl(text);
    }

    const handleProductCategory = (text) => {
      setProductCategory(text);
    }
  
    const handleAddProduct = () => {
      const newProduct = {
        icon: selectedIcon,
        name: productName,
        url: productUrl,
        category_id: productCategory,
      };
      onAddProduct(newProduct);
      setProductName('');
      setProductUrl('');
      setProductCategory('');
      setSelectedValue(null);
      setProductBoxVisibility(false);
    };

    const iconUrl = (value) => {
      console.log("value", value)
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

    return (
      <View style={styles.dropdownContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.d_titleContainer}>
            <Text style={tw`flex justify-between text-base font-bold mr-40`}>Your Products</Text>
            <TouchableOpacity onPress={handleAddProductBox}>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View> 
          {isProductBoxVisible && 
            <View style={{ justifyContent: 'center'}}>
              <View style={styles.selectContainer}>
                {selectedValue && 
                  <Image
                    style={tw`w-6 h-6`}
                    source={selectedIcon}
                  />
                }
                <RNPickerSelect
                  placeholder={placeholder}
                  items={options}
                  onValueChange={(value) => setSelectedValue(value)}
                  value={selectedValue}
                  style={styles.pickerSelect}
                />
              </View>
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
                  <Text style={tw`text-white text-base`}>Add Product</Text>
                </TouchableOpacity>
              </View>
            </View> 
          }
        </ScrollView>
      </View>
    );
  };

  const ProductList = ({ products }) => {
    const [isProductListVisible, setProductListVisibility] = useState(true);

    // const handleSharePost = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem('token');
    //     const response = await axios.post('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts', {

    //     }, {
    //       headers: {
    //         'Authorization': `${token}`
    //       }
    //     });
    //     const { data, code } = response.data;
    //     if (code === 200) {
    //       console.log(data)
    //     } else {
    //       console.log(data);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const handleDeleteProduct = (index) => {
      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    };
    
    return (
      <View>
        <FlatList
          data={products}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.productItem}>
                <Image
                  style={tw`w-10 h-10 items-center`}
                  source={item.icon}
                />
                <View style={tw`justify-items-center`}>
                  <Text><Text style={tw`font-bold`}>Name: </Text>{item.name}</Text>
                  <Text><Text style={tw`font-bold`}>URL: </Text>{item.url}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => handleDeleteProduct(index)}>
                    <Ionicons name="trash" size={22} color="black" style={tw`items-center mt-2`}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
          {/* <View>
            <TouchableOpacity onPress={handleSharePost} style={styles.addButton} >
              <Text style={tw`text-white text-base`}>Share Post</Text>
            </TouchableOpacity>
          </View>   */}
      
      </View>
    );
  };
  
  const renderPostView = () => {
    const [isProductBoxVisible, setProductBoxVisibility] = useState(false);

    const handlePostLoad = () => {
      setProductBoxVisibility(true); 
    };
  
    const embedPostUrl = (url) => {
      console.log("url", url)
      const baseUrl = url.split('?')[0];
      const embedUrl = baseUrl.endsWith('/') ? baseUrl + 'embed/' : baseUrl + '/embed/';
      return embedUrl;
    };

    const handleSharePost = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log("products", products)
        const response = await axios.post('https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/posts', {
          url: embedPostUrl(postUrl),
          products: products
        }, {
          headers: {
            'Authorization': `${token}`
          }
        });
        const { data, code } = response.data;
        if (code === 200) {
          console.log(response.data)
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return postUrl ? (
      <View style={styles.render_container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>New Post</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.postUrlArea}
            placeholder="Post URL"
            autoCapitalize="none"
            onChangeText={(text) => setPostUrl(text)}
          />
        </View>
        <View style={styles.webViewContainer}>
          <WebView
            source={{ html: `<iframe width='1000' height='1000' src='${embedPostUrl(postUrl)}' frameborder='0'></iframe>` }}
            style={styles.webView}
            onLoad={handlePostLoad}
          />
        </View>
          <TouchableOpacity onPress={handleSharePost} style={styles.addButton} >
            <Text style={tw`text-white text-base`}>Share Post</Text>
          </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.render_container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>New Post</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.postUrlArea}
            placeholder="Post URL"
            autoCapitalize="none"
            onChangeText={(text) => setPostUrl(text)}
          />
        </View>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Navbar />
          <View style={styles.renderContainer}>
            {renderPostView()}
          </View>
          <DropdownArea onAddProduct={handleAddProduct}/>
          <ProductList products={products} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  dropdownContainer: {
    justifyContent: 'center',
  },
  d_titleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    color: 'white',
  },
  renderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 5,
  },
  postUrlArea: {
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  webViewContainer: {
    height: 300,
    width: 300,
    marginBottom: 20,
    marginTop: 10,
  },
  webView: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  p_title: {
    fontWeight: 'bold',
    marginTop: 10,
  }
});

export default SharePostScreen;
