import type { Webtoon } from "../types/webtoon";
import axios from "axios";

export const requestAllWebtoons = async (sort: string): Promise<Webtoon[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/webtoons?sort=${sort}`);
  return res.data.data.webtoons;
};