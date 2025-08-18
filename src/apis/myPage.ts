import { instance } from '@/apis/axios';

export const requestUserInfo = () => {
  return instance.get('/api/users/me');
};

export const requestNicknameUpdate = (newNickname: string) => {
  return instance.patch('/api/users/me/nickname', { newNickname });
};

export const requestPasswordUpdate = (currentPassword: string, newPassword: string) => {
  return instance.patch('/api/users/me/password', {
    currentPassword,
    newPassword,
  });
};
