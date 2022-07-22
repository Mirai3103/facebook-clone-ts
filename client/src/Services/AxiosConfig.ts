import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8080/api",
    withCredentials: true,
});

export default instance;