import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newUser.css";
import { toast } from "react-toastify";

export default function NewUser() {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
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

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      toast.success("Utilisateur créé avec succès");
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nouvel utilisateur</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            id="file"
            name="file"
            multiple
            required
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </div>
        <div className="newUserItem">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            placeholder="john"
            required
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="fullname">Nom et prenom</label>
          <input
            type="text"
            placeholder="John Smith"
            required
            id="fullName"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            required
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Mot de passe</label>
          <input
            type="password"
            placeholder="password"
            required
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Téléphone</label>
          <input
            type="text"
            placeholder="+33 123 456 78"
            required
            id="phone"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Addresse</label>
          <input
            type="text"
            placeholder="Strasbourg, FRANCE"
            required
            id="address"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Genre</label> 
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="gender"
              value="male"
              required
              onChange={handleChange}
            />
            <label htmlFor="male">Homme</label>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Femme</label>
          </div>
        </div>
        <div className="newUserItem">
          <label htmlFor="active">Active</label>
          <select
            className="newUserSelect"
            name="active"
            id="active"
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label htmlFor="">Admin</label>
          <select
            className="newUserSelect"
            name="admin"
            id="admin"
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Créer</button>
      </form>
    </div>
  );
}
