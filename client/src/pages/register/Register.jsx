import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Announcement from "../../components/announcement/Announcement";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Register.css"
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
    <div>
      <Navbar />
      <Announcement />
      <div className="register">
        <div className="registerBox">
          <div className="registerInputs">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="itemButton"
            >
              Register
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
        <Link
          to="/login"
          className="absolute top-32 right-20 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
