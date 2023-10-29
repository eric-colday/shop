import React from "react";
import useFetch from "../../hooks/useFetch";
import CategoryItem from "./CategoryItem";
import "./categorie.css"

const CategoriesList = () => {
  const { data, loading } = useFetch("/categories-product");
  return (
    <div className="categories">
      <div className="cont">
        <h2 className="catH2">CATEGORIES</h2>
      </div>
      {loading ? (
        "Loading"
      ) : (
        <div className="wrap"> 
          {data.map((item) => (
            <CategoryItem key={item.id} item={item} /> 
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
