import instance from "@/apis/axios";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse, LogoutResponse, RefreshTokenResponse } from "@/types/auth";

export async function requestLogin(
  loginData: LoginRequest
): Promise<LoginResponse> {
  const { data } = await instance.post<LoginResponse>("/api/auth/login", loginData);
  return data;
}

export const requestSignup = async (body: SignupRequest): Promise<SignupResponse> => {
  const { data } = await instance.post<SignupResponse>("/api/auth/signup", body);
  return data;
};

export const requestLogout = async (): Promise<LogoutResponse> => {
  const { data } = await instance.post<LogoutResponse>("/api/auth/logout");
  return data;
};

export const requestRefreshToken = async (): Promise<RefreshTokenResponse> => {
  const { data } = await instance.post<RefreshTokenResponse>("/api/auth/token");
  return data;
};