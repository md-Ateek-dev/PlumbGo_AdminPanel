import axios from "axios";

const API_BASE_URL = "https://plumbgo-backend.onrender.com"; // backend ka base URL
// const API_BASE_URL = "http://localhost:5000"; // backend ka base URL

const Clients = axios.create({
  baseURL: API_BASE_URL,
});

// Har request se pehle token attach
Clients.interceptors.request.use((config) => {
  const token = localStorage.getItem("plumbgo_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Clients;
