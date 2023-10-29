import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

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
      <div className="loginContainer">
        <div className="loginContent">
          <div className=" loginBox">
            <div className="loginInputs ">
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                disabled={loading}
                onClick={handleClick}
                className="itemButton"
              >
                Login
              </button>
              {error && <span>{error.message}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
