import React from "react";
import Contact from "../../components/Contact/Contact";
import Announcement from "../../components/announcement/Announcement";
import CategoriesList from "../../components/categories/CategoriesList";
import Navbar from "../../components/navbar/Navbar";
import ProductList from "../../components/productList/ProductList";
import Slider from "../../components/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Offer from "../../components/offer/Offer";


const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <CategoriesList />   
      <Offer />
      <ProductList />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
