import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;