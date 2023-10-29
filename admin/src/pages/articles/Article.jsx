import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import PublishIcon from '@mui/icons-material/Publish';

const Article = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/articles/find/" + id);  
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
      await axios.put("/articles/" + id, {
        ...info,
        img: list,
      });

      navigate("/articles");  
    } catch (err) {}
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">{product.title}</h1>
        <Link to="/new-article">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
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
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">
                {product.active ? "Yes" : "No"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleClick}>
          <div className="productFormLeft">
            <label htmlFor="title">Product Name</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder={product.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="stock">In Stock</label>
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
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Article

