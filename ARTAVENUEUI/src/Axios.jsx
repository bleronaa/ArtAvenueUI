import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44340/api',
  timeout: 1000000, // Adjust timeout as needed
});

// Add a request interceptor to include token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Fixed string interpolation
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
