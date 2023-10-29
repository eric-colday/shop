import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Profil.css";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

const Profil = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    try {
      const res = await axios.put(`/users/${user._id}`, {
        username,
        email,
      });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
      navigate("/");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleFileChange = (e) => {
    const value = e.target.files[0];
    console.log(value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user._id}`);
      dispatch({ type: "DELETE_SUCCESS" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "DELETE_FAILURE" });
    }
  };
  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="profil">
        <div className="profilBox">
          <div className="text-lg font-medium text-gray-900 px-4 py-2">
            Update Your Account
          </div>
          <form className="profilInputs" onSubmit={handleSubmit}>
            <div className="profilInputs">
              <label
                htmlFor="fileInput"
                className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <AccountCircleIcon />
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="profilInput">
              <div className="profilLabel">
                <label
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  required
                  id="username"
                  name="username"
                  placeholder={user.username}
                  className="border rounded-md px-3 py-2 w-full mt-1 text-gray-700"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="profilLabel">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  placeholder={user.email}
                  className="border rounded-md px-3 py-2 w-full mt-1 text-gray-700"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="itemButton">
              Update
            </button>
            {success && (
              <span className="block text-green-500 text-center mt-4">
                Profile has been updated...
              </span>
            )}
          </form>
          <div className="bg-gray-100 px-4 py-2 flex justify-end">
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer",
                transition: "all .1s ease-in-out",
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Profil;
