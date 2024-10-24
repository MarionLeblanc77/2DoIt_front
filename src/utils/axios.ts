// LOCAL
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:800/api/",
});

export default axiosInstance;
