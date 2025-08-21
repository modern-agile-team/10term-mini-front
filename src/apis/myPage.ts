import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';

export type UserInfoResponse = ApiResponse<{ nickname: string }>;
export type NicknameCheckResponse = ApiResponse<{ isAvailable: boolean }>;
export type NicknameUpdateResponse = ApiResponse<string>;
export type PasswordUpdateResponse = ApiResponse<string>;

export const requestUserInfo = async (): Promise<{ nickname: string }> => {
  const res = await instance.get<UserInfoResponse>('users/me');
  return res.data.data.content;
};

export const requestNicknameCheck = async (nickname: string): Promise<boolean> => {
  const res = await instance.get<NicknameCheckResponse>(`users/nicknames/${nickname}`);
  return res.data.data.content.isAvailable;
};

export const requestNicknameUpdate = async (newNickname: string): Promise<string> => {
  const res = await instance.patch<NicknameUpdateResponse>('users/me/nickname', {
    newNickname,
  });
  return res.data.data.content;
};

export const requestPasswordUpdate = async (
  currentPassword: string,
  newPassword: string,
): Promise<string> => {
  const res = await instance.patch<PasswordUpdateResponse>('users/me/password', {
    currentPassword,
    newPassword,
  });
  return res.data.data.content;
};
