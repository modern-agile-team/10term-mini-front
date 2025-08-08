import api from "@/apis/client";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse, LogoutResponse, RefreshTokenResponse } from "@/types/auth";

export async function requestLogin(
  loginData: LoginRequest
): Promise<LoginResponse> {
  return api.postAPI<LoginResponse, LoginRequest>({
    url: "/api/auth/login",   // baseURL는 이미 axios.ts에서 주입됨
    data: loginData           // body
  });
}

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