import {createContext, useContext, useState, useEffect} from 'react';
import {API_ENDPOINTS, REACT_ROUTES} from "../../constants.js";
import fetchWithCredentials from "../../utils/fetchWithCredentials.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserId, setIsLoggedInUserId] = useState(true);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const fetchAuthStatus = async () => {
        try {
            const response = await fetchWithCredentials(API_ENDPOINTS.AUTH.AUTH_STATUS);
            if (response.ok) {
                setIsLoggedIn(true);
                const data = await response.json();
                setIsLoggedInUserId(data.userId);
            }
            setIsLoggedIn(response.ok);
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setCheckingAuth(false);
        }
    };

    const login = async (email, password) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        };
        const response = await fetchWithCredentials(API_ENDPOINTS.AUTH.LOGIN, requestOptions);
        if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            setIsLoggedInUserId(data.userId);
            setCheckingAuth(false);
        }
        return response;
    }

    const clearLoginDetails = () => {
        setIsLoggedIn(false);
        setIsLoggedInUserId(null);
    }

    const logOut = async () => {
        try {
            const response = await fetchWithCredentials(API_ENDPOINTS.AUTH.LOGOUT, {method: "POST"});
            clearLoginDetails();

        } catch (err) {
            console.error('Error logOut:', err);
        }
    }

    const register = async (email, password) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        };
        const response = await fetchWithCredentials(API_ENDPOINTS.AUTH.REGISTER, requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
        return response;
    }

    const registerUserProfile = async (registerFormData) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerFormData),
        };

        const response = await fetchWithCredentials(API_ENDPOINTS.USER.POST_PROFILE, requestOptions);
        if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
        }
        return response;
    }

    const postUserLocation = async (locationData) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(locationData)
        }

        const response = await fetchWithCredentials(API_ENDPOINTS.USER.POST_LOCATION, requestOptions);
        if(!response.ok) {
            console.error("error posting location");
        }
        return response;
    }

    useEffect(() => {
        fetchAuthStatus();
    }, []);

    return (
        <AuthContext.Provider
            value={{checkingAuth, loggedInUserId, isLoggedIn, login, logOut, register, registerUserProfile, clearLoginDetails, postUserLocation}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};