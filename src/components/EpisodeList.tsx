import type { WebtoonEpisode } from '@/types/webtoonDetail';
import { formatDateShort } from '@/utils/date';
import { StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';

interface EpisodeListProps {
  episodes: WebtoonEpisode[];
  webtoonId: number;
}

export const EpisodeList = ({ episodes, webtoonId }: EpisodeListProps) => {
  const navigate = useNavigate();

  return (
    <>
      <p className="py-2 border-t border-b">총 {episodes.length}화</p>
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="py-2 border-b flex items-center space-x-4 cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/webtoon/${webtoonId}/episode/${episode.id}`)}
        >
          <img
            src={episode.thumbnailUrl}
            alt={`${episode.episodeNo}화`}
            className="w-[120px] h-[70px] object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-medium hover:underline">
              {episode.episodeNo}화 {episode.title}
            </h3>
            <div className="flex gap-x-2">
              <span className="flex items-center gap-x-0.5 text-sm text-gray-500">
                <StarIcon className="w-4 h-4" /> {episode.ratingAvg}
              </span>
              <span className="text-sm text-gray-500">{formatDateShort(episode.postedTime)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
