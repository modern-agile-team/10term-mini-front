import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      !originalRequest.url.includes("/auth/token")
    ) {
      originalRequest.retry = true;

      try {
        const res = await instance.post("auth/token");
        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
