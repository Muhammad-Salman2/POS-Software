import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/user/login", // Backend ka URL
  withCredentials: true, // 💥 Important: allow cookies
});

export default axiosInstance;