const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
    USER:{
        POST_PROFILE: `${API_BASE_URL}/api/v1/User`,
        GET_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        PUT_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        POST_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        PUT_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        GET_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        DELETE_SWIPES: `${API_BASE_URL}/api/v1/User/Swipes`,
        POST_PHOTO_CHANGES: `${API_BASE_URL}/api/v1/user/photos/changes`
    },
    USERS: {
        GET_SWIPE_USERS: `${API_BASE_URL}/api/v1/Users/swipe-users` 
    },
    SWIPE:{
        POST_SWIPE: `${API_BASE_URL}/api/v1/Swipe`
    },
    IMAGE:{
        POST: `${API_BASE_URL}/api/v1/Image`,
    },
    AUTH:{
        REGISTER: `${API_BASE_URL}/api/v1/Auth/Register`,
        LOGIN: `${API_BASE_URL}/api/v1/Auth/Login`,
        LOGOUT: `${API_BASE_URL}/api/v1/Auth/Logout`,
        AUTH_STATUS: `${API_BASE_URL}/api/v1/Auth/auth-status`
    }

};

export default ENDPOINTS;