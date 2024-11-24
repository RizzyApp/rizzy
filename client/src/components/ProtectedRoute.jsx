import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "./contexts/Authcontext.jsx";
import {REACT_ROUTES} from "../constants.js";

const ProtectedRoute = ({redirectTo = REACT_ROUTES.LOGIN}) => {
    const {isLoggedIn, checkingAuth} = useAuth();

    if (checkingAuth) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;