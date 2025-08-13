import { instance } from '@/apis/axios';
import type { Webtoon } from '@/types/webtoon';

export const requestAllWebtoons = async (sort: string): Promise<Webtoon[]> => {
  const res = await instance.get<{ data: { content: Webtoon[] } }>('/api/webtoons', {
    params: { sort },
  });
  return res.data.data.content;
};

export const requestWebtoonsByDay = async (day: string, sort: string): Promise<Webtoon[]> => {
  const res = await instance.get<{ data: { content: Webtoon[] } }>('api/webtoons', {
    params: { day, sort },
  });
  return res.data.data.content;
};
