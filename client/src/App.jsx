import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  const [userToken, setUserToken] = useState(null);

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
      <Outlet context={[userToken, setUserToken]}/>
    </>
  );
}

export default App;
