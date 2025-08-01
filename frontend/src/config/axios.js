import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.BACKEND_API_URL || 'http://localhost:5000'}`,
    // withCredentials: true,
});

export default axiosInstance;