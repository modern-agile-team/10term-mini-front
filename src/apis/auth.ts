import api from "@/apis/client";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse, LogoutResponse, RefreshTokenResponse } from "@/types/auth";

export const requestLogin = (loginData: LoginRequest) =>
  api.postAPI<LoginResponse, LoginRequest>({
    url: "/api/auth/login",
    data: loginData,
  });

export const requestSignup = (body: SignupRequest) =>
  api.postAPI<SignupResponse, SignupRequest>({
    url: "/api/auth/signup",
    data: body,
  });

export const requestLogout = () =>
  api.postAPI<LogoutResponse>({
    url: "/api/auth/logout",
  });

export const requestRefreshToken = () =>
  api.postAPI<RefreshTokenResponse>({
    url: "/api/auth/token",
  });