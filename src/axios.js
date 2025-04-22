import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

// Add X-XSRF-TOKEN manually to all requests
instance.interceptors.request.use((config) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }
    return config;
});

export default instance;
