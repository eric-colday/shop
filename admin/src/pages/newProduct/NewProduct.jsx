import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";

export default function NewProduct() {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzer4ijr1/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newproduct = {
        ...info,
        categories: cat,
        size: size,
        color: color,
        img: list,
      };

      await axios.post("/products", newproduct);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nouveau Produit</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div>
          <div className="addProductItem">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              required
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="title">Titre</label>
            <input
              name="title"
              placeholder="Apple Airpods"
              id="title"
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              placeholder="description... "
              name="desc"
              id="desc"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="addProductItem">
            <label htmlFor="categories">Catégories</label>
            <input
              type="text"
              placeholder="women, coat, jeans"
              name="categories"
              id="categories"
              onChange={handleCat}
              required
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              placeholder="XS, S, M, L, XL, XXL"
              name="size"
              id="size"
              onChange={handleSize}
              required
            />
          </div>
        </div>
        <div>
          <div className="addProductItem">
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="white, wlack, red, blue, yellow, green"
              onChange={handleColor}
              required
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="100"
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="inStock">Stock</label>
            <input
              type="text"
              name="inStock"
              id="inStock"
              placeholder="123"
              required
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="active">Active</label>
            <select name="active" id="active" onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button className="addProductButton">Créer</button>
        </div>
      </form>
    </div>
  );
}
