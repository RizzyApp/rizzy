import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.body.setAttribute("class", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <label className="theme-toggle">
      <input type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
      <div className="sun"></div>
      <div className="moon"></div>
    </label>
  );
};

export default ThemeToggle;
