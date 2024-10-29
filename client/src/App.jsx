import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [userToken, setUserToken] = useState(null);
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
        context={([userToken, setUserToken], [isLoggedIn, setIsLoggedIn])}
      />
    </>
  );
}

export default App;
