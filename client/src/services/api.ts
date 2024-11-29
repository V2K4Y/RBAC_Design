import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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

// function to check weather user is authorized or not, it not then loggedout immediatelys
export const status = async () => {
  const response = await api.post('/auth/status');

  function arraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.sort().join(',') === arr2.sort().join(',');
  }
  const storedRoles = localStorage.getItem('role');
  const fetchedRoles = response.data.data || [];
  const roles: string[] = storedRoles ? JSON.parse(storedRoles) : [];
  if(!arraysEqual(roles, fetchedRoles)) {
    await api.post('/auth/logout');
    response.status = 404;
  }
  return response;
}

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response;
}

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
