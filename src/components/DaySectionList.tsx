import type { Webtoon, DayOfWeek, DaySectionListProps } from "../types/webtoon.ts";
import WebtoonCard from "./WebtoonCard.tsx";

const dayMapping: Record<DayOfWeek, string> = {
  mon: "월요웹툰",
  tue: "화요웹툰",
  wed: "수요웹툰",
  thu: "목요웹툰",
  fri: "금요웹툰",
  sat: "토요웹툰",
  sun: "일요웹툰",
};

function DaySectionList({ day, webtoons }: DaySectionListProps) {
  console.log(webtoons);
  const getTodayKey = (): DayOfWeek => {
    const keys: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return keys[new Date().getDay()];
  };

  const isActive = day === getTodayKey();

  return (
    <ul className={` 
    w-[168px]
    pb-[20px]
    border-[1px]
    ${isActive ? "bg-red-200" : ""}
    `}>
      <h2 className={`
      py-[10px]
      text-center 
      font-bold
      text-[15px]
      ${isActive ? "bg-site-red text-white" : ""}
      `}
      >
        {dayMapping[day]}
      </h2>
      {webtoons.map((webtoon: Webtoon) => (
        <li key={webtoon.id} 
          className={`flex flex-col items-center py-[10px] ${isActive ? "bg-red-200" : ""}`}>
          <WebtoonCard 
          id={webtoon.id}
          title={webtoon.title}
          thumbnail_url={webtoon.thumbnail_url}
          />
        </li>
      ))}
    </ul>
  );
}

export default DaySectionList;