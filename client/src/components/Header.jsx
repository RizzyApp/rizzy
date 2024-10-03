import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-poppins text-white text-3xl font-bold">Rizzy</div>

        <nav className="flex-1 flex justify-center space-x-4">
          <Link to="/register" className="text-white">
            About
          </Link>
          <Link to="/products" className="text-white">
            Products
          </Link>
          <Link to="/contact-us" className="text-white">
            Contact Us
          </Link>
        </nav>

        <div>
          <Link to="/login" className="text-white">
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
