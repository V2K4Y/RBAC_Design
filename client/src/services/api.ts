import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/signup', { username, email, password });
  return response.data;
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await api.get('/verify-token'); // Example route for token validation
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export default api;
