import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import SwipePage from "./pages/SwipePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from './pages/RegisterPage.jsx';
import Profile from "./pages/ProfilePage.jsx";
import RegisterData from "./pages/RegisterData.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import {AuthProvider} from "./components/contexts/Authcontext.jsx";
import {REACT_ROUTES} from "./constants.js";
import ProtectedRoute from "./components/routeGuards/ProtectedRoute.jsx";
import LoggedInRedirectRoute from "./components/routeGuards/LoggedinRedirectRoute.jsx";


const router = createBrowserRouter([
    {
        path: REACT_ROUTES.HOME,
        element: <App/>,
        children: [
            {
                path: REACT_ROUTES.HOME,
                element: <LoggedInRedirectRoute/>,
                children: [
                    {
                        path: REACT_ROUTES.HOME,
                        element: <HomePage/>
                    }
                ],
            },
            {
                path: REACT_ROUTES.CONTACT_US,
                element: <ContactUsPage/>,
            },
            {
                path: REACT_ROUTES.ABOUT,
                element: <AboutPage/>,
            },
            {
                path: REACT_ROUTES.PRODUCTS,
                element: <ProductsPage/>,
            },
            {
                path: REACT_ROUTES.LOGIN,
                element: <LoginPage/>,
            },
            {
                path: REACT_ROUTES.REGISTER,
                element: <Register/>,
            },
            {
                path: REACT_ROUTES.REGISTER_DATA,
                element: <RegisterData/>,
            },
            {
                path: "",
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: REACT_ROUTES.PROFILE,
                        element: <Profile/>,
                    },
                    {
                        path: REACT_ROUTES.CHAT,
                        element: <ChatPage/>,
                    },
                    {
                        path: REACT_ROUTES.SWIPE_PAGE,
                        element: <SwipePage/>,
                    },
                ],
            },
        ],
    },
]);


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </StrictMode>
);
