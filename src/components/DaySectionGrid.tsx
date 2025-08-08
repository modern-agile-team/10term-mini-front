import type { Webtoon, DaySectionGridProps } from "../types/webtoon.ts";
import WebtoonCard from "./WebtoonCard.tsx";

function DaySectionGrid({ webtoons }: DaySectionGridProps) {
  return (
    <ul className={` 
      flex flex-wrap gap-2  
      pb-[20px]
      `}
    >
      {webtoons.map((webtoon: Webtoon) => (
        <li key={webtoon.id} 
          className={`items-center py-[10px] w-[168px] border-2`}>
          <WebtoonCard 
          id={webtoon.id}
          title={webtoon.title}
          thumbnail_url={webtoon.thumbnail_url}
          average_rating={webtoon.average_rating}
          />
        </li>
      ))}
    </ul>
  );
}

export default DaySectionGrid;