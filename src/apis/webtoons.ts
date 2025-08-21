import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type { Webtoon } from '@/types/webtoon';

type WebtoonListResponse = ApiResponse<Webtoon[]>;

export const requestAllWebtoons = async (sort: string): Promise<Webtoon[]> => {
  const res = await instance.get<WebtoonListResponse>('webtoons', {
    params: { sort },
  });
  return res.data.data.content;
};

export const requestWebtoonsByDay = async (day: string, sort: string): Promise<Webtoon[]> => {
  const res = await instance.get<WebtoonListResponse>('webtoons', {
    params: { day, sort },
  });
  return res.data.data.content;
};
