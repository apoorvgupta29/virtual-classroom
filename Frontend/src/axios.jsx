import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust as needed
  headers: {
    'x-auth-token': localStorage.getItem('token')
  }
});

export default instance;