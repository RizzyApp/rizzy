const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
    USER:{
        POST_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        GET_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        PUT_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        POST_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        PUT_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        GET_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
    },
    USERS: {
        GET_SWIPE_USERS: `${API_BASE_URL}/api/v1/Users/swipe-users` 
    },
    SWIPE:{
        POST_SWIPE: `${API_BASE_URL}/api/v1/Swipes`,
        DELETE_SWIPES: `${API_BASE_URL}/api/v1/User/Swipes/all`,
    },
    IMAGE:{
        POST_IMAGE: `${API_BASE_URL}/api/v1/Image`,
        POST_IMAGE_CHANGES: `${API_BASE_URL}/api/v1/user/image/changes`
    },
    AUTH:{
        REGISTER: `${API_BASE_URL}/api/v1/Auth/Register`,
        LOGIN: `${API_BASE_URL}/api/v1/Auth/Login`,
        LOGOUT: `${API_BASE_URL}/api/v1/Auth/Logout`,
        AUTH_STATUS: `${API_BASE_URL}/api/v1/Auth/auth-status`
    }

};

export default ENDPOINTS;