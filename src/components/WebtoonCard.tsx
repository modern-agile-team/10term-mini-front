import { Link } from "react-router";
import type { WebtoonCardProps } from "../types/webtoon";

function WebtoonCard({ id, title, thumbnail_url }: WebtoonCardProps) {
  return (
    <div className="">
      <Link to={`/webtoon/${id}`} className="block">
        <div className="overflow-hidden">
          <img src={thumbnail_url} alt={title} className="w-[160px] h-[207px] object-cover transition-transform duration-300 hover:scale-105"/>
        </div>
        <p className="text-sm font-semibold mt-2 hover:underline">{title}</p>
      </Link>
    </div>
  );
}

export default WebtoonCard;