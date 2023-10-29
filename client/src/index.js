import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <Provider store={store}>
          <PersistGate loading={"loading"} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
