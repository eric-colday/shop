import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TopBar from "../components/TopBar";

const Products = () => {
  const [products, setProducts] = useState([]);
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
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Products
          </Text>
          <View
            style={{
              backgroundColor: "teal",
              borderRadius: 10,
              width: 100,
            }}
          >
            <Button
              color="#fff"
              title="Create"
              onPress={() => alert("Added")}
            />
          </View>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <>
              <View style={styles.container}>
                <Image
                  source={
                    item.img
                      ? item.img
                      : {
                          uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
                        }
                  }
                  style={{ width: 100, height: 100 }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text>Stock : {item.inStock}</Text>
                  <Text 
                    style={{
                      color: item.inStock > 0 ? "green" : "red",
                    }}
                  >
                    {" "}
                    Status : {item.inStock > 0 ? "En stock" : "En rupture de stock"}
                  </Text>
                  <Text>Price : {item.price} €</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View style={styles.buttonEdit}>
                      <Button
                        color="#fff"
                        title="Edit"
                        onPress={() => alert("Added")}
                      />
                    </View>
                    <MaterialCommunityIcons
                      name="delete"
                      color="red"
                      size={50}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    width: 400,
    height: 200,
    marginBottom: 20,
  },
  buttonEdit: {
    backgroundColor: "#3bb077",
    borderRadius: 10,
    color: "#fff",
    width: 100,
    height: 40,
  },
});

export default Products;
