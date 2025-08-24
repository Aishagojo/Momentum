import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // send cookies
});

api.interceptors.request.use((config) => {
  config.headers["X-CSRF-Token"] = "client"; // placeholder
  return config;
});

export default api;
