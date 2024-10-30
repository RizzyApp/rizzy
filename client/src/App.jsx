import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    (async()=>{
      const response = await fetch("/api/v1/Auth/IsLoggedIn")
      setIsLoggedIn(response.ok);
      setCheckingAuth(false);
    })()
  }, []);
  
  if(checkingAuth) {
    return <>AAAAAAAAAAAAAAAAAAAAAA</>
  }

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
