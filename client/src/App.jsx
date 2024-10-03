import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

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
