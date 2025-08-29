import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export default axios;