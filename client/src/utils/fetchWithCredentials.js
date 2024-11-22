function fetchWithCredentials(route, options = {}) {

    const defaultOptions = {
        ...options,
        credentials: 'include'
    };

    return fetch(route, defaultOptions)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Error during fetch request:', error);
            throw error;
        });
}

export default fetchWithCredentials;