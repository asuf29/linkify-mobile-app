import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isValid = await verifyToken();

        if (isValid) {
          navigation.navigate('HomeScreen');
        } else {
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.log('Token verify error:', error);
        navigation.navigate('LoginScreen');
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    } else {
      errors.email = '';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else {
      errors.password = '';
    }

    setErrorMessages(errors);
    setIsFormValid(
      Object.values(errors).every((errorMessage) => errorMessage === '')
    );
  };

  const handleSubmit = () => {
    if (isFormValid) {
      setErrorMessageVisible(false);
      const data = {
        email: email,
        password: password,
      };

      axios
        .post(
          'https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/auth/sessions',
          data
        )
        .then((response) => {
          const code = response.data.code;
          if (code === 200) {
            storeData(response.data.data.token);
            getData().then((value) => console.log(value));
            navigation.navigate('HomeScreen');
            //save token to local storage
          } else {
            Alert.alert('Error', response.data.message);
          }
        })
        .catch((error) => {
          console.error('Error sending data: ', error);
        });
    } else {
      setErrorMessageVisible(true);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      return null;
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  };

  const handlePress = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={tw`flex p-4 justify-center pt-16`}>
      <View
        style={tw`flex flex-row justify-center items-center w-full h-36 mb-12 bg-black rounded-2xl `}
      >
        <Image
          style={tw`w-24 h-24`}
          source={require('./../assets/images/logo.png')}
        />
        <Text style={tw`text-white text-3xl`}>LINKIFY</Text>
      </View>
      <TextInput
        style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-2`}
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        placeholder="Email"
      />
      <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
        {Object.values([errorMessages['email']]).map((errorMessage, index) => (
          <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
            {errorMessage}
          </Text>
        ))}
      </View>
      <TextInput
        style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-2`}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize="none"
        placeholder="Password"
      />
      <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
        {Object.values([errorMessages['password']]).map(
          (errorMessage, index) => (
            <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
              {errorMessage}
            </Text>
          )
        )}
      </View>
      <TouchableOpacity
        style={[
          tw`border-2 border-black bg-black text-white rounded-md px-4 py-2 h-12 items-center`,
          isFormValid ? '' : 'opacity-50',
        ]}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white font-bold text-base`}>Submit</Text>
      </TouchableOpacity>
      <View style={tw`flex flex-row gap-x-2 justify-center items-center mt-6`}>
        <Text style={tw`text-gray-400 text-base`}>Don't Have Account?</Text>
        <TouchableOpacity style={tw`text-gray-700`} onPress={handlePress}>
          <Text style={tw`text-base`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    display: 'none',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});
export default LoginScreen;
