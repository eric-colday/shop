import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Products from "../screens/Products";
import Articles from "../screens/Articles";
import UserStackScreen from "./ UserStackScreen";


const Tab = createMaterialBottomTabNavigator();

function TabStack() {

  const screenOptions = {
    headerShown: false,
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
      activeColor="#e91e63"
      inactiveColor="white"
      barStyle={{ backgroundColor: "#008080" }}
      labelStyle={{ fontSize: 14 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UserStackScreen}
        options={{
          tabBarLabel: "Utilisateurs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: "Produits",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="alpha-p-box"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarLabel: "Articles",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="post" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabStack;
