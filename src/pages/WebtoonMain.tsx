import DaySection from "../components/DaySection";
import { DAY_MAPPING } from "../constants/date.constants";
import type { Webtoon } from "../types/webtoon";
import { useSortQuery } from "../hooks/useSortQuery";
import useWebtoons from "../hooks/useWebtoons";
import { objectKeys } from "@modern-kit/utils";
import { BUTTON_INFOS } from "../constants/webtoon.constants";

function WebtoonMain() {
  const days = objectKeys(DAY_MAPPING);
  
  const { sortParam, setSortParam } = useSortQuery();
  const webtoons = useWebtoons(sortParam);

  return (
    <div className="mt-[25px]">
      <div className="mb-2 text-sm flex items-center">
        <span className="mr-4 text-xl font-semibold">요일별 전체 웹툰</span>
        {BUTTON_INFOS.map((item) => (
          <button
            key={item.type}
            onClick={() => setSortParam(item.type)}
            className={`ml-1 ${sortParam === item.type ? "text-site-red" : ""}`}
          >
            {item.content}
          </button>
        ))}
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