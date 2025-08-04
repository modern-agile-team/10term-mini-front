import axios from "axios";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse, LogoutResponse, RefreshTokenResponse } from "../types/auth";

function requestLogin(loginData: LoginRequest): Promise<LoginResponse> {
  return axios.post<LoginResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, loginData, {
    withCredentials: true,
  }).then(res => res.data);
}

function requestSignup(signupData: SignupRequest): Promise<SignupResponse> {
  return axios.post<SignupResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, signupData, {
    withCredentials: true,
  }).then(res => res.data);
}

function requestLogout(): Promise<LogoutResponse> {
  return axios.post<LogoutResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {}, {
    withCredentials: true,
  }).then(res => res.data);
}

function requestRefreshToken(): Promise<RefreshTokenResponse> {
  return axios.post<RefreshTokenResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/token`, {}, {
    withCredentials: true,
  }).then(res => res.data);
}

export { requestLogin, requestSignup, requestLogout, requestRefreshToken };