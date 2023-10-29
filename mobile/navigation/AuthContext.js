import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    setLoading(true);
    axios
      .post("http://localhost:5500/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        AsyncStorage.setItem("user", JSON.stringify(res.data)); 
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    setUser(null);
    AsyncStorage.removeItem("user");
    setLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setLoading(true);
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);

      if (user) {
        setUser(user);
      }
      
      setLoading(false);
    } catch (error) {
      console.log(`problème 1${error}`); 
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


