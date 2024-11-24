export const SWIPE_CARD_ASPECT_RATIO_CLASSNAME = "aspect-[4/5]";
export const SWIPE_CARD_ASPECT_RATIO = 4 / 5;

export const UPLOAD_MAX_IMAGE_NUMBER = 6;
export const UPLOAD_MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB
export const UPLOAD_MAX_WIDTH = 1920;
export const UPLOAD_MAX_HEIGHT = 1080;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    USER:{
        POST_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        GET_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        PUT_PROFILE: `${API_BASE_URL}/api/v1/User/profile`,
        POST_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        PUT_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
        GET_LOCATION: `${API_BASE_URL}/api/v1/User/Location`,
    },
    USERS: {
        GET_SWIPE_USERS: `${API_BASE_URL}/api/v1/Users/swipe-users` ,
        GET_MATCHED_MINIMAL_USERS: `${API_BASE_URL}/api/v1/Users/matches`,
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
        AUTH_STATUS: `${API_BASE_URL}/api/v1/Auth/logged-in-user`
    },
    MESSAGES: {
        GET_MESSAGES_GROUPED_BY_SENDER: `${API_BASE_URL}/api/v1/message/by-sender`,
    },
    LIVE:{
        NOTIFICATIONS: `${API_BASE_URL}/api/notificationHub`,
        CHAT: `${API_BASE_URL}/api/chatHub`,
    }
};

export const REACT_ROUTES = {
    HOME: "/",
    SWIPE_PAGE: "/swipe-page",
    CONTACT_US: "/contact-us",
    ABOUT: "/about",
    PRODUCTS: "/products",
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: "/profile",
    REGISTER_DATA: "/register/data",
    CHAT: "/chat",
}