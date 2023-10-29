import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../navigation/AuthContext.js";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, dispatch, logout } = useContext(AuthContext);

  const navigate = useNavigation();


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getProducts();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button title="Logout" onPress={
        () => {
          logout()
        }
      } />
      <ScrollView>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <>
              <View>
                <Image source={item.img} style={{ width: 400, height: 400 }} />
                <Text>{item.title}</Text>
                <Text>{item.desc}</Text>
                <Text>{item.category}</Text>
                <Text>{item.price}€</Text>
                <Text>{user.username}</Text>
                <Button title="Add to cart" onPress={() => alert("Added")} />
              </View>
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
