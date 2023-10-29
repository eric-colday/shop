import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profil = ({ data }) => {
  const { dispatch } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="navprofile">
      <img src={data.img} alt={data.username} className="topAvatar" />
      <LogoutIcon style={{ color: "#008080" }} onClick={handleLogout} />
    </div>
  );
};

export default Profil;
