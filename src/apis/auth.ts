import axios from "axios";
import type { LoginRequest, LoginResponse, LogoutResponse, SignupRequest, SignupResponse } from "../types/auth";

function requestLogin(loginData: LoginRequest): Promise<LoginResponse> {
  return axios.post<LoginResponse>("/api/auth/login", loginData, {
    withCredentials: true,
  }).then(res => res.data);
}

function requestSignup(signupData: SignupRequest): Promise<SignupResponse> {
  return axios.post<SignupResponse>("/api/auth/signup", signupData, {
    withCredentials: true,
  }).then(res => res.data);
}

function requestLogout(): Promise<LogoutResponse> {
  return axios.post<LogoutResponse>("/api/auth/logout", {}, {
    withCredentials: true,
  }).then(res => res.data);
}

export { requestLogin, requestSignup, requestLogout };