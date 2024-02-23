import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";

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

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [fullName, username, email, password, confirmpassword]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    } else {
      errors.email = "";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else {
      errors.password = "";
    }

    if (!confirmpassword) {
      errors.confirmpassword = "Confirm Password is required";
    } else if (confirmpassword !== password) {
      errors.confirmpassword = "Passwords do not match";
    } else {
      errors.confirmpassword = "";
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
    const isValid = validateForm();

    if (isValid) {
      console.log("Full Name:", fullName);
      console.log("E-mail:", email);
      console.log("Password:", password);
      console.log("ConfirmPassword:", confirmpassword);
      console.log("Username:", username);
      console.log("Registration successful!");
    } else {
      console.log("Registration failed. Please check the form.");
    }
  };

  const handlePress = () => {
    navigation.navigate("LoginScreen");
  };

  return (
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
          style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-4`}
          placeholder="Your name and surname"
          value={fullName}
          onChangeText={(text) => setFullname(text)}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`text-gray-500 text-sm`}>E-mail</Text>
        <TextInput
          style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-4`}
          placeholder="E-mail Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={tw`mb-2`}>
        <Text style={tw`text-gray-500 text-sm`}>Password</Text>
        <View
          style={tw`flex-row items-center border-2 border-gray-300 rounded-md h-12 px-4 mb-4`}
        >
          <TextInput
            style={tw`flex-1`}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
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
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`text-gray-500 text-sm`}>Confirm Password</Text>
        <View
          style={[
            tw`flex-row items-center border-2 border-gray-300 rounded-md h-12 px-4 mb-4`,
            password !== confirmpassword ? tw`border-red-500` : null,
          ]}
        >
          <TextInput
            style={[
              tw`flex-1`,
              password !== confirmpassword ? tw`border-red-500` : null,
            ]}
            placeholder="Confirm Password"
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
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`text-gray-500 text-sm`}>Username</Text>
        <TextInput
          style={tw`border-2 border-gray-300 rounded-md h-12 px-4 mb-4`}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <TouchableOpacity
        style={[
          tw`border-2 border-black bg-black text-white rounded-md px-4 py-2 h-12 items-center`,
          isFormValid ? "" : "opacity-50",
        ]}
        disabled={!isFormValid}
        onPress={handleRegister}
      >
        <Text style={tw`text-white font-bold text-base`}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.errorMessage}>
        {Object.values(errorMessages).map((errorMessage, index) => (
          <Text style={tw`text-red-500 text-lg mb-3`} key={index}>
            {errorMessage}
          </Text>
        ))}
      </View>

      <View style={tw`flex flex-row gap-x-2 justify-center items-center mt-6`}>
        <Text style={tw`text-gray-400 text-base`}>
          If you already have an account
        </Text>
        <TouchableOpacity style={tw`text-gray-700`} onPress={handlePress}>
          <Text style={tw`text-base`}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    display: "none",
  },
});

export default RegisterScreen;
