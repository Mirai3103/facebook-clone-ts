import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8080/api",
});


export function addHeader(header: string, value: string) {
    instance.defaults.headers.common[header] = value;
}

export const baseURL = process.env.API_URL || "http://localhost:8080/api";

export default instance;