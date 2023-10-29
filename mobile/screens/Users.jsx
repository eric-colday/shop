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


const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/users");
        setUsers(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getUsers();
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
            Users
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
              title="Créer"
              onPress={() => navigation.navigate('NewsUser')}
            />
          </View>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <>
              <View style={styles.container}>
                <Image source={item.img} style={{ width: 100, height: 100 }} />
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
                    {item.username}
                  </Text>
                  <Text>{item.email}</Text>
                  <Text>{item.isAdmin ? "Admin" : "Utilisateur"}</Text>
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
                        onPress={() => navigation.navigate('User',{
                          id: item.id,
                          username: item.username,
                          email: item.email,
                          isAdmin: item.isAdmin,
                          img: item.img,
                        })}
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

export default Users;
