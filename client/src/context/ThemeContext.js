"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    try {
      setMode((prev) => (prev === "dark" ? "light" : "dark"));
      localStorage.setItem(
        "theme",
        mode === "dark" ? JSON.stringify("light") : JSON.stringify("dark")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isToggle =  () => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme) {
        setMode(JSON.parse(theme));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isToggle();
  }, []);

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
