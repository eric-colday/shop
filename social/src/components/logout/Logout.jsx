import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <span className="menuItem" onClick={handleLogout}>
      <LogoutIcon />
    </span>
  );
};

export default Logout;
