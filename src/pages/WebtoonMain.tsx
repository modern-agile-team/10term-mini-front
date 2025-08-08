import DaySection from "@/components/DaySection";
import { DAY_MAPPING } from "@/constants/date.constants";
import type { Webtoon } from "@/types/webtoon";
import useWebtoons from "@/hooks/useWebtoons";
import { objectKeys } from "@modern-kit/utils";
import { BUTTON_INFOS } from "@/constants/webtoon.constants";
import { useSearchParams } from "react-router";

function WebtoonMain() {
  const days = objectKeys(DAY_MAPPING);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "favorite";

  const webtoons = useWebtoons(sort);

  return (
    <div className="mt-[25px]">
      <div className="mb-2 text-sm flex items-center">
        <span className="mr-4 text-xl font-semibold">요일별 전체 웹툰</span>
        {BUTTON_INFOS.map((item) => (
          <button
            key={item.type}
            onClick={() => setSearchParams({ sort: item.type })}
            className={`ml-1 ${sort === item.type ? "text-site-red" : ""}`}
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