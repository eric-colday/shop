import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [err, setErr] = useState(false);

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
          console.log(data);
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg"
        >
          <div className="mb-4">
            {loading && "Uploading and compressing the image please wait..."}
            {err && <div className="email-error">{err}</div>}
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Apple Airpods"
              id="title"
              onChange={handleChange}
              className="border border-solid rounded-md  border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              type="text"
              name="desc"
              placeholder="description..."
              id="desc"
              onChange={handleChange}
              required
              className="border border-solid rounded-md border-gray-400 p-2 w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="categories"
            >
              Catégories
            </label>
            <input
              type="text"
              name="categories"
              id="categories"
              onChange={handleCat}
              placeholder="women, coat, jeans"
              className="border border-solid rounded-md border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="size"
            >
              Taille
            </label>
            <input
              type="text"
              name="size"
              id="size"
              onChange={handleSize}
              placeholder="XS, S, M, L, XL, XXL"
              className="border border-solid rounded-md border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="color"
            >
              Couleur
            </label>
            <input
              type="text"
              name="color"
              id="color"
              onChange={handleColor}
              placeholder="white, wlack, red, blue, yellow, green"
              className="border border-solid rounded-md border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="100"
              id="price"
              onChange={handleChange}
              className="border border-solid rounded-md border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="inStock"
            >
              Stock
            </label>
            <select id="inStock" name="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="img"
            >
              Image
            </label>
            <input
              type="file"
              name="img"
              id="img"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="border border-solid rounded-md border-gray-400 p-2 w-full"
            />
          </div>
          <input
            type="submit"
            disabled={loading}
            value="Add Product"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
