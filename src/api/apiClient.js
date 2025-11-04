import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HEADER_KEY = import.meta.env.VITE_API_HEADER_KEY;
const SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;

const apiClient = axios.create({
  baseURL: BASE_URL, 
  headers: {
    [HEADER_KEY]: SECRET_KEY,
  },
});

export default apiClient;