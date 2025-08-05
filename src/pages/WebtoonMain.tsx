import DaySection from "../components/DaySection";
import type { DayOfWeek, MainSortOption, Webtoon } from "../types/webtoon";
import { mockWebtoons } from "../mocks/models/webtoon";
import { useState } from "react";

const days: DayOfWeek[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function WebtoonMain() {
  const [sort, setSort] = useState<MainSortOption>("like");

  return (
    <div className="mt-[25px]">
      <div className="mb-2 text-sm flex items-center">
        <span className="text-xl font-semibold">요일별 전체 웹툰</span>
        <button 
        onClick={() => setSort("like")} 
        className={`ml-4 ${sort === "like" ? "text-site-red" : ""}`}
        >
          인기순
        </button>
        <button 
        onClick={() => setSort("updated")} 
        className={`ml-1 ${sort === "updated" ? "text-site-red" : ""}`}
        >
          &middot; 업데이트순
        </button>
        <button 
        onClick={() => setSort("view")} 
        className={`ml-1 ${sort === "view" ? "text-site-red" : ""}`}
        >
          &middot; 조회순
        </button>
        <button 
        onClick={() => setSort("rate")} 
        className={`ml-1 ${sort === "rate" ? "text-site-red" : ""}`}
        >
          &middot; 별점순
        </button>
      </div>
      <main className="flex mt-[15px]">
        {days.map((day) => {
          const filtered = mockWebtoons.filter(
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