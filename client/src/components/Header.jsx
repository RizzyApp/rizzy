import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logoLight from "../assets/rizzylogo.png";
import logoDark from "../assets/logo-white.png";

const Header = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  const handleThemeChange = (isDark) => {
    setIsDarkMode(isDark);
  };

  return (
    <div className="bg-topbar w-full flex justify-between items-center text-white drop-shadow-topbar p-4 overflow-hidden">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="logo-container inline-flex gap-2 text-[44px] text-white font-poppins font-semibold mb-0.5 ml-1"
        >
          <img src={logoDark} className="logo h-[50px] mt-2" />
          Rizzy
        </Link>
        <button
          onClick={() => navigate("/about")}
          className="bg-transparent text-white hover:bg-buttonHover px-3 py-2 rounded"
        >
          About
        </button>
        <button
          onClick={() => navigate("/products")}
          className="bg-transparent text-white hover:bg-buttonHover px-3 py-2 rounded"
        >
          Products
        </button>
        <button
          onClick={() => navigate("/contact-us")}
          className="bg-transparent text-white hover:bg-buttonHover px-3 py-2 rounded"
        >
          Contact Us
        </button>
      </div>
      <div className="switchLoginContainer flex justify-center">
        {isLoggedIn ? (
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="bg-transparent hover:bg-buttonHover px-3 py-2 rounded"
          >
            Profile
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-transparent hover:bg-buttonHover px-3 py-2 rounded"
          >
            Login
          </button>
        )}
        <ThemeToggle onThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};

export default Header;
