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
import Login from "./components/Login.jsx";
import Register from './components/Register.jsx';
import Profile from "./pages/ProfilePage.jsx";
import RegisterData from "./pages/RegisterData.jsx";
import ChatPage from "./pages/ChatPage.jsx";


const router = createBrowserRouter([
    {
        path: "/", element: <App/>, children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/swipe-page",
                element: <SwipePage/>,
            },
            {
                path: "/contact-us",
                element: <ContactUsPage/>,
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
            {
                path: "/products",
                element: <ProductsPage/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            },
            {
                path: "/register/data",
                element: <RegisterData/>,
            },
            {
                path: "/chat",
                element: <ChatPage/>
            }
        ]
    }
]);


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
