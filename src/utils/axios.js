import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { 'authorization': localStorage.getItem('token') }
});

export default axiosConfig;
