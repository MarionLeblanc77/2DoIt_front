import axios from "axios";
import toCamelCase from "./caseConvertor";

const getBackendEndpoint = (): string => {
  if (typeof window !== "undefined" && window.APP_CONFIG) {
    return window.APP_CONFIG.BACKEND_ENDPOINT;
  }
  return "http://127.0.0.1:8000";
};

export const axiosInstance = axios.create({
  baseURL: `${getBackendEndpoint()}/api`,
  withCredentials: window.APP_CONFIG.APP_ENV === "prod",
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
