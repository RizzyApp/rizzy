import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ThemeToggle from "./components/LightDarkToggle";
import HomePage from "./components/HomePage.jsx";

function App() {
  const [count, setCount] = useState(0);

  /* useEffect(() => {
    const getData = async () =>{
      const response = await fetch("/api/v1/users");
      const data = await response.json();
      console.log(data);
    };
    getData();
  }, []);  */

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
