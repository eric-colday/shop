import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      // appeler l'API de connexion ici
      const res = await axios.post("/auth/login", credentials);
      // si la connexion réussit, dispatch({ type: "LOGIN_SUCCESS", payload: user })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      //rediriger à la page d'accueil
      navigate("/");
    } catch (err) {
      // sinon, dispatch({ type: "LOGIN_FAILURE", payload: error })
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="username"
              type="text"
              id="username"
              required
              className="loginInput" 
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              type="password"
              required
              id="password"
              minLength="6"
              className="loginInput"
              onChange={handleChange}
            />
            <button className="loginButton" type="submit" disabled={loading}>
              {loading ? (
                <HourglassBottomIcon color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {loading ? (
                <HourglassBottomIcon color="white" size="20px" />
              ) : (
                <Link to="/register">
                  <p style={{ color: "#fff" }}>Create an account!</p>
                </Link>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
