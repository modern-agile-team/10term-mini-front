import { useEffect, useState } from "react";
import type { Webtoon, WebtoonSortOption } from "../types/webtoon";
import { requestAllWebtoons } from "../apis/webtoons";

function useWebtoons(sort: WebtoonSortOption) {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);

  useEffect(() => {
    const getWebtoons = async () => {
      try {
        const data = await requestAllWebtoons(sort);
        setWebtoons(data);
      } catch (err: any) {
        console.error("웹툰 목록 불러오기 실패:", err);
      }
    };

    getWebtoons();
  }, [sort]);

  return webtoons;
}

export default useWebtoons;