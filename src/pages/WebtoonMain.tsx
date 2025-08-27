import DaySectionList from '@/components/DaySectionList';
import DaySectionGrid from '@/components/DaySectionGrid';
import { DAY_MAPPING, type DayOfWeek } from '@/constants/date.constants';
import useWebtoons from '@/hooks/useWebtoons';
import { contains, objectKeys } from '@modern-kit/utils';
import {
  BUTTON_INFOS,
  WEBTOON_SORT_OPTIONS,
  type WebtoonSortOption,
} from '@/constants/webtoon.constants';
import { useSearchParams } from 'react-router';
import SectionTitle from '@/components/SectionTitle';

function WebtoonMain() {
  const days = objectKeys(DAY_MAPPING);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDay = searchParams.get('day') as DayOfWeek;
  const sortParam = searchParams.get('sort');

  const sort: WebtoonSortOption = contains(WEBTOON_SORT_OPTIONS, sortParam)
    ? sortParam
    : 'favorite';

  const handleSortClick = (type: string) => {
    setSearchParams(selectedDay ? { day: selectedDay, sort: type } : { sort: type });
  };

  const webtoons = useWebtoons(sort, selectedDay);

  return (
    <div className="w-[1190px] mx-auto mt-[25px]">
      <div className={`mb-2 text-sm flex items-center ${selectedDay ? 'justify-between' : ''}`}>
        <SectionTitle day={selectedDay}></SectionTitle>
        <div className="flex items-center">
          {BUTTON_INFOS.map((item) => (
            <button
              key={item.type}
              onClick={() => handleSortClick(item.type)}
              className={`ml-1 ${sort === item.type ? 'text-site-red' : ''}`}
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
            webtoons={webtoons.filter((w) => w.weekday.includes(selectedDay as DayOfWeek))}
            clickedDay={selectedDay}
          />
        ) : (
          days.map((day) => (
            <DaySectionList
              key={day}
              day={day}
              webtoons={webtoons.filter((w) => w.weekday.includes(day))}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default WebtoonMain;
