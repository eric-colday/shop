import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from "@mui/icons-material/Publish";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";

export default function Product() {
  const { mode } = useContext(ThemeContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
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
      await axios.put("/products/" + id, {
        ...info,
        img: list,
      });

      navigate("/products");
    } catch (err) {}
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">{product.title}</h1>
        <Link to="/new-product">
          <button className="productAddButton">Créer</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productData}
            dataKey="Sales"
            title="Performance de ventes"
          />
        </div>
        <div
          className="productTopRight"
          style={
            mode === "dark"
              ? { backgroundColor: "#1f1f1f", color: "white" }
              : { backgroundColor: "white", color: "black" }
          }
        >
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Ventes:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">
                {product.active ? "Yes" : "No"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">En stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="productBottom"
        style={
          mode === "dark"
            ? { backgroundColor: "#1f1f1f", color: "white" }
            : { backgroundColor: "white", color: "black" }
        }
      >
        <form className="productForm" onSubmit={handleClick}>
          <div className="productFormLeft">
            <label htmlFor="title">Nom du Produit</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder={product.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="stock">En Stock</label>
            <input
              type="number"
              name="inStock"
              id="inStock"
              onChange={handleChange}
              placeholder={product.inStock}
              required
            />
            <label htmlFor="active">Active</label>
            <select name="active" id="active" onChange={handleChange} required>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={product.img}
                alt={product.title}
                className="productUploadImg"
              />
              <label htmlFor="file">
                <PublishIcon />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                multiple
                onChange={(e) => setFiles(e.target.files)}
                required
              />
            </div>
            <button className="productButton">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  );
}
