import axios from "axios";

const defaultBackendUrl = "https://fraudlensai-production.up.railway.app";
const baseURL = import.meta.env.VITE_API_BASE_URL || defaultBackendUrl;
const api = axios.create({
    baseURL,
});

export default api;