import axios from "axios";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse, LogoutResponse, RefreshTokenResponse } from "../types/auth";

async function requestLogin(loginData: LoginRequest): Promise<LoginResponse> {
  const res = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    loginData,
    { withCredentials: true }
  );
  return res.data;
}

async function requestSignup(signupData: SignupRequest): Promise<SignupResponse> {
  const res = await axios.post<SignupResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
    signupData,
    { withCredentials: true }
  );
  return res.data;
}

async function requestLogout(): Promise<LogoutResponse> {
  const res = await axios.post<LogoutResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
}

async function requestRefreshToken(): Promise<RefreshTokenResponse> {
  const res = await axios.post<RefreshTokenResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/token`,
    {},
    { withCredentials: true }
  );
  return res.data;
}

export { requestLogin, requestSignup, requestLogout, requestRefreshToken };