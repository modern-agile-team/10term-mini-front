import { Link } from 'react-router';
import type { Webtoon } from '../types/webtoon';
import { StarIcon } from '@heroicons/react/24/solid';

function WebtoonCard({
  id,
  title,
  thumbnailUrl,
  averageRating,
  withBorder = false,
}: Omit<Webtoon, 'weekdays'> & { withBorder?: boolean }) {
  return (
    <div>
      <Link to={`/webtoon/${id}`} className="block">
        <div className={`${withBorder ? 'border-2' : ''} overflow-hidden`}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-[160px] h-[207px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <p className="text-sm font-semibold mt-2 hover:underline">{title}</p>
      </Link>
      {averageRating != null && (
        <p className="text-sm text-gray-500 gap-1 flex items-center">
          <StarIcon className="w-3 h-3" />
          {averageRating}
        </p>
      )}
    </div>
  );
}

export default WebtoonCard;
