import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("access_token");

  if (request.url?.includes("/token")) {
    return request;
  }
  
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No access token found");
    return Promise.reject(new Error("No access token"));
  }
  return request;
});

export default api;
