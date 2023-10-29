import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./navigation/AuthContext";
// import TabStack from "./navigation/TabStack";
import MyStack from "./navigation/MyStack";

export default function App() {
 
  return (
    <NavigationContainer>
      <AuthProvider>
        <MyStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
