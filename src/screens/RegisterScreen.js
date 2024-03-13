import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [registrationError, setRegistrationError] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [fullName, username, email, password, confirmpassword]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasFocusedEmail, setHasFocusedEmail] = useState(false);
  const [hasFocusedPassword, setHasFocusedPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let errors = {};

    if (!fullName && hasFocusedPassword) {
      errors.fullName = "Full Name is required";
    } else {
      errors.fullName = "";
    }

    if ((!email.trim() || !/\S+@\S+\.\S+/.test(email)) && hasFocusedEmail) {
      errors.email = "Email is required";
    } else {
      errors.email = "";
    }

    if (!password && hasFocusedPassword) {
      errors.password = "Password is required";
    } else if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else {
      errors.password = "";
    }

    if (!confirmpassword && hasFocusedPassword) {
      errors.confirmpassword = "Confirm Password is required";
    } else if (confirmpassword !== password) {
      errors.confirmpassword = "Passwords do not match";
    } else {
      errors.confirmpassword = "";
    }

    if (!username && hasFocusedPassword) {
      errors.username = "Username is required";
    } else {
      errors.username = "";
    }

    setErrorMessages(errors);
    setIsFormValid(
      Object.values(errors).every((errorMessage) => errorMessage === "")
    );

    if (Object.values(errors).some((errorMessage) => errorMessage !== "")) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        general: "Please fill in all required fields.",
      }));
      setIsFormValid(false);
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        general: "",
      }));
    }
  };
  const handleRegister = () => {
    if (isFormValid) {
      setErrorMessageVisible(false);

      const data = {
        user: {
          full_name: fullName,
          username: username,
          email: email,
          password: password,
        },
      };

      axios
        .post(
          "https://linkify-backend-test-94b3648c3afa.herokuapp.com/api/auth/registers",
          data
        )
        .then((response) => {
          const code = response.data.code;
          if (code === 200) {
            storedata(response.data.data.token);
            getdata().then((value) => console.log(value));
            navigation.navigate("HomeScreen");
            //save token to local storage
          } else {
            setRegistrationError(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error sending data: ", error);
        });
    } else {
      setErrorMessageVisible(true);
    }
  };

  const storedata = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      return null;
    }
  };

  const getdata = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
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
    navigation.navigate("LoginScreen");
  };

  return (
    <ScrollView>
      <View style={tw`flex p-4 justify-center pt-16`}>
        <View
          style={tw`flex flex-row justify-center items-center w-full h-36 mb-12 bg-black rounded-2xl `}
        >
          <Image
            style={tw`w-24 h-24`}
            source={require("./../assets/images/logo.png")}
          />
          <Text style={tw`text-white text-3xl`}>LINKIFY</Text>
        </View>
        <View style={tw`mb-2`}>
          <Text style={tw`text-gray-500 text-sm`}>Full Name</Text>
          <TextInput
            style={tw`flex-row items-center border-2 border-gray-300 rounded-md h-12 px-4 mb-4 ${
              errorMessages.fullName && hasFocusedPassword ? "mb-0" : "mb-4"
            }`}
            placeholder="Your name and surname"
            autoCapitalize="none"
            value={fullName}
            onChangeText={(text) => setFullname(text)}
          />
        </View>
        {errorMessages.fullName && hasFocusedPassword ? (
          <Text style={[tw`text-red-500 text-sm`, styles.errorMessage]}>
            {errorMessages.fullName || error}
          </Text>
        ) : null}
        <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
          {Object.values([errorMessages["fullName"]]).map(
            (errorMessage, index) => (
              <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
                {errorMessage}
              </Text>
            )
          )}
        </View>
        <View style={tw`mb-2`}>
          <Text style={tw`text-gray-500 text-sm`}>E-mail</Text>
          <TextInput
            style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-4 ${
              (errorMessages.email && hasFocusedEmail) || !email.trim()
                ? "mb-0"
                : "mb-4"
            }`}
            placeholder="E-mail Address"
            autoCapitalize="none"
            value={email}
            onFocus={() => setHasFocusedEmail(true)}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          {(errorMessages.email && hasFocusedEmail) || !email.trim() ? (
            <Text style={[tw`text-red-500 text-sm`, styles.errorMessage]}>
              {errorMessages.email}
            </Text>
          ) : null}
        </View>
        <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
          {Object.values([errorMessages["email"]]).map(
            (errorMessage, index) => (
              <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
                {errorMessage}
              </Text>
            )
          )}
        </View>

        <View style={tw`mb-2`}>
          <Text style={tw`text-gray-500 text-sm`}>Password</Text>
          <View
            style={tw`flex-row items-center border-2 border-gray-300 rounded-md h-12 px-4 mb-4 ${
              errorMessages.password && hasFocusedPassword ? "mb-0" : "mb-4"
            }`}
          >
            <TextInput
              style={tw`flex-1`}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={password}
              onFocus={() => setHasFocusedPassword(true)}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={handleTogglePassword}>
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {errorMessages.password && hasFocusedPassword ? (
            <Text style={[tw`text-red-500 text-sm`, styles.errorMessage]}>
              {errorMessages.password}
            </Text>
          ) : null}
          <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
            {Object.values([errorMessages["password"]]).map(
              (errorMessage, index) => (
                <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
                  {errorMessage}
                </Text>
              )
            )}
          </View>
        </View>
        <View style={tw`mb-2`}>
          <Text style={tw`text-gray-500 text-sm`}>Confirm Password</Text>
          <View
            style={[
              tw`flex-row items-center border-2 border-gray-300 rounded-md h-12 px-4 mb-4, ${
                errorMessages.confirmpassword && hasFocusedPassword
                  ? "mb-0"
                  : "mb-4"
              }`,
            ]}
          >
            <TextInput
              style={[
                tw`flex-1`,
                password !== confirmpassword ? tw`border-red-500` : null,
              ]}
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
              value={confirmpassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity onPress={handleToggleConfirmPassword}>
              <Icon
                name={showConfirmPassword ? "eye-slash" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {errorMessages.confirmpassword ? (
            <Text style={[tw`text-red-500 text-sm`, styles.errorMessage]}>
              {errorMessages.confirmpassword}
            </Text>
          ) : null}
          <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
            {Object.values([errorMessages["confirmpassword"]]).map(
              (errorMessage, index) => (
                <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
                  {errorMessage}
                </Text>
              )
            )}
          </View>
        </View>
        <View style={tw`mb-2`}>
          <Text style={tw`text-gray-500 text-sm`}>Username</Text>
          <TextInput
            style={tw`flex-row items-center border-2 border-gray-300 rounded-md h-12 px-4 mb-4 ${
              errorMessages.username && hasFocusedPassword ? "mb-0" : "mb-4"
            }`}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        {errorMessages.username && hasFocusedPassword ? (
          <Text style={[tw`text-red-500 text-sm`, styles.errorMessage]}>
            {errorMessages.username || error}
          </Text>
        ) : null}
        <View style={[errorMessageVisible ? styles.visible : styles.hidden]}>
          {Object.values([errorMessages["username"]]).map(
            (errorMessage, index) => (
              <Text style={tw`text-red-500 text-sm mb-3`} key={index}>
                {errorMessage}
              </Text>
            )
          )}
        </View>

        <TouchableOpacity
          style={[
            tw`border-2 border-black bg-black text-white rounded-md px-4 py-2 h-12 items-center m-4`,
            isFormValid ? "" : "opacity-50",
          ]}
          onPress={() => handleRegister()}
        >
          <Text style={tw`text-white font-bold text-base`}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.errorMessage}>
          {registrationError ? (
            <Text style={tw`text-red-500 text-lg mb-3`}>
              {registrationError}
            </Text>
          ) : null}
          {Object.values(errorMessages).map((errorMessage, index) => (
            <Text style={tw`text-red-500 text-lg mb-3`} key={index}>
              {errorMessage}
            </Text>
          ))}
        </View>

        <View style={tw`flex flex-row gap-x-2 justify-center items-center m-6`}>
          <Text style={tw`text-gray-400 text-base`}>
            If you already have an account
          </Text>
          <TouchableOpacity style={tw`text-gray-700`} onPress={handlePress}>
            <Text style={tw`text-base`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    display: "none",
  },
  visible: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
});

export default RegisterScreen;
