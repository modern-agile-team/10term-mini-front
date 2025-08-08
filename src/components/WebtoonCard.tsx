import { Link } from "react-router";
import type { WebtoonCardProps } from "../types/webtoon";

function WebtoonCard({ id, title, thumbnail_url, average_rating }: WebtoonCardProps) {
  return (
    <div className="">
      <Link to={`/webtoon/${id}`} className="block">
        <div className="overflow-hidden">
          <img src={thumbnail_url} alt={title} className="w-[160px] h-[207px] object-cover transition-transform duration-300 hover:scale-105"/>
        </div>
        <p className="text-sm font-semibold mt-2 hover:underline">{title}</p>
      </Link>
      {average_rating != null
      ? (
      <p className="text-sm text-gray-500 mt-1 gap-1 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
        {average_rating}
      </p>)
      : ('')}
    </div>
  );
}

export default WebtoonCard;