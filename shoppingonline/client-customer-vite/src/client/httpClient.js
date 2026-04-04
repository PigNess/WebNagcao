import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URI,
});

export default client;