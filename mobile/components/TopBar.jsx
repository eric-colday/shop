import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../navigation/AuthContext.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View
      style={{
        width: 45,
        height: 100,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 200,
      }}
    >
      <MaterialCommunityIcons
        name="logout"
        color="#008080"
        size={26}
        onPress={() => {
          logout();
        }}
      />
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={user.img}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <Text>{user.username}</Text>
      </View>
    </View>
  );
};

export default TopBar;
