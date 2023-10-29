import "./App.css";
import Home from "./pages/home/Home.jsx";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./App.css";
import "./style/dark.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import NotFound from "./pages/notFound/NotFound.jsx"
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {user} = useContext(AuthContext); 

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element= {user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> :<Register />} />
          <Route path="/messenger" element={<Messenger/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
