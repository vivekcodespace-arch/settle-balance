import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000", // your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
