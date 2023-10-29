import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { toast } from "react-toastify";

export default function User() {
  const { mode } = useContext(ThemeContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [user, setUser] = useState({});
  const [file, setFile] = useState("");
  const [update, setUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/" + id);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id]);

  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzer4ijr1/image/upload",
        data
      );
      const { url } = uploadRes.data;

      await axios.put("/users/" + id, {
        ...update,
        img: url,
      });
      toast.success("Utilisateur mis à jour avec succès");
      navigate("/users");
    } catch (err) {}
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">{user.username}</h1>
        <Link to="/new-user">
          <button className="userAddButton">Créer</button>
        </Link>
      </div>
      <div className="userContainer">
        <div
          className="userShow"
          style={
            mode === "dark"
              ? { backgroundColor: "#1f1f1f", color: "white" }
              : { backgroundColor: "white", color: "black" }
          }
        >
          <div className="userShowTop">
            <img src={user.img} alt={user.username} className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Détails du compte</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Détails du contact</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div
          className="userUpdate"
          style={
            mode === "dark"
              ? { backgroundColor: "#1f1f1f", color: "white" }
              : { backgroundColor: "white", color: "black" }
          }
        >
          <span className="userUpdateTitle">Modifier</span>
          <form className="userUpdateForm" onSubmit={handleUpdate}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={user.username}
                  defaultValue={user.username}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Nom et prénom</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder={user.fullName}
                  defaultValue={user.fullName}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={user.email}
                  defaultValue={user.email}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Téléphone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder={user.phone}
                  defaultValue={user.phone}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Addresse</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder={user.address}
                  defaultValue={user.address}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="admin">Admin</label>
                <select
                  name="isAdmin"
                  id="isAdmin"
                  defaultValue={user.isAdmin}
                  onChange={handleChange}
                >
                  <option value="true" onChange={handleChange}>
                    true
                  </option>
                  <option value="false" onChange={handleChange}>
                    false
                  </option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={file ? URL.createObjectURL(file) : user.img}
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  defaultValue={user.img}
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
              <button className="userUpdateButton">Mettre à jour</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
