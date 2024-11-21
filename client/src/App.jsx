import {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import ENDPOINTS from "./endpoints.js";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch(ENDPOINTS.AUTH.AUTH_STATUS)
            setIsLoggedIn(response.ok);
            setCheckingAuth(false);
        })()
    }, []);

    if (checkingAuth) {
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
        <div>
            <ToastContainer position="top-right" />
            <Outlet context={([isLoggedIn, setIsLoggedIn])}/>
        </div>
    );
}

export default App;
