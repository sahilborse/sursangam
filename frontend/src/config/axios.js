import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: `${process.env.backend_api_url || 'http://localhost:5000'}`,
    baseURL: 'http://localhost:5000',
    // withCredentials: true,
});

export default axiosInstance;