import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SignalRProvider} from './components/contexts/SignalRContext.jsx';
import {useAuth} from './components/contexts/Authcontext.jsx';
import Loading from './components/Loading.jsx';

function App() {
    const {checkingAuth} = useAuth();

    if (checkingAuth) {
        return (
            <div
                className="flex flex-col font-poppins bg-custom-gradient h-screen overflow-hidden w-screen justify-center items-center">
                <Loading/>
            </div>
        );
    }

    return (
        <SignalRProvider>
            <ToastContainer position="top-right"/>
            <Outlet/>
        </SignalRProvider>
    );
}

export default App;
