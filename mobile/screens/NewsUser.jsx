import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TopBar from "../components/TopBar";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const NewsUser = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    // const data = new FormData();
    // data.append("file", image);
    // data.append("upload_preset", "upload");

    // const result = await ImagePicker.launchImageLibraryAsync();
    // setImage(result);
    // const data = new FormData();

    // data.append("upload_preset", {
    //   uri:
    //     Platform.OS === "android"
    //       ? image.uri
    //       : image.uri.replace("file://", "upload"),
    //   name: "tata.jpeg",
    //   type: "image/jpeg",
    // });

    try {
      // const uploadRes = await fetch(
      //   "https://api.cloudinary.com/v1_1/dxkufsejm/image/upload",
      //   {
      //     method: "post",
      //     body: data,
      //     headers: { "Content-Type": "multipart/form-data;" },
      //   }
      // );

      // const { url } = uploadRes.data;

      const newUser = {
        username,
        fullName,
        email,
        password,
        phone,
        address,
        // image: url,
      };
      const res = await axios.post(
        "http://localhost:5500/api/auth/register",
        newUser
      );
      setUsername("");
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      console.log(res);
      alert("User created successfully");
      navigation.navigate("Users");
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TopBar />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "teal",
              borderRadius: 10,
              width: 100,
              marginRight: 45,
            }}
          >
            <Button
              color="#fff"
              title="< Retour"
              onPress={() => navigation.navigate("Users")}
            />
          </View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Nouvel utilisateur
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            gap: 5,
          }}
        >
          <Text style={styles.text}>Image</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: 100,
                marginRight: 45,
              }}
              // onPress={pickImage}
            >
              <Image
                source={require("../assets/cloud-computing.png")}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  position: "relative",
                  left: 0,
                }}
              />
            )}
          </View>
          <Text style={styles.text}>Nom d'utilisateur</Text>
          <TextInput
            style={styles.textInput}
            textContentType="text"
            placeholder="john"
            id="username"
            value={username}
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.text}>Nom et prenom</Text>
          <TextInput
            style={styles.textInput}
            // textContentType="text"
            placeholder="John Smith"
            id="fullName"
            value={fullName}
            autoCapitalize="none"
            onChangeText={(text) => setFullName(text)}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            // textContentType="text"
            placeholder="john@gmail.com"
            id="email"
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput
            style={styles.textInput}
            // textContentType="text"
            placeholder="Mot de passe"
            id="password"
            value={password}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.text}>Téléphone</Text>
          <TextInput
            style={styles.textInput}
            // textContentType="text"
            placeholder="+33 123 456 78"
            id="phone"
            value={phone}
            autoCapitalize="none"
            onChangeText={(text) => setPhone(text)}
          />
          <Text style={styles.text}>Addresse</Text>
          <TextInput
            style={styles.textInput}
            // textContentType="text"
            placeholder="Strasbourg, FRANCE"
            id="address"
            value={address}
            autoCapitalize="none"
            onChangeText={(text) => setAddress(text)}
          />
          <TouchableOpacity style={styles.button}>
            <Button
              color="white"
              title="Se connecter"
              onPress={() => handleSubmit()}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: 15,
    color: "#757575",
    fontWeight: "bold",
    marginBottom: 5,
  },

  textInput: {
    width: 400,
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
    width: 400,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#008080",
    borderColor: "#008080",
    borderWidth: 1,
    justifyContent: "center",
  },
});

export default NewsUser;
