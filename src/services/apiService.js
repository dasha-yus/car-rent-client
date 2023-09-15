import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
});

export default apiService;
