// LOCAL
import axios from "axios";
import toCamelCase from "./caseConvertor";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const addTokenToAxiosInstance = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeTokenFromAxiosInstance = () => {
  axiosInstance.defaults.headers.common.Authorization = ``;
};

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = toCamelCase(response.data);
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
