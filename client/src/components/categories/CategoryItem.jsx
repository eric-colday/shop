import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ item, index }) => {
  return (
    <Link to={`/products/${item.cat}`} >
      <div className="card" key={index}>
        <img src={item.img?.[0]} alt="" className="img" />
        <div className="cardInfo">
          <p className="cardText">{item.title}</p>
          <button className="cartButton bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
            DECOUVRIR
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
