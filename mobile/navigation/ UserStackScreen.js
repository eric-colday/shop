import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsUser from "../screens/NewsUser.jsx";
import Users from "../screens/Users";

const UserStack = createNativeStackNavigator();

function UserStackScreen() {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <UserStack.Navigator initialRouteName="Users" screenOptions={screenOptions}>
      <UserStack.Screen name="Users" component={Users} />
      <UserStack.Screen name="NewsUser" component={NewsUser} />
    </UserStack.Navigator>
  );
}

export default UserStackScreen;
