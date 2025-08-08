import api from "@/apis/client";
import type { Webtoon } from "@/types/webtoon";

export const requestAllWebtoons = async (sort: string): Promise<Webtoon[]> => {
  const res = await api.getAPI<{ data: { webtoons: Webtoon[] } }>({
    url: "/api/webtoons",
    params: { sort },
  })
  return res.data.webtoons;
};