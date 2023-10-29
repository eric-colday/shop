import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_START":
      return {
        user: state.user,
        loading: true,
        error: null,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        loading: false,
        error: true,
      };
    case "DELETE_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "DELETE_FAILURE":
      return {
        user: state.user,
        loading: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);  

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider 
      value={{
        user: state.user,
        loading: state.loading, 
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
