import type { Webtoon } from '@/types/webtoon.ts';
import WebtoonCard from './WebtoonCard.tsx';
import { DAY_MAPPING, DAYS } from '@/constants/date.constants.ts';
import type { DayOfWeek } from '@/constants/date.constants.ts';

interface DaySectionListProps {
  day: DayOfWeek;
  webtoons: Webtoon[];
}

function DaySectionList({ day, webtoons }: DaySectionListProps) {
  const todayKey: DayOfWeek = DAYS[new Date().getDay()];
  const isActive = day === todayKey;

  return (
    <ul
      className={` 
    w-[168px]
    pb-[20px]
    border-[1px]
    ${isActive ? 'bg-red-200' : ''}
    `}
    >
      <h2
        className={`
      py-[10px]
      text-center 
      font-bold
      text-[15px]
      ${isActive ? 'bg-site-red text-white' : ''}
      `}
      >
        {DAY_MAPPING[day]}
      </h2>
      {webtoons.map((webtoon: Webtoon) => (
        <li
          key={webtoon.id}
          className={`flex flex-col items-center py-[10px] ${isActive ? 'bg-red-200' : ''}`}
        >
          <WebtoonCard
            id={webtoon.id}
            title={webtoon.title}
            thumbnailUrl={webtoon.thumbnailUrl}
            clickedDay={day}
          />
        </li>
      ))}
    </ul>
  );
}

export default DaySectionList;
