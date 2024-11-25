import {useNavigate} from 'react-router-dom';
import {useAuth} from "../components/contexts/Authcontext.jsx";
import fetchWithCredentials from '../utils/fetchWithCredentials';
import {REACT_ROUTES} from "../constants.js"; // Update path accordingly

/**
 * Custom hook to provide a fetch utility that handles authentication errors automatically.
 *
 * This hook wraps the `fetchWithCredentials` utility and injects an `onUnauthorized` handler.
 * If a 401 (Unauthorized) status is detected, the user's login status is cleared, and they are
 * redirected to the `LOGIN` route.
 *
 * @returns {Function} - A function to perform authenticated fetch requests.
 *    - @param {string} route - The endpoint URL for the fetch request.
 *    - @param {Object} [options={}] - Optional fetch options, such as method, headers, body, etc.
 *    - @returns {Promise<Response>} - A promise that resolves to the fetch response.
 *
 * @example
 * const fetchWithAuth = useFetchWithAuth();
 *
 * const fetchData = async () => {
 *   const response = await fetchWithAuth('/api/some-endpoint', { method: 'GET' });
 *   if (response.ok) {
 *     const data = await response.json();
 *     console.log(data);
 *   } else {
 *     console.error('Error fetching data');
 *   }
 * };
 */
export const useFetchWithAuth = () => {
    const {clearLoginDetails} = useAuth();
    const navigate = useNavigate();

    const handleUnauthorized = () => {
        clearLoginDetails();
        navigate(REACT_ROUTES.LOGIN);
    };

    return (route, options = {}) => fetchWithCredentials(route, options, handleUnauthorized);
};
