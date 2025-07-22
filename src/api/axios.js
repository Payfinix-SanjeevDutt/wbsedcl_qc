import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:8000', // fallback for local dev
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
