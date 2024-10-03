import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-topbarpink w-full flex justify-between items-center text-white drop-shadow-topbar p-4">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-[36px] text-white hover:text-white font-poppins font-semibold mb-0.5 ml-1"
        >
          Rizzy
        </Link>
        <button
          onClick={() => navigate("/about")}
          className="bg-transparent text-white hover:bg-pink-500 px-3 py-2 rounded"
        >
          About
        </button>
        <button
          onClick={() => navigate("/products")}
          className="bg-transparent text-white hover:bg-pink-500 px-3 py-2 rounded"
        >
          Products
        </button>
        <button
          onClick={() => navigate("/contact-us")}
          className="bg-transparent text-white hover:bg-pink-500 px-3 py-2 rounded"
        >
          Contact Us
        </button>
      </div>
      <button
        onClick={() => navigate("/login")}
        className="bg-transparent hover:bg-pink-500 px-3 py-2 rounded"
      >
        Log In
      </button>
    </div>
  );
};

export default Header;
