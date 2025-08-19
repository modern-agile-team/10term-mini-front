import { instance } from '@/apis/axios';

export const requestUserInfo = async (): Promise<{ nickname: string }> => {
  const res = await instance.get<{ data: { content: { nickname: string } } }>('users/me');
  return res.data.data.content;
};

export const requestNicknameCheck = async (nickname: string): Promise<boolean> => {
  const res = await instance.get<{ data: { content: { isAvailable: boolean } } }>(
    `users/nicknames/${nickname}`,
  );
  return res.data.data.content.isAvailable;
};

export const requestNicknameUpdate = async (newNickname: string): Promise<string> => {
  const res = await instance.patch<{ data: { message: string } }>('users/me/nickname', {
    newNickname,
  });
  return res.data.data.message;
};

export const requestPasswordUpdate = async (
  currentPassword: string,
  newPassword: string,
): Promise<string> => {
  const res = await instance.patch<{ data: { message: string } }>('users/me/password', {
    currentPassword,
    newPassword,
  });
  return res.data.data.message;
};
