import axios from 'axios';
//const axiosInstance
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
    baseURL : 'http://localhost:5001/api',
})



export default api;