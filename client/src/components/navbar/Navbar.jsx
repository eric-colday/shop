import React, { useContext, useState } from "react";
import "./navbar.css";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const { mode } = useContext(ThemeContext);
  const products = useSelector((state) => state.cart.products);

  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { data, loading } = useFetch("/products");

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearch(true);
    setQuery(e.target.value.toLowerCase());
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div
      className="containerNavbar"
      style={
        mode === "dark"
          ? {
              backgroundColor: " #111",
            }
          : {
              backgroundColor: "white",
            }
      }
    >
      <div className="wrapper">
        <div className="left">
          <div className="language">FR</div>
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Recherche un produit ..."
              className="input"
              style={
                mode === "dark"
                  ? {
                      backgroundColor: " #111",
                    }
                  : {
                      backgroundColor: "white",
                    }
              }
              onChange={handleSearch}
            />
          </div>
          {search && (
            <div
              className="articleBox"
              onClick={() => {
                setSearch(false);
              }}
            >
              {data
                .filter((asd) => asd.title.toLowerCase().includes(query))
                .map((user) => (
                  <div className="listItem" key={user.id}>
                    <Link to={`/product/${user._id}`}>{user.title}</Link>
                  </div>
                ))}
            </div>
          )}
        </div>
        <Link to="/">
          <div className="logo">Nec</div>
        </Link>
        {showLinks ? (
          <div
            onClick={handleShowLinks}
            className={showLinks ? "closeIcon" : "hiddenCloseIcon"}
          >
            <CloseIcon />
          </div>
        ) : (
          <div
            className={showLinks ? "hiddenBurger" : "burger"}
            onClick={handleShowLinks}
          >
            <MenuIcon />
          </div>
        )}
        <div className={showLinks ? "linksContainer" : "navLeft"}>
          <Link to="/">
            <div>Menu</div>
          </Link>
          <Link to="/blog">
            <div>Blog</div>
          </Link>
          <Link to="/">
            <div>Contact</div>
          </Link>
          {user ? ( 
            <>
              <div className="menuItem" onClick={handleLogout}>
                Déconnexion
              </div>
              <Link to="/profil">
                <div className="menuItem">{user.username}</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <div className="menuItem">S'inscire</div>
              </Link>
              <Link to="/login">
                <div className="menuItem">Connexion</div>
              </Link>
            </>
          )}
        </div>
        <div className="right">
          <Link to="/cart">
            <div className="menuItem">
              <Badge
                badgeContent={products.reduce((acc, product) => {
                  return acc + product.quantity;
                }, 0)}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </div>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
