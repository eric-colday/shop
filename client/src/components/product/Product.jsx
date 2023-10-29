import React from "react";
import { Link } from "react-router-dom";

const Product = ({ item, index }) => {
  return (
    <Link to={`/product/${item._id}`}>
      <div key={index} className="card2">
        <img src={item.img} alt="" className="img2" />
        <div className="cart">
          <div className="productTitle">{item.title}</div>
          <div className="productText">{item.price} €</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
