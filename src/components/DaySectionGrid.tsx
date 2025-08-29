import { useNavigate } from 'react-router';
import type { Webtoon } from '../types/webtoon.ts';
import WebtoonCard from './WebtoonCard.tsx';

interface DaySectionGridProps {
  webtoons: Webtoon[];
  clickedDay?: string;
}

function DaySectionGrid({ webtoons, clickedDay }: DaySectionGridProps) {
  const navigate = useNavigate();

  const handleRandomClick = () => {
    const random = webtoons[Math.floor(Math.random() * webtoons.length)];
    if (random) {
      navigate(`/webtoon/${random.id}`);
    } else {
      alert('랜덤으로 선택할 웹툰이 없어요!');
    }
  };

  return (
    <ul
      className={` 
      flex flex-wrap gap-2
      pb-[20px]
      `}
    >
      {webtoons.map((webtoon: Webtoon) => (
        <li key={webtoon.id} className={`items-center py-[10px] w-[168px]`}>
          <WebtoonCard
            id={webtoon.id}
            title={webtoon.title}
            thumbnailUrl={webtoon.thumbnailUrl}
            averageRating={webtoon.averageRating}
            withBorder
            clickedDay={clickedDay}
          />
        </li>
      ))}

      <li className="items-center ml-[140px] py-[10px] h-[279px]">
        <button
          onClick={handleRandomClick}
          className="w-[168px] h-full flex flex-col justify-center items-center border-2 border-site-red rounded-md bg-white transition-transform duration-300 hover:scale-105"
        >
          <span className="font-bold text-site-red text-lg">RANDOM</span>
          <span className="text-lg text-site-red border-b-2 border-site-red">바로가기</span>
        </button>
      </li>
    </ul>
  );
}

export default DaySectionGrid;
