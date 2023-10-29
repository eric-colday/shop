import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || null,
};

const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        darkMode: null,
      };
    }
    case "DARK": {
      return {
        darkMode: true,
      };
    }
    case "TOGGLE": {
      return {
        darkMode: !state.darkMode,
      };
    }
    default:
      return state;
  }
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider> 
  );
};
