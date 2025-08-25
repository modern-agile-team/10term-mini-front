import { Link } from 'react-router';
import { formatDateShort } from '@/utils/date';
import type { SearchedWebtoon } from '@/types/webtoon';
import type { DayOfWeek } from '@/constants/date.constants';

interface SearchedWebtoonItemProps {
  webtoon: SearchedWebtoon;
  getWeekdayLabel: (weekdays: DayOfWeek[]) => string;
}

export const SearchedWebtoonItem = ({ webtoon, getWeekdayLabel }: SearchedWebtoonItemProps) => {
  return (
    <div className="flex mb-4">
      <Link to={`/webtoon/${webtoon.id}`}>
        <div className="overflow-hidden">
          <img
            src={webtoon.thumbnailUrl}
            alt={webtoon.title}
            className="w-[120px] h-[156px] object-cover rounded border transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="ml-4">
        <Link to={`/webtoon/${webtoon.id}`}>
          <h1 className="text-lg font-semibold hover:underline">{webtoon.title}</h1>
        </Link>

        <div className="text-sm font-semibold">
          {webtoon.writer}
          <span className="font-light"> · 글 / </span>
          {webtoon.illustrator}
          <span className="font-light"> · 그림 | </span>
          <span className="font-light">{getWeekdayLabel(webtoon.weekdays)} | </span>
          <span className="font-light">최종 업데이트 {formatDateShort(webtoon.updatedAt)}</span>
        </div>
        <span className="block mt-1 max-w-[630px] truncate text-sm">{webtoon.description}</span>
      </div>
    </div>
  );
};
