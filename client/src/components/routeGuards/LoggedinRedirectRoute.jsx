import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/Authcontext.jsx";
import {REACT_ROUTES} from "../../constants.js";

const LoggedInRedirectRoute = ({redirectTo = REACT_ROUTES.SWIPE_PAGE}) => {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? <Navigate to={redirectTo}/> : <Outlet/>
};

export default LoggedInRedirectRoute;