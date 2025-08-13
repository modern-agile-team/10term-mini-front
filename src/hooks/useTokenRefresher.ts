import { requestRefreshToken } from '../apis/auth';
import { useEffect } from 'react';

function useTokenRefresher() {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (!accessToken && user) {
      requestRefreshToken()
        .then((res) => {
          if (res.success) {
            localStorage.setItem('accessToken', res.data.content);
          } else {
            console.error('토큰 재발급 실패:', res.data.message);
          }
        })
        .catch((err) => {
          console.error('API 오류:', err);
        });

      // axios
      //   .post("/api/auth/token", null, { withCredentials: true })
      //   .then((res) => {
      //     localStorage.setItem("accessToken", res.data.data.accessToken);
      //   })
      //   .catch((err) => {
      //     console.error("토큰 리프레시 실패", err);
      //   })
    }
  }, []);

  return null;
}

export default useTokenRefresher;
