import { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS, REACT_ROUTES } from "../../constants.js";
import fetchWithCredentials from "../../utils/fetchWithCredentials.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setIsLoggedInUserId] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userRoles, setUserRoles] = useState([]);

  const fetchAuthStatus = async () => {
    try {
      const response = await fetchWithCredentials(
        API_ENDPOINTS.AUTH.AUTH_STATUS
      );
      if (response.ok) {
        setIsLoggedIn(true);
        const data = await response.json();
        setIsLoggedInUserId(data.userId);
      }
      if (!response.ok) {
        clearLoginDetails();
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setCheckingAuth(false);
    }
  };

  const login = async (email, password) => {
    let arr = [];
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetchWithCredentials(
      API_ENDPOINTS.AUTH.LOGIN,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
      setIsLoggedInUserId(data.userId);
      setUserRoles(data.roles || []);
      console.log("data", data);
      setCheckingAuth(false);
      arr = [response, data];
    } else {
      arr.push(response);
    }
    return arr;
  };

  const clearLoginDetails = () => {
    setIsLoggedIn(false);
    setIsLoggedInUserId(null);
    setUserRoles([]);
  };

  const logOut = async () => {
    try {
      const response = await fetchWithCredentials(API_ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
      });
      clearLoginDetails();
    } catch (err) {
      console.error("Error logOut:", err);
    }
  };

  const register = async (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetchWithCredentials(
      API_ENDPOINTS.AUTH.REGISTER,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    return response;
  };

  const registerUserProfile = async (registerFormData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerFormData),
    };

    const response = await fetchWithCredentials(
      API_ENDPOINTS.USER.POST_PROFILE,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
    }
    return response;
  };

  const postUserLocation = async (locationData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locationData),
    };

    const response = await fetchWithCredentials(
      API_ENDPOINTS.USER.POST_LOCATION,
      requestOptions
    );
    if(response.status === 401){
      clearLoginDetails();
    }
    if (!response.ok) {
      console.error("error posting location");
    }
   
    return response;
  };

  const updateUserLocation = async (locationData) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locationData),
    };

    const response = await fetchWithCredentials(
      API_ENDPOINTS.LOCATION.PUT,
      requestOptions
    );
    console.log(response);
    if (!response.ok) {
      console.error("error updating location");
    }
    return response;
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        checkingAuth,
        loggedInUserId,
        isLoggedIn,
        userRoles,
        login,
        logOut,
        register,
        registerUserProfile,
        clearLoginDetails,
        postUserLocation,
        updateUserLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
