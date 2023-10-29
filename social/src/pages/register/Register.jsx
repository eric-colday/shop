import React, { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      res.data && window.location.replace("/login");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
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
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="loginDisplay">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
