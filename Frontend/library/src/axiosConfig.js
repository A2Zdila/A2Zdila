// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/books', // Adjust this according to your backend URL
  timeout: 10000, // Set a timeout value (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers here
  },
});

export default axiosInstance;
