import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext);
  
  const { data, loading } = useFetch("/users/" + user?._id);  

  const navigate = useNavigate();

  const handleLogout = async () => {};

  return (
    <nav className="bg-gray-800 p-6 flex items-center justify-between ">
      <Link to="/" className="text-white font-medium">
        My App
      </Link>
      <div className="flex items-center px-20">  
        <Link to="/admin" className="text-white font-medium mr-4">
          Dashboard
        </Link>
        {user ? data.username :
        <>
        <Link to="/se-connecter" className="text-white font-medium mr-4">
          Se connecter
        </Link>
        </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
