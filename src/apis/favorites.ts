import { instance } from '@/apis/axios';
import type { FavoriteWebtoon } from '@/types/webtoon';

export const requestFavorites = async (): Promise<FavoriteWebtoon[]> => {
  const res = await instance.get<{ data: { content: FavoriteWebtoon[] } }>(
    '/api/users/me/favorites',
  );
  return res.data.data.content;
};

export const requestDeleteFavorites = async (webtoonIds: number[]): Promise<string> => {
  const res = await instance.delete<{ data: { message: string } }>('/api/users/me/favorites', {
    data: { webtoonIds },
  });
  return res.data.data.message;
};
