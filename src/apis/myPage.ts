import { instance } from '@/apis/axios';

export const requestUserInfo = () => {
  return instance.get<{ data: { content: { nickname: string } } }>('/api/users/me');
};

export const requestNicknameCheck = (nickname: string) =>
  instance.get<{ data: { content: { isAvailable: boolean } } }>(`/api/users/nicknames/${nickname}`);

export const requestNicknameUpdate = (newNickname: string) =>
  instance.patch<{ data: { message: string } }>('/api/users/me/nickname', { newNickname });

export const requestPasswordUpdate = (currentPassword: string, newPassword: string) =>
  instance.patch<{ data: { message: string } }>('/api/users/me/password', {
    currentPassword,
    newPassword,
  });
