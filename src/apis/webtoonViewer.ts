import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type { WebtoonViewerEpisode } from '@/types/webtoonViewer';

type WebtoonEpisodeResponse = ApiResponse<WebtoonViewerEpisode>;

export const requestWebtoonEpisode = async (episodeId: number): Promise<WebtoonViewerEpisode> => {
  const res = await instance.get<WebtoonEpisodeResponse>(`episodes/${episodeId}`);
  return res.data.data.content;
};

export const increaseViewCount = async (episodeId: number): Promise<string> => {
  const res = await instance.post<{ data: { message: string } }>(
    `episodes/${episodeId}/view-count`,
  );
  return res.data.data.message;
};

export const submitRating = async (episodeId: number, rating: number): Promise<void> => {
  await instance.post(`episodes/${episodeId}/ratings`, { rating });
};
