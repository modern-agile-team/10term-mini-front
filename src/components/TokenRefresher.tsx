import axios from 'axios';
import { useEffect } from 'react';

function TokenRefresher() {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      axios.post("/api/auth/token", null, { withCredentials: true })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.data.accessToken);
        })
        .catch((err) => {
          console.error("리프레시 토큰 실패", err);
        })
      }
  }, []);

  return null;
}

export default TokenRefresher;