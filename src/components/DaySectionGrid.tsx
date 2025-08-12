import type { Webtoon } from "../types/webtoon.ts";
import WebtoonCard from "./WebtoonCard.tsx";

function DaySectionGrid({ webtoons }: { webtoons: Webtoon[] }) {
  return (
    <ul className={` 
      flex flex-wrap gap-2  
      pb-[20px]
      `}
    >
      {webtoons.map((webtoon: Webtoon) => (
        <li key={webtoon.id} 
          className={`items-center py-[10px] w-[168px]`}>
          <WebtoonCard 
          id={webtoon.id}
          title={webtoon.title}
          thumbnailUrl={webtoon.thumbnailUrl}
          averageRating={webtoon.averageRating}
          />
        </li>
      ))}
    </ul>
  );
}

export default DaySectionGrid;