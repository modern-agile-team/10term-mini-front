import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type { FavoriteWebtoon } from '@/types/webtoon';

type FavoritesResponse = ApiResponse<FavoriteWebtoon[]>;
type DeleteFavoritesResponse = ApiResponse<string>;

export const requestFavorites = async (): Promise<FavoriteWebtoon[]> => {
  const res = await instance.get<FavoritesResponse>('users/me/favorites');
  return res.data.data.content;
};

export const requestDeleteFavorites = async (webtoonIds: number[]): Promise<string> => {
  const res = await instance.delete<DeleteFavoritesResponse>('users/me/favorites', {
    data: { webtoonIds },
  });
  return res.data.data.content;
};
