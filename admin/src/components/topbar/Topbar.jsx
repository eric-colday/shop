import React, { useContext } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { DarkModeContext } from "../../context/darkModeContext";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import Profil from "../profil/Profil";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);
  const { data, loading } = useFetch("/users/" + user?._id);
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className="topbar"
      style={
        mode === "dark"
          ? { backgroundColor: "#1f1f1f", color: "white" }
          : { backgroundColor: "white", color: "black" }
      }
    >
      <div className="topbarWrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="topLeft">
            <span className="logo">Admin</span>
          </div>
        </Link>
        <div className="topRight">
          <DarkModeToggle />
          {user ? (
            <Profil data={data} />
          ) : (
            <>
              <Link to="/">
                Connectez-vous
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
