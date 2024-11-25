function fetchWithCredentials(route, options = {}, onUnauthorized = null) {
    const defaultOptions = {
        ...options,
        credentials: 'include',
    };

    return fetch(route, defaultOptions)
        .then(response => {
            if (response.status === 401 && onUnauthorized) {
                onUnauthorized();
            }
            return response;
        })
        .catch(error => {
            console.error('Error during fetch request:', error);
            throw error;
        });
}

export default fetchWithCredentials;
