import {Outlet} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SignalRProvider} from "./components/contexts/SignalRContext.jsx";
import {useAuth} from "./components/contexts/Authcontext.jsx";


function App() {
    const {checkingAuth} = useAuth();

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
        <SignalRProvider>
            <ToastContainer position="top-right"/>
            <Outlet/>
        </SignalRProvider>
    );
}

export default App;
