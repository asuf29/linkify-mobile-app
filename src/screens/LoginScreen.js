import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import tw from 'twrnc';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

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
    console.log(errorMessages["email"]);
  };

  const handleSubmit = () => {
    console.log(errorMessageVisible);
    if (isFormValid) {
      navigation.navigate('HomeScreen');
      console.log('Form submitted successfully');
      setErrorMessageVisible(false);
    } else {
      console.log('Form is invalid');
      setErrorMessageVisible(true);
      console.log(errorMessageVisible);
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
        placeholder="Email"
      />
      <View  style={[errorMessageVisible ? styles.visible : styles.hidden]}>
        {Object.values([errorMessages["email"]]).map((errorMessage, index) => (
          <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
            {errorMessage}
          </Text>
        ))}
      </View>
      <TextInput
        style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-2`}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
      />
      <View  style={[errorMessageVisible ? styles.visible : styles.hidden]}>
        {Object.values([errorMessages["password"]]).map((errorMessage, index) => (
          <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
            {errorMessage}
          </Text>
        ))}
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
