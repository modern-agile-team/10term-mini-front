import DaySection from "../components/DaySection";
import { DAY_MAPPING } from "../constants/date.constants";
import type { Webtoon } from "../types/webtoon";
import { useSortQuery } from "../hooks/useSortQuery";
import useWebtoons from "../hooks/useWebtoons";
import { objectKeys } from "@modern-kit/utils";

function WebtoonMain() {
  const days = objectKeys(DAY_MAPPING);
  
  const { sortParam, setSortParam } = useSortQuery();
  const webtoons = useWebtoons(sortParam);

  return (
    <div className="mt-[25px]">
      <div className="mb-2 text-sm flex items-center">
        <span className="text-xl font-semibold">요일별 전체 웹툰</span>
        <button 
        onClick={() => setSortParam("favorite")} 
        className={`ml-4 ${sortParam === "favorite" ? "text-site-red" : ""}`}
        >
          인기순
        </button>
        <button 
        onClick={() => setSortParam("updated")} 
        className={`ml-1 ${sortParam === "updated" ? "text-site-red" : ""}`}
        >
          &middot; 업데이트순
        </button>
        <button 
        onClick={() => setSortParam("view")} 
        className={`ml-1 ${sortParam === "view" ? "text-site-red" : ""}`}
        >
          &middot; 조회순
        </button>
        <button 
        onClick={() => setSortParam("rate")} 
        className={`ml-1 ${sortParam === "rate" ? "text-site-red" : ""}`}
        >
          &middot; 별점순
        </button>
      </div>
      <main className="flex mt-[15px]">
        {days.map((day) => {
          const filtered = webtoons.filter(
            (webtoon: Webtoon) => webtoon.day_of_week === day
          );

          return (
            <DaySection
              key={day}
              day={day}
              webtoons={filtered}
            />
          );
        })}
      </main>
    </div>
  );
}

export default WebtoonMain;