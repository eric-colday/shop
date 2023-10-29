import React from "react";
import { NavLink } from "react-router-dom";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import "./NotFound.css"

const NotFound = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="notfound">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <NavLink to="/">
          <button type="submit" className="itemButton">
            Back to homepage
          </button>
        </NavLink>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default NotFound;
