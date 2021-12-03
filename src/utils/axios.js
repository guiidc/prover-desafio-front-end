import axios from 'axios';

const token = localStorage.getItem('token');

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { 'authorization': token }
});

export default axiosConfig;
