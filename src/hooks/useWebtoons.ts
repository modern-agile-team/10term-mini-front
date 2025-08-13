import { useEffect, useState } from "react";
import type { Webtoon } from "@/types/webtoon";
import type { WebtoonSortOption } from "@/constants/webtoon.constants";
import { requestAllWebtoons, requestWebtoonsByDay } from "@/apis/webtoons";
import type { DayOfWeek } from "@/constants/date.constants";

function useWebtoons(sort: WebtoonSortOption, day?: DayOfWeek) {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);

  useEffect(() => {
    const getWebtoons = async () => {
      try {
        let data;
        
        if (day) {
          data = await requestWebtoonsByDay(day, sort);
        } else {
          data = await requestAllWebtoons(sort);
        }
        
        setWebtoons(data);
      } catch (err) {
        console.error("웹툰 목록 불러오기 실패: ", err);
      }
    };

    getWebtoons();
  }, [sort, day]);

  return webtoons;
}

export default useWebtoons;