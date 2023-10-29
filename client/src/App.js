import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Cart from './pages/cart/Cart';
import Categories from './pages/categories/Categories';
import Home from './pages/home/Home';
import Item from './pages/item/Item';
import Login from './pages/login/Login';
import Profil from './pages/profil/Profil';
import Register from './pages/register/Register';
import Success from './pages/success/Success';
import Pay from './pages/pay/Pay'; 
import NotFound from './pages/notFound/NotFound.jsx';
import Blog from './pages/blog/Blog';
import Single from './pages/single/Single';
import Write from './pages/write/Write';

function App() {

  const {user} = useContext(AuthContext); 

  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" exact element={ <Home />} />
        <Route path="/products/:category" element={<Categories />} />
        <Route path="/product/:id" element={<Item />} />
        <Route path="/cart" element={user ? <Cart /> : <Login/> } />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/profil" element={ <Profil />} />
        <Route path="/blog" element={ <Blog />} />
        <Route path="/article/:articleId" element={ <Single />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
