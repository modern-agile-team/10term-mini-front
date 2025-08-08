import DaySectionList from "@/components/DaySectionList";
import DaySectionGrid from "@/components/DaySectionGrid";
import { DAY_MAPPING } from "@/constants/date.constants";
import useWebtoons from "@/hooks/useWebtoons";
import { objectKeys } from "@modern-kit/utils";
import { BUTTON_INFOS } from "@/constants/webtoon.constants";
import { useSearchParams } from "react-router";
import SectionTitle from "@/components/SectionTitle";

function WebtoonMain() {
  const days = objectKeys(DAY_MAPPING);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDay = searchParams.get("day");
  const sort = searchParams.get("sort") ?? "favorite";

  const webtoons = useWebtoons(sort);

  return (
    <div className="mt-[25px]">
      <div className={`mb-2 text-sm flex items-center ${selectedDay ? 'justify-between' : ''}`}>
        <SectionTitle day={selectedDay}></SectionTitle>
        <div className="flex items-center">
          {BUTTON_INFOS.map((item) => (
            <button
              key={item.type}
              onClick={() => 
                setSearchParams(
                selectedDay 
                ? { day: selectedDay, sort: item.type } 
                : { sort: item.type}
              )}
              className={`ml-1 ${sort === item.type ? "text-site-red" : ""}`}
            >
              {item.content}
            </button>
          ))}
        </div>
      </div>
      <main className="flex mt-[15px]">
      {selectedDay ? (
        <DaySectionGrid
          key={selectedDay}
          webtoons={webtoons.filter(w => w.day_of_week === selectedDay)}
        />
      ) : (
        days.map((day) => (
          <DaySectionList
            key={day}
            day={day}
            webtoons={webtoons.filter(w => w.day_of_week === day)}
          />
        ))
      )}
      </main>
    </div>
  );
}

export default WebtoonMain;