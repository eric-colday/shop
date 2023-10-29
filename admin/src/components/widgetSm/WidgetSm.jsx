import "./widgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("users/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);
  return (
    <div
      className="widgetSm"
      style={
        mode === "dark"
          ? { backgroundColor: "#1f1f1f", color: "white" }
          : { backgroundColor: "white", color: "black" }
      }
    >
      <span className="widgetSmTitle">Nouveaux membres</span>
      {users.map((user) => (
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={
              user.img ||
              "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            }
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Display
          </button>
        </li>
      ))}
    </div>
  );
}
