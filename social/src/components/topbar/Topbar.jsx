import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../logout/Logout";
import { io } from "socket.io-client";

export default function Topbar() {
  const PF = "http://localhost:5500/images/";
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NecSocial</span>
        </Link>
      </div>
      <div>
        <DarkModeOutlinedIcon
          className="icon"
          onClick={() => dispatch({ type: "TOGGLE" })}
        />
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger">
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">2</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </div>
        </Link>
        <Logout />
      </div>
    </div>
  );
}
