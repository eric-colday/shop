import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import Products from "../../components/products/Products";
import useFetch from "../../hooks/useFetch";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import "./categories.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeContext } from "../../context/ThemeContext";

const Categories = () => {
  const location = useLocation();
  const categories = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const { mode } = useContext(ThemeContext);

  const { loading } = useFetch("/products");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  

  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="cont ">
        <h2 className="catH2">{categories}</h2>
      </div>
      <div className="categorieItems">
        <div className="categorieSelect">
          <h4 className="">Filtrer par:</h4>
          <div className="categorieFilter">
            <Box
              sx={{ minWidth: 120 }}
              style={
                mode === "dark"
                  ? {
                      color: "white",
                    }
                  : {
                      color: "black",
                    }
              }
            >
              <FormControl
                fullWidth
                style={
                  mode === "dark"
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={
                    mode === "dark"
                      ? {
                          color: "white",
                        }
                      : {
                          color: "black",
                        }
                  }
                >
                  Couleur
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="color"
                  id="color"
                  label="Couleur"
                  onChange={handleFilters}
                  style={
                    mode === "dark"
                      ? {
                          color: "white",
                        }
                      : {
                          color: "black",
                        }
                  }
                >
                  <MenuItem value="white">white</MenuItem>
                  <MenuItem value="wlack">wlack</MenuItem>
                  <MenuItem value="red">red</MenuItem>
                  <MenuItem value="blue">blue</MenuItem>
                  <MenuItem value="yellow">yellow</MenuItem>
                  <MenuItem value="yellow">Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{ minWidth: 120 }}
              style={
                mode === "dark"
                  ? {
                      color: "white",
                    }
                  : {
                      color: "black",
                    }
              }
            >
              <FormControl
                fullWidth
                style={
                  mode === "dark"
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={
                    mode === "dark"
                      ? {
                          color: "white",
                        }
                      : {
                          color: "black",
                        }
                  }
                >
                  Taille
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="size"
                  id="size"
                  label="Taille"
                  onChange={handleFilters}
                  style={
                    mode === "dark"
                      ? {
                          color: "white",
                        }
                      : {
                          color: "black",
                        }
                  }
                >
                  <MenuItem value="XS">XS</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="categorieSelect">
          <h4 className="text-lg font-semibold">Trier par :</h4>
          <Box
            sx={{ minWidth: 120 }}
            style={
              mode === "dark"
                ? {
                    color: "white",
                  }
                : {
                    color: "black",
                  }
            }
          >
            <FormControl
              fullWidth
              style={
                mode === "dark"
                  ? {
                      color: "white",
                    }
                  : {
                      color: "black",
                    }
              }
            >
              <InputLabel
                id="demo-simple-select-label"
                style={
                  mode === "dark"
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                Choix
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="sort"
                id="sort"
                label="Choix"
                onChange={(e) => setSort(e.target.value)}
                style={
                  mode === "dark"
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="asc">price (asc)</MenuItem>
                <MenuItem value="desc">price (desc)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {loading ? (
        "Loading"
      ) : (
        <div className="categorieBox">
          <Products cat={categories} filters={filters} sort={sort} />
        </div>
      )}
      <Contact />
      <Footer />
    </div>
  );
};

export default Categories;
