import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabStack from "./TabStack";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";


const Stack = createNativeStackNavigator();

function MyStack() {
  const { user, loading } = useContext(AuthContext);

    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <>
      {user ? (
        <TabStack />
      ) : (
        <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

export default MyStack;
