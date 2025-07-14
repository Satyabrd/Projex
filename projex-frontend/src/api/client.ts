// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Use env vars in real apps
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if using cookies for auth
});

export default apiClient;
