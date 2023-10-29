import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import "./item.css";

const Item = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({}); // {id: {quantity: 1, color: "red", size: "M"}}
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="item flex pl-4 gap-14">
        <img
          src={product.img}
          alt=""
          className="itemImg w-96 object-cover border-solid border-stone-200"
        />
        <div className="itemInfo"> 
          <h2 className="text-4xl font-light ">{product.title}</h2>
          <p className="text-2xl font-light pt-4 pr-48">{product.desc}</p>
          <p className="text-4xl font-extralight pt-4"> {product.price} €</p>
          <div className="itemCont flex flex-wrap items-center gap-5">
            <p className="text-2xl font-light pt-4">Couleur</p>
            <div className="itemWrap flex  pt-4 gap-4">
              {product.color?.map((c) => (
                <div
                  className="itemColor w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: c,
                    cursor: "pointer",
                    border: color === c ? "2px solid black" : "1px solid black",
                  }}
                  key={c}
                  onClick={() => setColor(c)}
                >
                  {color === c && (
                    <img
                      src="https://img.icons8.com/ios/50/000000/checkmark.png"
                      alt=""
                      className="itemCheckmark w-5 h-5"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="itemSize flex items-center gap-6">
              <h4 className="text-lg font-normal text-center pl-56">Size</h4>
              <select
                name="size"
                className="bg-white rounded-lg shadow-sm py-2 px-3 ml-3"
                onChange={(e) => setSize(e.target.value)}
                required
                defaultValue={"S"}
              >
                {product.size?.map((s) => (
                  <option>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex pt-4 gap-4">
            <button
              className="itemButton"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product._id,
                    title: product.title,
                    img: product.img,
                    price: product.price,
                    quantity,
                    color,
                    size,
                  })
                )
              }
              disabled={!color || !size}
            >
              {product.inStock > 0 ? "Ajouter au panier" : "Rupture de stock"}
            </button>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Item;
