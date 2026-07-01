import axios from "axios";

const api = axios.create({
    baseURL: "https://fraudlensai-production.up.railway.app",
});

export default api;