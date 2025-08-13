import api from "@/apis/client";
import type { Webtoon } from "@/types/webtoon";

export const requestAllWebtoons = async (sort: string): Promise<Webtoon[]> => {
  const res = await api.getAPI<{ data: { content: Webtoon[] } }>({
    url: "/api/webtoons",
    params: { sort },
  });
  return res.data.content;
};

export const requestWebtoonsByDay = async (
  day: string,
  sort: string
): Promise<Webtoon[]> => {
  const res = await api.getAPI<{ data: { content: Webtoon[] } }>({
    url: "api/webtoons",
    params: { day, sort },
  });
  return res.data.content;
};
