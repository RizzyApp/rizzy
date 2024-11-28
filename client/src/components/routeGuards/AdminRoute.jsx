import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext.jsx";
import { REACT_ROUTES } from "../../constants.js";

const AdminRoute = ({ redirectTo = REACT_ROUTES.LOGIN }) => {
  const { isLoggedIn, userRoles } = useAuth();

  return !userRoles.includes("Admin") ? (
    <Navigate to={redirectTo} />
  ) : (
    <Outlet />
  );
};

export default AdminRoute;
