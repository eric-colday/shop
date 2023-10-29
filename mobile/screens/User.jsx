import React from "react";
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
import TopBar from "../components/TopBar";

const User = () => {
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
            Nouvel utilisateur
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default User