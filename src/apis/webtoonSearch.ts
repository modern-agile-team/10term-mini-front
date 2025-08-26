import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type { SearchedWebtoon } from '@/types/webtoon';

type WebtoonSearchResponse = ApiResponse<SearchedWebtoon[]>;

export const requestSearchWebtoons = async (keyword: string): Promise<SearchedWebtoon[]> => {
  const res = await instance.get<WebtoonSearchResponse>('search/webtoons', {
    params: { keyword },
  });
  return res.data.data.content;
};
