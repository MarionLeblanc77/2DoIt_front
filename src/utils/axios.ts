import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import toCamelCase from "./caseConvertor";

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  isRetry?: boolean;
}

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(null);
    }
  });
  failedQueue = [];
};

const getBackendEndpoint = (): string => {
  if (typeof window !== "undefined" && window.APP_CONFIG) {
    return window.APP_CONFIG.BACKEND_ENDPOINT;
  }
  return "http://localhost:8000";
};

export const axiosInstance = axios.create({
  baseURL: `${getBackendEndpoint()}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = toCamelCase(response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest.isRetry &&
      !originalRequest.url?.includes("/token/refresh")
    ) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: async () => {
              try {
                const response = await axiosInstance(originalRequest);
                resolve(response);
              } catch (retryError) {
                reject(retryError);
              }
            },
            reject,
          });
        });
      }

      originalRequest.isRetry = true;
      isRefreshing = true;

      try {
        await axiosInstance.get("/token/refresh");
        processQueue(null);
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        localStorage.removeItem("rememberMe");
        window.location.href = "/";
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
