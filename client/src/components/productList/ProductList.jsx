import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Product from "../product/Product";
import "./ProductList.css"

const ProductList = ({ cat, filters, sort }) => { 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, loading } = useFetch("/products");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5500/api/products?category=${cat}`
            : "http://localhost:5500/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts(); 
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div>
      <div className="cont">
        <h2 className="catH2">PRODUITS EN VENDETTE</h2>
      </div>
      {loading ? (
        "Loading"
      ) : (
        <div> 
          <div className="wrap2">
            {cat
              ? filteredProducts.map((item) => (
                  <Product item={item} key={item.id} />
                ))
              : products
                  .slice(0, 6)
                  .map((item) => <Product item={item} key={item.id} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
