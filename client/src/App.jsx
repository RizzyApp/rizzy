import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Outlet
        context={([isLoggedIn, setIsLoggedIn])}
      />
    </>
  );
}

export default App;
