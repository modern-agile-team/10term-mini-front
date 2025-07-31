import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

function requestLogin(loginData: LoginRequest): Promise<LoginResponse> {
  return axios.post<LoginResponse>("/api/auth/login", loginData, {
    withCredentials: true,
  }).then(res => res.data);
}

export { requestLogin };