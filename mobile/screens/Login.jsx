import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthContext.js";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Image
          source={require("../assets/onboarding-img1.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.textInput}
          // textContentType="text"
          placeholder="username"
          id="username"
          value={username}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.textInput}
          // textContentType="password"
          placeholder="password"
          id="password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Button
            color="white"
            title="Se connecter"
            onPress={() => {
              login(username, password);
              navigation.navigate("Home");
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00989e",
  },

  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },

  textInput: {
    width: 350,
    height: 50,
    fontSize: 16,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  button: {
    width: 250,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#008080",
    borderColor: "#008080",
    borderWidth: 1,
    justifyContent: "center",
  },
});

export default Login;
