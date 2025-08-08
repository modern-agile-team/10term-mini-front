import { instance } from "@/apis/axios";
import type { Webtoon } from "@/types/webtoon";

export const requestAllWebtoons = async (sort: string): Promise<Webtoon[]> => {
  const { data } = await instance.get<{ data: { webtoons: Webtoon[] } }>(
    "/api/webtoons",
    { params: { sort } }
  );
  return data.data.webtoons;
};