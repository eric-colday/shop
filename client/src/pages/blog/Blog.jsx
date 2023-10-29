import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import "./blog.css";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/articles" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="blog">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Blog;
