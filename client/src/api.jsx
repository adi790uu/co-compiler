import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Set your base URL here
  headers: {
    'Content-Type': 'application/json', // Set common headers here
    // Add other headers as needed
  },
});

export default api;
