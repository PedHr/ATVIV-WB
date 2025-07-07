import axios from 'axios';

// O proxy no package.json tratará de redirecionar para http://localhost:32832
const api = axios.create({
  baseURL: '/', 
});

export default api;