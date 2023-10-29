import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:5500/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      console.log(res);
      alert("User created successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Register</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          textContentType="text"
          placeholder="username"
          id="username"
          value={username}
          autoComplete
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          textContentType="email"
          placeholder="email"
          id="email"
          autoComplete
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          textContentType="password"
          placeholder="password"
          id="password"
          value={password}
          autoComplete
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button title="Submit" onPress={handleClick} />
          <Text>Already have an account?</Text>
        <TouchableOpacity>
          <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
