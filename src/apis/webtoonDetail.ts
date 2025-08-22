import type { ApiResponse } from '@/types/api';
import { instance } from './axios';
import type { WebtoonDetailInfo, WebtoonEpisode } from '@/types/webtoonDetail';

export type WebtoonDetailResponse = ApiResponse<WebtoonDetailInfo>;
export type WebtoonEpisodeResponse = ApiResponse<WebtoonEpisode[]>;
export type FavoriteResponse = ApiResponse<{ success: boolean }>;

export const requestWebtoonDetail = async (webtoonId: number) => {
  const response = await instance.get<WebtoonDetailResponse>(`webtoons/${webtoonId}`);
  return response.data.data.content;
};

export const requestWebtoonEpisodes = async (webtoonId: number) => {
  const response = await instance.get<WebtoonEpisodeResponse>(`webtoons/${webtoonId}/episodes`);
  return response.data.data.content;
};

export const requestAddFavorite = async (webtoonId: number) => {
  const response = await instance.post<FavoriteResponse>(`webtoons/${webtoonId}/favorite`);
  return response.data.data.content;
};

export const requestRemoveFavorite = async (webtoonId: number) => {
  const response = await instance.delete<FavoriteResponse>(`webtoons/${webtoonId}/favorite`);
  return response.data.data.content;
};
