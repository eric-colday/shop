import React from "react";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import Login from "../src/pages/login/Login";
import NewProduct from "./pages/newProduct/NewProduct";
import Topbar from "./components/topbar/Topbar.jsx";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import Sidebar from "./components/sidebar/Sidebar";
import Article from "./pages/articles/Article.jsx";
import "./App.css";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import ArticleList from "./pages/articleList/ArticleList";
import Write from "./pages/newarticle/Write";
import Single from "./pages/single/Single";

function App() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" exact element={user ? <Home /> : <Login />} />
            <Route path="/users" element={user ? <UserList /> : <Login />} />
            <Route path="/user/:userId" element={user ? <User /> : <Login />} />
            <Route path="/new-user" element={user ? <NewUser /> : <Login />} />
            <Route
              path="/products"
              element={user ? <ProductList /> : <Login />}
            />
            <Route
              path="/product/:productId"
              element={user ? <Product /> : <Login />}
            />
            <Route
              path="/new-product"
              element={user ? <NewProduct /> : <Login />}
            />{" "}
            <Route path="/articles" element={user ? <ArticleList /> : <Login />} />
            <Route path="/article/:articleId" element={user ? <Single /> : <Login />} />
            <Route path="/write" element={user ? <Write /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
