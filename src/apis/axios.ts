import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { requestRefreshToken } from "@/apis/auth";
import queryString from "query-string";

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const paramsSerializer = (params: Record<string, any>) =>
  queryString.stringify(params, { skipEmptyString: true, skipNull: true });

const common: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  paramsSerializer,
};

export const publicAxios = axios.create(common);

export const privateAxios = axios.create(common);

privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});

privateAxios.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await requestRefreshToken();
        
        if (!res.success) {
          console.error(res.data.message);
          return Promise.reject(new Error("토큰 갱신 실패"));
        }
        
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return privateAxios(originalRequest);
      } catch (err) {
        console.error("리프레시 실패");

        localStorage.clear();

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
