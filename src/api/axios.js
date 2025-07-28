import axios from 'axios';

const api = axios.create({
  baseURL: 'https://machine.travelninja.pk/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;